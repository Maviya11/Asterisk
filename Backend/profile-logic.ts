import axios from "axios";
import cron from "node-cron";
import { BASE_URL, Expenses } from "./recurring-logic";

export interface ProfileData {
  maxXp: number;
  xp: number;
  title: string;
  level: number;
}

interface Budget {
  category: string;
  budget: number;
}

cron.schedule("59 23 28-31 * *", async () => {
  const today = new Date();
  const lastDay = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  // Ensure it only runs on the last day of the month
  if (today.getDate() === lastDay) {
    console.log("Running fetchAllUsers at month-end...");
    await fetchAllUsers();
  }
});

const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}.json`);
    const userIds = Object.keys(response.data);
    for (const userId of userIds) {
      await processData(userId);
    }
  } catch (error) {
    console.error(error);
  }
};

const processData = async (userId: string) => {
  try {
    const expenses: Expenses[] = await fetchData(userId, "expenses");
    if (expenses.length === 0) return; // Return if no expenses present
    const profile: ProfileData = await fetchData(userId, "profile");
    const budget: Budget[] = await fetchData(userId, "budget");
    updateProfileData(profile, expenses, budget, userId);
  } catch (err) {
    console.log(err);
  }
};

const fetchData = async (userId: string, data: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}/${data}.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    return null;
  }
};

export const updateProfileData = async (
  profileData: ProfileData,
  expenses: Expenses[],
  budgets: Budget[],
  userId: string
) => {
  let { maxXp, xp, level } = profileData;
  let newXp = xp;
  let newLevel = level;
  let newMaxXp = maxXp;

  // Calculate total amount spent per category
  const categoriesTotal = calculateCategoryTotals(expenses);

  // Process each budget category and update XP
  for (const budget of budgets) {
    for (const [category, total] of Object.entries(categoriesTotal)) {
      if (budget.category === category) {
        ({ newXp, newLevel, newMaxXp } = processXpChange(
          newXp,
          newLevel,
          newMaxXp,
          total,
          budget.budget
        ));

        // Await database update before moving to the next budget
        await updateProfileDB(userId, {
          maxXp: newMaxXp,
          xp: newXp,
          title: getTitle(newLevel),
          level: newLevel,
        });
      }
    }
  }
};

// Function to calculate total amount spent per category
const calculateCategoryTotals = (expenses: Expenses[]) => {
  return expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);
};

// Function to process XP changes based on budget comparison
const processXpChange = (
  xp: number,
  level: number,
  maxXp: number,
  totalSpent: number,
  budgetLimit: number
) => {
  let newXp = xp;
  let newLevel = level;
  let newMaxXp = maxXp;
  let xpChange = 0;

  if (totalSpent <= budgetLimit) {
    xpChange = (budgetLimit - totalSpent) / 100;
    newXp += xpChange;

    // Level up if XP exceeds max XP
    if (newXp >= newMaxXp) {
      let exceedingXp = newXp - newMaxXp;
      newXp = exceedingXp;
      newLevel++;
      newMaxXp += 500; // Increase max XP per level
    }
  } else {
    xpChange = (totalSpent - budgetLimit) / 100;
    newXp -= xpChange;

    // Level down if XP goes negative
    if (newXp < 0 && newLevel > 1) {
      newMaxXp -= 500;
      newLevel--;
      newXp += newMaxXp;
    }
    newXp = Math.max(newXp, 0); // Prevent XP from going negative
  }

  return { newXp, newLevel, newMaxXp };
};

// Updates the database
export const updateProfileDB = async (userId: string, profileData: ProfileData) => {
  await axios.put(`${BASE_URL}/${userId}/profile`, profileData);
};

// Function to get title based on level
export const getTitle = (level: number): string => {
  const titles = ["Beginner", "Novice", "Apprentice", "Expert", "Master"];
  return titles[Math.min(level - 1, titles.length - 1)]; // Prevents index out of range
};

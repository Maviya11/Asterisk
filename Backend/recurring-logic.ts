import { getTitle, ProfileData, updateProfileDB } from "./profile-logic";

import axios from "axios";
import cron from "node-cron";
import dotenv from "dotenv";

dotenv.config();

export interface Dates {
  date: number;
  day: string;
  month: string;
}

export type RecurringEntry = {
  uid: string;
  amount: number;
  date: Dates;
  description: string;
  recurringInterval: string;
  nextDueDate: string;
};

export interface Expenses {
  uid: string;
  amount: number;
  budget: number;
  category: string;
  date: Dates;
  description: string;
  recurringInterval: string;
  nextDueDate: string;
}

export interface Income {
  uid: string;
  amount: number;
  source: string;
  date: Dates;
  description: string;
  recurringInterval: string;
  nextDueDate: string;
}

export const BASE_URL = process.env.FIREBASE_URL;

const fetchAllUsers = async <T extends RecurringEntry>(category: string) => {
  try {
    const response = await axios.get(`${BASE_URL}.json`);
    const userIds = Object.keys(response.data);
    userIds.forEach((userId) => {
      handleRecurringIncome<T>(userId, category);
    });
  } catch (error) {
    console.error(error);
  }
};

const handleRecurringIncome = async <T extends RecurringEntry>(
  userId: string,
  category: string
) => {
  const entries: T[] = await fetchData(userId, category);
  if (!entries) return;

  let uidArray: string[] = [];
  let now = 0;
  let dueDate = 0;

  let indexForNewEntry = entries.length - 1;

  for (let index = 0; index < entries.length; index++) {
    const entry = entries[index];
    if (!entry) continue; // Skip if entry is null
    if (entry.recurringInterval === "") continue;

    const todaysDate = new Date();
    const recurDate = new Date(entry.nextDueDate);

    switch (entry.recurringInterval) {
      case "Daily":
      case "Weekly":
        now = todaysDate.getDate();
        dueDate = recurDate.getDate();
        indexForNewEntry++;
        break;
      case "Monthly":
        now = todaysDate.getMonth() + 1;
        dueDate = recurDate.getMonth() + 1;
        indexForNewEntry++;
        break;
    }

    if (now >= dueDate) {
      if (uidArray.includes(entry.uid)) return;

      uidArray.push(entry.uid);

      const updatedNextDueDate = getNextDueDate(
        entry.nextDueDate,
        entry.recurringInterval
      );

      await updateEntry<T>(
        userId,
        index,
        {
          ...entry,
          nextDueDate: updatedNextDueDate,
        },
        category
      );

      const formattedDate = getFormattedDate();

      await addNewEntry<T>(
        userId,
        indexForNewEntry,
        {
          ...entry,
          date: {
            date: formattedDate.date,
            day: formattedDate.day,
            month: formattedDate.month,
          },
          nextDueDate: updatedNextDueDate,
        },
        category
      );
    }
  }
};

const fetchData = async (userId: string, category: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}/${category}.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    return null;
  }
};

const updateEntry = async <T extends RecurringEntry>(
  userId: string,
  index: number,
  data: T,
  category: string
) => {
  try {
    await axios.patch(`${BASE_URL}/${userId}/${category}/${index}.json`, data);
  } catch (error) {
    console.error("Error updating entry:", error);
  }
};

const addNewEntry = async <T extends RecurringEntry>(
  userId: string,
  index: number,
  data: T,
  category: string
) => {
  try {
    await axios.put(`${BASE_URL}/${userId}/${category}/${index}.json`, data);

    // Update profile only for recurring income
    if (category === "income") {
      const profile = await fetchData(userId, "profile");
      await updateProfileOnAddIncome(userId, profile, data.amount);
    }
  } catch (error) {
    console.error("Error adding new entry:", error);
  }
};

const handleExceedingDate = (addedDate: string, month: string) => {
  let exceedingDate = 0;
  for (let i = 0; i < parseInt(addedDate); i++) {
    if (i > 29) {
      exceedingDate++;
    }
  }
  let updatedDate = exceedingDate.toString();
  let updatedMonth = "";
  switch (month) {
    case "01":
      updatedMonth = "02";
      break;
    case "02":
      updatedMonth = "03";
      break;
    case "03":
      updatedMonth = "04";
      break;
    case "04":
      updatedMonth = "05";
      break;
    case "05":
      updatedMonth = "06";
      break;
    case "06":
      updatedMonth = "07";
      break;
    case "07":
      updatedMonth = "08";
      break;
    case "08":
      updatedMonth = "09";
      break;
    case "09":
      updatedMonth = "10";
      break;
    case "10":
      updatedMonth = "11";
      break;
    case "11":
      updatedMonth = "12";
      break;
    case "12":
      updatedMonth = "01"; // Reset to January
      break;
    default:
      console.log("Invalid month");
  }

  return { updatedDate, updatedMonth };
};

const getNextDueDate = (currentDate: string, interval: string) => {
  let [, month, date] = currentDate.split("-");

  switch (interval) {
    case "Daily":
      date = (parseInt(date) + 1).toString();
      // Change date and month if exceeds above 30
      if (parseInt(date) > 30) {
        const { updatedDate, updatedMonth } = handleExceedingDate(date, month);
        date = updatedDate;
        month = updatedMonth;
      }
      return `2025-${month}-${date.padStart(2, "0")}`;
    case "Weekly":
      date = (parseInt(date) + 7).toString();
      // Change date and month if exceeds above 30
      if (parseInt(date) > 30) {
        const { updatedDate, updatedMonth } = handleExceedingDate(date, month);
        date = updatedDate;
        month = updatedMonth;
      }
      return `2025-${month}-${date.padStart(2, "0")}`;
    case "Monthly":
      month = (parseInt(month) + 1).toString().padStart(2, "0");
      return `2025-${month}-${date}`;
    default:
      return currentDate;
  }
};

const getFormattedDate = (inputDate = new Date()) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = inputDate.getDate();
  const day = days[inputDate.getDay()];
  const month = months[inputDate.getMonth()];

  return { date, day, month };
};

cron.schedule("0 0 * * *", async () => {
  console.log("Running recurring handler...");
  await fetchAllUsers<Expenses>("expenses");
  await fetchAllUsers<Income>("income");
});

// UPdates the profile data in DB when recurring income is added
const updateProfileOnAddIncome = async (
  userId: string,
  profileData: ProfileData,
  amount: number
) => {
  let { maxXp, xp, level } = profileData;
  let newXp = xp;
  let newLevel = level;
  let newMaxXp = maxXp;
  let xpChange = amount / 20;

  newXp += xpChange;
  if (newXp >= newMaxXp) {
    let exceedingXp = 0;
    // Calculate how much the xp is exceeding above the maxXp to transfer it to the next level
    for (let i = newMaxXp; i < newXp; i++) {
      exceedingXp++;
    }
    newXp = exceedingXp;
    newLevel++;
    newMaxXp += 500; // Increase max XP per level
  }

  await updateProfileDB(userId, {
    maxXp: newMaxXp,
    xp: newXp,
    title: getTitle(newLevel),
    level: newLevel,
  });
};

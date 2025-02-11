import create, { getUidFromCookie } from "./http-service";

export interface ProfileData {
  maxXp: number;
  xp: number;
  title: string;
  level: number;
}

// Function to get title based on level
export const getTitle = (level: number): string => {
  const titles = ["Beginner", "Novice", "Apprentice", "Expert", "Master"];
  return titles[Math.min(level - 1, titles.length - 1)]; // Prevents index out of range
};

export const updateProfileData = (
  profileData: ProfileData,
  action: "plus" | "minus",
  from: string,
  amount?: number
): ProfileData => {
  let { maxXp, xp, level } = profileData;
  let newXp = xp;
  let newLevel = level;
  let newMaxXp = maxXp;
  let xpChange = 0;

  switch (from) {
    case "Habit":
      xpChange = level * 10; // XP increases based on level
      break;
    case "Income":
      if (amount) xpChange = amount / 20;
  }

  if (action === "plus") {
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
  } else if (action === "minus") {
    newXp -= xpChange;
    if (newXp < 0 && newLevel > 1) {
      newMaxXp -= 500;
      newLevel--;
      newXp += newMaxXp;
    }
    newXp = Math.max(newXp, 0); // Prevent XP from going negative
  }

  return {
    maxXp: newMaxXp,
    xp: newXp,
    title: getTitle(newLevel),
    level: newLevel,
  };
};

export const profileService = () => {
  const uid = getUidFromCookie();
  return create(`/Users/${uid}/profile`, ".json");
};

import { createContext, useEffect, useState } from "react";
import axios, { CanceledError } from "axios";
import {
  ProfileData,
  profileService,
  updateProfileData,
} from "@/services/profile-service";
import { getUidFromCookie } from "@/services/http-service";
import { eventBus } from "@/services/event-service";
import Avataar from "./Avataar";
import XPBar from "./XPBar";

const baseUrl = import.meta.env.VITE_FIREBASE_BASE_URL;

export const profileDataContext = createContext<ProfileData | undefined>(
  undefined
);

const Profile = () => {
  const ProfileService = profileService();

  const [profileData, setProfileData] = useState<ProfileData>({
    maxXp: 0,
    xp: 0,
    title: "",
    level: 0,
  });
  const [, setError] = useState();
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    const uid = getUidFromCookie();
    setIsLoading(true);
    axios
      .get(`${baseUrl}/Users/${uid}/profile.json`)
      .then((res) => {
        setProfileData(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    eventBus.on("updateProfile", ({ action, from, amount }) =>
      updateProfile(action, from, amount)
    );

    // Clean up the eventListener
    return () => eventBus.off("updateProfile");
  }, [profileData]);

  const updateProfile = (action: unknown, from: string, amount?: number) => {
    const previousProfileData = profileData;

    if (action === "minus") {
      const updatedProfileData = updateProfileData(profileData, "minus", from);
      setProfileData(updatedProfileData);
      ProfileService.updateProfile(updatedProfileData).catch(() => {
        setProfileData(previousProfileData);
      });
    } else {
      const updatedProfileData = updateProfileData(
        profileData,
        "plus",
        from,
        amount
      );
      setProfileData(updatedProfileData);
      ProfileService.updateProfile(updatedProfileData).catch(() => {
        setProfileData(previousProfileData);
      });
    }
  };

  return (
    <profileDataContext.Provider value={profileData}>
      <div className="h-36 dark:bg-[#1e1e22] shadow-xl xl:absolute lg:ml-[8vw] xl:w-[calc(94vw-586px)] xl:ml-[6vw] px-2 py-3 min-[400px]:flex min-[400px]:items-center min-[400px]:gap-2 ">
        <Avataar />
        <XPBar profileData={profileData} />
      </div>
    </profileDataContext.Provider>
  );
};

export default Profile;

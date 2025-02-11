import { useEffect, useState } from "react";
import Title from "./Title";
import { ProfileData } from "@/services/profile-service";

interface Props {
  profileData: ProfileData;
}

const XPBar = ({ profileData }: Props) => {
  const [xpBarWidth, setXpBarWidth] = useState(0);

  useEffect(() => {
    const width = (profileData.xp / profileData.maxXp) * 100;
    setXpBarWidth(width);
  }, [profileData]);

  return (
    <div className="flex-grow md:ml-3">
      <div className="hidden min-[400px]:block">
        <Title />
      </div>
      <div className="flex-grow">
        <div className="px-2 my-1 ml-auto text-gray-500 flex justify-between">
          <span>XP</span>
          <span>
            {profileData.xp}/{profileData.maxXp}
          </span>
        </div>
        <div className="w-full rounded-full h-4 bg-slate-300 dark:bg-gray-600">
          <div
            style={{ width: `${xpBarWidth}%` }}
            className="h-full rounded-full bg-blue-500 transition-all duration-1000"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default XPBar;

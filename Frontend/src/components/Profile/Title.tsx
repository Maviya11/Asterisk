import { useContext } from "react";
import { profileDataContext } from "./Profile";

const Title = () => {
  const profileData = useContext(profileDataContext);

  return (
    <div className="text-gray-400 text-lg mt-3 min-[400px]:mt-0 ">
      Title: {profileData?.title} <br />
      Level: {profileData?.level}
    </div>
  );
};

export default Title;

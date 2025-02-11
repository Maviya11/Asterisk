import profile from "../../assets/profile.webp";
import Title from "./Title";

const Avataar = () => {
  return (
    <div className="flex gap-2">
      <img src={profile} alt="profile" className="w-20 rounded-sm min-[400px]:w-24" />
      <div className="min-[400px]:hidden">
        <Title />
      </div>
    </div>
  );
};

export default Avataar;

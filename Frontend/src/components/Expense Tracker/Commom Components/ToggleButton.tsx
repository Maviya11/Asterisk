import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FiX } from "react-icons/fi";

interface Props {
  onToggle: () => void;
}

const ToggleButton = ({ onToggle }: Props) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    onToggle();
  };

  return (
    <div
      className={`w-14 h-7 flex items-center p-1 rounded-full cursor-pointer transition-colors duration-300 ease-in-out dark:border ${
        isToggled ? "bg-black dark:bg-slate-400 dark:border-transparent" : "bg-gray-300 dark:bg-[#2d2e36] dark:border-gray-700"
      }`}
      onClick={handleToggle}
    >
      <div
        className={`w-6 h-6 bg-white dark:bg-black rounded-full shadow-md transform transition-transform duration-300 ease-in-out flex justify-center items-center ${
          isToggled ? "translate-x-6" : ""
        }`}
      >
        {isToggled ? <FaCheck className="dark:text-white"/> : <FiX size={15} className="dark:text-white"/>}
      </div>
    </div>
  );
};

export default ToggleButton;

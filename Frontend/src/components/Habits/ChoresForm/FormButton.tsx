import { useEffect, useState } from "react";
import { IconType } from "react-icons";

interface Props {
  Sign: IconType;
  setSigns: (isSelected: boolean) => void;
  state: boolean;
}

const FormButton = ({ Sign, setSigns, state }: Props) => {
  const [isSelected, setIsSelected] = useState(state || false);

  // Update 'isSelected' when 'state' prop changes
  useEffect(() => {
    setIsSelected(state);
  }, [state]);

  useEffect(() => {
    setSigns(isSelected);
  }, [isSelected]);

  return (
    <button
      type="button"
      onClick={() => {
        setIsSelected(!isSelected);
      }}
      className={`rounded-full p-2 transition-colors duration-200 ease-in-out   ${
        isSelected
          ? "bg-[#D264B6] dark:bg-purple-900 dark:border border-2 border-transparent"
          : "bg-transparent border-2 dark:border border-[#D264B6] dark:border-white"
      }`}
    >
      <Sign
        size={25}
        className={`transition-colors duration-200 ease-in-out ${
          isSelected ? "text-white" : "text-[#d264b6] dark:text-white"
        }`}
      />
    </button>
  );
};

export default FormButton;

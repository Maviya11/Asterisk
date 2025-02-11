import { FiPlus } from "react-icons/fi";
import useIncrement from "../../../hooks/useIncrement";

interface Props {
  onPlus: () => void;
  bgColor: string;
  color: string;
  disable: boolean;
}

const Plus = ({ onPlus, bgColor, color, disable }: Props) => {
  const { isDisabled, setIsDisabled } = useIncrement();

  return (
    <button
      disabled={isDisabled || disable}
      onClick={() => {
        onPlus();
        setIsDisabled(true);
        setTimeout(setIsDisabled, 500, false);
      }}
      className={`flex items-center px-2 ${
        disable
          ? "bg-zinc-400 dark:bg-[#3b3c44] cursor-default"
          : `${bgColor} cursor-pointer`
      }`}
    >
      <div
        className={`flex items-center justify-center p-1 ${
          disable ? "bg-zinc-400 dark:bg-[#3b3c44]" : color
        } rounded-full`}
      >
        <FiPlus color="white" />
      </div>
    </button>
  );
};

export default Plus;

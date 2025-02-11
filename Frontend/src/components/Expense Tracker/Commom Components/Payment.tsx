import { useState } from "react";
import { BsCashStack } from "react-icons/bs";
import { FaChevronDown, FaRegCreditCard } from "react-icons/fa";
import { TbTransactionRupee } from "react-icons/tb";
import useDropdown from "../../../hooks/useDropdown";

interface Props {
  onClick: (payment: string) => void;
}

const Payment = ({ onClick }: Props) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<JSX.Element | undefined>();
  const { isOpen, setIsOpen } = useDropdown();

  const options = [
    { value: "", label: "Select" },
    { value: "Cash", label: "Cash", icon: <BsCashStack /> },
    { value: "Credit Card", label: "Credit Card", icon: <FaRegCreditCard /> },
    {
      value: "Online Transaction",
      label: "Online Transaction",
      icon: <TbTransactionRupee />,
    },
  ];

  const handleOptionClick = (value: string, icon?: JSX.Element) => {
    onClick(value);
    setSelectedOption(value);
    if (icon) {
      setSelectedIcon(icon);
    } else {
      setSelectedIcon(undefined);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative mt-3 mx-auto">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 rounded-md border cursor-pointer font-roboto bg-white flex justify-between items-center"
      >
        <div className="flex gap-2 items-center">
          {selectedIcon}
          {selectedOption || "Select"}
        </div>
        <FaChevronDown />
      </div>

      {isOpen && (
        <ul className="absolute z-10 bg-white border rounded-md w-full mt-1">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                handleOptionClick(option.value, option.icon);
              }}
              className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
            >
              {option.icon && <span className="mr-2">{option.icon}</span>}
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Payment;

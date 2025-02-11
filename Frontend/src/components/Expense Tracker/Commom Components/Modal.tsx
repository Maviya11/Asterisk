import { useEffect, useState } from "react";
import "../../Habits/Chores/Chores.css";
import { IoDiamond, IoShirtSharp } from "react-icons/io5";
import {
  MdFamilyRestroom,
  MdMobileFriendly,
  MdOutlinePets,
  MdDining,
  MdLunchDining,
  MdSubscriptions,
} from "react-icons/md";
import { GiLargeDress } from "react-icons/gi";
import { AiFillHome, AiFillSafetyCertificate } from "react-icons/ai";
import { PiAmbulanceFill } from "react-icons/pi";
import {
  FaGift,
  FaBook,
  FaHandsHelping,
  FaTools,
  FaPlaneDeparture,
} from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { Categories, useCategory } from "../../../hooks/useCategory";

const icons = [
  IoDiamond,
  MdFamilyRestroom,
  GiLargeDress,
  AiFillSafetyCertificate,
  AiFillHome,
  IoShirtSharp,
  PiAmbulanceFill,
  FaGift,
  FaBook,
  FaHandsHelping,
  MdMobileFriendly,
  MdOutlinePets,
  FaTools,
  MdDining,
  MdLunchDining,
  MdSubscriptions,
  CgGym,
  FaPlaneDeparture,
];

interface Props {
  onClose: () => void;
  position: number;
  handleNewCategory: (newCategory: Categories) => void;
}

const Modal = ({ onClose, position, handleNewCategory }: Props) => {
  const [scale, setScale] = useState(false);
  const { newCategory, setNewCategory } = useCategory();
  const [error, setError] = useState("");

  useEffect(() => {
    setScale(true);

    return () => setScale(false);
  }, []);

  const handleError = () => {
    if (!newCategory.category && !newCategory.icon) {
      setError("Both");
      return;
    }
    if (!newCategory.category) {
      setError("Category");
      return;
    }
    if (!newCategory.icon) {
      setError("Icon");
      return;
    }

    handleSubmit();
  };

  const handleSubmit = () => {
    handleNewCategory(newCategory);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute left-0 z-40 flex items-center justify-center bg-[rgba(0,0,0,0.5)] h-screen w-full`}
        style={{ top: `${position}px` }}
      ></div>

      {/* Modal */}
      <div
        style={{ marginTop: `${position}px` }}
        className={`absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          bg-white rounded-lg shadow-lg p-5 w-3/4 max-w-lg transition-all duration-150 ease-out dark:bg-[#1e1e22] ${
            scale && "scale-105"
          }`}
      >
        <div className="flex flex-col gap-2 w-[95%] mx-auto">
          <div className="flex items-center justify-between">
            <label htmlFor="category" className="labels p-0">
              Category
            </label>
            <div>
              <button
                onClick={onClose}
                className="bg-transparent mr-2 px-4 py-1 rounded-full dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleError();
                }}
                className="bg-white transition-colors duration-300 hover:bg-black hover:text-white px-4 py-1 text rounded-2xl dark:bg-transparent dark:hover:bg-white dark:text-white dark:hover:text-black"
              >
                Add
              </button>
            </div>
          </div>
          {(error === "Both" || error === "Category") && (
            <p className="text-red-600 text-sm">Category cannot be empty*</p>
          )}
          <input
            onChange={(e) =>
              setNewCategory({ ...newCategory, category: e.target.value })
            }
            type="text"
            placeholder="Type here..."
            id="category"
            className="focus:outline-blue-200 py-1 px-3 text-lg rounded bg-gray-200"
          />
        </div>
        <div className="mt-7 w-[95%] mx-auto">
          <span className="labels px-2">Icon</span>
          {(error === "Both" || error === "Icon") && (
            <p className="text-red-600 text-sm px-2">
              Must select an icon for category*
            </p>
          )}
          <div className="mt-2 px-2 place-items-center grid grid-cols-3 min-[550px]:grid-cols-4 gap-3 max-h-64 min-[400px]:max-h-80 overflow-y-scroll my-scroll-bar">
            {icons.map((Icon, index) => (
              <div
                onClick={() => setNewCategory({ ...newCategory, icon: Icon })}
                key={index}
                className={`flex items-center justify-center p-3 w-full min-[400px]:p-4 rounded-lg border-2 ${
                  newCategory?.icon === Icon
                    ? "border-black dark:border-gray-200"
                    : "dark:border-gray-600"
                }  cursor-pointer`}
              >
                <Icon
                  size={22}
                  className={
                    newCategory?.icon === Icon
                      ? "text-black dark:text-gray-200"
                      : "text-gray-500"
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import useDropdown from "../../../hooks/useDropdown";
import { BsCalendar3 } from "react-icons/bs";

interface Props {
  onSelect: (date: string, day: string, month: string) => void;
}

const Calendar = ({ onSelect }: Props) => {
  const { isOpen, setIsOpen } = useDropdown();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateClick = (day: Date) => {
    const date = format(day, "dd");
    const dayOfWeek = format(day, "EEEE");
    const month = format(day, "MMMM");
    setSelectedDate(day);
    setIsOpen(false);
    onSelect(date, dayOfWeek, month);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 rounded"
        >
          <FaChevronLeft size={15} />
        </button>
        <h2 className="font-roboto">{format(currentMonth, "MMMM")}</h2>
        <button
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2  rounded"
        >
          <FaChevronRight size={15} />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    return (
      <div className="grid grid-cols-7 mb-2">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className="text-center font-thin text-gray-500 dark:text-white"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const currentDay = day;
        const isInCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = isSameDay(day, selectedDate);

        days.push(
          <div
            key={i}
            className={`p-2 text-center font-roboto cursor-pointer border dark:border-gray-600 transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black ${
              isInCurrentMonth ? "" : "text-gray-400"
            } ${
              isSelected
                ? "bg-black text-white rounded dark:bg-purple-900 dark:text-white"
                : ""
            }`}
            onClick={() => handleDateClick(currentDay)}
          >
            {format(currentDay, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div className="grid grid-cols-7">{days}</div>);
      days = [];
    }

    return (
      <div className="bg-gray-50 rounded-2xl border dark:border-gray-600 overflow-hidden dark:bg-[#1e1e22]">
        {rows}
      </div>
    );
  };

  return (
    <div className="relative">
      <BsCalendar3
        size={25}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer dark:text-white"
      />
      {isOpen && (
        <div className="absolute right-0 top-10 z-10 w-[300px] p-4 rounded-lg min-[400px]:w-[400px] bg-white drop-shadow-lg dark:bg-[#1e1e22] dark:text-white dark: dark:shadow-[0_4px_6px_rgba(255,255,255,0.2),0_2px_4px_rgba(0,0,0,0.06)]">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
      )}
    </div>
  );
};

export default Calendar;

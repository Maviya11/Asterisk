interface Props {
  onClick: (interval: string) => void;
  selectedInterval: string;
}

const RecurringExpense = ({ onClick, selectedInterval }: Props) => {
  return (
    <div className="input-containers mt-7 border-b-black flex-grow w-[95%] max-w-3xl mx-auto">
      <label htmlFor="category" className="labels">
        Select Intervals
      </label>
      <div className="w-full mx-auto mt-6 grid grid-cols-2 min-[400px]:grid-cols-3 place-items-center gap-4">
        <div
          onClick={() => onClick("Daily")}
          className={`text-center w-full p-3 rounded-lg transition-colors duration-300 cursor-pointer ${
            selectedInterval === "Daily"
              ? "bg-black text-white border border-transparent dark:bg-slate-400"
              : "bg-white border-2 dark:bg-[#21222b] dark:shadow-md dark:border dark:border-gray-700 dark:text-gray-300"
          }`}
        >
          <p>Daily</p>
        </div>
        <div
          onClick={() => onClick("Weekly")}
          className={`text-center w-full p-3 rounded-lg transition-colors duration-300 cursor-pointer ${
            selectedInterval === "Weekly"
              ? "bg-black text-white border border-transparent dark:bg-slate-400"
              : "bg-white border-2 dark:bg-[#21222b] dark:shadow-md dark:border dark:border-gray-700 dark:text-gray-300"
          }`}
        >
          <p>Weekly</p>
        </div>
        <div
          onClick={() => onClick("Monthly")}
          className={`text-center w-full p-3 rounded-lg transition-colors duration-300 cursor-pointer ${
            selectedInterval === "Monthly"
              ? "bg-black text-white border border-transparent dark:bg-slate-400"
              : "bg-white border-2 dark:bg-[#21222b] dark:shadow-md dark:border dark:border-gray-700 dark:text-gray-300"
          }`}
        >
          <p>Monthly</p>
        </div>
      </div>
    </div>
  );
};

export default RecurringExpense;

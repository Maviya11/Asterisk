import { RiDeleteBin6Line } from "react-icons/ri";
import { Incomes } from "@/services/income-service";
import Star from "./Star";

interface Props {
  income: Incomes;
  onclick: () => void;
}

const ListComponent = ({ income, onclick }: Props) => {
  return (
    <div className="bg-slate-50 dark:bg-[#21222b] dark:border dark:border-gray-800 rounded-lg shadow-md pb-3 transition-shadow duration-300 hover:shadow-none">
      <div className="px-4">
        <div className="bg-slate-800 dark:bg-zinc-600 h-[10px] w-[80%] mx-auto rounded-b-2xl"></div>
        <div className="mt-3 flex text-xl font-medium justify-between items-center">
          <h2 className="dark:text-white">{income.source}</h2>
          <h2 className="text-emerald-500">&#8377; {income.amount}</h2>
        </div>
        <hr className="my-3 border" />
      </div>
      <div className="flex items-center mt-3">
        {income.recurringInterval && (
          <div
            className={`${
              income.recurringInterval === "Weekly"
                ? "bg-sky-500 dark:bg-sky-800"
                : income.recurringInterval === "Daily"
                ? "bg-orange-400 dark:bg-amber-600"
                : income.recurringInterval === "Monthly"
                ? "bg-emerald-400 dark:bg-emerald-500"
                : ""
            } w-max px-3 py-[0.125rem] text-white text-sm rounded-r-full`}
          >
            Recurring {income.recurringInterval}
          </div>
        )}

        <div className="ml-auto mr-4 flex items-center gap-3 text-xl">
          <RiDeleteBin6Line
            className="cursor-pointer dark:text-white"
            onClick={onclick}
          />
          <Star />
        </div>
      </div>
    </div>
  );
};

export default ListComponent;

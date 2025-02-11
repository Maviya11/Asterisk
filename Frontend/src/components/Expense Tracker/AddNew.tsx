import IncomeForm from "./Incomes/IncomeForm";
import "../Habits/Chores/Chores.css";
import { createContext, useState } from "react";
import AddExpense from "./Expenses/AddExpense";

interface Props {
  isVisible: boolean;
  render: string;
  page?: string;
}

export const setIsScrollableContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

const AddNew = ({ isVisible, render, page }: Props) => {
  const [isScrollable, setIsScrollable] = useState(false);

  return (
    <setIsScrollableContext.Provider value={setIsScrollable}>
      <div
        className={`fixed max-[1024px]:left-0 w-screen h-[calc(100vh-64px)] bg-[#f3f3f3] dark:bg-[#1e1e22] z-20  ${
          isScrollable ? "overflow-hidden" : "overflow-scroll"
        } scroll-bar ${isVisible ? "top-16" : "top-full"} transition-[top]
        lg:w-[calc(100vw-8vw)] lg:right-0
        xl:sticky xl:top-16 xl:w-[586px] xl:border-l-2 dark:xl:border-l-slate-800 xl:h-[calc(100vh-64px)]
      `}
      >
        {render === "Expenses" ? <AddExpense page={page} /> : <IncomeForm />}
      </div>
    </setIsScrollableContext.Provider>
  );
};

export default AddNew;

import { useContext, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { formContext } from "./ExpenseOverview";
import { listPageFormContext } from "../DetailsPage";
import ExpenseForm from "./ExpenseForm";
import BudgetForm from "./BudgetForm";

interface Props {
  page?: string;
}

const AddExpense = ({ page }: Props) => {
  const [form, setForm] = useState("expense");
  const setIsVisible1 = useContext(formContext);
  const setIsVisible2 = useContext(listPageFormContext);

  return (
    <>
      <header className="dark:bg-purple-900 dark:text-white bg-white border-b border-b-gray-700 max-w-7xl text-[1.125rem] flex justify-between items-center py-3 ">
        <div className="flex items-center gap-3 w-[95%] mx-auto">
          <IoArrowBack
            onClick={() => {
              if (page === "overviewPage") {
                if (setIsVisible1) setIsVisible1(false);
              } else {
                if (setIsVisible2) setIsVisible2(false);
              }
            }}
            size={25}
            color=""
            className="box-content p-1 rounded-full text-black dark:text-white"
          />
          <h2
            onClick={() => setForm("expense")}
            className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
              form === "expense"
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            } `}
          >
            Add Expense
          </h2>
          <h2
            onClick={() => setForm("budget")}
            className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
              form === "budget"
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            } `}
          >
            Set budget
          </h2>
        </div>
      </header>
      {form === "expense" ? (
        <ExpenseForm
          page={page}
          onAddExpense={() => {
            if (setIsVisible1) setIsVisible1(false);
            if (setIsVisible2) setIsVisible2(false);
          }}
        />
      ) : (
        <BudgetForm />
      )}
    </>
  );
};

export default AddExpense;

import { useContext, useState } from "react";
import { Budget, budgetService } from "@/services/budget-service";
import { toast } from "react-toastify";
import { budgetDataContext, setbudgetDataContext } from "./ExpenseOverview";

const BudgetForm = () => {
  const BudgetService = budgetService();
  const setBudgetdata = useContext(setbudgetDataContext);
  const budgetData = useContext(budgetDataContext);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [budget, setBudget] = useState<Budget>({ budget: 0, category: "" });

  const handleSubmit = (newBudget: Budget) => {
    BudgetService.add(selectedCategory, newBudget)
      .then(() => {
        if (setBudgetdata) {
          setBudgetdata(
            budgetData?.map((item) => {
              if (item.category === newBudget.category) {
                return { ...item, budget: newBudget.budget };
              }
              return item;
            })
          );
        }

        toast.success("Budget added successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
      })
      .catch(() => {
        toast.error("No Internet Connection", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
      });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(budget);
      }}
    >
      <div className="w-[95%] mx-auto max-w-3xl">
        <h2 className="labels mr-0 pl-0 mt-5">Budget</h2>
        <div className="w-[98%] mx-auto">
          <input
            onChange={(e) => {
              setBudget({ ...budget, budget: parseInt(e.target.value) });
            }}
            type="number"
            placeholder="Eg: &#8377; 10000"
            className="px-4 py-4 mt-5 w-full text-3xl rounded-md shadow focus:outline-none font-roboto bg-white"
          />
        </div>
        <h2 className="labels mr-0 pl-0 mt-5">Select Category</h2>
        <div className="w-full mx-auto mt-6 grid grid-cols-2 min-[461px]:grid-cols-3 min-[650px]:grid-cols-4 min-[850px]:grid-cols-5 xl:grid-cols-4  gap-4">
          {budgetData?.map((item, index) => {
            if (!item) return null; // Skip rendering if the item is null

            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedCategory(index);
                  setBudget({ ...budget, category: item.category });
                }}
                className={`bg-white px-2 flex flex-col gap-2 items-center justify-center rounded-lg py-3 w-full cursor-pointer dark:bg-[#21222b] ${
                  selectedCategory === index
                    ? "text-black border-2 border-black dark:text-gray-300 dark:border-gray-300"
                    : "border-2 text-gray-500 dark:border-gray-600"
                }`}
              >
                <p>{item.category}</p>
              </div>
            );
          })}
        </div>
        <button className="bg-black text-white w-1/2 text-lg rounded-full mx-auto max-w-md block py-2 px-5 mt-5 hover:bg-black/80">
          Set Budget
        </button>
      </div>
    </form>
  );
};

export default BudgetForm;

import { useContext } from "react";
import { Link } from "react-router-dom";
import { budgetDataContext, listDataContext } from "./ExpenseOverview";
import { MdLocalGroceryStore } from "react-icons/md";

const ListComponent = () => {
  const expenses = useContext(listDataContext);
  const budgetdata = useContext(budgetDataContext);

  return (
    <>
      {expenses &&
        expenses.map((item, index) => {
          const matchedBudget =
            budgetdata?.find(
              (budgetItem) => budgetItem?.category === item.category
            )?.budget ?? 0;

          return (
            <Link to={`/expenses/${item.category}`} key={index}>
              <li className="w-full bg-gray-200 dark:bg-[#21222b] p-2 rounded-2xl flex items-center cursor-pointer min-h-[78px] max-w-xl mx-auto dark:shadow-md">
                <div className="p-3 rounded-lg bg-purple-900">
                  <MdLocalGroceryStore size={25} color="white" />
                </div>

                <p className="ml-[6px] text-lg font-medium dark:text-gray-300">
                  {item.category}
                </p>
                <div className="flex flex-col ml-auto items-end">
                  <span className="text-[20px] dark:text-gray-300">
                    &#8377; {item.total}
                  </span>
                  {matchedBudget !== 0 && (
                    <span className="mt-2 text-gray-500 dark:text-gray-400">
                      Budget: &#8377; {matchedBudget}
                    </span>
                  )}
                </div>
              </li>
            </Link>
          );
        })}
    </>
  );
};

export default ListComponent;

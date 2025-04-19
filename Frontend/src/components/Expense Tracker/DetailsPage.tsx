import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PiDotsNineBold } from "react-icons/pi";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdLocalGroceryStore } from "react-icons/md";
import { useData } from "@/hooks/useData";
import { Budget, budgetService } from "@/services/budget-service";
import {
  Expenses,
  expensesService,
  placeholderExpense,
} from "@/services/expenses-service";
import { groupAndSortByDate } from "./Incomes/IncomeOverview";
import AddButton from "../Navigations/AddButton";
import Total from "./Total";
import SidebarSpace from "../Navigations/SidebarSpace";
import AddNew from "./AddNew";

interface IndexedArray extends Expenses {
  index: number;
}

export const listPageFormContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);
export const listPageDataContext = createContext<Expenses[] | undefined>(
  undefined
);
export const listPageSetDataContext = createContext<React.Dispatch<
  React.SetStateAction<Expenses[] | undefined>
> | null>(null);

const DetailsPage = () => {
  const { category } = useParams();
  const { data, setData } = useData<Expenses>(expensesService);
  const budget = useData<Budget>(budgetService);
  const [categoryData, setCategoryData] = useState<IndexedArray[]>([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [isVisible, setIsVisble] = useState(false);

  const ExpenseService = expensesService();
  const BudgetService = budgetService();

  useEffect(() => {
    if (data) {
      const filteredData = data
        .map((item, index) => ({ ...item, index: index }))
        .filter((item) => item.category === category);
      setCategoryData(filteredData);

      const total = filteredData.reduce((acc, curr) => acc + curr.amount, 0);
      setTotalExpense(total);
    }
  }, [data]);

  const sortedList = groupAndSortByDate(categoryData);

  const removeBudgetNode = (deleteData: IndexedArray) => {
    if (categoryData.length === 1) {
      const { data } = budget;
      const deleteBudgetIndex = data?.findIndex(
        (item) => item.category === deleteData.category
      );
      BudgetService.delete(deleteBudgetIndex);
    }
  };

  const handleDelete = (
    deleteData: IndexedArray,
    previousData: Expenses[] | undefined
  ) => {
    setData(
      data?.map((item, index) =>
        index === deleteData.index ? placeholderExpense : item
      )
    );
    ExpenseService.delete(deleteData.index)
      .then(() => {
        toast.success("Deleted successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
        removeBudgetNode(deleteData);
      })
      // Reset to old data in case of failure
      .catch(() => {
        toast.error("No Internet Connection", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
        setData(previousData);
      });
  };

  return (
    <>
      <div className="flex">
        <SidebarSpace />
        <div className="min-h-[calc(100vh-56px-126px)] min-[400px]:min-h-[calc(100vh-64px-144px)] xl:pt-[170px] bg-[#f3f3f3] flex-grow pt-5 dark:bg-[#1e1e22]">
          <div className="flex items-end mb-5 px-6">
            <PiDotsNineBold size={30} className="dark:text-white" />
            <span className="text-[1.4rem] font-medium ml-2 dark:text-white">
              {category}
            </span>
          </div>
          <Total render="Expenses" totalexpense={totalExpense} />
          <div className="mx-auto pb-28 max-w-2xl min-[900px]:max-w-none px-6 mt-5">
            <ul>
              {/* List */}
              {sortedList &&
                sortedList.map((item, index) => {
                  const date = item[0].date;
                  return (
                    <ul key={index}>
                      <h2 className="my-5 text-lg font-medium text-slate-600 dark:text-slate-100 max-w-xl mx-auto min-[900px]:mx-0 min-[900px]:mr-auto  xl:mx-auto min-[1450px]:mr-auto min-[1450px]:mx-0">{`${date.day}, ${date.date} ${date.month} 2024`}</h2>
                      <div className="grid grid-col-1 gap-3 min-[900px]:grid-cols-2 xl:grid-cols-1 min-[1450px]:grid-cols-2">
                        {item.map((singleData, index) => {
                          return (
                            <li
                              key={index}
                              className="w-full bg-gray-200 dark:bg-[#21222b] p-2 rounded-2xl flex items-center min-h-[78px] max-w-xl mx-auto dark:shadow-md"
                            >
                              <div className="p-3 rounded-lg bg-purple-900">
                                <MdLocalGroceryStore size={25} color="white" />
                              </div>
                              <p className="ml-[6px] text-lg font-medium dark:text-gray-300 flex flex-col">
                                <span>{singleData.description}</span>
                                {singleData.recurringInterval && (
                                  <span className="text-sm font-light">
                                    Recurring {singleData.recurringInterval}
                                  </span>
                                )}
                              </p>
                              <div className="flex flex-col ml-auto items-end">
                                <span className="text-[20px] dark:text-gray-300">
                                  &#8377; {singleData.amount}
                                </span>
                              </div>
                              <FaRegTrashCan
                                className="cursor-pointer text-lg transition-colors ml-3 mr-1 hover:text-red-600 dark:text-white"
                                onClick={() => {
                                  handleDelete(singleData, data);
                                }}
                              />
                            </li>
                          );
                        })}
                      </div>
                    </ul>
                  );
                })}
            </ul>
          </div>
          <AddButton onClick={() => setIsVisble(true)} />
        </div>
        <listPageFormContext.Provider value={setIsVisble}>
          <listPageDataContext.Provider value={data}>
            <listPageSetDataContext.Provider value={setData}>
              <AddNew isVisible={isVisible} render="Expenses" page="listPage" />
            </listPageSetDataContext.Provider>
          </listPageDataContext.Provider>
        </listPageFormContext.Provider>
      </div>
    </>
  );
};

export default DetailsPage;

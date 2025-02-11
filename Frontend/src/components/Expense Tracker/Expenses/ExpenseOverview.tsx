import { createContext, useEffect, useState } from "react";
import { PiDotsNineBold } from "react-icons/pi";
import { useData } from "@/hooks/useData";
import { Expenses, expensesService } from "@/services/expenses-service";
import { Budget, budgetService } from "@/services/budget-service";
import ExpenseList from "./ExpenseList";
import Total from "../Total";
import SidebarSpace from "@/components/Navigations/SidebarSpace";
import AddNew from "../AddNew";
import AddButton from "@/components/Navigations/AddButton";

export type ExpenseListData = {
  category: string;
  total: number;
  budget: number;
};

export const listDataContext = createContext<ExpenseListData[] | null>(null);
export const listContext = createContext<Expenses[] | undefined>(undefined);
export const budgetDataContext = createContext<Budget[] | undefined>(undefined);
export const setbudgetDataContext = createContext<React.Dispatch<
  React.SetStateAction<Budget[] | undefined>
> | null>(null);
export const formContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);
export const setDataContext = createContext<React.Dispatch<
  React.SetStateAction<Expenses[] | undefined>
> | null>(null);

const ExpenseOverview = () => {
  const { data, setData } = useData<Expenses>(expensesService);
  const budget = useData<Budget>(budgetService);
  const [expenseListData, setExpenseListData] = useState<ExpenseListData[]>([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const budgetData = budget.data;
  const setBudgetData = budget.setData;

  const getExpenseListData = () => {
    if (data) {
      const uniqueDataMap = new Map<string, ExpenseListData>();

      data.forEach((item) => {
        if (item) {
          // Check if the item is not null
          if (!uniqueDataMap.has(item.category)) {
            uniqueDataMap.set(item.category, {
              category: item.category,
              total: item.amount,
              budget: item.budget,
            });
          } else {
            const existingItem = uniqueDataMap.get(item.category)!;
            uniqueDataMap.set(item.category, {
              ...existingItem,
              total: existingItem.total + item.amount,
            });
          }
        }
      });

      setExpenseListData(Array.from(uniqueDataMap.values()));
    }
  };

  const getTotalExpenses = () => {
    if (data) {
      const total = data.reduce((acc, cur) => {
        if (cur) {
          // Check if the current item is not null
          return acc + cur.amount;
        }
        return acc; // If the item is null, skip it and return the accumulator unchanged
      }, 0);
      setTotalExpense(total);
    }
  };

  useEffect(() => {
    getExpenseListData();
    getTotalExpenses();
  }, [data]); // Depend on `data` to re-run when it changes

  return (
    <>
      <listDataContext.Provider value={expenseListData}>
        <formContext.Provider value={setIsVisible}>
          <listContext.Provider value={data}>
            <setDataContext.Provider value={setData}>
              <budgetDataContext.Provider value={budgetData}>
                <setbudgetDataContext.Provider value={setBudgetData}>
                  <div className="lg:flex bg-[#f3f3f3] dark:bg-[#1e1e22]">
                    <SidebarSpace />
                    <div className="max-w-6xl mx-auto flex-grow min-h-[calc(100vh-56px-126px)] min-[400px]:min-h-[calc(100vh-64px-144px)] pt-5 xl:pt-[170px]">
                      <div className="flex items-end mb-5 px-6">
                        <PiDotsNineBold size={30} className="dark:text-white" />
                        <span className="text-[1.4rem] font-medium ml-2 dark:text-white">
                          Expenses
                        </span>
                      </div>
                      <Total render={"Expenses"} totalexpense={totalExpense} />
                      <ExpenseList />
                      <AddButton onClick={() => setIsVisible(true)} />
                    </div>
                    <AddNew
                      isVisible={isVisible}
                      render="Expenses"
                      page="overviewPage"
                    />
                  </div>
                </setbudgetDataContext.Provider>
              </budgetDataContext.Provider>
            </setDataContext.Provider>
          </listContext.Provider>
        </formContext.Provider>
      </listDataContext.Provider>
    </>
  );
};

export default ExpenseOverview;

import { createContext, useEffect, useState } from "react";
import { PiDotsNineBold } from "react-icons/pi";
import { useData } from "@/hooks/useData";
import { Incomes, incomeService } from "@/services/income-service";
import AddButton from "@/components/Navigations/AddButton";
import SidebarSpace from "@/components/Navigations/SidebarSpace";
import AddNew from "../AddNew";
import Total from "../Total";
import IncomeList from "./IncomeList";

const getMonthNumber = (month: string): number => {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months.indexOf(month) + 1;
};

interface HasDate {
  date: {
    date: number; // Day of the month
    month: string; // Month as a string (e.g., "January")
  };
}

interface IndexedData extends Incomes {
  index: number;
}

// Generic function to group and sort data by date
export const groupAndSortByDate = <T extends HasDate>(
  data: (T | null)[]
): T[][] => {
  // Group by date (formatted as a string key 'MM-DD')
  const grouped: Record<string, T[]> = data.reduce((acc, item) => {
    // Skip null or undefined items
    if (!item || !item.date || item.date.date === 0) {
      return acc;
    }

    const { date, month } = item.date;
    const monthNumber = getMonthNumber(month);
    const formattedDate = `${monthNumber}-${date}`;

    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(item);

    return acc;
  }, {} as Record<string, T[]>);

  // Convert grouped object to array of arrays
  const groupedArray: T[][] = Object.values(grouped);

  // Sort the array so that the latest dates come first
  const today = new Date();
  groupedArray.sort((a, b) => {
    if (!a[0]?.date || !b[0]?.date) {
      return 0;
    }

    const dateA = new Date(
      today.getFullYear(),
      getMonthNumber(a[0].date.month) - 1,
      a[0].date.date
    );
    const dateB = new Date(
      today.getFullYear(),
      getMonthNumber(b[0].date.month) - 1,
      b[0].date.date
    );

    return dateB.getTime() - dateA.getTime(); // Reverse the sorting order
  });

  return groupedArray;
};

export const formContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

export const sortedDataContext = createContext<IndexedData[][] | undefined>(
  undefined
);

export const dataContext = createContext<Incomes[] | undefined>(undefined);

export const setDataContext = createContext<React.Dispatch<
  React.SetStateAction<Incomes[] | undefined>
> | null>(null);

const IncomeOverview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data, setData } = useData<Incomes>(incomeService);
  const [indexedData, setIndexedData] = useState<IndexedData[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);

  useEffect(() => {
    if (data) {
      const indexedData = data.map((item, index) => ({
        ...item,
        index: index,
      }));
      setIndexedData(indexedData);
    }
    getTotalIncome();
  }, [data]);

  const getTotalIncome = () => {
    if (data) {
      const total = data.reduce((acc, cur) => {
        if (cur) {
          // Check if the current item is not null
          return acc + cur.amount;
        }
        return acc; // If the item is null, skip it and return the accumulator unchanged
      }, 0);
      setTotalIncome(total);
    }
  };

  const sortedIncome = groupAndSortByDate(indexedData);

  return (
    <>
      <formContext.Provider value={setIsVisible}>
        <sortedDataContext.Provider value={sortedIncome}>
          <dataContext.Provider value={data}>
            <setDataContext.Provider value={setData}>
              <div className="lg:flex bg-[#f3f3f3] dark:bg-[#1e1e22]">
                <SidebarSpace />
                <div className="max-w-6xl mx-auto flex-grow min-h-[calc(100vh-56px-126px)] min-[400px]:min-h-[calc(100vh-64px-144px)] xl:pt-[170px] pt-5">
                  {/*  */}
                  <div className="flex items-end mb-5 px-6">
                    <PiDotsNineBold size={30} className="dark:text-white" />
                    <span className="text-[1.4rem] font-medium ml-2 dark:text-white">
                      Income
                    </span>
                  </div>
                  <Total render={"Income"} totalexpense={totalIncome} />
                  <IncomeList />
                  <AddButton onClick={() => setIsVisible(true)} />
                </div>
                <AddNew isVisible={isVisible} render="Incomes" />
              </div>
            </setDataContext.Provider>
          </dataContext.Provider>
        </sortedDataContext.Provider>
      </formContext.Provider>
    </>
  );
};

export default IncomeOverview;

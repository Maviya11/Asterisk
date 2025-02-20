import { useContext } from "react";
import {
  dataContext,
  setDataContext,
  sortedDataContext,
} from "./IncomeOverview";
import { incomeService, placeholderIncome } from "@/services/income-service";
import ListComponent from "./ListComponent";

const IncomeList = () => {
  const IncomeService = incomeService();
  const sortedIncome = useContext(sortedDataContext);
  const setData = useContext(setDataContext);
  const data = useContext(dataContext);

  const handleDelete = (deleteIndex: number) => {
    if (setData) {
      setData(
        data?.map(
          (item, index) => (index === deleteIndex ? placeholderIncome : item) // Use a dummy income data to maintain the length and indexes of the items
        )
      );
    }
    IncomeService.delete(deleteIndex);
  };

  return (
    <div className="mt-3 pb-32 max-w-2xl w-[90%] mx-auto min-[900px]:max-w-none min-[900px]:w-[95%] xl:max-w-2xl min-[1450px]:max-w-3xl min-[1550px]:max-w-4xl min-[1700px]:max-w-5xl min-[1800px]:max-w-6xl">
      {sortedIncome?.map((itemArray, index) => {
        const dateObject = itemArray[0].date;
        return (
          <div key={index} className="mb-10">
            <h2 className="my-4 text-lg font-medium text-slate-600 dark:text-slate-100">{`${dateObject.day}, ${dateObject.date} ${dateObject.month} 2024`}</h2>
            <ul className="grid grid-cols-1 gap-x-3 gap-y-4 min-[900px]:grid-cols-2 xl:grid-cols-1 min-[1450px]:grid-cols-2">
              {itemArray.map((item, index) => {
                return (
                  <li key={index}>
                    <ListComponent
                      income={item}
                      onclick={() => handleDelete(item.index)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default IncomeList;

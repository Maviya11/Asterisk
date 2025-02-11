import { useContext, useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { DateObj } from "@/services/expenses-service";
import { Incomes, incomeService } from "@/services/income-service";
import { dataContext, formContext, setDataContext } from "./IncomeOverview";
import Amount from "../Commom Components/Amount";
import Calendar from "../Commom Components/Calander";
import ToggleButton from "../Commom Components/ToggleButton";
import useDropdown from "../../../hooks/useDropdown";
import RecurringExpense from "../Commom Components/RecurringExpense";
import { eventBus } from "@/services/event-service";

// Functions used in both IncomeForm and ExpenseForm
export const setRecurringMonth = (month: string) => {
  let monthNumber: string;

  switch (month) {
    case "January":
      monthNumber = "01";
      break;
    case "February":
      monthNumber = "02";
      break;
    case "March":
      monthNumber = "03";
      break;
    case "April":
      monthNumber = "04";
      break;
    case "May":
      monthNumber = "05";
      break;
    case "June":
      monthNumber = "06";
      break;
    case "July":
      monthNumber = "07";
      break;
    case "August":
      monthNumber = "08";
      break;
    case "September":
      monthNumber = "09";
      break;
    case "October":
      monthNumber = "10";
      break;
    case "November":
      monthNumber = "11";
      break;
    case "December":
      monthNumber = "12";
      break;
    default:
      monthNumber = "01";
  }

  return monthNumber;
};

export const handleToggleButton = <T extends { date: DateObj }>(
  setFunction: (value: T) => void,
  setIsOpen: (value: boolean) => void,
  state: T,
  isOpen: boolean
) => {
  if (isOpen) {
    setIsOpen(false);
    setNextDueDate(
      setFunction,
      state,
      "",
      state.date.date,
      state.date.day,
      state.date.month
    );
    return;
  }
  setIsOpen(true);
  setNextDueDate(
    setFunction,
    state,
    "Daily",
    state.date.date,
    state.date.day,
    state.date.month
  );
};

export const handleDate = <T extends { date: DateObj; [key: string]: any }>(
  setFunction: (value: T) => void,
  state: T,
  date: string,
  day: string,
  month: string
) => {
  let dateInt = parseInt(date);
  setNextDueDate<T>(
    setFunction,
    state,
    state.recurringInterval,
    dateInt,
    day,
    month
  );
};

export const handleRecurringExpense = <T extends { date: DateObj }>(
  setFunction: (value: T) => void,
  state: T,
  interval: string
) => {
  setNextDueDate(
    setFunction,
    state,
    interval,
    state.date.date,
    state.date.day,
    state.date.month
  );
};

export const setNextDueDate = <T extends { date: DateObj }>(
  setFunction: (value: T) => void,
  state: T,
  interval: string,
  date: number,
  day: string,
  month: string
) => {
  switch (interval) {
    case "Daily":
      let incrementedDailyDate = (date + 1).toString();
      let incrementedDailyMonth = "";

      // Handle the date if it exceeds the 30 days month
      if (parseInt(incrementedDailyDate) > 30) {
        const { updatedDate, updatedMonth } = handleExceedingDate(
          parseInt(incrementedDailyDate),
          month
        );
        incrementedDailyDate = updatedDate;
        incrementedDailyMonth = updatedMonth;
      }

      setFunction({
        ...state,
        date: {
          date: date,
          day: day,
          month: month,
        },
        recurringInterval: interval,
        nextDueDate: `2025-${setRecurringMonth(
          incrementedDailyMonth
        )}-${incrementedDailyDate}`,
      });
      break;
    case "Weekly":
      let incrementedWeeklyDate = (date + 7).toString();
      let incrementedWeeklyMonth = "";

      // Handle the date if it exceeds the 30 days month
      if (parseInt(incrementedWeeklyDate) > 30) {
        const { updatedDate, updatedMonth } = handleExceedingDate(
          parseInt(incrementedWeeklyDate),
          month
        );
        incrementedWeeklyDate = updatedDate;
        incrementedWeeklyMonth = updatedMonth;
      }

      setFunction({
        ...state,
        date: {
          date: date,
          day: day,
          month: month,
        },
        recurringInterval: interval,
        nextDueDate: `2025-${setRecurringMonth(
          incrementedWeeklyMonth
        )}-${incrementedWeeklyDate}`,
      });
      break;
    case "Monthly":
      const twoDigitDate = date.toString().padStart(2, "0");
      let nextDueMonth = String(Number(setRecurringMonth(month)) + 1).padStart(
        2,
        "0"
      );
      setFunction({
        ...state,
        date: {
          date: date,
          day: day,
          month: month,
        },
        recurringInterval: interval,
        nextDueDate: `2025-${nextDueMonth}-${twoDigitDate}`,
      });
      break;
    default:
      setFunction({
        ...state,
        date: {
          // ...state.date,
          date: date,
          day: day,
          month: month,
        },
        recurringInterval: interval,
        nextDueDate: "",
      });
  }
};

export const handleExceedingDate = (addedDate: number, month: string) => {
  let exceedingDate = 0;
  for (let i = 0; i < addedDate; i++) {
    if (i > 29) {
      exceedingDate++;
    }
  }
  console.log(exceedingDate);
  console.log(month);
  let updatedDate = exceedingDate.toString().padStart(2, "0");
  console.log(updatedDate);
  let updatedMonth = "";
  switch (month) {
    case "January":
      updatedMonth = "February";
      break;
    case "February":
      updatedMonth = "March";
      break;
    case "March":
      updatedMonth = "April";
      break;
    case "April":
      updatedMonth = "May";
      break;
    case "May":
      updatedMonth = "June";
      break;
    case "June":
      updatedMonth = "July";
      break;
    case "July":
      updatedMonth = "August";
      break;
    case "August":
      updatedMonth = "September";
      break;
    case "September":
      updatedMonth = "October";
      break;
    case "October":
      updatedMonth = "November";
      break;
    case "November":
      updatedMonth = "December";
      break;
    case "December":
      updatedMonth = "January";
      break;
    default:
      console.log("Invalid month");
  }
  console.log(updatedMonth);
  return { updatedDate, updatedMonth };
};

const IncomeForm = () => {
  const IncomeService = incomeService();

  const setIsvisible = useContext(formContext);
  const data = useContext(dataContext);
  const setData = useContext(setDataContext);

  const [income, setIncome] = useState<Incomes>({
    uid: "",
    amount: 0,
    date: {
      date: 0,
      day: "",
      month: "",
    },
    source: "",
    recurringInterval: "",
    nextDueDate: "",
  });

  const [error, setError] = useState({
    amount: "",
    source: "",
  });

  const { isOpen, setIsOpen } = useDropdown();

  useEffect(() => {
    const today = new Date();
    const formattedDate = format(today, "dd");
    const day = format(today, "EEEE");
    const month = format(today, "MMMM");

    // Initially sets to todays date
    handleDate<Incomes>(setIncome, income, formattedDate, day, month); // Doesn't works
  }, []);

  useEffect(() => {
    if (!income.source) return; // Does not allow to run on the setIncome to avoid conflict with the other hook
    const uid = `${income.source}-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 11)}`;
    setIncome({ ...income, uid: uid });
  }, [income.source]);

  const handleValidation = () => {
    let isValid = true;
    let errorAmount = "";
    let errorSource = "";

    if (income.amount < 0 || !income.amount) {
      setIncome({ ...income, amount: 0 });
      errorAmount = "Amount should be at least 1*";
      isValid = false;
    }
    if (!income.source) {
      errorSource = "Income source cannot be empty*";
      isValid = false;
    }

    setError({
      amount: errorAmount,
      source: errorSource,
    });

    if (isValid) handleSubmit();
  };

  // Variable to handle throttle
  const isThrottle = useRef(false);

  const handleSubmit = () => {
    if (!isThrottle.current) {
      isThrottle.current = true; // Cancel all req unless one sent is resolved (Throttle)

      IncomeService.add(data?.length || 0, income)
        .then(() => {
          if (setData) setData([...(data || []), income]);
          toast.success("Income added successfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
          });
          if (setIsvisible) setIsvisible(false);

          // Event trigger to update profileData
          eventBus.emit("updateProfile", {
            action: "plus",
            from: "Income",
            amount: income.amount,
          });
        })
        .catch(() => {
          toast.error("Unable to add income", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
          });
        })
        .finally(() => {
          setTimeout(() => (isThrottle.current = false), 1000); // Allow to send req after 1 sec
        });
    }
  };

  return (
    <div className="">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleValidation();
        }}
      >
        <header className="dark:bg-purple-900 dark:text-white bg-white border-b border-b-gray-700">
          <nav className="max-w-7xl text-[1.125rem] flex justify-between items-center w-[95%] py-3 mx-auto">
            <div className="flex items-center gap-3">
              <IoArrowBack
                onClick={() => {
                  if (setIsvisible) setIsvisible(false);
                }}
                size={25}
                color=""
                className="box-content p-1 rounded-full text-black dark:text-white"
              />
              <h2 className="">Add Income</h2>
            </div>
            <div>
              <button className="hover:bg-black hover:text-white transition-colors duration-300 dark:bg-purple-700 py-1 px-3 rounded-full">
                Create
              </button>
            </div>
          </nav>
        </header>

        <div className="bg-white rounded-b-2xl dark:bg-purple-900">
          {/* Amount Input */}
          <Amount
            errorMessage={error.amount}
            onInput={(value) => setIncome({ ...income, amount: value })}
          />
          {/* Date input */}
          <div className="flex justify-between w-[90%] mx-auto pt-3 pb-7 border-b-black max-w-3xl">
            <span className="text-lg font-medium font-roboto dark:text-white">
              {`${income.date?.day}, ${income.date?.date} ${income.date?.month}`}
            </span>
            <Calendar
              onSelect={(date, day, month) => {
                handleDate<Incomes>(setIncome, income, date, day, month);
              }}
            />
          </div>
        </div>

        {/* Source */}
        <div className="input-conatiners mt-7 max-w-3xl mx-auto w-[95%]">
          <div className="flex flex-col">
            <div className="flex  items-baseline gap-3">
              <label htmlFor="source" className="labels mr-0">
                Income Source
              </label>
              {error.source && (
                <p className="text-red-600 text-[0.875rem]">{error.source}</p>
              )}
            </div>
            <input
              type="text"
              onChange={(e) => {
                setIncome({ ...income, source: e.target.value });
              }}
              placeholder="Eg: Rent, Salary..."
              className="focus:outline-gray-400 border border-gray-200 px-3 py-2 rounded-lg mt-3 text-lg font-roboto dark:bg-gray-700 dark:text-white dark:focus:outline-none"
            />
          </div>
        </div>

        {/* Recurring Expense */}
        <div
          className="flex items-center mt-7 max-w-[748px]
             justify-between w-[90%] mx-auto border-2 box-content p-2 border-slate-600 rounded-lg"
        >
          <div className="relative group">
            <label className="labels p-0">Recurring Expense</label>
            <div className="absolute text-wrap hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-max">
              Added automatically on regular intervals.
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-black"></div>
            </div>
          </div>
          <ToggleButton
            onToggle={() =>
              handleToggleButton(setIncome, setIsOpen, income, isOpen)
            }
          />
        </div>

        {/* Recurring Intervals */}
        {isOpen && (
          <RecurringExpense
            selectedInterval={income.recurringInterval}
            onClick={(interval) =>
              handleRecurringExpense(setIncome, income, interval)
            }
          />
        )}
      </form>
    </div>
  );
};

export default IncomeForm;

import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useCategory } from "../../../hooks/useCategory";
import { setIsScrollableContext } from "../AddNew";
import { Expenses, expensesService } from "@/services/expenses-service";
import { listPageDataContext, listPageSetDataContext } from "../DetailsPage";
import { Budget, budgetService } from "@/services/budget-service";
import {
  ExpenseListData,
  listContext,
  setDataContext,
} from "./ExpenseOverview";
import {
  setRecurringMonth,
  setNextDueDate,
  handleDate,
  handleToggleButton,
  handleRecurringExpense,
  handleExceedingDate,
} from "../Incomes/IncomeForm";
import ToggleButton from "../Commom Components/ToggleButton";
import Calendar from "../Commom Components/Calander";
import useDropdown from "../../../hooks/useDropdown";
import Category from "../Commom Components/Category";
import RecurringExpense from "../Commom Components/RecurringExpense";
import Modal from "../Commom Components/Modal";
import Amount from "../Commom Components/Amount";
import Description from "../Commom Components/Description";
import "../../Habits/Chores/Chores.css";

interface Props {
  page?: string;
  onAddExpense: () => void;
}

const ExpenseForm = ({ onAddExpense, page }: Props) => {
  const ExpenseService = expensesService();
  const BudgetService = budgetService();

  const setIsScrollable = useContext(setIsScrollableContext);

  const [budgetListLength, setBudgetListLength] = useState<ExpenseListData[]>(
    []
  );

  // Contexts from ExpenseOverview page
  const dataList = useContext(listContext);
  const setData = useContext(setDataContext);

  // Context from Details page
  const dataList2 = useContext(listPageDataContext);
  const setData2 = useContext(listPageSetDataContext);

  const [expenses, setExpenses] = useState({
    uid: "",
    amount: 0,
    budget: 0,
    date: {
      date: 0,
      day: "",
      month: "",
    },
    category: "Others",
    recurringInterval: "",
    description: "",
    nextDueDate: "",
  });

  const [formErrors, setFormErrors] = useState({
    amount: "",
    description: "",
  });
  const [budget, setBudget] = useState<Budget>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState(0);
  const { newCategory, setNewCategory } = useCategory();
  const { isOpen, setIsOpen } = useDropdown();
  const formRef = useRef<HTMLDivElement>(null);

  // Variable to handle throttle
  const isThrottle = useRef(false);

  useEffect(() => {
    const uid = `${expenses.description}-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 11)}`;
    setExpenses({ ...expenses, uid: uid });
  }, [expenses.description]);

  // Set the budget list length after the data is loaded.
  useEffect(() => {
    if (page === "overviewPage") {
      getBudgetListLength(dataList);
    } else {
      getBudgetListLength(dataList2);
    }
  }, [dataList, dataList2]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = format(today, "dd");
    const day = format(today, "EEEE");
    const month = format(today, "MMMM");

    // Initially sets to todays date
    handleDate(setExpenses, expenses, formattedDate, day, month);
  }, []);

  const handleModalPosition = () => {
    const form = formRef.current;
    if (form) {
      const position = form.getBoundingClientRect();
      const heightAboveViewport = -position.top > 0 ? -position.top : 0;
      setModalPosition(heightAboveViewport);
    }
  };

  const handleAddCategory = () => {
    setIsModalOpen(true);
    handleModalPosition();
    if (setIsScrollable) setIsScrollable(true);
  };

  const handleValidation = () => {
    let isValid = true;
    let validAmount = "";
    let validDescription = "";

    if (expenses.amount < 0 || !expenses.amount) {
      setExpenses({ ...expenses, amount: 0 });
      validAmount = "Amount should be at least 1*";
      isValid = false;
    }
    if (!expenses.description) {
      validDescription = "Enter expense description";
      isValid = false;
    }

    setFormErrors({
      amount: validAmount,
      description: validDescription,
    });

    if (isValid) handleSubmit();
  };

  const getBudgetListLength = (listToCurate?: Expenses[]) => {
    if (listToCurate) {
      const uniqueDataMap = new Map<string, ExpenseListData>();

      listToCurate.forEach((item) => {
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

      setBudgetListLength(Array.from(uniqueDataMap.values()));
    }
  };

  const handleSubmit = () => {
    if (page === "overviewPage") {
      // Sends the req only if isThorttle is false
      if (!isThrottle.current) {
        isThrottle.current = true;

        // Add the expense and set the budget in the database
        if (budget?.category) {
          BudgetService.add(budgetListLength.length, budget);
        }
        console.log(expenses);
        ExpenseService.add(dataList?.length || 0, expenses)
          // Update UI if req succeed
          .then(() => {
            if (setData) setData([...(dataList || []), expenses]);
            onAddExpense();
            toast.success("Expense added successfully", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
            });
            // Clears the budget
            setBudget({ category: "", budget: 0 });
          })
          .catch(() => {
            toast.error("Unable to add expense", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
            });
          })
          .finally(() => {
            setTimeout(() => (isThrottle.current = false), 1000);
          });
      }
    } else {
      if (!isThrottle.current) {
        isThrottle.current = true;
        if (budget?.category) {
          BudgetService.add(budgetListLength.length, budget);
        }
        ExpenseService.add(dataList2?.length || 0, expenses)
          .then(() => {
            if (setData2) setData2([...(dataList2 || []), expenses]);
            onAddExpense();
            toast.success("Expense added successfully", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
            });
            // Clears the budget
            setBudget({ category: "", budget: 0 });
          })
          .catch(() => {
            toast.error("Unable to add expense", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
            });
          })
          .finally(() => {
            setTimeout(() => (isThrottle.current = false), 1000);
          });
      }
    }
  };

  return (
    <div ref={formRef}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleValidation();
        }}
        className="pb-6"
      >
        <div className="bg-white dark:bg-purple-900 rounded-b-2xl">
          {/* Amount Input */}
          <Amount
            errorMessage={formErrors.amount}
            onInput={(value) => setExpenses({ ...expenses, amount: value })}
          />

          {/* Date input */}
          <div className="flex justify-between w-[90%] mx-auto pt-3 pb-7 max-w-3xl">
            <span className="text-lg font-medium font-roboto dark:text-white">
              {`${expenses.date?.day}, ${expenses.date?.date} ${expenses.date?.month}`}
            </span>
            <Calendar
              onSelect={(date, day, month) => {
                handleDate(setExpenses, expenses, date, day, month);
              }}
            />
          </div>
        </div>

        {/* Description input */}
        <Description
          errorMesssage={formErrors.description}
          onInput={(value) => {
            setExpenses({ ...expenses, description: value });
          }}
        />

        {/* Category Input */}
        <div className="input-containers mt-7 border-b-black flex-grow max-w-3xl w-[95%] mx-auto">
          <div className="flex items-baseline gap-3">
            <label htmlFor="category" className="labels mr-0">
              Select Category
            </label>
          </div>
          <Category
            onAddCategory={handleAddCategory}
            onClick={(category) => {
              const matchingCategory = budgetListLength?.find(
                (item) => category === item.category
              );
              // Set the same budget for matching category
              if (matchingCategory) {
                setExpenses({
                  ...expenses,
                  category: matchingCategory.category,
                  budget: matchingCategory.budget,
                });
              } else {
                setExpenses({
                  ...expenses,
                  category: category,
                  budget: 0,
                });
                // Add the budget node in the database for every new category added.
                setBudget({
                  category: category,
                  budget: 0,
                });
              }
            }}
            newCategory={newCategory}
          />
        </div>

        {isModalOpen && (
          <Modal
            handleNewCategory={(newCategory) => setNewCategory(newCategory)}
            onClose={() => {
              setIsModalOpen(false);
              if (setIsScrollable) setIsScrollable(false);
            }}
            position={modalPosition}
          />
        )}

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
              handleToggleButton(setExpenses, setIsOpen, expenses, isOpen)
            }
          />
        </div>

        {/* Recurring Intervals */}
        {isOpen && (
          <RecurringExpense
            selectedInterval={expenses.recurringInterval}
            onClick={(interval) =>
              handleRecurringExpense(setExpenses, expenses, interval)
            }
          />
        )}
        <button className="bg-black text-white w-1/2 text-lg rounded-full mx-auto max-w-md block py-2 px-5 mt-5 hover:bg-black/80">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;

import create, { getUidFromCookie } from "./http-service";

export interface DateObj {
  date: number;
  day: string;
  month: string;
}

export interface Expenses {
  uid: string;
  amount: number;
  budget: number;
  category: string;
  date: DateObj;
  description: string;
  recurringInterval: string | null;
  nextDueDate: string;
}

export const placeholderExpense: Expenses = {
  uid: "placeholder",
  amount: 0,
  budget: 0,
  category: "placeholder",
  date: { date: 0, day: "", month: "" },
  description: "This is a placeholder expense.",
  recurringInterval: null,
  nextDueDate: "1970-01-01",
};

export const expensesService = () => {
  const uid = getUidFromCookie();
  return create(`/Users/${uid}/expenses`, ".json");
};

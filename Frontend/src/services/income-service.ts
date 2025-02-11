import { DateObj } from "./expenses-service";
import create, { getUidFromCookie } from "./http-service";

export interface Incomes {
  uid: string;
  amount: number;
  date: DateObj;
  source: string;
  recurringInterval: string;
  nextDueDate: string;
}

export const placeholderIncome: Incomes = {
  uid: "",
  amount: 0,
  date: { date: 0, day: "", month: "" },
  source: "Deleted",
  recurringInterval: "None",
  nextDueDate: "",
};

export const incomeService = () => {
  const uid = getUidFromCookie();
  return create(`/Users/${uid}/income`, ".json");
};

import create, { getUidFromCookie } from "./http-service";

export interface Budget {
  category: string;
  budget: number;
}

export const budgetService = () => {
  const uid = getUidFromCookie();
  return create(`/Users/${uid}/budget`, ".json");
};

import create, { getUidFromCookie } from "./http-service";

export interface Chore {
  mainChore: string;
  choreDes: string | null;
  plus: number | null;
  minus: number | null;
}

export const choresService = () => {
  const uid = getUidFromCookie();
  return create(`/Users/${uid}/chores`, ".json");
};

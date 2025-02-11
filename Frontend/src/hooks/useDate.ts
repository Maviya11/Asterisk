import { format } from "date-fns";
import { useEffect, useState } from "react";

export const useDate = () => {
  const [date, setDate] = useState({ date: 0, day: "", month: "" });

  useEffect(() => {
    const today = new Date();
    const formattedDate = format(today, "dd");
    const day = format(today, "EEEE");
    const month = format(today, "MMMM");
    setDate({ date: parseInt(formattedDate), day: day, month: month });
  }, []);

  return { date };
};

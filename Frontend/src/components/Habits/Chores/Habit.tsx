import { useContext, useEffect, useState } from "react";
import { eventBus } from "@/services/event-service";
import { toast } from "react-toastify";
import { themeValueContext } from "@/App";
import { Chore, choresService } from "../../../services/chores-service";
import Commitment from "./Commitment";
import Count from "./Count";
import Minus from "./Minus";
import Plus from "./Plus";

interface Props {
  chore: Chore;
  index: number;
  onClick: (param: Chore) => void;
}

const Habit = ({ chore, index, onClick }: Props) => {
  const ChoresService = choresService();
  const theme = useContext(themeValueContext);

  const [currentChore, setCurrentChore] = useState<Chore>({
    mainChore: chore.mainChore,
    choreDes: chore.choreDes,
    plus: chore.plus,
    minus: chore.minus,
  });

  useEffect(() => {
    setCurrentChore(chore);
  }, [chore]);

  const updatePlusCount = () => {
    // Updates the UI
    setCurrentChore({
      ...currentChore,
      plus: currentChore.plus !== null ? currentChore.plus + 1 : 1,
    });

    // Event trigger to update profileData
    eventBus.emit("updateProfile", { action: "plus", from: "Habit" });

    // Updates the database
    ChoresService.updateCount(
      index,
      currentChore,
      currentChore.plus,
      "plus"
    ).catch(() => {
      setCurrentChore({ ...currentChore });
      toast.error("No Internet Connection", {
        position: "top-center",
        autoClose: 2000,
      });
    });
  };

  const updateMinusCount = () => {
    // Updates the UI
    setCurrentChore({
      ...currentChore,
      minus: currentChore.minus !== null ? currentChore.minus + 1 : 1,
    });

    // Event tirgger to update profileData
    eventBus.emit("updateProfile", { action: "minus", from: "Habit" });

    // Updates the database
    ChoresService.updateCount(
      index,
      currentChore,
      currentChore.minus,
      "minus"
    ).catch(() => {
      setCurrentChore({ ...currentChore });
      toast.error("No Internet Connection", {
        position: "top-center",
        autoClose: 2000,
      });
    });
  };

  const setColor = (): string => {
    const plus = currentChore.plus || 0;
    const minus = currentChore.minus || 0;

    const result = plus - minus;

    const colorsDarkMode = {
      zero: "bg-yellow-700",
      lowPositive: "bg-emerald-600",
      highPositive: "bg-sky-500",
      lowNegative: "bg-orange-700",
      highNegative: "bg-red-700",
    };

    const colorsLightMode = {
      zero: "bg-amber-400",
      lowPositive: "bg-emerald-300",
      highPositive: "bg-sky-300",
      lowNegative: "bg-orange-400",
      highNegative: "bg-red-400",
    };

    // Use theme to select appropriate color shades
    const colors = theme ? colorsDarkMode : colorsLightMode;

    // Return color based on result
    if (result === 0) {
      return colors.zero;
    } else if (result > 0 && result <= 5) {
      return colors.lowPositive;
    } else if (result > 5) {
      return colors.highPositive;
    } else if (result < 0 && result >= -9) {
      return colors.lowNegative;
    } else {
      return colors.highNegative;
    }
  };

  const setBgColor = (): string => {
    const plus = currentChore.plus || 0;
    const minus = currentChore.minus || 0;

    const result = plus - minus;

    // Define dark mode and light mode colors
    const colorsDarkMode = {
      zero: "bg-amber-600",
      lowPositive: "bg-emerald-500",
      highPositive: "bg-sky-400",
      lowNegative: "bg-orange-600",
      highNegative: "bg-red-600",
    };

    const colorsLightMode = {
      zero: "bg-amber-300",
      lowPositive: "bg-emerald-200",
      highPositive: "bg-sky-200",
      lowNegative: "bg-orange-300",
      highNegative: "bg-red-300",
    };

    // Use theme to select appropriate color shades
    const colors = theme ? colorsDarkMode : colorsLightMode;

    // Return color based on result
    if (result === 0) {
      return colors.zero;
    } else if (result > 0 && result <= 5) {
      return colors.lowPositive;
    } else if (result > 5) {
      return colors.highPositive;
    } else if (result < 0 && result >= -9) {
      return colors.lowNegative;
    } else {
      return colors.highNegative;
    }
  };

  return (
    <div className="w-[95%] max-w-2xl flex mx-auto rounded-xl overflow-hidden shadow-md min-h-[100px] min-[900px]:max-w-none xl:max-w-2xl">
      <Plus
        onPlus={updatePlusCount}
        bgColor={setBgColor()}
        color={setColor()}
        disable={currentChore.plus === undefined || currentChore.plus === null}
      />
      <div
        className="grow px-3 py-2 bg-gray-200 dark:bg-[#21222b] flex flex-col justify-center gap-1"
        onClick={() => {
          onClick(currentChore);
        }}
      >
        <Commitment mainChore={chore.mainChore} choreDes={chore.choreDes} />
        <Count plusCount={currentChore.plus} minusCount={currentChore.minus} />
      </div>
      <Minus
        onMinus={updateMinusCount}
        bgColor={setBgColor()}
        color={setColor()}
        disable={
          currentChore.minus === undefined || currentChore.minus === null
        }
      />
    </div>
  );
};

export default Habit;

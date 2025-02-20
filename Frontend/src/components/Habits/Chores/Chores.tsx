import { useState } from "react";
import { useData } from "../../../hooks/useData";
import { Chore, choresService } from "../../../services/chores-service";
import Habit from "./Habit";
import Skeleton from "./Skeleton";
import AddButton from "../../Navigations/AddButton";
import AddChore from "../ChoresForm/AddChore";
import SidebarSpace from "../../Navigations/SidebarSpace";
import "./Chores.css";

const Chores = () => {
  const { isLoading, data, error, setData } = useData<Chore>(choresService); //Custom hook
  const [isVisible, setIsVisible] = useState(false);
  const [singleChoreIndex, setSingleChoreIndex] = useState<number>();
  const [singleChore, setSingleChore] = useState<Chore>({
    mainChore: "",
    choreDes: "",
    plus: null,
    minus: null,
  });

  const skeleton = [1, 2, 3, 4, 5, 6];

  const handleClick = (chore: Chore, currentIndex: number) => {
    setSingleChore(chore);
    setSingleChoreIndex(currentIndex);
    setIsVisible(true);
  };

  // Handle Add, Update or Delete based on conditions
  const handleHabitOperations = (
    habit: Chore | undefined,
    updatingIndex: number | undefined
  ) => {
    setIsVisible(false);
    // Update habit
    if (habit && updatingIndex !== undefined) {
      console.log("update");
      setData(
        data?.map((chore, index) => (index === updatingIndex ? habit : chore))
      );
    } else if (habit) {
      // Add habit
      setData([...(data || []), habit]);
    } else {
      //Delete habit
      setData(data?.filter((_, index) => index !== updatingIndex));
    }
  };

  return (
    <>
      <div className="flex">
        <SidebarSpace />
        <div className="min-h-[calc(100vh-56px-126px)] min-[400px]:min-h-[calc(100vh-64px-144px)] lg:pb-0 xl:pt-[170px] flex-grow pb-28 pt-5 flex flex-col gap-4 bg-[#f3f3f3] min-[780px]:grid grid-cols-2 xl:grid-cols-1 min-[1500px]:grid-cols-2 auto-rows-max dark:bg-[#1e1e22]">
          {error && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 text-center text-white">
              No Internet Connnection
            </div>
          )}
          {isLoading
            ? skeleton.map((skeleton) => <Skeleton key={skeleton} />)
            : data &&
              data.map(
                (chore, index) =>
                  chore && (
                    <div key={index}>
                      <Habit
                        chore={chore}
                        index={index}
                        onClick={(chore) => handleClick(chore, index)}
                      />
                    </div>
                  )
              )}
        </div>
        <AddButton
          onClick={() => {
            setSingleChore({
              mainChore: "",
              choreDes: "",
              plus: null,
              minus: null,
            });
            setIsVisible(true);
          }}
        />
        <AddChore
          chore={singleChore}
          currentIndex={singleChoreIndex}
          index={data?.length}
          isVisible={isVisible}
          onClick={(habit, updatingIndex) =>
            handleHabitOperations(habit, updatingIndex)
          }
        />
      </div>
    </>
  );
};

export default Chores;

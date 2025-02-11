import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import FormButton from "./FormButton";
import ResetTime from "./ResetTime";
import { IoArrowBack } from "react-icons/io5";
import { Chore, choresService } from "../../../services/chores-service";
import { toast } from "react-toastify";
import "../Chores/Chores.css";

interface Props {
  isVisible: boolean;
  onClick: (chore?: Chore, index?: number) => void;
  index?: number;
  chore: Chore;
  currentIndex?: number;
}

const AddChore = ({
  isVisible,
  onClick,
  index,
  chore,
  currentIndex,
}: Props) => {
  const ChoresService = choresService();

  const [resetCounter, setResetCounter] = useState(0);
  const [habit, setHabit] = useState<Chore>({
    mainChore: "",
    choreDes: "",
    plus: null,
    minus: null,
  });

  useEffect(() => {
    if (chore) {
      setHabit({
        choreDes: chore.choreDes,
        mainChore: chore.mainChore,
        plus: chore.plus,
        minus: chore.minus,
      });
    }
  }, [chore]);

  const notesRef = useRef<HTMLTextAreaElement>(null);
  if (notesRef.current) notesRef.current.value = habit.choreDes || "";
  const titleRef = useRef<HTMLInputElement>(null);
  if (titleRef.current) titleRef.current.value = habit.mainChore || "";

  const handleInput = () => {
    if (notesRef.current) {
      notesRef.current.style.height = "auto";
      notesRef.current.style.height = `${notesRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = (habit: Chore, updatingIndex?: number) => {
    if (titleRef.current) {
      habit.mainChore = titleRef.current.value;
    }
    if (notesRef.current) {
      habit.choreDes = notesRef.current.value;
    }

    // Sets the index of the habit according to whether the habit is updated or a new habit is created
    if (index === 0 || currentIndex === 0) {
      index = 0;
    } else if (currentIndex) {
      index = currentIndex;
    } else {
      index = index;
    }

    ChoresService.add(index, habit)
      .then(() => {
        onClick(habit, updatingIndex);
      })
      .catch(() => {
        toast.error("No Internet Connection", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  const handleFormButtons = (isSelected: boolean, sign: "plus" | "minus") => {
    if (habit[sign] === null || habit[sign] === undefined) {
      isSelected ? (habit[sign] = 0) : (habit[sign] = null);
    } else if (habit[sign] === 0 || habit[sign]) {
      isSelected ? (habit[sign] = chore[sign]) : (habit[sign] = null);
    } else {
      habit[sign] = chore[sign];
    }
  };

  const handleDelete = (currentIndex: number | undefined) => {
    ChoresService.delete(currentIndex)
      .then(() => {
        onClick(undefined, currentIndex);
      })
      .catch(() => {
        toast.error("No Internet Connection", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  return (
    <div
      className={`fixed w-full h-[calc(100vh-64px)] bg-[#f3f3f3] dark:bg-[#1e1e22] z-20 overflow-scroll scroll-bar ${
        isVisible ? "top-16" : "top-full"
      } transition-[top]
      lg:w-[calc(100vw-8vw)] lg:right-0
      xl:static xl:border-l xl:border-gray-300 xl:dark:border-gray-700 xl:w-[586px]
      `}
    >
      <form
        className="pb-4 dark:bg-[#1e1e22] min-[780px]:overflow-hidden"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <header className="bg-[#D264B6] dark:bg-purple-900 text-white">
          <nav className="max-w-7xl text-[1.125rem] flex justify-between items-center w-[95%] py-3 mx-auto">
            <div className="flex items-center gap-3">
              <IoArrowBack
                onClick={() => {
                  onClick();
                }}
                size={25}
                color="white"
                className="box-content p-1 rounded-full"
              />
              <h2 className="">Create Habit</h2>
            </div>
            <div>
              {habit.mainChore && (
                <button
                  onClick={() => {
                    handleDelete(currentIndex);
                  }}
                  className="bg-[#D264B6] hover:bg-[#b8549f] dark:bg-purple-700 py-1 px-3 rounded-full mr-2"
                >
                  Delete
                </button>
              )}
              <button
                onClick={() => {
                  if (habit.mainChore) {
                    handleSubmit(habit, currentIndex);
                  } else {
                    handleSubmit(habit);
                  }
                }}
                className="bg-[#D264B6] hover:bg-[#b8549f] dark:bg-purple-700 py-1 px-3 rounded-full"
              >
                {habit.mainChore ? "Update" : "Create"}
              </button>
            </div>
          </nav>
        </header>
        <div className="pt-7 pb-4 bg-[#D264B6] dark:bg-purple-900">
          <input
            required
            ref={titleRef}
            type="text"
            placeholder="Habit Title"
            className="bg-gray-200 dark:bg-[#1e1e22]  dark:text-white w-[90%] mx-auto block p-3 rounded-sm focus:outline-none max-w-3xl"
          />
          <textarea
            ref={notesRef}
            onInput={handleInput}
            placeholder="Notes"
            className="bg-gray-200 dark:bg-[#1e1e22] dark:text-white rounded-sm p-3 focus:outline-none block mx-auto w-[90%] resize-none my-5 max-w-3xl"
          />
        </div>
        <div className="mx-auto w-max flex gap-12 my-10 bg">
          <div className="flex flex-col items-center gap-2">
            <div>
              <FormButton
                state={habit.plus !== null && habit.plus !== undefined}
                setSigns={(isSelected) => {
                  handleFormButtons(isSelected, "plus");
                }}
                Sign={FaPlus}
              />
            </div>
            <span className="dark:text-white text-lg">Positive</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div>
              <FormButton
                state={habit.minus !== null && habit.minus !== undefined}
                setSigns={(isSelected) => {
                  handleFormButtons(isSelected, "minus");
                }}
                Sign={FaMinus}
              />
            </div>
            <span className="dark:text-white text-lg">Negative</span>
          </div>
        </div>
        <div className="dark:text-white text-xl w-[90%] mx-auto mb-4 max-w-3xl">
          Reset Counter
        </div>
        <div className="flex w-[90%] mx-auto justify-around items-center max-w-3xl">
          <ResetTime
            name="Daily"
            stars={0}
            state={resetCounter === 0}
            onClick={(stars) => setResetCounter(stars)}
          />
          <ResetTime
            name="Weekly"
            stars={1}
            state={resetCounter === 1}
            onClick={(stars) => setResetCounter(stars)}
          />
          <ResetTime
            name="Monthly"
            stars={2}
            state={resetCounter === 2}
            onClick={(stars) => setResetCounter(stars)}
          />
        </div>
      </form>
    </div>
  );
};
export default AddChore;

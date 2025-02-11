import "../../Habits/Chores/Chores.css";
import ListComponent from "./ListComponent";

const ExpenseList = () => {
  return (
    <div className="max-w-2xl mx-auto min-[900px]:max-w-none px-6">
      <div className="mx-auto my-4 pb-28">
        <ul className="grid grid-cols-1 gap-3 min-[900px]:grid-cols-2 xl:grid-cols-1 min-[1450px]:grid-cols-2">
          <ListComponent />
        </ul>
      </div>
    </div>
  );
};

export default ExpenseList;

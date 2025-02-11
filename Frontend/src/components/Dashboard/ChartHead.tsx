import { useState } from "react";

interface Props {
  setSelecteData: (data: string) => void;
}

const ChartHead = ({ setSelecteData }: Props) => {
  const [data, setData] = useState("income");

  return (
    <div className="flex items-center justify-between px-4 mb-5">
      <h2 className="text-base min-[350px]:text-xl font-medium">
        Monthly Details
      </h2>
      <div className="text-sm">
        <span
          onClick={() => {
            setData("income");
            setSelecteData("income");
          }}
          className={`${
            data === "income"
              ? "font-medium border-b-2 border-black"
              : "text-gray-400"
          } mr-3 cursor-pointer pb-[0.125rem]`}
        >
          Income
        </span>
        <span
          onClick={() => {
            setData("expenses");
            setSelecteData("expenses");
          }}
          className={`${
            data === "expenses"
              ? "font-medium border-b-2 border-black"
              : "text-gray-400"
          } mr-3 cursor-pointer pb-[0.125rem]`}
        >
          Expenses
        </span>
        <span
          onClick={() => {
            setData("both");
            setSelecteData("both");
          }}
          className={`${
            data === "both"
              ? "font-medium border-b-2 border-black"
              : "text-gray-400"
          } cursor-pointer pb-[0.125rem]`}
        >
          Compare
        </span>
      </div>
    </div>
  );
};

export default ChartHead;

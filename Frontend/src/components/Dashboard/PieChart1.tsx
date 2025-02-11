import { PieChart, Pie, Cell } from "recharts";
import { GoDotFill } from "react-icons/go";

// type Expense = {
//   name: string;
//   value: number;
// };

type Props = {
  // expenses: Expense[];
  colors?: string[];
};

const DonutChart = ({
  colors = ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
}: Props) => {
  const expenses = [
    { name: "Food", value: 1500 },
    { name: "Transport", value: 800 },
    { name: "Entertainment", value: 600 },
    { name: "Utilities", value: 1200 },
  ];

  const total = expenses.reduce((sum, expense) => sum + expense.value, 0);

  return (
    <div className="md:w-[40%]">
      <div className=" bg-[#faf9f9] px-1 py-3 mt-2 mx-auto rounded-xl w-[95%] shadow md:px-0 md:w-full">
        <div className="px-5 md:px-3 lg:px-5">
          <h2 className=" mb-4 text-2xl font-sans font-medium">Budget</h2>
          <div className="flex flex-col items-center min-[500px]:grid min-[500px]:grid-cols-2 min-[500px]:place-items-center md:flex xl:grid xl:gap-5">
            <div className="relative">
              <PieChart width={200} height={210}>
                <Pie
                  data={expenses}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={0} // No gap between segments
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {expenses.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
              <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col">
                <span className="text-gray-400">Total</span>
                <span className="font-medium text-lg">&#8377; {total}</span>
              </p>
            </div>

            <ul className="w-[90%] ml-auto grid grid-cols-2 gap-x-6 gap-y-3 place-items-start min-[500px]:grid-cols-1 md:grid-cols-2 md:ml-0 md:w-full xl:grid-cols-1 xl:pl-5">
              {expenses.map((item, index) => {
                return (
                  <li className="flex items-center gap-2">
                    <GoDotFill size={25} color={colors[index]} />
                    <span>{item.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;

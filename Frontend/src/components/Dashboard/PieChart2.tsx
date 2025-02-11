import { PieChart, Pie, Cell } from "recharts";

interface Props {
  budget: number;
  totalExpenses: number;
}

const PieChart2 = ({ budget, totalExpenses }: Props) => {
  // Calculate the percentage of budget used
  const progress = Math.min((totalExpenses / budget) * 100, 100);

  // Define the data for the chart
  const data = [
    { name: "Used", value: progress },
    { name: "Remaining", value: 100 - progress },
  ];

  // Define colors for used and remaining portions
  const COLORS = ["#FF8042", "#DDDDDD"];

  return (
    <div className="md:w-[40%]">
      <div className=" bg-[#faf9f9] px-1 py-3 mt-2 mx-auto rounded-xl w-[95%] shadow md:px-0 md:w-full">
        <div className="px-5">
          <h2 className=" mb-4 text-2xl font-sans font-medium">Budget</h2>
          <div className="flex flex-col items-center relative">
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                startAngle={90} // Starts from the top
                endAngle={-270} // Completes clockwise rotation
                dataKey="value"
              >
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
            {/* Centered percentage text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-2xl">&#8377; 25450</p>
              <p className="text-sm text-orange-500">Spent</p>
            </div>
          </div>
          {/* Bottom section */}
          <div className="flex items-center justify-between mt-5 w-[90%] mx-auto">
            <div className="flex items-center justify-center flex-col">
              <p className="text-2xl">&#8377; 30000</p>
              <p className="text-gray-400 text-sm">Month Limit</p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <p className="text-2xl">&#8377; 2500</p>
              <p className="text-gray-400 text-sm">Remaining</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart2;

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ChartHead from "./ChartHead";
import { useState } from "react";

interface ChartData {
  month: string;
  income?: number;
  expenses?: number;
}

const chartConfig = {
  income: {
    label: "Income",
    color: "#2563eb",
  },
  expenses: {
    label: "Expense",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const Chart = () => {
  const [selectedData, setSelectedData] = useState("income");

  const [chartData, setChartData] = useState<ChartData[]>([
    { month: "January", income: 800, expenses: 600 },
    { month: "February", income: 700, expenses: 450 },
    { month: "March", income: 3000, expenses: 3000 },
    { month: "April", income: 650, expenses: 500 },
    { month: "May", income: 750, expenses: 600 },
    { month: "June", income: 850, expenses: 700 },
  ]);

  return (
    <div className=" bg-[#faf9f9] py-3 px-1 mt-2 mx-auto rounded-xl w-[95%] shadow md:w-[70%]">
      <ChartHead setSelecteData={(data) => setSelectedData(data)} />
      <ChartContainer config={chartConfig} className="min-h-[155px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={true}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            // ticks={[0, 750, 1500, 2250, 3000, 5000]}
            tickLine={false}
            axisLine={true}
            tick={{ fill: "#000", fontSize: 14 }}
            tickFormatter={(value) => `₹${value}`}
            domain={[0, "dataMax"]} // Dynamic domain to add padding at the top
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          {(selectedData === "income" || selectedData === "both") && (
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
          )}
          {(selectedData === "expenses" || selectedData === "both") && (
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
          )}
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default Chart;

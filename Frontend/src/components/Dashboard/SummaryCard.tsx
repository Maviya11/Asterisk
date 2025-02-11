import { IconType } from "react-icons";

interface Props {
  Icon: IconType;
  name: string;
  amount: number;
}

const SummaryCard = ({ Icon, name, amount }: Props) => {
  return (
    <div className="bg-[#faf9f9] px-3 py-4 rounded-xl shadow flex items-end justify-between min-[500px]:px-4 md:flex-col md:items-start">
      <div className="flex items-center gap-2 md:flex-col md:items-start">
        <Icon className="text-sky-700 text-2xl hidden min-[400px]:block min-[500px]:text-3xl md:bg-slate-200 md:p-2 md:box-content md:rounded-full" />
        <p className="text-gray-700 leading-none font-serif min-[500px]:text-lg">
          {name}
        </p>
      </div>
      <p className="text-xl font-medium font-sans min-[500px]:text-2xl md:text-3xl">
        &#8377; {amount}
      </p>
    </div>
  );
};

export default SummaryCard;

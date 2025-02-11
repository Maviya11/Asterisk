import AddButton from "../Navigations/AddButton";
import SidebarSpace from "../Navigations/SidebarSpace";
import { RiDashboardHorizontalFill, RiWalletFill } from "react-icons/ri";
import Chart from "./Chart";
import PieChart1 from "./PieChart1";
import SummaryCard from "./SummaryCard";

const Dashboard = () => {
  return (
    <div className="flex pb-36 min-h-[calc(100vh-56px)] min-[400px]:min-h-[calc(100vh-64px)] bg-[#f3f3f3] dark:bg-[#1e1e22]">
      <SidebarSpace />
      <AddButton onClick={() => {}} />
      <div className="flex-grow">
        <div className="bg-[#f3f3f3] dark:bg-[#1e1e22]">
          <h1 className="text-2xl flex items-center gap-2 px-8 py-2 ">
            <RiDashboardHorizontalFill size={30} className="dark:text-white" />
            <p className="font-serif dark:text-white">Dashboard</p>
          </h1>
          <div className="w-[95%] mx-auto grid grid-cols-2 gap-2 md:grid-cols-4">
            <SummaryCard Icon={RiWalletFill} name="Balance" amount={12845} />
            <SummaryCard Icon={RiWalletFill} name="Balance" amount={12845} />
            <SummaryCard Icon={RiWalletFill} name="Balance" amount={12845} />
            <SummaryCard Icon={RiWalletFill} name="Balance" amount={12845} />
          </div>
        </div>
        <div className="md:flex md:w-[95%] md:mx-auto gap-3">
          <Chart />
          <PieChart1 />
          {/* <PieChart2 budget={100} totalExpenses={20} /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

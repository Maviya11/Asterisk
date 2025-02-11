import { Link, useLocation } from "react-router-dom";
import { TiMinus, TiPlus } from "react-icons/ti";
import { HiMiniWallet } from "react-icons/hi2";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import "./Navigation.css";

const NavigationBar = () => {
  const { pathname } = useLocation();

  return (
    <nav
      className="p-2 left-1/2 transform -translate-x-1/2 w-[95%] bg-slate-800 flex justify-around items-center fixed bottom-2 rounded-lg max-w-4xl z-10 
     lg:flex-col lg:justify-start lg:w-[8vw] lg:left-0 lg:top-0 lg:translate-x-0 lg:h-screen lg:rounded-none lg:py-6 lg:gap-6
     xl:w-[6vw]"
    >
      <Link to="/">
        <div className="links w-[5.85rem]">
          <div className="w-12 h-6 flex gap-1">
            <div
              className={`h-full w-1/2 ${
                pathname === "/" ? "bg-white" : "bg-[#777]"
              } rounded-l flex items-center justify-center`}
            >
              <TiPlus />
            </div>
            <div
              className={`h-full w-1/2 ${
                pathname === "/" ? "bg-white" : "bg-[#777]"
              } rounded-r flex items-center justify-center`}
            >
              <TiMinus />
            </div>
          </div>
          <span
            className={`${
              pathname === "/" ? "text-white" : "text-[#777]"
            } text-[1rem] leading-none`}
          >
            Habits
          </span>
        </div>
      </Link>

      <Link to="expenses">
        <div className="links mr-5 lg:mr-0">
          <div className="w-12 h-6 flex gap-1">
            <div
              className={`h-full w-full ${
                pathname === "/expenses" ? "bg-white" : "bg-[#777]"
              } rounded flex items-center justify-center`}
            >
              <FaMoneyBillTransfer size={27} className="text-slate-800" />
            </div>
          </div>
          <span
            className={`${
              pathname === "/expenses" ? "text-white" : "text-[#777]"
            } text-base leading-none`}
          >
            Expenses
          </span>
        </div>
      </Link>

      <Link to="income">
        <div className="links ml-5 lg:ml-0">
          <div className="w-12 h-6 flex gap-1">
            <div
              className={`h-full w-full ${
                pathname === "/income" ? "bg-white" : "bg-[#777]"
              } rounded flex items-center justify-center`}
            >
              <HiMiniWallet size={23} className="text-slate-800" />
            </div>
          </div>
          <span
            className={`${
              pathname === "/income" ? "text-white" : "text-[#777]"
            } text-base leading-none`}
          >
            Income
          </span>
        </div>
      </Link>

      <Link to="dashboard">
        <div className="links">
          <div className="w-12 h-6 flex gap-1">
            <div
              className={`h-full w-full ${
                pathname === "/dashboard" ? "bg-white" : "bg-[#777]"
              } rounded flex items-center justify-center`}
            >
              <RiDashboardHorizontalFill size={23} className="text-slate-800" />
            </div>
          </div>
          <span
            className={`${
              pathname === "/dashboard" ? "text-white" : "text-[#777]"
            } leading-none`}
          >
            Dashboard
          </span>
        </div>
      </Link>
    </nav>
  );
};

export default NavigationBar;

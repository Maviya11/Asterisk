import ThemeSwitch from "./ThemeSwitch";
import logo from "../../assets/logo.webp";
import "../../../src/index.css";
import { useNavigate } from "react-router-dom";
import { isAuthenticatedFunctionContext } from "@/App";
import { useContext } from "react";

const HeadBar = () => {
  const setIsAuthenticated = useContext(isAuthenticatedFunctionContext);
  const navigate = useNavigate();
  const logout = () => {
    document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("isAuthenticated");
    if (setIsAuthenticated) setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-screen h-16 py-2 px-4 flex items-center justify-between ml-auto bg-[#f3f3f3] dark:bg-[#1e1e22] shadow-lg dark:shadow-[0_4px_6px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.06)] lg:w-[calc(100vw-8vw)] xl:w-[calc(100vw-6vw)] ">
      <div className="flex items-center">
        <img src={logo} alt="" className="w-10 h-10 rounded-lg" />
        <h1 className="text-2xl ml-2 text-cyan-700 font-leckerli">Asterisk</h1>
      </div>
      <div className="flex items-center">
        <ThemeSwitch />
        <button
          onClick={logout}
          className="ml-5 px-3 py-1 rounded transition-colors duration-300 hover:bg-black hover:text-white dark:text-white dark:hover:bg-[#f3f3f3] dark:hover:text-black"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default HeadBar;

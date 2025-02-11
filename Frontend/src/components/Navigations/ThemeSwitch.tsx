import { themeSetterContext, themeValueContext } from "@/App";
import { useContext, useLayoutEffect, useState } from "react";
import { MdSunny } from "react-icons/md";
import { RiMoonClearLine } from "react-icons/ri";

const ThemeSwitch = () => {
  const setTheme = useContext(themeSetterContext);
  const theme = useContext(themeValueContext);
  const [isDarkMode, setIsDarkMode] = useState(theme);

  useLayoutEffect(() => {
    setIsDarkMode(theme);
  }, [theme]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      if (setTheme) setTheme(true);
      localStorage.setItem("Theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      if (setTheme) setTheme(false);
      localStorage.setItem("Theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={toggleTheme}
        className={`relative inline-flex px-[0.375rem] rounded-full border-2 bg-white dark:border-slate-600 dark:bg-slate-800 shadow-lg items-center justify-center h-9 w-[88px] transition-all duration-300 ease-in-out`}
      >
        <RiMoonClearLine size={25} className="absolute left-2 text-white hidden dark:block" />

        <span
          className={`w-6 h-6 transition-transform rounded-full -translate-x-[95%] bg-yellow-300 border-2 border-yellow-600 dark:translate-x-[95%] dark:bg-slate-500 dark:border-2 dark:border-white`}
        ></span>

        <MdSunny
          size={25}
          className="absolute right-2 text-amber-600 dark:hidden"
        />
      </button>
    </div>
  );
};

export default ThemeSwitch;

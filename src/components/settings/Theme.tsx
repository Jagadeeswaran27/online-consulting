import { useContext } from "react";
import { AuthContext } from "../../store/context/auth";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(AuthContext);
  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-3 select-none">
      <button
        onClick={toggleTheme}
        className="group relative inline-flex items-center justify-center w-16 h-9 
                  rounded-full bg-gray-200 dark:bg-gray-700 
                  transition-colors duration-300 ease-in-out
                  hover:bg-gray-300 dark:hover:bg-gray-600
                  focus:outline-none "
        role="switch"
        aria-checked={isDark}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        <span className="sr-only">
          {isDark ? "Switch to light mode" : "Switch to dark mode"}
        </span>
        <span
          className={`absolute left-1 w-7 h-7 rounded-full bg-white
                     shadow-sm transform transition-transform duration-300
                     ease-in-out scale-95 group-hover:scale-100
                     ${isDark ? "translate-x-7" : "translate-x-0"}`}
        />
        <span
          className={`absolute left-[7px] transition-opacity duration-300 
                         ${isDark ? "opacity-0" : "opacity-100"}`}
        >
          <FiSun className="w-5 h-5 text-yellow-500" />
        </span>
        <span
          className={`absolute right-[7px] transition-opacity duration-300 
                         ${isDark ? "opacity-100" : "opacity-0"}`}
        >
          <FiMoon className="w-5 h-5 text-gray-500" />
        </span>
      </button>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {isDark ? "Dark" : "Light"}
      </span>
    </div>
  );
};

export default ThemeToggle;

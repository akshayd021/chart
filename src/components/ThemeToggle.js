import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"; // Ensure correct import
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Use context

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggle;

import { FiMoon, FiSun } from "react-icons/fi";
import { useDarkMode } from "../../context/DarkModeContext";
import "./DarkModeToggle.css";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode" title="Toggle dark mode">
      {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
};

export default DarkModeToggle;

import { useSelector } from "react-redux";

const ThemeProvide = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  console.log("🚀 ~ ThemeProvide ~ theme:", theme);

  return (
    <div className={theme}>
      <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)]">
        {children}
      </div>
    </div>
  );
};

export default ThemeProvide;

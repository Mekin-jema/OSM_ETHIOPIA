import users from "../assets/dashboard/users.svg";
import heartbeat from "../assets/dashboard/heartbeat.svg";
import { useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";

const data = [
  { id: 1, title: "API Usage", icon: heartbeat },
  { id: 2, title: "Active Client", icon: users },
  { id: 3, title: "API Usage", icon: heartbeat },
  { id: 4, title: "API Usage", icon: heartbeat },
];
const languages = [
  { code: "en", label: "Eng" },
  { code: "es", label: "Esp" },
  { code: "fr", label: "Fra" },
  { code: "de", label: "Deu" },
  { code: "am", label: "Amh" }, // Example for Ethiopia
];

const Board = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("Eng");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectLanguage = (lang) => {
    setSelectedLang(lang.label);
    setIsOpen(false);
  };
  return (
    <div className=" rounded-lg shadow-md ">
      <div className="ml-[236px] flex  justify-between mt-[15px] mr-[42.83px] ">
        <div className=" w-[335px] h-[40px] mb-[35px]  ">
          <input
            type="text"
            className="w-full h-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#00432f] focus:outline-none"
            placeholder="Search..."
          />
        </div>
        <div className="relative inline-block">
          {isOpen && (
            <ul className="absolute left-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-10">
              {languages.map((lang) => (
                <li
                  key={lang.code}
                  onClick={() => selectLanguage(lang)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {lang.label}
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={toggleDropdown}
            className="flex items-center px-4 py-2 bg-white border rounded-lg shadow hover:bg-gray-100"
          >
            <MdOutlineArrowDropDown className="w-5 h-5" />
            {selectedLang}
          </button>
        </div>
      </div>

      <div className="flex  gap-[25px] ml-[50px]  mr-[68px] flex-wrap ">
        {data.map((item) => (
          <div
            key={item.id}
            className="  rounded-[15px] border border-[#16423c] flex   justify-between bg-[#C4DAD2] w-[250px] h-[200px]"
          >
            <div className="w-[60.86px] h-[42px] mt-[22px] ml-[24px]">
              <h3 className="text-lg font-medium h-full font-sans  ">
                {item.title}
              </h3>
            </div>
            <img
              src={item.icon}
              alt={item.title}
              className="w-[20.57px] h-[24px] mt-[18px] mr-[24.3px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;

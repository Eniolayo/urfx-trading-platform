import { useState } from "react";
import { SetStateAction } from "jotai";
import AccountSizeButton from "../featureSection/AccountSizeButton";
import { ChevronDown, ChevronUp } from "lucide-react";

const options = [
  { label: "5,000", value: 0 },
  { label: "10,000", value: 1 },
  { label: "25,000", value: 2 },
  { label: "50,000", value: 3 },
  { label: "100,000", value: 4 },
  { label: "500,000", value: 5 },
  { label: "1,000,000", value: 6 },
];

const RadioButton = ({
  value,
  onChange,
}: {
  value: number;
  onChange: React.Dispatch<SetStateAction<number>>;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionClick = (selectedValue: number) => {
    onChange(selectedValue);
    setIsDropdownOpen(false);
  };


  return (
    <div className="relative text-center w-full min-h-[53px] sm:h-[70px]">
      <AccountSizeButton>
        <button
          id="dropdownDefaultButton"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="relative w-full h-full text-white text-center items-center min-h-[53px]  2k:h-[100px]"
          type="button"
        >
          <div className="absolute flex justify-between dark:text-white font-bold text-dark items-center inset-0 text-[18px] sm:text-[24px] 2k:text-[40px]">
            {options.find((option) => option.value === value)?.label ||
              "Select"}
              <div className=" 2k:scale-[2]">
                {isDropdownOpen ? (<ChevronUp></ChevronUp>) : (<ChevronDown></ChevronDown>)}
              </div>
            
          </div>
        </button>
        
      </AccountSizeButton>

      {isDropdownOpen && (
        <div
          id="dropdown"
          className="absolute w-full bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 z-50"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => handleOptionClick(option.value)}
                  className="block w-full text-left px-[16px] sm:px-[24px] py-[10px] sm:py-[14px] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-[14px] sm:text-[20px]"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RadioButton;

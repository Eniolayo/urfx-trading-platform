import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import engFlag from "/src/assets/LanguageButton/uk.svg";
import frFlag from "/src/assets/LanguageButton/fr.svg";
import geFlag from "/src/assets/LanguageButton/ge.svg";
import spFlag from "/src/assets/LanguageButton/spanish.svg";
// import { drop } from "lodash";

const LanguageSelectButton = () => {
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [, setDropdownDirection] = useState<"down" | "up">("down");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const options = [
    { value: "en", label: "En", flag: engFlag },
    { value: "fr", label: "Fr", flag: frFlag },
    { value: "ge", label: "Ge", flag: geFlag },
    { value: "sp", label: "Sp", flag: spFlag },
  ];

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [flagIcon, setFlagIcon] = useState(engFlag);

  const handleOptionClick = (value: string) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value);
    setIsDropdownOpen(false);
    setFlagIcon(
      value === "en"
        ? engFlag
        : value === "fr"
        ? frFlag
        : value === "ge"
        ? geFlag
        : spFlag
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      setIsDropdownVisible(true);
    } else {
      // Wait for transition before unmounting
      const timeout = setTimeout(() => setIsDropdownVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const dropdownHeight = 180; // Approximate, adjust as needed
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setDropdownDirection("up");
      } else {
        setDropdownDirection("down");
      }
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const dropdownHeight = 180;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      let direction: "down" | "up" = "down";
      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        direction = "up";
        setDropdownDirection("up");
      } else {
        direction = "down";
        setDropdownDirection("down");
      }
      // Calculate left/top/bottom for fixed dropdown
      setDropdownStyle({
        position: "fixed",
        left: rect.left,
        width: rect.width,
        maxWidth: "240px",
        minWidth: "140px",
        zIndex: 50,
        ...(direction === "down"
          ? { top: rect.bottom + 4 }
          : { bottom: window.innerHeight - rect.top + 4 }),
        // Removed maxHeight and overflowY to ensure dropdown is always fully visible
      });
    }
  }, [isDropdownOpen]);

  return (
    <div
      ref={dropdownRef}
      className="relative flex justify-center items-center text-center h-full "
    >
      <button
        id="dropdownDefaultButton"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-[50px] h-[27px] flex text-white text-center items-center space-x-1 2k:w-[80px] 2k:h-[40px]"
        type="button"
      >
        <img src={flagIcon} alt="globalIcon" className="object-cover h-[27px] rounded-xl 2k:rounded-3xl 2k:h-[40px] 2k:w-[40px]" />
        <div className="flex justify-center dark:text-white text-dark items-center text-[15px] 2k:text-[22px]">
          {options.find((option) => option.value === selectedLanguage)?.label ||
            "Select"}
        </div>
      </button>

      {isDropdownVisible && (
        <div
          id="dropdown"
          className={`overflow-hidden shadow-lg dark:from-[#0F4F57] dark:via-[#3A4F2E] dark:to-[#515016] bg-white
            transition-all duration-200 ease-in-out
            ${
              isDropdownOpen
                ? "opacity-100 scale-y-100 pointer-events-auto"
                : "opacity-0 scale-y-95 pointer-events-none"
            }
            origin-top
            w-max min-w-[80px] max-w-[140px] 2k:min-w-[120px] 2k:max-w-[220px]
          `}
          style={dropdownStyle}
        >
          <ul className="text-sm text-gray-700 dark:text-gray-200 2k:text-lg">
            {options.map((option) => (
              <li
                key={option.value}
                className="flex justify-center items-center"
              >
                <button
                  onClick={() => handleOptionClick(option.value)}
                  className="flex justify-center w-full py-2 dark:bg-gradient-to-tr dark:text-white dark:hover:text-[] transition-all duration-300 2k:py-3"
                >
                  <div className="flex w-[55px] gap-2 items-center 2k:w-[80px] 2k:gap-4">
                    <img
                      src={option.flag}
                      alt={option.flag}
                      className="w-[25px] h-[25px] rounded-xl 2k:w-[38px] 2k:h-[38px]"
                    />
                    {option.label}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelectButton;

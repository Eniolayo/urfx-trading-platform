import { themeAtom } from "@/store/atoms";
import { useAtomValue } from "jotai";
import React from "react";

interface FundingTypeButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  blur?: boolean;
  bgColor?: string;
  phase?: number; // <-- add this
  value?: number; // <-- add this (for ph.value)
  isSelected?: boolean; // <-- add this
}

const FundingTypeButton: React.FC<FundingTypeButtonProps> = ({
  onClick,
  className,
  children,
  blur,
  phase,
  value,
  isSelected,
}) => {
  const theme = useAtomValue(themeAtom);
  const lightModeGradient =
    theme === "light"
      ? isSelected
        ? "linear-gradient(to right, rgba(219, 214, 51, 1), rgba(158, 212, 115, 1), rgba(28, 205, 230, 1))" // Full opacity
        : "linear-gradient(to right, rgba(219, 214, 51, 0.4), rgba(158, 212, 115, 0.4), rgba(28, 205, 230, 0.4))"
      : ""; // 40% opacity
  return (
    <div className={`relative flex items-center group ${className}`}>
      <button
        onClick={onClick}
        style={{
          background: lightModeGradient,
        }}
        className={`relative flex py-2 items-center justify-center transition-all w-full h-full duration-300 ease-in-out bg-gradient-to-r dark:bg-none ${
          isSelected ? "dark:bg-opacity-100" : "dark:bg-opacity-25"
        } hover:brightness-110`}
      >
        {phase === value && (
          <span
            className={`absolute inset-0 z-10 transition-opacity duration-300 ${
              isSelected
                ? "dark:bg-gradient-to-r dark:from-[#125358] dark:via-[#445F39] dark:to-[#494915]"
                : "dark:bg-gradient-to-r dark:from-[#ffffff1a] dark:to-[#ffffff0d]"
            }  pointer-events-none`}
            aria-hidden="true"
          />
        )}

        {/* Fancy Borders (z-10) */}
        {isSelected && (
          <>
            <span className="absolute top-0 left-0 w-[20%] h-full border-t-2 border-l-2 border-cyan-400 pointer-events-none z-50" />
            <span className="absolute top-0 right-0 w-[20%] h-full border-t-2 border-r-2 border-yellow-300 pointer-events-none z-50" />
            <span className="absolute bottom-0 right-0 w-[20%] h-full border-b-2 border-r-2 border-yellow-300 pointer-events-none z-50" />
            <span className="absolute bottom-0 left-0 w-[20%] h-full border-l-2 border-b-2 border-cyan-400 pointer-events-none z-50" />
          </>
        )}

        {/* Button text (z-10) */}
        <span className="relative z-10 dark:text-white flex justify-center items-center h-full w-full tracking-tight">
          {children}
        </span>
        {/* Gradient Blur Background (z-20, on top of everything) */}
        {blur && (
          <span
            className="absolute inset-0 z-0 pointer-events-none rounded-full blur-2xl opacity-80"
            style={{
              background:
                "radial-gradient(circle at 35% 50%, #1CCDE6 25%, transparent 80%), radial-gradient(circle at 65% 50%, #DBD633 35%, transparent 80%)",
            }}
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
};

export default FundingTypeButton;

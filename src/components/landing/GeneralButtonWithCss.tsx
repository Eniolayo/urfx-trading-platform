import React from "react";

interface GeneralButtonWithCssProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  blur?: boolean;
  bgColor?: string;
  enableHoverEffect?: boolean;
  enableBackgroundAtTheBeginning?: boolean;
  bgClassName?: string;
  childClassName?: string
}

const GeneralButtonWithCss: React.FC<GeneralButtonWithCssProps> = ({
  onClick,
  className,
  children,
  blur,
  enableHoverEffect = true,
  bgClassName,
  childClassName
}) => {
  return (
    <div className={`flex items-center group ${className}`}>
      <button
        onClick={onClick}
        className={`relative flex py-2 items-center justify-center transition-all w-full h-full duration-300 ease-in-out} transition hover:brightness-110`}
      >
        <span
          className={`absolute inset-0 z-10 transition-opacity duration-300 pointer-events-none ${
            enableHoverEffect
              ? ` dark:group-hover:bg-gradient-to-r ${bgClassName} dark:group-hover:from-[#125358] dark:group-hover:via-[#445F39] dark:group-hover:to-[#525A22] dark:group-hover:opacity-100`
              : ""
          }`}
          aria-hidden="true"
        />
        <span
          className={`absolute inset-0 z-10 opacity-0 ${enableHoverEffect? "group-hover:opacity-100" : "" } pointer-events-none rounded-full blur-2xl`}
          style={{
            background:
              "radial-gradient(circle at 35% 50%, #1CCDE6 25%, transparent 80%), radial-gradient(circle at 65% 50%, #DBD633 35%, transparent 80%)",
          }}
          aria-hidden="true"
        />

        {/* Fancy Borders (z-10) */}
        <span className="absolute top-0 left-0 w-[20%] h-full border-t-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
        <span className="absolute top-0 right-0 w-[20%] h-full border-t-2 border-r-2 border-yellow-300 pointer-events-none z-20" />
        <span className="absolute bottom-0 right-0 w-[20%] h-full border-b-2 border-r-2 border-yellow-300 pointer-events-none z-20" />
        <span className="absolute bottom-0 left-0 w-[20%] h-full border-l-2 border-b-2 border-cyan-400 pointer-events-none z-20" />
        {/* Button text (z-10) */}
        <span className={`relative z-10 dark:text-white flex justify-center items-center h-full w-full ${childClassName}`}>
          {children}
        </span>
        {/* Gradient Blur Background (z-20, on top of everything) */}
        {blur && (
          <span
            className="absolute inset-0 z-0 pointer-events-none rounded-full blur-2xl opacity-50"
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

export default GeneralButtonWithCss;

import React from "react";

interface AccountSizeButtonProps {
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

const AccountSizeButton: React.FC<AccountSizeButtonProps> = ({
  onClick,
  className,
  children,
  blur,
  childClassName
  // enableBackgroundAtTheBeginning = false,
}) => {
  return (
    <div className={`flex items-center group ${className}`}>
      <button
        onClick={onClick}
        className={`relative flex py-2 px-[16px] sm:px-[24px] items-center justify-center transition-all w-full h-full duration-300 ease-in-out} transition hover:brightness-110`}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-[#1CCDE6] via-[#9ED473] to-[#DBD633] opacity-40"></span>

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

export default AccountSizeButton;

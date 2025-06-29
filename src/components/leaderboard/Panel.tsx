import React from "react";

interface GeneralButtonWithCssProps {
  onClick?: () => void;
  className?: string;
  classNameContent?:string;
  children?: React.ReactNode;
  blur?: boolean;
}

const GeneralButtonWithCss: React.FC<GeneralButtonWithCssProps> = ({
  onClick,
  className,
  classNameContent,
  children,
  blur,
}) => {
  return (
    <div className={`relative flex items-center group ${className}`}
    >
      <button
        onClick={onClick}
        className={`transition-all w-full h-full duration-300 ease-in-out  dark:bg-opacity-25 dark:bg-none`}
      >
        <div className="absolute inset-0  w-full h-full bg-gradient-to-r from-[#1CCDE6] via-[#9ED473] to-[#DBD633] opacity-75 group-hover:opacity-100 dark:blur-2xl  dark:opacity-0 dark:group-hover:opacity-50"></div>
        <div className="absolute inset-0  w-full h-full bg-gradient-to-r from-[#1CCDE6] via-[#9ED473] to-[#DBD633] blur-2xl opacity-0 group-hover:opacity-100"></div>

        {/* Fancy Borders (z-10) */}
        <span className="absolute top-0 left-0 w-[11%] h-full opacity-0 group-hover:opacity-100 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-50" />
        <span className="absolute top-0 right-0 w-[11%] h-full opacity-0 group-hover:opacity-100 border-t-2 border-r-2 border-yellow-300 pointer-events-none z-50" />
        <span className="absolute bottom-0 right-0 w-[11%] h-full opacity-0 group-hover:opacity-100 border-b-2 border-r-2 border-yellow-300 pointer-events-none z-50" />
        <span className="absolute bottom-0 left-0 w-[11%] h-full opacity-0 group-hover:opacity-100 border-l-2 border-b-2 border-cyan-400 pointer-events-none z-50" />
        {/* Button text (z-10) */}
        <span className={`relative ${classNameContent} z-10 text-white h-full w-full tracking-tight`}>
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

export default GeneralButtonWithCss;

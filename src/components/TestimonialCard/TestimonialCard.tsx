import React from "react";

interface TestimonialCardProps {
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

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  onClick,
  className,
  children,
  childClassName
  // enableBackgroundAtTheBeginning = false,
}) => {
  return (
    <div className={`flex items-center  group ${className}`}>
      <div
        onClick={onClick}
        className={`relative flex items-center  justify-center transition-all w-full h-full duration-300 ease-in-out} transition hover:brightness-110`}
      >
        <div className="absolute inset-0  w-full h-full bg-gradient-to-r from-[#1CCDE6] via-[#9ED473] to-[#DBD633] blur-3xl opacity-0 group-hover:opacity-50"></div>

        {/* Fancy Borders (z-10) */}
        <span className="absolute opacity-0 group-hover:opacity-100 top-0 left-0 w-[20%] h-full border-t-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
        <span className="absolute opacity-0 group-hover:opacity-100 top-0 right-0 w-[20%] h-full border-t-2 border-r-2 border-yellow-300 pointer-events-none z-20" />
        <span className="absolute opacity-0 group-hover:opacity-100 bottom-0 right-0 w-[20%] h-full border-b-2 border-r-2 border-yellow-300 pointer-events-none z-20" />
        <span className="absolute opacity-0 group-hover:opacity-100 bottom-0 left-0 w-[20%] h-full border-l-2 border-b-2 border-cyan-400 pointer-events-none z-20" />
        {/* Button text (z-10) */}
        <span className={`relative w-[397px] h-[258px] 2k:w-[650px] 2k:h-[422px] z-10 dark:text-white flex justify-center items-center ${childClassName}`}>
          {children}
        </span>
        {/* Gradient Blur Background (z-20, on top of everything) */}
      
      </div>
    </div>
  );
};

export default TestimonialCard;

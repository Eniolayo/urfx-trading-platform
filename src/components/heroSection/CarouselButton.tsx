import React from "react";
import check from "/src/assets/HeroSection/check.png"

interface CarouselButton {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  blur?: boolean;
  bgColor?: string;
  enableHoverEffect?: boolean;
  enableBackgroundAtTheBeginning?: boolean;
}

const CarouselButton: React.FC<CarouselButton> = ({
  onClick,
  children,
}) => {
  return (
    <div className={`flex items-center group w-[19px] h-[20px] 2k:w-[38px] 2k:h-[40px]`}>
      <button
        onClick={onClick}
        className={`relative flex py-2 items-center justify-center rounded-sm transition-all w-full h-full duration-300 ease-in-out hover:brightness-110`}
      > 
        <div className="absolute inset-0 w-full h-full opacity-45 rounded-sm brightness-90 bg-gradient-to-r from-[#1CCDE6] via-[#9ED473] to-[#DBD633]"></div>
        <div className="absolute inset-0 w-full h-full flex justify-center items-center brightness-150">
          <img src={check} alt="check" className="w-[11.46px] h-[8.48px] 2k:w-[22.92px] 2k:h-[16.96px]" />
        </div>
        {/* Fancy Borders (z-10) */}
        <span className="absolute top-0 left-0 w-[20%] h-1/2 border-t-[1px] border-l-[1px] border-cyan-400 pointer-events-none z-20 rounded-tl-[2.5px] 2k:rounded-tl-[5px]" />
        <span className="absolute top-0 right-0 w-[20%] h-1/2 border-t-[1px] border-r-[1px] border-yellow-300 pointer-events-none z-20 rounded-tr-[2.5px] 2k:rounded-tr-[5px]" />
        <span className="absolute bottom-0 right-0 w-[20%] h-1/2 border-b-[1px] border-r-[1px] border-yellow-300 pointer-events-none z-20 rounded-br-[2.5px] 2k:rounded-br-[5px]" />
        <span className="absolute bottom-0 left-0 w-[20%] h-1/2 border-l-[1px] border-b-[1px] border-cyan-400 pointer-events-none z-20 rounded-bl-[2.5px] 2k:rounded-bl-[5px]" />
        {/* Button text (z-10) */}
        <span className="relative z-10 dark:text-white flex justify-center items-center h-full w-full">
          {children}
        </span>
      </button>
    </div>
  );
};

export default CarouselButton;

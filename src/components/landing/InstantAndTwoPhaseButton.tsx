interface InstantAndTwoPhaseButtonProps{
    input:string;
}

const InstantAndTwoPhasButton = (content:InstantAndTwoPhaseButtonProps) => {
  return (
    <div className="relative group w-full h-full">
      <div className="relative w-full h-full opacity-90 overflow-hidden rounded-xl bg-black z-10">
        <div className="absolute z-10 -translate-x-44 group-hover:translate-x-[30rem] ease-in transistion-all duration-700 h-full w-44 bg-gradient-to-r from-gray-500 to-white/10 opacity-30 -skew-x-12" />
        <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-2xl py-6 inset-0.5 bg-black">
          <button name="text" className="input font-semibold text-[30px] h-auto  opacity-90 w-full px-16 py-6 rounded-xl bg-black">
            {content.input}
          </button>
        </div>
        <div className="absolute duration-1000 group-hover:animate-spin w-full h-[100px] bg-gradient-to-r from-green-500 to-yellow-500 blur-[30px]" />
      </div>
    </div>
  );
}

export default InstantAndTwoPhasButton;




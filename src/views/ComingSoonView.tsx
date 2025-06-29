import ComingSoonLetter from "../components/user/ComingSoonLetter";
import TruckLoader from "../components/user/TruckLoader";

const ComingSoonView = () => {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="w-auto h-auto">
        <div className="w-auto h-auto ml-[30%]">
          <TruckLoader />
        </div>
        <div className="">
          <ComingSoonLetter />
        </div>
      </div>
    </div>
  );
};

export default ComingSoonView;

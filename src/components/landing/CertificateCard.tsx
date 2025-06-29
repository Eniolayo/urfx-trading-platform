import { CertificateCardDataProps } from "@/types/certificateData";
import CertificateCardBackground from "../CertificateCardBackground";

const CertificateCard = ({
  imgURL,
  review,
  name,
}: CertificateCardDataProps) => {
  return (
    // <div
    //   className={`w-[398px] h-[403px] flex flex-col p-7 border border-red-600 ${className}`}
    // >
      <CertificateCardBackground className="w-[398px] h-[403px] 2k:w-[600px] 2k:h-[607px]" childClassName="flex flex-col p-3 md:p-7 2k:p-5">
        <div className="w-[350px] h-[247px] 2k:w-[550px] 2k:h-[388px] flex justify-center">
          <img src={imgURL} alt="Certificate" className="w-full h-full" />
        </div>

        <div className="flex flex-col text-start gap-2 mt-4">
          <p className="text-[17px] 2k:text-[27px] text-gray-600 dark:text-neutral-300">
            {review}
          </p>
          <p className="text-[20px] 2k:text-[31px]">{name}</p>
        </div>
      </CertificateCardBackground>
    // </div>
  );
};

export default CertificateCard;

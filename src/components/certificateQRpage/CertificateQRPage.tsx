import { CheckCircle, MessageSquareWarning } from "lucide-react";
import gradientBg from "../../assets/gradientback.jpg";
import { env } from "@/config/env";

const CertificateQRPage = () => {
  // get hash param from url
  const params = new URLSearchParams(window.location.search);
  const hash = params.get("hash") || "5393507d5280181914b479c7dca2ff4b18a678a622b75f02aabbd73c4c361727";
  console.log(hash);
  console.log(`https://s3.${env.AWS_REGION}.amazonaws.com/${env.S3_BUCKET_NAME}/certificates/${hash}`)

  return (
    <div className=" w-[100vw] h-screen border border-secondary overflow-auto">

      <div className="relative top-0 left-0 z-10 right-0 flex justify-center bg-black/70 text-white p-5 items-center w-full h-auto ">
        <CheckCircle className="w-6 h-6 text-green-400" />
        <span className="text-xl font-semibold tracking-wide">
          Certificate is verified by URFX
        </span>
      </div>

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={gradientBg}
          alt="Background Image"
          className="w-full h-full"
        />
      </div>

      {/* main content */}
      <div className="relative w-full h-[calc(100vh-70px)] flex flex-col items-center">
        <div className="relative z-10 flex mt-7">
          <MessageSquareWarning className="mr-2" />
          Check the name on your certificate to make sure it's the one
        </div>

        {/* certificate Image */}
        <div className="relative border border-white">
          <div className="">
            <img src={`https://s3.${env.AWS_REGION}.amazonaws.com/${env.S3_BUCKET_NAME}/certificates/${hash}`} alt="" />
          </div>
        </div>

        <div className="relative w-auto h-auto flex flex-col space-y-6 lg:space-y-0 lg:flex-row items-center justify-center lg:space-x-4 mt-6">
          <span className="text-xl font-semibold tracking-wide">
            Are you ready to become an URFX Trader?
          </span>

          <button className="p-[3px] bg-gradient-to-r from-purple-500 to-yellow-500 rounded-3xl font-bold bg-black/75">
          <a href="https://urfx.io">
            <div className="bg-gray-900 rounded-3xl p-3">
              Start URFX Challenge
            </div>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateQRPage;

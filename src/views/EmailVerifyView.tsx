import logo from "/logo/5.png";
import emailVerifyLogo from "../../src/assets/email-verify-image.png";
import { useEffect } from "react";
import axios from "axios";
import { env } from "@/config/env";
import { toast } from "react-toastify";
import { userAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

const EmailVerifyView: React.FC = () => {
  const [userInfoGlobal] = useAtom(userAtom);
  const navigate = useNavigate();
  const email = userInfoGlobal?.email || null; // Get the email from the global state

  useEffect(() => {
    if (email) {
      axios
        .post(`${env.BASE_URL}/auth/email-verify`, {
          email: email,
        })
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message);
        })
        .catch((err) => {
          console.error("Error during email verification: ", err);
          if (axios.isAxiosError(err) && err.response) {
            toast.warning(err.response.data.message);
          } else {
            console.error("An unexpected error occurred:", err);
          }
        });
    } else {
      console.error("Email is null or undefined");
      navigate("/user");
    }

    console.log("email ===>", email);
  });

  return (
    <div className="relative w-full min-h-screen bg-[#070707] lg:gap-0 gap-4">

      {/* logo */}
      <div className="relative left-8 top-5 w-1/2">
        <img src={logo} alt="" className="w-[30%] lg:w-[20%] h-auto" />
      </div>

      <div className="fixed inset-0 w-full h-screen flex items-center justify-center">
        <div className="relative flex flex-col space-y-5">
          <div className="w-full flex justify-center">
            <img
              src={emailVerifyLogo}
              alt="emailVerifyLogo"
              className="w-[140px] h-[140px]"
            />
          </div>
          <div className="w-full text-center text-[35px] font-bold text-secondary">
            Verify your email to continue
          </div>
          <div className="w-full text-[20px] text-gray-400 text-center">
            We just sent an email to the address:{" "}
            {<span className="text-white"> {email} </span>} <br />
            Please check your email and select the link provided to verify your
            address.
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerifyView;

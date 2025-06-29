import logo from "/logo/5.png";
import emailVerifySuccessLogo from "../../src/assets/email-verify-success-imgae.png";
import { env } from "@/config/env";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CongratForSignup: React.FC = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") || null; // Get the token from the URL
  console.log("token ===>", token);

  useEffect(() => {
    if (token === null) {
      navigate("/user");
    }
  });

  const handleRegister = async () => {
    console.log("token ===>", token);

    if (token) {
      try {
        axios.post(`${env.BASE_URL}/auth/register-verified-email`, {
          token: token,
        });
        console.log("Token sent to the backend successfully!");

        navigate("/login"); // Redirect to the login page after successful registration
      } catch (error) {
        console.error("Error during email transfer: ", error);
        if (axios.isAxiosError(error) && error.response) {
          console.error(
            "Server responded with ===>: ",
            error.response.data.message
          );
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    } else {
      console.error("Token is null or undefined");
    }
  };

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
              src={emailVerifySuccessLogo}
              alt="emailVerifyLogo"
              className="w-[140px] h-[140px]"
            />
          </div>
          <div className="w-full text-center text-[35px] font-bold text-secondary">
            Congratulations! Your account is verified.
          </div>

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-[40%] text-sm bg-blue-500 text-white p-2 rounded-[20px] hover:bg-blue-600 h-9 flex items-center justify-center"
              onClick={() => handleRegister()}
            >
              Continue to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongratForSignup;

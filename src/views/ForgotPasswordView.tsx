import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { env } from "@/config/env";
// import bgPoint from "/src/assets/SigninView/bg-point.svg";
import ThemeToggleButton from "@/components/themeToggle/ThemeToggleButton";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import quoteIconDark from "/src/assets/SigninView/quote-icon-dark.svg";
import quoteIconLight from "/src/assets/SigninView/quote-icon-light.svg";
import avatar from "/src/assets/SigninView/avatar.svg";
import mailIconDark from "/src/assets/SigninView/mail-icon-dark.svg";
import mailIconLight from "/src/assets/SigninView/mail-icon-light.svg";
import Logo from "@/components/common/Logo";
import { themeAtom } from "@/store/atoms";
import { useAtomValue } from "jotai";
import GeneralButtonWithCss from "@/components/landing/GeneralButtonWithCss";
import LanguageSelectButton from "@/components/LanguageSelectButton";
import laptop from "/src/assets/SigninView/laptop.webp";
import VectorLogo from "/src/assets/SigninView/logo-vector.webp";

const ForgotPasswordView: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    try {
      setLoading(true);
      const response = await axios.post(
        `${env.BASE_URL}/auth/forgot-password`,
        {
          email: email,
        }
      );
      toast.success(response.data);
    } catch (error) {
      console.error("Error during authentication: ", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.warning(error.response.data.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  };
  const navbarRef = useRef<HTMLDivElement>(null); // Create a ref for the navbar
  const [navbarHeight, setNavbarHeight] = useState<number>(0); // State to store the navbar height
  const [mailIcon, setMailIcon] = useState<string>(); // State to store the mail icon
  const [quoteIcon, setQuoteIcon] = useState<string>();
  const themeAtomValue = useAtomValue(themeAtom); // Get the current theme from the atom
  // height calculation dynamically
  useEffect(() => {
    if (navbarRef.current) {
      const height = navbarRef.current.offsetHeight;
      console.log("height ===>L ", height);
      setNavbarHeight(height);
    }
  }, []);

  useEffect(() => {
    setMailIcon(themeAtomValue === "dark" ? mailIconDark : mailIconLight);
    setQuoteIcon(themeAtomValue === "dark" ? quoteIconDark : quoteIconLight);
  }, [themeAtomValue]); // Update the mail icon based on the theme

  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden dark:bg-dark dark:text-white bg-white text-dark lg:gap-0 ">
      {/* backgrounod point */}
      {/* <img
        src={bgPoint}
        alt="BackgroundPoint"
        className="w-full h-full bg-cover"
      /> */}

      <div className="absolute inset-0 z-0 pointer-events-none bg-soft-radial-green dark:opacity-70 opacity-0" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-soft-radial-blue dark:opacity-60 opacity-0" />

      <div className="absolute inset-0 flex flex-row items-center justify-center z-20">
        <div className="relative w-1/2 h-full">
          {/* navbar section */}
          <div
            className="flex justify-between w-full top-0 p-9"
            ref={navbarRef}
          >
            <Logo />
            <div className="flex w-fit items-center justify-center space-x-5">
              <ThemeToggleButton />
              <p className="flex items-center cursor-pointer text-[16px]  space-x-5">
                <span className="text-center flex justify-center">
                  {t("Don't have an account?")}{" "}
                </span>

                <div className="w-fit h-full">
                  <GeneralButtonWithCss
                    onClick={handleSignup}
                    className="w-[73px] h-[32px] text-[16px]"
                  >
                    <span className="dark:opacity-50 opacity-100">
                      {t("Sign up")}
                    </span>
                  </GeneralButtonWithCss>
                </div>
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div
            className="w-full flex flex-col items-center justify-around top-0"
            style={{ height: `calc(100vh - ${navbarHeight}px)` }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-6 rounded-2xl h-fit"
            >
              <div className="mb-10 mt-6">
                <h1 className="text-[40px] w-full text-center">
                  {t("Forgot Password")}
                </h1>
                <p className="opacity-[60%] tracking-normal text-center">
                  {t("Enter your Email Address")}
                </p>
              </div>

              <div className="mb-8">
                <label className="block text-[24px]" htmlFor="email">
                  {t("Email Address")}
                </label>
                <div className="relative">
                  <img
                    src={mailIcon}
                    alt="MailIcon"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  />
                  <input
                    type="email"
                    id="email"
                    placeholder="hello@playerprofit.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="tracking-wider opacity-[60%] dark:placeholder-[#FFFFFF] placeholder-[#676767] text-sm mt-1 block w-full p-2 pl-10 border border-gray-700 dark:bg-[#302F19] focus:outline focus:outline-gray-500 focus:border-none"
                    required
                  />
                </div>
              </div>
              {/* 
              <button
                type="submit"
                className="w-full text-sm  text-white flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <RotatingLines
                      width={"28"}
                      strokeWidth="5"
                      strokeColor="white"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                    />
                  </>
                ) : (
                  <div className="relative flex justify-center items-center h-[48px] w-full">
                    <GeneralButton inputText={t("Confirm")} />
                  </div>
                )}
              </button> */}

              <button className="w-full flex justify-start h-auto mt-16">
                <GeneralButtonWithCss
                  blur={true}
                  className="text-[14px] sm:text-[18px]  h-[37px] w-full sm:h-[42px] dark:bg-dark"
                  enableBackgroundAtTheBeginning={false}
                  enableHoverEffect={true}
                >
                  <span className="tracking-wide">{t("Confirm")}</span>
                </GeneralButtonWithCss>
              </button>

              <div className="flex justify-center text-[14px] mt-5 space-x-1 font-outfit">
                <span className="text-[#A5A9A1]">Remember your password? </span>
                <div>
                  <Link to={"/login"} className="text-[#DBD633] underline">
                    Signin
                  </Link>
                </div>
              </div>
            </form>

            <div className="absolute bottom-2 flex justify-between w-full h-fit px-2">
              <div className="flex items-center">
                <span>© 2025 URFX</span>
              </div>
              <LanguageSelectButton />
            </div>
          </div>
        </div>

        {/*Half Background Image Section */}
        <div className="p-[2px] bg-gradient-to-r from-[#1CCDE5] via-[#9DD373] to-[#DBD633] w-[57%] h-[99%] rounded-xl mr-1">
          <div className="relative bg-gradient-to-tr dark:from-[#1d5e57] dark:via-[#425533] dark:to-[#5e5d1f]  w-full h-full  rounded-xl">
            {/* <img
            src={signinViewImage}
            alt="SigninBackground"
            className="w-full h-full object-fill dark:brightness-[65%]"
          /> */}
            <img
              src={laptop}
              alt="laptop"
              className="absolute h-[66%] right-0 bottom-0 rounded-xl"
            />
            <img
              src={VectorLogo}
              alt="VectorLogo"
              className="absolute right-0"
            />
            <div className="absolute inset-0  p-10 pt-20">
              <div>
                <img src={quoteIcon} alt="QuoteIcon" />
              </div>
              <p className="text-[26px]">
                Access your personalized trading dashboard, manage your
                portfolio, and stay ahead with real-time market insights.
                Secure, fast, and easy – log in now to continue your trading
                journey with URFX.
              </p>

              <div className="flex items-center justify-start mt-10 gap-5">
                <div>
                  <img src={avatar} alt="Avatar" />
                </div>
                <div>Wei C.</div>
                <div>Entrepreneur</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="absolute flex items-end justify-start w-full h-full p-7">
        <span>© 2025 URFX</span>
      </div> */}
    </div>
  );
};

export default ForgotPasswordView;

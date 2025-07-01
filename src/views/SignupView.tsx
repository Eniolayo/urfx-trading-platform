import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { env } from "@/config/env";
import googleIcon from "/src/assets/SigninView/google-icon.svg";
import { useTranslation } from "react-i18next"; // Import translation hook
import quoteIconDark from "/src/assets/SigninView/quote-icon-dark.svg";
import quoteIconLight from "/src/assets/SigninView/quote-icon-light.svg";
import avatar from "/src/assets/SigninView/avatar.svg";
import laptop from "/src/assets/SigninView/laptop.webp";
import VectorLogo from "/src/assets/SigninView/logo-vector.webp";
import bgPoint from "/src/assets/SigninView/bg-point.svg";
import ThemeToggleButton from "@/components/themeToggle/ThemeToggleButton";
import mailIconDark from "/src/assets/SigninView/mail-icon-dark.svg";
import mailIconLight from "/src/assets/SigninView/mail-icon-light.svg";
import lockIconDark from "/src/assets/SigninView/lock-icon-dark.svg";
import lockIconLight from "/src/assets/SigninView/lock-icon-light.svg";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/store/atoms";
import logoDark from "/src/assets/Navbar/dark-logo.webp";
import logoLight from "/src/assets/Navbar/light-logo.webp";
import GeneralButtonWithCss from "@/components/landing/GeneralButtonWithCss";
import LanguageSelectButton from "@/components/LanguageSelectButton";
import { RotatingLines } from "react-loader-spinner";

const SignupView: React.FC = () => {
  const navbarRef = useRef<HTMLDivElement>(null); // Create a ref for the navbar
  const { t } = useTranslation(); // Initialize translation hook
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await axios.post(`${env.BASE_URL}/auth/google`, {
          access_token: tokenResponse.access_token,
        });
        console.log("Backend Response:", response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/user/dashboard");
      } catch (error) {
        console.error("Error during authentication:", error);
        toast.warn(t("Error during authentication!"));
      }
    },
    onError: () => {
      console.error("Google login failed");
      toast.warn(t("Google login failed!"));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSignin = () => {
    navigate("/login");
  };

  const handleRegister = async () => {
    if (password.length < 8) {
      toast.warn(t("Password must be at least 8 characters long!"));
      return;
    }
    if (password == confirmPassword) {
      setIsLoading(true);
      try {
        await axios
          .post(`${env.BASE_URL}/auth/register`, {
            email: email,
            password: password,
          })
          .then((res) => {
            if (res.data.token) {
              // Send email verification request
              axios
                .post(`${env.BASE_URL}/auth/email-verify`, {
                  email: email,
                })
                .then(() => {
                  toast.success(
                    t(
                      "Registration successful! Please check your email to verify your account."
                    )
                  );
                  // Store the email temporarily for the verification page
                  localStorage.setItem("verification_email", email);
                  // Navigate to the email verification page
                  // navigate("/email-verify");
                })
                .catch((verifyErr) => {
                  console.error("Failed to send verification email", verifyErr);
                  toast.warn(
                    t(
                      "Account created but failed to send verification email. Please contact support."
                    )
                  );
                  navigate("/login");
                });
            } else {
              console.log(res.data);
            }
          })
          .catch((error) => {
            console.error("Failed", error);
            if (error.response && error.response.status === 422) {
              toast.error(t("Failed! Invalid email or password"));
            } else {
              toast.warn(t("Failed! You already have an account"));
            }
          });
      } catch (err) {
        console.log(err);
        toast.warn(t("Internal server error!"));
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.warn(t("Password doesn't match!"));
    }
  };

  const [navbarHeight, setNavbarHeight] = useState<number>(0);
  useEffect(() => {
    if (navbarRef.current) {
      const height = navbarRef.current.offsetHeight;
      console.log("height ===>L ", height);
      setNavbarHeight(height);
    }
  }, []);

  const [logo, setLogo] = useState<string>();
  const [lockIcon, setLockIcon] = useState<string>(lockIconLight);
  const [mailIcon, setMailIcon] = useState<string>(mailIconLight);
  const [quoteIcon, setQuoteIcon] = useState<string>();

  const themeAtomValue = useAtomValue(themeAtom);
  useEffect(() => {
    setLogo(themeAtomValue === "dark" ? logoDark : logoLight);
    setLockIcon(themeAtomValue === "dark" ? lockIconDark : lockIconLight);
    setMailIcon(themeAtomValue === "dark" ? mailIconDark : mailIconLight);
    setQuoteIcon(themeAtomValue === "dark" ? quoteIconDark : quoteIconLight);
  }, [themeAtomValue]);

  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden dark:bg-dark dark:text-white bg-white text-dark lg:gap-0 ">
      {/* backgrounod point */}
      <img
        src={bgPoint}
        alt="BackgroundPoint"
        className="w-full h-full bg-cover"
      />

      <div className="absolute w-full h-full inset-0 flex flex-row items-center justify-center">
        {/* left half section */}
        <div className="relative w-full lg:w-1/2 h-full">
          {/* navbar section */}
          <div
            className="flex justify-between w-full top-0 p-9"
            ref={navbarRef}
          >
            <img src={logo} alt="Logo" className="w-[161px] h-[49px]" />

            <div className="flex w-fit items-center justify-center space-x-5">
              <span className="hidden sm:block">
                <ThemeToggleButton />
              </span>
              <p className="flex items-center cursor-pointer text-[16px]  space-x-5">
                <span className="text-center hidden sm:flex justify-center">
                  {t("Already have an account?")}{" "}
                </span>

                <div className="w-fit h-full">
                  <GeneralButtonWithCss
                    onClick={handleSignin}
                    className="w-[73px] h-[32px] text-[16px]"
                  >
                    <span className="dark:opacity-50 opacity-100">
                      {t("Sign in")}
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
              className="p-6 rounded-2xl h-fit dark:shadow-md overflow-auto mb-[50px]"
            >
              <h1 className="text-[40px] w-full text-center">
                {t("Create a new account")}
              </h1>

              <p className="opacity-[60%] tracking-normal text-center">
                {t("Enter your details to register.")}
              </p>

              {/* google login button */}
              <button
                type="submit"
                className="flex justify-center items-center w-full my-4 h-auto py-3 dark:border-none border border-dark dark:bg-[#1B1B1B] dark:text-white bg-white text-dark font-bold p-2"
                onClick={() => handleGoogleLogin()}
              >
                <img src={googleIcon} alt="" className="w-7 h-7 mr-2" />
                {t("CONTINUE WITH GOOGLE")}
              </button>

              {/* line */}
              <div className="relative flex items-center justify-center w-full border-b  dark:border-[#E1E4EA] my-3">
                <div className="absolute px-2 dark:bg-[#040B08] bg-white w-fit h-fit">
                  OR
                </div>
              </div>

              <div className="mb-4">
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
                    placeholder={t("Email Address")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="tracking-normal opacity-[60%] dark:placeholder-[#FFFFFF] placeholder-[#676767] text-sm mt-1 block w-full p-2 pl-10 border border-gray-700 dark:bg-[#1B1B1B]  focus:outline focus:outline-gray-500 focus:border-none"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[24px]" htmlFor="password">
                  {t("Password")}
                </label>

                <div className="relative">
                  <img
                    src={lockIcon}
                    alt="LockIcon"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  />
                  <input
                    type="password"
                    id="password"
                    placeholder={t("• • • • • • • • • • ")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="tracking-normal opacity-[60%] dark:placeholder-[#FFFFFF] placeholder-[#676767] text-sm mt-1 block dark:bg-[#1B1B1B] w-full p-2 pl-10 border border-gray-700 focus:outline focus:outline-gray-500 focus:border-none"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[24px]" htmlFor="confirm-password">
                  {t("Confirm Password")}
                </label>

                <div className="relative">
                  <img
                    src={lockIcon}
                    alt="LockIcon"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  />
                  <input
                    type="password"
                    id="password"
                    placeholder={t("• • • • • • • • • • ")}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="opacity-[60%] dark:placeholder-[#FFFFFF] placeholder-[#676767] text-sm mt-1 block w-full p-2 pl-10 border border-gray-700 dark:bg-[#1B1B1B]  focus:outline focus:outline-gray-500 focus:border-none"
                    required
                  />
                </div>
              </div>

              <div className="w-full flex justify-start h-auto mt-12">
                <GeneralButtonWithCss
                  onClick={() => handleRegister()}
                  blur={true}
                  className="text-[14px] sm:text-[18px]  h-[37px] w-full sm:h-[56px] dark:bg-dark"
                  enableBackgroundAtTheBeginning={false}
                  enableHoverEffect={true}
                >
                  {isLoading ? (
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
                    <span className="tracking-wide">{t("Register")}</span>
                  )}
                </GeneralButtonWithCss>
              </div>

              <div className="mt-4 w-full flex flex-col justify-center items-center gap-5"></div>
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
        <div className="hidden lg:block p-[2px] bg-gradient-to-r from-[#1CCDE5] via-[#9DD373] to-[#DBD633] w-[57%] h-[99%] rounded-xl mr-1">
          <div className="relative bg-gradient-to-tr dark:from-[#1d5e57] dark:via-[#425533] dark:to-[#5e5d1f]  w-full h-full  rounded-xl">
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
    </div>
  );
};

export default SignupView;

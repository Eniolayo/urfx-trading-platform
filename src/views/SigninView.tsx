import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useSelector } from "@/app/store";
import { env } from "@/config/env";
import {
  balanceAtom,
  feeAtom,
  platformAtom,
  themeAtom,
  userAtom,
} from "@/store/atoms";
import { jwtDecode } from "jwt-decode"; // Corrected import
import { User } from "@/types";
import googleIcon from "/src/assets/SigninView/google-icon.svg";
import { useTranslation } from "react-i18next"; // Import translation hook
import logoDark from "/src/assets/Navbar/dark-logo.png";
import logoLight from "/src/assets/Navbar/light-logo.png";
import ThemeToggleButton from "@/components/themeToggle/ThemeToggleButton";
import mailIconDark from "/src/assets/SigninView/mail-icon-dark.svg";
import mailIconLight from "/src/assets/SigninView/mail-icon-light.svg";
import lockIconDark from "/src/assets/SigninView/lock-icon-dark.svg";
import lockIconLight from "/src/assets/SigninView/lock-icon-light.svg";
import { useRef } from "react";
import quoteIconDark from "/src/assets/SigninView/quote-icon-dark.svg";
import quoteIconLight from "/src/assets/SigninView/quote-icon-light.svg";
import avatar from "/src/assets/SigninView/avatar.svg";
import GeneralButtonWithCss from "@/components/landing/GeneralButtonWithCss";
import laptop from "/src/assets/SigninView/laptop.webp";
import VectorLogo from "/src/assets/SigninView/logo-vector.webp";
import LanguageSelectButton from "@/components/LanguageSelectButton";

const SigninView: React.FC = () => {
  const navbarRef = useRef<HTMLDivElement>(null); // Create a ref for the navbar
  const { t } = useTranslation(); // Initialize translation hook
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [balance] = useAtom(balanceAtom);
  const [platform] = useAtom(platformAtom);
  const [fee] = useAtom(feeAtom);
  const setUserInfoGlobal = useSetAtom(userAtom);
  const metaAccounts = useSelector((state) => state.metaAccount.accounts);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (googleLoading) return;
      try {
        setGoogleLoading(true);
        const response = await axios.post(`${env.BASE_URL}/auth/google`, {
          access_token: tokenResponse.access_token,
        });
        localStorage.setItem("token", response.data.token);
        toast.success(t("Successfully joined!"));
        const newUser = jwtDecode<User>(response.data.token);
        setUserInfoGlobal(newUser);
        if (balance && platform && fee) {
          if (Array.isArray(metaAccounts) && metaAccounts.length <= 0) {
            navigate("/");
          }
          navigate("/user/dashboard");
          return;
        }
        navigate("/");
      } catch (error) {
        console.error("Error during authentication:", error);
        toast.warn(t("Error during authentication!"));
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => {
      console.error("Google login failed");
      toast.warn(t("Google login failed!"));
    },
  });
  const handleLogin = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const response = await axios.post(`${env.BASE_URL}/auth/login`, {
        email: email,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      toast.success(t("Successfully Joined!"));
      if (balance && platform && fee) {
        if (Array.isArray(metaAccounts) && metaAccounts.length <= 0) {
          navigate("/");
        }
        navigate("/user/dashboard");
        return;
      }
      navigate("/");
    } catch (error) {
      console.error("Error during authentication: ", error);

      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 400:
            toast.warn(
              data.message || t("Invalid request.  Please check your input")
            );
            break;
          case 401:
            toast.warn(
              data.message || t("Invalid email or password.  Please try again.")
            );
            break;
          case 403:
            toast.warn(
              data.message ||
                t("You don't have permission to access this resources.")
            );
            break;
          case 404:
            toast.warn(
              data.message || t("The requested resource was not found.")
            );
            break;
          case 500:
            toast.error(
              data.message || t("Server error. Please try again later.")
            );
            break;
          default:
            toast.warn(
              data.message ||
                t("An unexpected error occurred. Please try again.")
            );
        }
      } else {
        toast.error(
          t(
            "No response from the server. Please check your network connection."
          )
        );
        console.error("Non-Axios error details:", error);

        toast.error(t("An unexpected error occurred. Please try again."));
      }
    } finally {
      setLoading(false);
    }
  };

  // const handleLogin = async () => {
  //   if (loading) return;
  //   try {
  //     setLoading(true);

  //     // Only allow login for testuser@gmail.com and password 123456
  //     if (email !== "testuser@gmail.com" || password !== "123456") {
  //       toast.error(t("Invalid email or password. Please try again."));
  //       return;
  //     }

  //     // Simulate API delay
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     // Generate JWT structure (header.payload.signature)
  //     const header = {
  //       alg: "HS256",
  //       typ: "JWT",
  //     };

  //     const payload = {
  //       email: email,
  //       name: "John Doe",
  //       role: "user",
  //       exp: Math.floor(Date.now() / 1000) + 60 * 60, // expires in 1 hour
  //     };

  //     const base64Encode = (obj: any) =>
  //       btoa(JSON.stringify(obj))
  //         .replace(/=/g, "")
  //         .replace(/\+/g, "-")
  //         .replace(/\//g, "_");

  //     const fakeToken = `${base64Encode(header)}.${base64Encode(
  //       payload
  //     )}.dummy-signature`;

  //     // Store in localStorage
  //     localStorage.setItem("token", fakeToken);
  //     localStorage.setItem("user", JSON.stringify(payload));

  //     toast.success(t("Successfully Joined!"));

  //     // Simulated data for condition
  //     const balance = 100;
  //     const platform = "Web";
  //     const fee = 5;
  //     const metaAccounts: any = [];

  //     if (balance && platform && fee) {
  //       if (Array.isArray(metaAccounts) && metaAccounts.length <= 0) {
  //         navigate("/");
  //         return;
  //       }
  //       navigate("/user/dashboard");
  //       return;
  //     }

  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error in fake login: ", error);
  //     toast.error(t("An unexpected error occurred. Please try again."));
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const [logo, setLogo] = useState<string>();
  const themeAtomValue = useAtomValue(themeAtom);
  const [quoteIcon, setQuoteIcon] = useState<string>();
  // height calculation dynamically
  useEffect(() => {
    if (navbarRef.current) {
      const height = navbarRef.current.offsetHeight;
      console.log("height ===>L ", height);
      setNavbarHeight(height);
    }
  }, []);

  const [navbarHeight, setNavbarHeight] = useState<number>(0);
  const [mailIcon, setMailIcon] = useState<string>();
  const [lockIcon, setLockIcon] = useState<string>();
  useEffect(() => {
    setLogo(themeAtomValue === "dark" ? logoDark : logoLight);
    setMailIcon(themeAtomValue === "dark" ? mailIconDark : mailIconLight);
    setLockIcon(themeAtomValue === "dark" ? lockIconDark : lockIconLight);
    setQuoteIcon(themeAtomValue === "dark" ? quoteIconDark : quoteIconLight);
  }, [themeAtomValue]);

  return (
    <div className="relative  w-full h-screen flex  justify-center items-center overflow-hidden dark:bg-dark dark:text-white bg-white text-dark lg:gap-0 ">
      {/* Gradient Point Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-soft-radial-green dark:opacity-70 opacity-0" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-soft-radial-blue dark:opacity-60 opacity-0" />

      <div className="flex flex-row h-full w-full items-center justify-center z-20">
        <div className="relative w-full sm:w-1/2 h-full">
          {/* navbar section */}
          <div
            className="flex justify-between w-full top-0 p-3 sm:p-9 "
            ref={navbarRef}
          >
            <img src={logo} alt="Logo" className="w-[161px] h-[49px] " />

            <div className="flex w-fit items-center justify-center space-x-5">
              <span className="hidden sm:block"><ThemeToggleButton /></span>
              <div className="flex items-center cursor-pointer text-[16px]  space-x-5">
                <span className="text-center hidden sm:flex justify-center ">
                  {t("Don't have an account?")}{" "}
                </span>

                <div className="w-fit h-full">
                  <GeneralButtonWithCss
                    onClick={handleSignup}
                    className="w-[73px] h-[32px] text-[16px]"
                  >
                    <span className="dark:opacity-50 opacity-100">{t("Sign up")}</span>
                  </GeneralButtonWithCss>
                </div>
              </div>
            </div>
          </div>

          {/* transparent border */}
          <div className="h-[0.5px] w-full bg-gradient-to-r from-transparent via-white/65 to-transparent"></div>

          {/* Form Section */}
          <div
            className="w-full flex flex-col items-center justify-around top-0"
            style={{ height: `calc(100vh - ${navbarHeight}px)` }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-6 rounded-2xl h-fit dark:shadow-md"
            >
              <div className="mb-10 mt-6">

                <h1 className="text-[32px] sm:text-[40px] w-full text-center">
                  {t("Login to your account")}
                </h1>

                <p className="opacity-[60%] font-thin tracking-wider text-center">
                  {t("Enter your details to login")}
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-[19px] sm:text-[24px]" htmlFor="email">
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
                    placeholder={t("hello@playerprofit.com")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="opacity-[60%] rounded-xl dark:placeholder-[#FFFFFF] placeholder-[#676767] text-sm mt-1 block w-full p-3 sm:p-2 pl-10 sm:pl-10 border border-gray-700 dark:bg-[#302F19] focus:outline focus:outline-gray-500 focus:border-none"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[19px] sm:text-[24px]" htmlFor="password">
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
                    className="opacity-[60%] rounded-xl dark:placeholder-[#FFFFFF] placeholder-[#676767] text-sm mt-1 block w-full p-3 sm:p-2 pl-10 sm:pl-10 border border-gray-700 dark:bg-[#302F19] focus:outline focus:outline-gray-500 focus:border-none"
                    required
                  />
                </div>

                <div className="w-full flex flex-row justify-between items-center mt-5 z-50 ">
                  <div className="flex items-center font-outfit">
                    <input
                      type="checkbox"
                      id="remember-me"
                      className="mr-2 size-[14px] dark:appearance-none border border-[#43422D]  dark:custom-checkbox"
                    />
                    <label
                      htmlFor="remember-me"
                      className="text-[13px] opacity-60 tracking-normal font-outfit"
                    >
                      {t("Keep me logged in")}
                    </label>
                  </div>

                  <Link
                    to="/forgot-password"
                    className="text-[#9D9E9E] text-sm flex-end underline font-outfit"
                  >
                    {t("Forgot password")}
                  </Link>
                </div>

              </div>

              <div className="w-full flex justify-start h-auto ">
                <GeneralButtonWithCss
                  onClick={() => handleLogin()}
                  blur={true}
                  className="text-[14px] sm:text-[18px]  h-[37px] w-full sm:h-[42px] dark:bg-gradient-to-r dark:from-[#12555A] dark:via-[#446035] dark:to-[#5C5F1B]"
                  enableBackgroundAtTheBeginning={false}
                  enableHoverEffect={true}
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
                    <span className="tracking-wide">{t("Login")}</span>
                  )}
                </GeneralButtonWithCss>
              </div>

              <div className="mt-4 w-full flex flex-col justify-center items-center gap-5">
                <div>
                  <p className="text-gray-600">{t("Or")}</p>
                </div>
                <button
                  type="submit"
                  className="flex justify-center items-center w-full mt-0 my-4 h-auto py-3 dark:border-none border border-dark dark:bg-[#1B1B1B] dark:text-white bg-white text-dark font-bold p-2"
                  onClick={() => handleGoogleLogin()}
                >
                  {googleLoading ? (
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
                    <>
                      <img
                        src={googleIcon}
                        alt="GoogleIcon"
                        className="w-7 h-7 mr-2"
                      />
                      {t("CONTINUE WITH GOOGLE")}
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="absolute bottom-2 flex justify-between w-full h-fit px-2">
              <div className="flex items-center"><span>© 2025 URFX</span></div>
              <LanguageSelectButton />
            </div>
          </div>
        </div>

        {/* Half Background Image Section */}
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

            <div className="absolute p-10 pt-20">
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

      {/* <div className="absolute border border-secondary flex items-end justify-start w-full h-full p-7">
        <span>© 2025 URFX</span>
      </div> */}

      {/* <div className="absolute inset-0 border border-red-600 flex items-end justify-start w-[46%] h-full p-7">
        <span className="w-full border border-secondary flex justify-end">
          <LanguageSelectButton />
        </span>
      </div> */}
    </div>
  );
};

export default SigninView;

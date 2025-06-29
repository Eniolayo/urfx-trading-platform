import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import { jwtDecode } from "jwt-decode";
// import { LogIn, UserRoundPlus } from "lucide-react";
import { useSetAtom, useAtom } from "jotai";
import {
  addOnsAtom,
  balanceAtom,
  challengeAtom,
  feeAtom,
  navbarHeightAtom,
  platformAtom,
  profileAtom,
  userAtom,
} from "@/store/atoms";
import LanguageSelectButton from "./LanguageSelectButton";
import {
  FaCircleChevronRight,
  FaCircleChevronLeft,
  FaBars,
} from "react-icons/fa6";
import axios from "@/utils/api";
import { env } from "@/config/env";
import SideMenuMini from "./user/SideMenuMini";
import { adminEmails } from "@/utils/format";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import ThemeToggleButton from "./themeToggle/ThemeToggleButton";
import Logo from "./common/Logo";
import GeneralButtonWithCss from "./landing/GeneralButtonWithCss";

export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogo = () => {
    navigate("/");
  };
  const [token, setToken] = useState<string>("");
  const setAccountBalance = useSetAtom(balanceAtom);
  const setProfileGlobal = useSetAtom(profileAtom);
  const setPlatform = useSetAtom(platformAtom);
  const setFee = useSetAtom(feeAtom);
  const setChallenge = useSetAtom(challengeAtom);
  const setAddOns = useSetAtom(addOnsAtom);
  const [userInfoGlobal, setUserInfoGlobal] = useAtom(userAtom);
  const [openSideMenu, setOpenSideMenu] = useState<boolean>(false);
  const [user] = useAtom(userAtom);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);

    if (hambergerRef.current) {
      const rect = hambergerRef.current.getBoundingClientRect();
      let dropdownLeft = rect.left;
      const dropdownWidth = 120;
      const viewportWidth = window.innerWidth;

      if (dropdownLeft + viewportWidth > viewportWidth) {
        dropdownLeft = viewportWidth - dropdownWidth - 10;
      }

      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: dropdownLeft,
      });

      console.log("Hamberger Rect:=====>", rect);
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("token") || "";
    const accountBalance = localStorage.getItem("balance") || "";
    const platform = localStorage.getItem("platform") || "mt4";
    const fee = localStorage.getItem("fee") || "";
    const challenge = localStorage.getItem("challenge") || "";
    const addOns = localStorage.getItem("addOns") || "";
    if (userToken) {
      setToken(userToken);
      setUserInfoGlobal(jwtDecode(userToken));
    }
    if (accountBalance) {
      setAccountBalance(Number(accountBalance));
    }
    if (platform) {
      setPlatform(platform);
    }
    if (fee) {
      setFee(Number(fee));
    }
    if (challenge) {
      setChallenge(challenge);
    }
    if (addOns) {
      setAddOns(JSON.parse(addOns));
    }

    localStorage.setItem("email", userInfoGlobal?.email || "");
  }, []);

  // calculation of the Navbar height
  const navbarRef = useRef<HTMLElement>(null);
  const setNavbarHeight = useSetAtom(navbarHeightAtom);

  useEffect(() => {
    if (navbarRef.current) {
      const height = navbarRef.current.offsetHeight;
      setNavbarHeight(height);
    }
  });

  useEffect(() => {
    if (userInfoGlobal) {
      axios
        .post(`${env.BASE_URL}/profile/get`, { email: userInfoGlobal?.email })
        .then((res) => {
          setUserInfoGlobal(res.data.data.user);
          setProfileGlobal((prev) => ({
            ...prev,
            ...res.data.data.profile,
            email: res.data.data.email,
            userName: res.data.data.profile.publicUserName,
            phone: res.data.data.user.phone,
          }));
        });
    }
  }, [userInfoGlobal?.email]);

  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
  });

  const handleOpenSideMenu = () => {
    setOpenSideMenu(!openSideMenu);
  };
  const getFirstLetterUppercase = (str: string) => {
    if (str.length === 0) return "U";
    return str.charAt(0).toUpperCase();
  };
  const handleSignin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };

  const handleDashboardButton = () => {
    if (user?.email && adminEmails.includes(user.email)) {
      navigate("/admin");
    } else if (user?.email) {
      navigate("/user");
    } else {
      toast.warn("Please login first.");
      navigate("/dashboard");
    }
  };
  const hambergerRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  return (
    <nav
      className="relative w-full backdrop-blur-sm dark:bg-[#070707]  dark:text-white text-black bg-[#F5F5F5]  border-b border-dark-300/50 z-50 py-5 lg:px-16 px-10 2k:py-6 2k:lg:px-32 2k:px-20"
      ref={navbarRef}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex w-fit justify-center items-center">
          <div className="h-auto mr-4 2k:mr-8" onClick={handleLogo}>
              <Logo />
          </div>
          <div className="hidden md:inline w-fit">
            <LanguageSelectButton />
          </div>
        </div>

        <div
          className={`justify-center sm:text-center w-0 lg:flex lg:w-full tracking-wide`}
        >
          <ul
            ref={dropdownRef}
            className={`${
              isDropdownOpen
                ? "absolute flex flex-col dark:bg-[#1A1A1A] dark:text-white bg-white text-dark text-center p-2 rounded-xl space-y-2 2k:p-6 2k:space-y-4"
                : "hidden lg:flex lg:flex-row w-full xl:w-[70%] lg:justify-around max-w-[650px] 2k:max-w-[1024px]"
            }`}
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              // position: isDropdownOpen ? "absolute" : "static", // Ensure proper positioning
            }}
            id="navMenu"
          >
            <li>
              <Link
                to="/"
                className="hover:text-secondary transition-colors duration-300 font-medium lg:text-base 2k:text-[28px] 2k:px-4 2k:font-normal"
              >
                {t("Home")}
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleDashboardButton()}
                className="hover:text-secondary transition-colors duration-300  lg:text-base 2k:text-[28px] font-normal 2k:px-4"
              >
                {t("Dashboard")}
              </button>
            </li>
            <li>
              <Link
                to="/pricing"
                className="hover:text-secondary transition-colors duration-300  lg:text-base 2k:text-[28px] font-normal 2k:px-4"
              >
                {t("Pricing")}
              </Link>
            </li>
            <li>
              <Link
                to="contact-us"
                className="hover:text-secondary transition-colors duration-300  lg:text-base 2k:text-[28px] font-normal 2k:px-4"
              >
                {t("Contact Us")}
              </Link>
            </li>
            <li>
              <Link
                to="about-us"
                className="hover:text-secondary transition-colors duration-300  lg:text-base 2k:text-[28px] font-normal 2k:px-4"
              >
                {t("About Us")}
              </Link>
            </li>
            <li>
              <Link
                to="faq"
                className="hover:text-secondary transition-colors duration-300  lg:text-base 2k:text-[28px] font-normal 2k:px-4"
              >
                {t("FAQs")}
              </Link>
            </li>

            <li
              className={`${
                isDropdownOpen ? "" : "hidden"
              } `}
            >
              <Link
                to="login"
                className="hover:text-secondary  transition-colors duration-300  lg:text-base 2k:text-[30px] 2k:px-4"
              >
                {t("Login")}
              </Link>
            </li>

            <li
              className={`${
                isDropdownOpen ? "" : "hidden"
              } `}
            >
              <Link
                to="signup"
                className="hover:text-secondary  transition-colors duration-300  lg:text-base 2k:text-[30px] 2k:px-4"
              >
                {t("Register")}
              </Link>
            </li>

            <li
              className={`${
                isDropdownOpen ? "" : "hidden"
              }`}
            >
              <span className="">
                <ThemeToggleButton />
              </span>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-4 2k:space-x-8">
          {/* Hamburger Menu for Mobile */}
          <div className="lg:hidden">
            <button
              onClick={toggleDropdown}
              className="text-2xl focus:outline-none 2k:text-4xl mt-2"
              ref={hambergerRef}
            >
              {isDropdownOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <span className="hidden lg:inline">
            <ThemeToggleButton />
          </span>

          {token !== "" ? (
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center space-x-2 p-1.5 text-gray-400 
                       hover:text-white hover:bg-dark-200/50 rounded-lg 
                       transition-all duration-300 2k:p-4 2k:text-2xl"
            >
              {userInfoGlobal?.picture ? (
                <img
                  src={`${
                    userInfoGlobal.picture.includes("uploads")
                      ? env.AVATAR_URL + userInfoGlobal.picture
                      : userInfoGlobal.picture
                  }`}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full border border-accent/50 2k:w-16 2k:h-16 min-w-fit"
                />
              ) : (
                <div className="w-10 h-10 dark:text-white text-black rounded-full border border-accent/50  text-3xl 2k:w-16 2k:h-16 2k:text-5xl">
                  {getFirstLetterUppercase(userInfoGlobal?.email || "")}
                </div>
              )}
            </button>
          ) : (
            <>
              <div className="lg:flex justify-center items-center gap-4 hidden 2k:gap-8">
                <div className="w-full h-full">
                  <GeneralButtonWithCss
                    onClick={handleSignin}
                    className="min-w-[106px] min-h-[41px] 2k:w-[180px] 2k:h-[60px] 2k:text-3xl"
                    bgClassName="dark:bg-[#1A1A1A] dark:bg-none bg-gradient-to-r from-[#7DDEE9] via-[#BBE0A5] to-[#E4E389]"
                  >
                    {t("Login")}
                  </GeneralButtonWithCss>
                </div>

                <div className="w-full h-full ">
                  <GeneralButtonWithCss
                    onClick={handleSignup}
                    className="min-w-[106px] min-h-[41px] w-full h-full 2k:w-[180px] 2k:h-[60px] 2k:text-3xl"
                    bgClassName="dark:bg-[#1A1A1A] dark:bg-none bg-gradient-to-r from-[#7DDEE9] via-[#BBE0A5] to-[#E4E389]"
                  >
                    {t("Register")}
                  </GeneralButtonWithCss>
                </div>
              </div>
              <div className="flex justify-center items-center gap-4 lg:hidden"></div>
            </>
          )}
        </div>
      </div>

      {token !== "" && (
        <UserMenu
          isOpen={isMenuOpen}
          email={userInfoGlobal?.email || ""}
          picture={
            userInfoGlobal?.picture
              ? userInfoGlobal.picture.includes("uploads")
                ? env.AVATAR_URL + userInfoGlobal.picture
                : userInfoGlobal.picture
              : ""
          }
          onClose={() => setIsMenuOpen(false)}
        />
      )}

      {token !== "" && !adminEmails.includes(user?.email ?? "") && (
        <div>
          <div className="absolute left-0 -bottom-4 flex lg:hidden">
            {!openSideMenu && (
              <button
                className="bg-dark-50 rounded-full border border-dark-400"
                onClick={handleOpenSideMenu}
              >
                <FaCircleChevronRight className="w-6 h-6 m-1" />
              </button>
            )}
            {openSideMenu && (
              <button
                className="bg-dark-50 rounded-full border border-dark-400"
                onClick={handleOpenSideMenu}
              >
                <FaCircleChevronLeft className="w-6 h-6 m-1" />
              </button>
            )}
          </div>
          <SideMenuMini
            isOpen={openSideMenu}
            onClose={() => setOpenSideMenu(false)}
          />
        </div>
      )}

      {!userInfoGlobal?.emailVerified && userInfoGlobal?.id && (
        <div
          className="relative w-full rounded-xl p-2 cursor-pointer text-center bg-red-600"
          onClick={() => navigate("/email-verify")}
        >
          {t("Verify your email to get started.")}
        </div>
      )}
    </nav>
  );
}

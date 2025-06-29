import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { RotatingLines } from "react-loader-spinner";
import { useTranslation } from "react-i18next";
// import { Mail, PhoneCall, Send } from "lucide-react";
import { env } from "@/config/env";
import { formatPhoneNumber } from "@/utils/format";
import axios from "@/utils/api";
import { toast } from "react-toastify";
import Footer from "../Footer";
import ContactUsHeaderBgDark from "/src/assets/Contactus/contact-us-header-bg-dark.svg";
import ContactUsHeaderBgLight from "/src/assets/Contactus/contact-us-header-bg-light.svg";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/store/atoms";
import sendMessageButtonBgDark from "/src/assets/Contactus/send-message-button-bg-dark.svg";
import sendMessageButtonBgLight from "/src/assets/Contactus/send-message-button-bg-light.svg";
import emailIcon from "/src/assets/Contactus/email-icon.svg";
import phoneIcon from "/src/assets/Contactus/phone-icon.svg";
import telegramIcon from "/src/assets/Contactus/telegram-icon.svg";
// import { telegram } from "@/api/telegram";


interface ContactProps {
  email: string;
  name: string;
  subject?: string;
  message: string;
}

export default function ContactUs() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactProps>({
    email: "",
    name: "",
    subject: "",
    message: "",
  });

  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // const contactUsTitle = document.getElementById("contactUs");
    // if (contactUsTitle) {
    //   contactUsTitle.scrollIntoView({ behavior: "smooth" });
    // }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const { mutate, status } = useMutation({
    mutationFn: async (data: ContactProps) => {
      const response = await axios.post("/service/contact", data);
      return response;
    },
    onSuccess: () => {
      setFormData({ email: "", name: "", subject: "", message: "" }); // Reset form
      toast.success(
        t("Message sent successfully! We will get back to you soon.")
      );
    },
    onError: (error: any) => {
      console.error("Error sending message: ", error);
      toast.warning(t("Failed to send message. Please try again."));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  const themeAtomValue = useAtomValue(themeAtom);
  const [contactUsBgImage, setContactUsBgImage] = useState<string>();
  const [sendMessageButtonBg, setSendMessageButtonBg] = useState<string>();

  useEffect(() => {
    setContactUsBgImage(
      themeAtomValue == "dark" ? ContactUsHeaderBgDark : ContactUsHeaderBgLight
    );

    setSendMessageButtonBg(
      themeAtomValue === "dark" ? sendMessageButtonBgDark : sendMessageButtonBgLight
    )
  });


  return (
    <div
      className="h-full w-full dark:bg-dark dark:text-white bg-white text-black"
      id="contactUs"
    >
      {/* Header Background */}
      <div className="relative w-full">
        <img
          src={contactUsBgImage}
          alt="ContactUsBackgroundImage"
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 left-0 w-full h-full text-[48px] font-bold">
          <span className="w-fit h-fit">Contact Us</span>
          <span className="w-fit h-fit text-[18px] text-center">
            {t("Got a question? Need help with your account or challenge?")}{" "}
            <br />
            {t("We’re here for you.")}
          </span>
        </div>
      </div>

      <div className="py-16 px-2 sm:px-6 lg:px-6 animate-gradient-disclaimer">
        {/* Contact Sections */}
        <div className="space-y-8 w-full">
          <div className="flex justify-center items-start">
            <div className="w-[40%]">
              <section
                ref={(el) => {
                  sectionsRef.current[0] = el;
                }}
                className="flex justify-start  section-reveal rounded-2xl  backdrop-blur-sm transform transition-all duration-300"
              >
                <div className="space-y-6">
                  <div className="p-6 rounded-lg">
                    <div className="flex items-center gap-x-3 mb-1">
                      <img src={emailIcon} alt="EmailIcon" />
                      <h3 className="text-2xl font-semibold">
                        {t("Email Support")}
                      </h3>
                    </div>

                    <p className="">
                      {t("Reach out to us directly at:")}{" "}
                      <a
                        href="mailto:support@urfx.io"
                        className="font-bold bg-clip-text bg-gradient-to-r from-[#25CEDF] via-[#9DD474] to-[#D8D637]"
                      >
                        support@urfx.io
                      </a>
                    </p>
                    <p className="">
                      {t("Average response time: under 24 hours")}
                    </p>
                  </div>
                  <div className=" p-6 rounded-lg">
                    <div className="flex items-center gap-x-3 mb-1">
                      <img src={phoneIcon} alt="PhoneIcon" />
                      <h3 className="text-2xl font-semibold">
                        {t("Phone Support")}
                      </h3>
                    </div>
                    <p className="">
                      {t("Got something urgent? Give us a call:")}{" "}
                      <Link
                        to={`tel:${env.PHONE_NUMBER}`}
                        className="font-bold bg-clip-text bg-gradient-to-r from-[#25CEDF] via-[#9DD474] to-[#D8D637]"
                      >
                        {formatPhoneNumber(env.PHONE_NUMBER)}
                      </Link>
                    </p>
                  </div>
                  <div className="  p-6 rounded-lg ">
                    <div className="flex items-center gap-x-3 mb-1">
                      <img src={telegramIcon} alt="TelegramIcon" />
                      <h3 className="text-2xl font-semibold ">
                        {t("Telegram Support")}
                      </h3>
                    </div>
                    <p className="">
                      {t("Chat with a live support rep via Telegram:")}{" "}
                      <Link
                        to={env.TELEGRAM_SUPPORT}
                        target="_blank"
                        className="font-bold bg-clip-text bg-gradient-to-r from-[#25CEDF] via-[#9DD474] to-[#D8D637]"
                      >
                        t.me/urfxsupport
                      </Link>
                    </p>
                  </div>
                  {/* <div className=" p-6 rounded-lg ">
                    <div className="flex items-center gap-x-3 mb-1">
                      <img
                        src="/image/discord.svg"
                        className="inline rounded-full text-secondary opacity-80 p-2 size-10 bg-[#ffffff1a]"
                      />
                      <h3 className="text-2xl font-semibold text-white ">
                        {t("Discord Community & Support")}
                      </h3>
                    </div>
                    <p className="text-white/70">
                      {t(
                        "Join our growing Discord community for real-time help, trader discussions, and exclusive updates:"
                      )}{" "}
                      <Link
                        to={env.DISCORD_COMMUNITY}
                        target="_blank"
                        className="text-secondary underline"
                      >
                        {t("Join URFX Discord")}
                      </Link>
                    </p>
                  </div> */}
                </div>
              </section>
            </div>

            <section
              ref={(el) => {
                sectionsRef.current[1] = el;
              }}
              className="section-reveal dark:bg-gradient-to-r dark:from-[#1D200F] dark:via-[#1B2416] dark:to-[#112720] bg-gradient-to-r from-[#1ECDE4] via-[#97D479] to-[#D9D636] bg-opacity-50 w-[40%] p-8 backdrop-blur-sm transform transition-all duration-300"
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    className="block font-bold mb-2 text-[24px]"
                    htmlFor="fullName"
                  >
                    {t("Full Name")}{" "}
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Full Name"
                    className="w-full p-3 dark:bg-[#272E22] bg-[#8FC56F]"
                    value={formData?.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    className="block font-bold mb-2 text-[24px]"
                    htmlFor="email"
                  >
                    {t("Email Address")}{" "}
                  </label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    id="email"
                    className="w-full p-3 dark:bg-[#272E22] bg-[#8FC56F]"
                    value={formData?.email || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    className="block font-bold mb-2 text-[24px]"
                    htmlFor="subject"
                  >
                    {t("Subject")}
                  </label>
                  <input
                    type="text"
                    placeholder="Subject"
                    id="subject"
                    className="w-full p-3 dark:bg-[#272E22] bg-[#8FC56F]"
                    value={formData?.subject || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    className="block  font-bold mb-2 text-[24px]"
                    htmlFor="message"
                  >
                    {t("Message")}{" "}
                  </label>
                  <textarea
                    id="message"
                    placeholder="Message..."
                    rows={5}
                    className="w-full p-3 dark:bg-[#272E22] bg-[#8FC56F]"
                    value={formData?.message || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="text-center justify-start flex"
                  disabled={status === "pending"}
                >
                  {status === "pending" ? (
                    <RotatingLines
                      key="contactUs"
                      width={"32"}
                      strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                    />
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img src={sendMessageButtonBg} alt="ButtonBg" className="w-full h-full "/>
                      <div className="absolute flex justify-center items-center text-center"><span>{t("Send Message")}</span></div>
                    </div>
                  )}
                </button>
              </form>
            </section>
          </div>

          {/* <div className="flex flex-col w-full justify-center items-center">
            <section
              ref={(el) => {
                sectionsRef.current[2] = el;
              }}
              className="section-reveal bg-black bg-opacity-50 w-[80%]  rounded-2xl p-8 transform  transition-all duration-300"
            >
              <h2 className="text-3xl font-bold text-secondary mb-4">
                {t("Need Instant Help?")}
              </h2>
              <p className="text-white/70">
                {t(
                  "At URFX, trader support is our top priority. Whether you’re facing a technical issue, need guidance through your funded journey, or just want to say hi, we’re just one message away."
                )}
                {t(
                  "Before reaching out, make sure to check our Help Center and FAQ Page for quick answers to common questions."
                )}
              </p>
            </section>

            <section
              ref={(el) => {
                sectionsRef.current[3] = el;
              }}
              className="section-reveal bg-black bg-opacity-50 w-[80%] rounded-2xl p-8 backdrop-blur-sm transform transition-all duration-300"
            >
              <h2 className="text-3xl font-bold text-secondary mb-4">
                {t("Trade Confidently, Backed by Real Support.")}
              </h2>
              <p className="text-white/70">
                {t(
                  "URFX isn’t just a prop firm—we’re your partner in the markets. We’re committed to your growth and success, and it all starts with strong communication."
                )}
              </p>
            </section>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

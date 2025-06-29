import CertificateCard from "./CertificateCard";
import certificate1 from "/src/assets/certificate1.webp";
import certificate2 from "/src/assets/certificate2.webp";
import certificate3 from "/src/assets/certificate3.webp";
import certificate4 from "/src/assets/certificate4.webp";
import certificate5 from "/src/assets/certificate5.webp";
import { useTranslation } from "react-i18next";

const CertificateScrollSection = () => {
  const { t } = useTranslation();

  const certificateData = [
    {
      imgURL: certificate1,
      title: "Certificate of PERFORMANCE",
      review: t("certificate-review-1"),
      name: "Jim Kyle Basco",
    },
    {
      imgURL: certificate2,
      title: "Certificate of PAYOUT",
      review: t("certificate-review-2"),
      name: "Jose Satine",
    },
    {
      imgURL: certificate3,
      title: "Certificate of FUNDING",
      review: t("certificate-review-3"),
      name: "Hirotaka Yamamoto",
    },
    {
      imgURL: certificate4,
      title: "Certificate of PAYOUT",
      review: t("certificate-review-4"),
      name: "Prasenjit Saha",
    },
    {
      imgURL: certificate5,
      title: "Certificate of RECOGNITION",
      review: t("certificate-review-5"),
      name: "Maksim Shatov",
    },
  ];
  return (
    <div className="relative w-full h-auto">
      <div className=" text-center mt-20 2k:mt-40 dark:text-white dark:bg-dark text-dark bg-white">
        <h2 className="text-[32px] md:text-[48px] 2k:text-[72px] 2k:leading-[90px] leading-9 md:leading-normal font-bold mb-4">
          {t("Certified Trader Achievements")}
        </h2>
        <p className="text-[14px] sm:text-[18px] 2k:text-[27px] 2k:leading-[36px] tracking-[-0.0001em] text-gray-400 mx-auto">
          {t(
            "Recognizing top traders for their achievements and payouts. These certificates celebrate"
          )}{" "}
          <br />
          {t("dedication, skill, and consistent performance.")}
        </p>
      </div>

      <div
        x-data="{}"
        x-init="$nextTick(() => {
      let ul = $refs.certificate;
      ul.insertAdjacentHTML('afterend', ul.outerHTML);
  })"
        className="pt-[50px] pb-[105px] w-full dark:bg-black dark:text-white bg-white text-black inline-flex flex-nowrap"
      >
        <ul
          x-ref="certificate"
          className=" flex items-center justify-center md:justify-start [&_li]:ml-8 [&_img]:max-w-none animate-infinite-scroll-reverse space-x-7 text-[40px] sm:text-[50px] font-bold"
        >
          <li>
            <CertificateCard
              imgURL={certificateData[0].imgURL}
              title={certificateData[0].title}
              review={certificateData[0].review}
              name={certificateData[0].name}
            />
          </li>
          <li>
            <CertificateCard
              imgURL={certificateData[1].imgURL}
              title={certificateData[1].title}
              review={certificateData[1].review}
              name={certificateData[1].name}
            />
          </li>
          <li>
            <CertificateCard
              imgURL={certificateData[2].imgURL}
              title={certificateData[2].title}
              review={certificateData[2].review}
              name={certificateData[2].name}
            />
          </li>
          <li>
            <CertificateCard
              imgURL={certificateData[3].imgURL}
              title={certificateData[3].title}
              review={certificateData[3].review}
              name={certificateData[3].name}
            />
          </li>
          <li>
            <CertificateCard
              imgURL={certificateData[4].imgURL}
              title={certificateData[4].title}
              review={certificateData[4].review}
              name={certificateData[4].name}
            />
          </li>
        </ul>

        <ul
          x-ref="certificate"
          className=" flex items-center justify-center space-x-7 md:justify-start [&_li]:ml-8 [&_img]:max-w-none animate-infinite-scroll-reverse text-[40px] sm:text-[50px] font-bold"
        >
          <li>
            <CertificateCard
              imgURL={certificateData[0].imgURL}
              title={certificateData[0].title}
              review={certificateData[0].review}
              name={certificateData[0].name}
            />
          </li>
          <li>
            <CertificateCard
              imgURL={certificateData[1].imgURL}
              title={certificateData[1].title}
              review={certificateData[1].review}
              name={certificateData[1].name}
            />
          </li>
          <li>
            <CertificateCard
              imgURL={certificateData[2].imgURL}
              title={certificateData[2].title}
              review={certificateData[2].review}
              name={certificateData[2].name}
            />
          </li>
          <li>
            <CertificateCard
              imgURL={certificateData[3].imgURL}
              title={certificateData[3].title}
              review={certificateData[3].review}
              name={certificateData[3].name}
            />
          </li>
          <li>
            <CertificateCard
              imgURL={certificateData[4].imgURL}
              title={certificateData[4].title}
              review={certificateData[4].review}
              name={certificateData[4].name}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CertificateScrollSection;

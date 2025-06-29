import { useQuery } from "@tanstack/react-query";
import axios from "../utils/api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CertificatesView() {
  const { t } = useTranslation();
  const fetchCertificates = async () => {
    const response = await axios.get("service/get-certificates");
    // console.log("Certificate Response", response.data.result.certificate.split("/")[-1]);
    return response.data.result;
  };
  const { data } = useQuery({
    queryKey: ["certificates"],
    queryFn: fetchCertificates,
  });
  console.log("Certificate Data", data);
  return (
    <div className="p-6">
      <h1 className="text-3xl">{t("Certificates")}</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {Array.isArray(data) && data.length > 0
          ? data.map((certificate: any) => (
              <Link
                key={certificate.id}
                to={`/certificate?hash=${certificate.certificate.split("/")[5]}`}
                target="_blank"
              >
                <img alt={certificate.id} src={certificate.certificate} />
              </Link>
            ))
          : t("No certificates")}
      </ul>
    </div>
  );
}

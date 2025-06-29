import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/api";

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const trackId = searchParams.get("trackId");

  useEffect(() => {
    const getTrackHistory = async () => {
      try {
        if (trackId) {
          const response = await axios.post("payment/get-history", { trackId });
          console.log("track History: ", response);
          if (response?.data?.result?.status === "Paid") {
            toast.success(
              "Successfully paid. Please wait for a while to create new account."
            );
            navigate("/user/dashboard");
          } else {
            toast.success("Confirming payment. Please wait for a while");
            navigate("/");
          }
        } else {
          toast.error("There are some problem while confirming payment");
          navigate("/");
        }
      } catch (error) {
        toast.error("Something wrong!");
      }
    };

    getTrackHistory();
  }, [location]);

  return null; // No need to render anything as we are redirecting
}

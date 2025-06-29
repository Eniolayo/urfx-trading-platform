import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Paypal from "@/components/paypal/Paypal";
import { useNavigate } from "react-router-dom";

export default function PaypalView() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full">
      <div className="relative h-[calc(100vh-80px)] w-full overflow-hidden">
        <AnimatePresence>
          <motion.div
            key="paypal"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5 }}
            className="absolute h-full w-full flex items-center justify-center"
          >
            <Paypal
              onClick={() => {
                navigate("/user/dashboard");
                toast.info("It may take a minute to create a new account");
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

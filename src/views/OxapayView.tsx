import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Oxapay from "../components/oxapay/Oxapay";
import Oxapay2 from "../components/oxapay/Oxapay2";

export default function OxapayView() {
  const [paymentstep1, setPaymentStep1] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  });

  useEffect(() => {
    if (!timeLeft) {
      toast.error("This payment session has expired. Please try again.");
      setPaymentStep1(false);
    }
  }, [timeLeft]);

  return (
    <div className="h-screen w-full">
      <div className="relative h-[calc(100vh-80px)] w-full overflow-hidden">
        <AnimatePresence>
          {!paymentstep1 && (
            <motion.div
              key="oxapay"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5 }}
              className="absolute h-full w-full flex items-center justify-center"
            >
              <Oxapay
                onClick={() => {
                  setPaymentStep1(true);
                  setTimeLeft(30 * 60);
                }}
              />
            </motion.div>
          )}

          {paymentstep1 && (
            <motion.div
              key="oxapay2"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5 }}
              className="absolute h-full w-full flex items-center justify-center"
            >
              <Oxapay2
                expireTime={timeLeft}
                onClick={() => setPaymentStep1(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

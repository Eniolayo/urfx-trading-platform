import "../../style/StyleOxapay.css";
import {
  addOnsAtom,
  balanceAtom,
  challengeAtom,
  feeAtom,
  platformAtom,
  userAtom,
} from "@/store/atoms";
import { useAtomValue } from "jotai";
// import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
// import axios from "@/utils/api";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { env } from "@/config/env";

const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  retries = 3
): Promise<Response> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      if (attempt === retries) {
        throw error; // Throw error if all retries fail
      }
      console.warn(`Retrying... Attempt ${attempt} failed.`);
    }
  }
  throw new Error("Failed after multiple retries");
};

const Paypal = ({ onClick }: { onClick: () => void }) => {
  const fee = useAtomValue(feeAtom);
  const user = useAtomValue(userAtom);
  const platform = useAtomValue(platformAtom);
  const balance = useAtomValue(balanceAtom);
  const challenge = useAtomValue(challengeAtom);
  const addOns = useAtomValue(addOnsAtom);
  // const setPayment = useSetAtom(paymentAtom);

  // const { mutate, status } = useMutation({
  //   mutationFn: async (data: any) => {
  //     const response = await axios.post("payment/white-label/create", data);
  //     return response.data.result;
  //   },
  //   onSuccess: (data) => {
  //     setPayment(data);
  //     onClick();
  //   },
  //   onError: (error: any) => {
  //     console.error("Error sending message: ", error);
  //     toast.warning("Failed to create payment session. Please try again.");
  //   },
  // });

  return (
    <div className="max-w-4xl w-full flex flex-col justify-center items-center mx-3">
      <form className="form gap-11 md:w-2/3 w-full">
        <span className="title">Paypal</span>

        <div className="w-full h-auto">
          <span className="h-auto w-auto text-white/65">
            Amount to pay : ${fee}
          </span>
        </div>

        <div className="login-button">
          <PayPalButtons
            style={{
              shape: "rect",
              layout: "vertical",
              color: "gold",
              label: "pay",
            }}
            fundingSource="paypal"
            createOrder={async () => {
              const token = localStorage.getItem("token");
              try {
                const response = await fetch(`${env.BASE_URL}/payment/orders`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  // use the "body" param to optionally pass additional order information
                  // like product ids and quantities
                  body: JSON.stringify({
                    amount: fee,
                    email: user?.email,
                    platform,
                    challenge,
                    balance,
                    addOns,
                  }),
                });

                const orderData = await response.json();

                if (orderData.id) {
                  return orderData.id;
                } else {
                  const errorDetail = orderData?.details?.[0];
                  const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);

                  throw new Error(errorMessage);
                }
              } catch (error) {
                console.error(error);
                toast.warn(`Could not initiate PayPal Checkout...${error}`);
              }
            }}
            onApprove={async (data, actions) => {
              try {
                const response = await fetch(
                  `${env.BASE_URL}/payment/orders/${data.orderID}/capture`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

                const orderData = await response.json();
                // Three cases to handle:
                //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                //   (2) Other non-recoverable errors -> Show a failure message
                //   (3) Successful transaction -> Show confirmation or thank you message

                const errorDetail = orderData?.details?.[0];

                if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                  return actions.restart();
                } else if (errorDetail) {
                  throw new Error(
                    `${errorDetail.description} (${orderData.debug_id})`
                  );
                } else {
                  const token = localStorage.getItem("token");
                  const transaction =
                    orderData.purchase_units[0].payments.captures[0];
                  toast.success(
                    `Transaction completed by ${orderData.payer.name.given_name} ${orderData.payer.name.surname}`
                  );

                  console.log(
                    "Capture result",
                    orderData,
                    transaction,
                    JSON.stringify(orderData, null, 2)
                  );
                  onClick();
                  try {
                    await fetchWithRetry(
                      `${env.BASE_URL}/payment/orders/${data.orderID}/create`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                  } catch (error) {
                    if (error instanceof Error) {
                      throw new Error(error.message);
                    } else {
                      throw new Error("An unknown error occurred");
                    }
                  }
                }
              } catch (error) {
                console.error(error);
                toast.warn(
                  `Sorry, your transaction could not be processed...${error}`
                );
              }
            }}
          />
          
        </div>

        <div className="texture" />
      </form>
    </div>
  );
};

export default Paypal;

import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App";
import "./i18n";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./index.css";
import { store } from "./app/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const initialOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  // "client-id": "sb",
  // "enable-funding": "venmo",
  // "buyer-country": "US",
  // commit: false,
  // currency: "USD",
  // components: "buttons",
};

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <JotaiProvider>
      <ReduxProvider store={store}>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}
        >
          <PayPalScriptProvider options={initialOptions}>
            <App />
          </PayPalScriptProvider>
        </GoogleOAuthProvider>
      </ReduxProvider>
    </JotaiProvider>
  </QueryClientProvider>
);

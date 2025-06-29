import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ErrorBoundary from "../common/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  },
});

interface AppProvidersProps {
  children: React.ReactNode;
}

const initialOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  // "client-id": "sb",
  // "enable-funding": "venmo",
  // "buyer-country": "US",
  // commit: false,
  // currency: "USD",
  // components: "buttons",
};

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <PayPalScriptProvider options={initialOptions}>
        <QueryClientProvider client={queryClient}>
          <JotaiProvider>{children}</JotaiProvider>
        </QueryClientProvider>
      </PayPalScriptProvider>
    </ErrorBoundary>
  );
}

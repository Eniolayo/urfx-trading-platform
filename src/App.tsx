import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAtom } from "jotai";
import { ToastContainer, Flip } from "react-toastify";

import LandingView from "./views/LandingView";
import DashboardView from "./views/DashboardView";
import AdminViewNew from "./views/AdminViewNew";
import Layout from "./layout";
import SignupView from "./views/SignupView";
import SigninView from "./views/SigninView";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserAccountTable from "./components/admin/UserAccountTable";
import UserLayout from "./layout/UserLayout";
import ComingSoonView from "./views/ComingSoonView";
import ProfileSettingView from "./views/ProfileSettingView";
import UserTradingAccounts from "./components/user/UserTradingAccounts";
import BillingTable from "./components/user/BillingTable";
import PaymentSuccess from "./components/PaymentSuccess";
import { userAtom } from "./store/atoms";
import { adminEmails } from "./utils/format";
import ContactUs from "./components/page/ContactUs";
import AboutUs from "./components/page/AboutUs";
import FAQ from "./components/page/FAQ";
import OxapayView from "./views/OxapayView";
import Disclaimer from "./components/page/Disclaimer";
import TermsAndConditions from "./components/page/TermsAndConditions";
import PrivacyAndPolicy from "./components/page/PrivacyPolicy";
import BecomePartner from "./components/page/BecomeaPartner";
import TradingRules from "./components/page/TradingRules";
import Leaderboard from "./components/user/Leaderboard";
import ForgotPasswordView from "./views/ForgotPasswordView";
import ResetPasswordView from "./views/ResetPasswordView";
import Pricing from "./views/Pricing";
import CertificatesView from "./views/CertificatesView";
import CertificateQRPage from "../src/components/certificateQRpage/CertificateQRPage";
import GetFunded from "./components/getfunded/GetFunded";
import PaypalView from "./views/PaypalView";
import VerifyEmailView from "./views/EmailVerifyView";
import CongratForSignup from "./views/CongratForSignUp";
import CalendarNews from "./components/user/CalendarNews";
import AdminDashboardView from "./views/AdminDashboardView";


function App() {
  function ProtectedAdminAuthRoute({ children }: { children: any }) {
    const [user] = useAtom(userAtom);

    // Check if the user is logged in and if their email is in the adminEmails list
    if (user?.email && adminEmails.includes(user.email)) {
      return <>{children}</>;
    }

    // Redirect non-admin users to the home page
    return <Navigate to="/" />;
  }

  function ProtectedUserAuthRoute({ children }: { children: any }) {
    const [user] = useAtom(userAtom);

    // Check if the user is logged in and if their email is in the adminEmails list
    if (user?.email && !adminEmails.includes(user.email)) {
      return <>{children}</>;
    }

    // Redirect non-admin users to the home page
    return <Navigate to="/" />;
  }

  return (
    <Router>
      <div className="bg-gradient-to-b bg-dark-100 font-creato">
        <main className={`transition-all duration-300 w-full`}>
          <div className="max-w-full mx-auto">
            <Routes>
              {/* //Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedAdminAuthRoute>
                    <AdminViewNew />
                  </ProtectedAdminAuthRoute>
                }
              >
                <Route
                  path=""
                  element={<Navigate to="/admin/dashboard" replace />}
                />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="useraccount" element={<UserAccountTable />} />
              </Route>

              {/*User routes */}
              <Route
                path="/user"
                element={
                  <ProtectedUserAuthRoute>
                    <UserLayout />
                  </ProtectedUserAuthRoute>
                }
              >
                <Route path="" element={<Navigate to="/user/dashboard" />} />
                <Route path="dashboard" element={<DashboardView />} />
                <Route path="billing" element={<BillingTable />} />
                <Route path="account" element={<UserTradingAccounts />} />
                <Route path="calendarnews" element={<CalendarNews />} />
                <Route path="supportteam" element={<ComingSoonView />} />
                <Route path="tradingtool" element={<ComingSoonView />} />
                <Route path="leaderboard" element={<Leaderboard />} />
                <Route path="analyticsview" element={<ComingSoonView />} />
                <Route path="certificates" element={<CertificatesView />} />
                <Route path="academy" element={<ComingSoonView />} />
              </Route>

              {/*Common routes */}
              <Route path="/" element={<Layout />}>
                <Route path="" element={<LandingView />} />
                <Route path="about-us" element={<AboutUs />} />
                <Route path="contact-us" element={<ContactUs />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="disclaimer" element={<Disclaimer />} />
                <Route path="/oxapay" element={<OxapayView />} />
                <Route path="/paypal" element={<PaypalView />} />
                <Route path="admindb" element={<AdminDashboardView />} />

                <Route
                  path="terms-&-conditions"
                  element={<TermsAndConditions />}
                />
                <Route path="privacy-policy" element={<PrivacyAndPolicy />} />
                <Route path="become-a-partner" element={<BecomePartner />} />
                <Route path="trading-rules" element={<TradingRules />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="get-funded" element={<GetFunded />} />
              </Route>

              <Route path="/signup" element={<SignupView />} />
              <Route path="/login" element={<SigninView />} />
              <Route path="/email-verify" element={<VerifyEmailView />} />
              <Route path="/congrat-singup" element={<CongratForSignup />} />
              <Route path="/forgot-password" element={<ForgotPasswordView />} />
              <Route path="/reset-password" element={<ResetPasswordView />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/certificate" element={<CertificateQRPage />} />
              <Route path="/profilesetting" element={<ProfileSettingView />} />

              {/*Redirect route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>
        <ToastContainer
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick={false}
          pauseOnHover={true}
          draggable={true}
          theme="dark"
          transition={Flip}
        />
      </div>
    </Router>
  );
}

export default App;

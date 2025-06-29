import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import { env } from "@/config/env";
import logo from "/logo/5.png";

const ResetPasswordView: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!token) {
      toast.error("Invalid token");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${env.BASE_URL}/auth/reset-password`,
        {
          password,
          token
        }
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error during authentication: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex lg:flex-row flex-col w-full justify-center items-center min-h-screen bg-[#070707] lg:gap-0 gap-4">
      <div className="relative flex w-full justify-center items-center lg:hidden">
        <img src={logo} alt="" className="w-[60%] h-auto" />
      </div>
      <div className="flex flex-col items-center justify-center z-20">
        <form
          onSubmit={handleSubmit}
          className="bg-[#070707] p-6 rounded-2xl shadow-md w-80 border border-[#333333] border-solid"
        >
          <h1 className="text-2xl font-bold mb-4 text-[#666666]">
            Reset New Password
          </h1>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" text-gray-300 placeholder-gray-700 text-sm mt-1 block w-full p-2 border border-gray-700 bg-[#070707] rounded-[10px] border-dashed focus:outline focus:outline-gray-500 focus:border-none"
              required
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className=" text-gray-300 placeholder-gray-700 text-sm mt-1 block w-full p-2 border border-gray-700 bg-[#070707] rounded-[10px] border-dashed focus:outline focus:outline-gray-500 focus:border-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-sm bg-blue-500 text-white p-2 rounded-[20px] hover:bg-blue-600 h-9 flex items-center justify-center"
          >
            {loading ? (
              <>
                <RotatingLines
                  width={"28"}
                  strokeWidth="5"
                  strokeColor="white"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                />
              </>
            ) : (
              "Confirm"
            )}
          </button>
        </form>
      </div>
      <div className="relative lg:flex w-1/2 justify-center items-center hidden">
        <img src={logo} alt="" className="w-[50%] h-auto" />
      </div>
    </div>
  );
};

export default ResetPasswordView;

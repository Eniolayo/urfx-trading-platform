import { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { userAtom, profileAtom } from "@/store/atoms";
// import { Switch } from "@headlessui/react";
import axios from "../utils/api";
import { env } from "@/config/env";
import Navbar from "@/components/Navbar";
import { Save } from "lucide-react";

interface ProfileSettingViewProps {
  email: string;
  name: string;
  userName: string;
  bio: string;
  publicRole: boolean;
}

export default function ProfileSettingView() {
  const [userInfo] = useAtom(userAtom);
  // const [profileInfo] = useAtom(profileAtom);
  // --------------upload avatar ------------------//
  const [preview] = useState<string | null>(null);
  console.log(preview);

  // -------------------------------------------------------//
  const setProfileGlobal = useSetAtom(profileAtom);
  const setUserInfoGlobal = useSetAtom(userAtom);
  const [formData, setFormData] = useState<ProfileSettingViewProps>({
    email: "",
    name: "",
    userName: "",
    bio: "",
    publicRole: false, // Initialize with default value
  });

  // password
  const tabs = ["Personal Information"];

  const [activeTab, setActiveTab] = useState("Personal Information");


  useEffect(() => {
    if (userInfo != null) {
      setFormData({ ...formData, email: userInfo?.email });
    }
  }, [userInfo?.email]);
  useEffect(() => {
    if (!userInfo) return;
    axios
      .post(`${env.BASE_URL}/profile/get`, { email: userInfo.email })
      .then((res) => {
        setProfileGlobal((prev) => ({
          ...prev,
          ...res.data.data.profile,
          userName: res.data.data.profile.publicUserName,
          publicRole: formData.publicRole,
        }));
        setUserInfoGlobal(res.data.data.user);
        setFormData({
          ...formData,
          ...res.data.data.profile,
          userName: res.data.data.profile.publicUserName,
          email: userInfo.email,
        });
      });
  }, [userInfo?.email]);

  // const handleTogglePublicRole = () => {
  //   setFormData({ ...formData, publicRole: !formData.publicRole });
  // };

  // console.log("---------userInfo----------->", userInfo);
  return (
    <div className="h-screen">
      <Navbar />
      <div className="min-h-screen bg-black text-white p-6">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-700 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium transition-all ${activeTab === tab
                ? "bg-gradient-to-r from-lime-400 to-cyan-400 text-black rounded-t-md"
                : "text-gray-400 hover:text-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Personal Info Form */}
        <div className="space-y-8">
          {/* Client Info */}
          <div className="bg-gradient-to-br from-neutral-900 to-black p-6 rounded-md shadow-inner">
            <h3 className="text-lg font-semibold mb-4">Client</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">First Name</label>
                <input
                  type="text"
                  defaultValue="Juma"
                  className="w-full p-2 bg-neutral-800 border border-gray-700 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Last Name</label>
                <input
                  type="text"
                  defaultValue="Omondi"
                  className="w-full p-2 bg-neutral-800 border border-gray-700 rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Gender</label>
                <select className="w-full p-2 bg-neutral-800 border border-gray-700 rounded-md">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gradient-to-br from-neutral-900 to-black p-6 rounded-md shadow-inner">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Contact Number</label>
                <input
                  type="text"
                  defaultValue="Juma"
                  className="w-full p-2 bg-neutral-800 border border-gray-700 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue="juma.omondi@gmail.com"
                  className="w-full p-2 bg-neutral-800 border border-gray-700 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Country of Residence</label>
                <select className="w-full p-2 bg-neutral-800 border border-gray-700 rounded-md">
                  <option>United States</option>
                  <option>Kenya</option>
                  <option>India</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">City</label>
                <input
                  type="text"
                  defaultValue="New York"
                  className="w-full p-2 bg-neutral-800 border border-gray-700 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Address</label>
                <input
                  type="text"
                  defaultValue="H.no 25, st 17, John Ave, New York, US"
                  className="w-full p-2 bg-neutral-800 border border-gray-700 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Postal Code</label>
                <input
                  type="text"
                  defaultValue="151152"
                  className="w-full p-2 bg-neutral-800 border border-gray-700 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-start">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-semibold rounded-md shadow hover:opacity-90">
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

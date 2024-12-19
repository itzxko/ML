import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Man from "../assets/Man.jpg";
import ProfileForm from "../components/profile/ProfileForm";
import axios from "axios";

const Profile = () => {
  const [profileForm, setProfileForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("user");

  const getProfileInfo = async () => {
    const user = localStorage.getItem("user");

    if (user) {
      const currentUser = JSON.parse(user);

      if (currentUser) {
        try {
          let url = `http://localhost:8080/api/users/${currentUser._id}`;

          let response = await axios.get(url);

          if (response.data.success === true) {
            setUserName(response.data.user.name);
            setLevel(response.data.user.userLevel);
            setEmail(response.data.user.email);
            setPassword(response.data.user.password);
          }
        } catch (error: any) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <>
      <Navigation />
      <div className="w-full flex py-8 bg-[#EDEDED]"></div>
      <div className="w-full min-h-screen bg-[#EDEDED] flex flex-col items-center justify-start p-6 font-DM">
        <div className="w-full lg:w-3/6 flex flex-col items-center justify-center space-y-4">
          {/* header */}
          <div className="w-full flex flex-col items-start justify-center space-y-4">
            <img
              src={Man}
              alt=""
              className="w-[120px] h-[120px] rounded-full"
            />
            <div className="w-full flex flex-col items-start justify-center space-y-1">
              <div className="w-full flex flex-col items-start justify-center">
                <p className="text-sm font-semibold"></p>
                <p className="text-xs font-normal text-[#6E6E6E] uppercase"></p>
              </div>
              <div
                className="px-4 py-2 rounded-xl bg-gradient-to-tr from-[#466600] to-[#699900] cursor-pointer"
                onClick={() => setProfileForm(true)}
              >
                <p className="text-xs font-normal text-white">Edit Profile</p>
              </div>
            </div>
          </div>
          {/* personal info */}
          <div className="w-full flex flex-col items-center justify-center space-y-4 bg-[#FCFCFC] p-6 rounded-xl">
            <div className="w-full flex flex-row items-center justify-start space-x-2 pb-2">
              <div className="px-2 py-1 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
                <i className="ri-info-i text-sm text-white"></i>
              </div>
              <div className="w-full flex flex-col items-start justify-center">
                <p className="text-xs font-semibold">User Information</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  name, credentials etc.
                </p>
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">User Name:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">{userName}</p>
            </div>

            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">E-mail:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">{email}</p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">Password</p>
              <p className="text-xs font-normal text-[#6E6E6E]">{password}</p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-xs font-normal">Level:</p>
              <p className="text-xs font-normal text-[#6E6E6E]">{level}</p>
            </div>
          </div>
        </div>
      </div>
      {profileForm && (
        <ProfileForm
          onClose={() => {
            setProfileForm(false);
            getProfileInfo();
          }}
        />
      )}
    </>
  );
};

export default Profile;

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  RiCheckLine,
  RiCloseLine,
  RiEye2Line,
  RiEyeCloseLine,
  RiFolder6Line,
  RiRefreshLine,
} from "react-icons/ri";
import Notification from "../Notification";

const ProfileForm = ({ onClose }: { onClose: () => void }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("user");
  const [userId, setUserId] = useState("");

  const [pVisible, setPVisible] = useState(false);
  const [notif, setNotif] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const toggleLevel = () => {
    if (level === "user") {
      setLevel("admin");
    } else if (level === "admin") {
      setLevel("user");
    }
  };

  const getProfileInfo = async () => {
    const user = localStorage.getItem("user");

    if (user) {
      const currentUser = JSON.parse(user);

      if (currentUser) {
        setUserId(currentUser._id);
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

  const updateInfo = async () => {
    if (userId) {
      try {
        let url = `http://localhost:8080/api/users/${userId}`;

        let response = await axios.put(url, {
          name: userName,
          userLevel: level,
          email: email,
          password: password,
        });

        if (response.data.success) {
          setNotif(true);
          setMessage(response.data.success);
          setError(false);
        }
      } catch (error: any) {
        setNotif(true);
        setMessage(error.response.data.error);
        setError(true);
      }
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full min-h-[100svh] bg-black/50 flex items-start justify-start p-4 overflow-y-auto font-DM z-20">
        <div className="w-full min-h-full flex flex-col items-center justify-center">
          {/* card */}
          <div className="w-full lg:w-2/6 bg-[#FCFCFC] p-6 rounded-xl">
            <div className="w-full flex flex-row justify-between items-center space-x-4 pb-6">
              <div className="flex flex-row items-center justify-start space-x-2 w-1/2">
                <div className="p-2 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiFolder6Line color="white" size={14} />
                </div>
                <div className="w-3/5 flex flex-row space-x-1 ">
                  <p className="w-full text-xs font-semibold truncate">
                    Edit User Information
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2">
                <div
                  className="p-2 rounded-full bg-[#EDEDED] cursor-pointer"
                  onClick={updateInfo}
                >
                  <RiCheckLine size={16} />
                </div>
                <div
                  className="p-2 rounded-full bg-[#EDEDED] cursor-pointer"
                  onClick={() => onClose()}
                >
                  <RiCloseLine size={16} />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-4">
              <div className="w-full flex flex-col items-start justify-center gap-2">
                <p className="text-xs font-normal">User Name</p>
                <input
                  type="text"
                  className="w-full px-6 py-4 rounded-xl bg-[#EDEDED] outline-none text-xs"
                  placeholder="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col items-start justify-center gap-2">
                <p className="text-xs font-normal">E-mail</p>
                <input
                  type="text"
                  className="w-full px-6 py-4 rounded-xl bg-[#EDEDED] outline-none text-xs"
                  placeholder="email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col items-start justify-center gap-2">
                <p className="text-xs font-normal">Password</p>
                <div className="w-full flex flex-row items-center justify-between px-6 py-3.5 bg-[#EDEDED] rounded-xl">
                  <input
                    type={pVisible ? "text" : "password"}
                    className="w-full bg-[#EDEDED] outline-none text-xs"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {pVisible ? (
                    <RiEye2Line
                      className="cursor-pointer"
                      size={16}
                      onClick={() => setPVisible(!pVisible)}
                    />
                  ) : (
                    <RiEyeCloseLine
                      className="cursor-pointer"
                      size={16}
                      onClick={() => setPVisible(!pVisible)}
                    />
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col items-start justify-center gap-2">
                <p className="text-xs font-normal">Level</p>
                <div className="w-full flex flex-row items-center justify-between px-6 py-3.5 bg-[#EDEDED] rounded-xl">
                  <p className="text-xs font-normal">{level}</p>
                  <RiRefreshLine size={16} className="cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {notif && (
        <Notification
          message={message}
          onClose={() => {
            setNotif(false);
            if (!error) {
              onClose();
            }
          }}
        />
      )}
    </>
  );
};

export default ProfileForm;

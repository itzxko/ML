import React, { useState } from "react";
import { RiEye2Line, RiEyeCloseLine, RiRefreshLine } from "react-icons/ri";
import Logo from "../assets/Bottle_Bot.png";
import axios from "axios";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("user");

  const [pVisible, setPVisible] = useState(false);
  const [notif, setNotif] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const addUser = async () => {
    try {
      let url = `http://localhost:8080/api/users/`;

      let response = await axios.post(url, {
        name: userName,
        userLevel: level,
        email: email,
        password: password,
      });

      if (response.data.success) {
        setNotif(true);
        setError(false);
        setMessage(response.data.success);
      }
    } catch (error: any) {
      setNotif(true);
      setError(true);
      setMessage(error.response.data.error);
    }
  };

  return (
    <>
      <div className="w-full h-[100svh] flex flex-col items-center justify-center bg-[url('./assets/Home.jpg')] bg-cover bg-center font-DM">
        <div className="w-full h-full flex flex-row items-center justify-center bg-gradient-to-tr from-black/75 to-black/50 p-6">
          <div className="w-5/6 lg:w-1/6 flex flex-col items-center justify-center p-6 rounded-xl bg-white space-y-6">
            <div className="w-full flex flex-col items-center justify-center space-y-2">
              {/* logo */}
              <div className="w-full flex items-center justify-center">
                <img src={Logo} alt="" className="h-[80px] w-[80px]" />
              </div>
              {/* header */}
              <div className="w-full flex flex-col items-center justify-center">
                <p className="text-sm font-semibold">Create Account</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  fill all fields to continue
                </p>
              </div>
            </div>
            {/* inputs */}
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
            {/* button */}
            <div
              className="w-full flex flex-row items-center justify-center py-2.5 bg-gradient-to-tr from-[#466600] to-[#699900] rounded-lg cursor-pointer"
              onClick={addUser}
            >
              <p className="text-xs font-semibold text-white">Register</p>
            </div>
            <div className="w-full flex flex-row items-center justify-center gap-1">
              <p className="text-xs font-normal text-[#6E6E6E]">
                Already have an account?
              </p>
              <p
                className="text-xs font-semibold text-[#466600] cursor-pointer"
                onClick={() => navigate("/")}
              >
                Login
              </p>
            </div>
          </div>
        </div>
      </div>
      {notif && (
        <Notification
          message={message}
          onClose={() => {
            setNotif(false);
            navigate("/");
          }}
        />
      )}
    </>
  );
};

export default Register;

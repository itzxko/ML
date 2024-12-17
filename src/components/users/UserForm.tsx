import React, { useState } from "react";
import {
  RiCheckLine,
  RiCloseLine,
  RiEye2Line,
  RiEyeCloseLine,
  RiFolder6Line,
  RiRefreshLine,
} from "react-icons/ri";

const UserForm = ({ onClose }: { onClose: () => void }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("user");

  const [pVisible, setPVisible] = useState(false);

  const toggleLevel = () => {
    if (level === "user") {
      setLevel("admin");
    } else if (level === "admin") {
      setLevel("user");
    }
  };

  return (
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
              <div className="p-2 rounded-full bg-[#EDEDED] cursor-pointer">
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
                <RiRefreshLine
                  size={16}
                  className="cursor-pointer"
                  onClick={toggleLevel}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;

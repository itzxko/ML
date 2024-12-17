import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { RiDeleteBin7Line, RiEdit2Line, RiUser4Fill } from "react-icons/ri";
import UserForm from "../components/users/UserForm";

const Users = () => {
  const [userForm, setUserForm] = useState(false);

  return (
    <>
      <Navigation />
      <div className="w-full py-10 bg-[#EDEDED]"></div>
      <div className="w-full min-h-screen bg-[#EDEDED] flex flex-col items-center justify-start p-6 font-DM space-y-6">
        <div className="w-full lg:w-3/6 flex flex-row items-center justify-start gap-2">
          <div className="p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
            <RiUser4Fill size={16} color="white" />
          </div>
          <div className="w-full lg:w-3/6 flex flex-col items-start justify-center">
            <p className="text-xs font-semibold">Users Overview</p>
            <p className="text-xs font-normal text-[#6E6E6E]">
              edit or delete users
            </p>
          </div>
        </div>
        <div className="w-full lg:w-3/6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-6 rounded-xl bg-[#FCFCFC] flex flex-col gap-8 items-center justify-center">
            <div className="w-full flex flex-row items-center justify-between">
              <div className="w-1/2 flex flex-col items-start justify-center">
                <p className="text-xs font-semibold w-full truncate">
                  User Name
                </p>
                <p className="text-xs font-normal text-[#6E6E6E] w-full truncate">
                  #USERIDUSERIDUSERIDUSERID
                </p>
              </div>
              <div className="flex flex-row gap-2">
                <div
                  className=" flex flex-row items-center justify-center p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900] cursor-pointer"
                  onClick={() => setUserForm(true)}
                >
                  <RiEdit2Line size={16} color="white" />
                </div>
                <div className=" flex flex-row items-center justify-center p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900] cursor-pointer">
                  <RiDeleteBin7Line size={16} color="white" />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-start justify-center">
              <p className="text-xs font-normal">E-mail: test@email.com</p>
              <p className="text-xs font-normal capitalize">level: user</p>
            </div>
          </div>
          <div className="p-6 rounded-xl bg-[#FCFCFC] flex flex-col gap-8 items-center justify-center">
            <div className="w-full flex flex-row items-center justify-between">
              <div className="w-1/2 flex flex-col items-start justify-center">
                <p className="text-xs font-semibold w-full truncate">
                  User Name
                </p>
                <p className="text-xs font-normal text-[#6E6E6E] w-full truncate">
                  #USERIDUSERIDUSERIDUSERID
                </p>
              </div>
              <div className="flex flex-row gap-2">
                <div className=" flex flex-row items-center justify-center p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900] cursor-pointer">
                  <RiEdit2Line size={16} color="white" />
                </div>
                <div className=" flex flex-row items-center justify-center p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900] cursor-pointer">
                  <RiDeleteBin7Line size={16} color="white" />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-start justify-center">
              <p className="text-xs font-normal ">E-mail: test@email.com</p>
              <p className="text-xs font-normal capitalize">level: user</p>
            </div>
          </div>
        </div>
      </div>
      {userForm && <UserForm onClose={() => setUserForm(false)} />}
    </>
  );
};

export default Users;

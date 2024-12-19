import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import {
  RiAddLine,
  RiDeleteBin7Line,
  RiEdit2Line,
  RiUser4Fill,
} from "react-icons/ri";
import UserForm from "../components/users/UserForm";
import axios from "axios";
import Notification from "../components/Notification";

const Users = () => {
  const [userForm, setUserForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [notif, setNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");

  const getUsers = async () => {
    try {
      let url = `http://localhost:8080/api/users`;

      let response = await axios.get(url);

      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error: any) {
      setUsers([]);
      console.log(error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      let url = `http://localhost:8080/api/users/${userId}`;

      let response = await axios.delete(url);

      if (response.data.success) {
        setNotif(true);

        setMessage(response.data.success);
      }
    } catch (error: any) {
      setNotif(true);

      setMessage(error.response.data.error);
    }
  };

  const getCurrentUser = () => {
    const user = localStorage.getItem("user");

    if (user) {
      const currentUser = JSON.parse(user);

      if (currentUser) {
        setCurrentUserId(currentUser._id);
      }
    }
  };

  useEffect(() => {
    getCurrentUser();
    getUsers();
  }, []);

  return (
    <>
      <Navigation />
      <div className="w-full py-10 bg-[#EDEDED]"></div>
      <div className="w-full min-h-screen bg-[#EDEDED] flex flex-col items-center justify-start p-6 font-DM space-y-6">
        <div className="w-full lg:w-3/6 flex flex-row items-center justify-start gap-2">
          <div className="p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
            <RiUser4Fill size={16} color="white" />
          </div>
          <div className="w-full flex flex-row items-center justify-between gap-4">
            <div className="w-full lg:w-3/6 flex flex-col items-start justify-center">
              <p className="text-xs font-semibold">Users Overview</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                edit or delete users
              </p>
            </div>
            <div
              className="p-2 rounded-full bg-[#FCFCFC] cursor-pointer"
              onClick={() => setUserForm(true)}
            >
              <RiAddLine size={16} color="black" />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {users.map((user: any) => (
            <div
              className="p-6 rounded-xl bg-[#FCFCFC] flex flex-col gap-8 items-center justify-center"
              key={user._id}
            >
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2 flex flex-col items-start justify-center">
                  <p className="text-xs font-semibold w-full truncate">
                    {user.name}
                  </p>
                  <p className="text-xs font-normal text-[#6E6E6E] w-full truncate uppercase">
                    #{user._id}
                  </p>
                </div>
                <div className="flex flex-row gap-2">
                  {currentUserId !== user._id && (
                    <>
                      <div
                        className=" flex flex-row items-center justify-center p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900] cursor-pointer"
                        onClick={() => {
                          setUserForm(true);
                          setSelectedUser(user._id);
                        }}
                      >
                        <RiEdit2Line size={16} color="white" />
                      </div>
                      <div
                        className=" flex flex-row items-center justify-center p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900] cursor-pointer"
                        onClick={() => deleteUser(user._id)}
                      >
                        <RiDeleteBin7Line size={16} color="white" />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col items-start justify-center">
                <p className="text-xs font-normal">E-mail: {user.email}</p>
                <p className="text-xs font-normal capitalize">
                  Level: {user.userLevel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {notif && (
        <Notification
          message={message}
          onClose={() => {
            getUsers();
            setNotif(false);
          }}
        />
      )}
      {userForm && (
        <UserForm
          userId={selectedUser}
          onClose={() => {
            setUserForm(false);
            getUsers();
            getCurrentUser();
            setSelectedUser(null);
          }}
        />
      )}
    </>
  );
};

export default Users;

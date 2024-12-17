import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Bottle_Bot.png";

const Navigation = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [activeRoute, setActiveRoute] = useState("dashboard");
  const location = useLocation();
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("/dashboard")) {
      setActiveRoute("dashboard");
    } else if (location.pathname.includes("/monitor")) {
      setActiveRoute("monitor");
    } else if (location.pathname.includes("/history")) {
      setActiveRoute("history");
    } else if (location.pathname.includes("/users")) {
      setActiveRoute("users");
    } else if (location.pathname.includes("/redeem")) {
      setActiveRoute("redeem");
    } else if (location.pathname.includes("/profile")) {
      setActiveRoute("profile");
    }
  }, [location.pathname]);

  return (
    <div className="fixed w-full flex items-center justify-center px-4 font-DM z-10 bg-[#EDEDED]">
      <div className="w-full lg:w-3/6 flex items-center justify-between py-4">
        {/* logo */}
        <div
          className="flex flex-row space-x-2 items-center justify-center px-4 py-2 rounded-xl bg-[#FCFCFC] cursor-pointer shadow-xl shadow-black/10"
          onClick={() => navigate("/dashboard")}
        >
          <img src={Logo} className="w-[26px]" />
          <p className="text-xs font-normal">
            Welcome, {userName ? userName : "Not Found"}
          </p>
        </div>
        <div className="flex flex-row items-center justify-center space-x-4">
          <div className="hidden lg:flex flex-row items-center justify-center space-x-6">
            {activeRoute === "dashboard" ? (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                <i className="ri-home-3-fill text-md text-[#050301]"></i>
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                <i className="ri-home-3-line text-md text-[#6E6E6E]"></i>
              </div>
            )}
            {activeRoute === "history" ? (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/history")}
              >
                <i className="ri-calendar-fill text-md text-[#050301]"></i>
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/history")}
              >
                <i className="ri-calendar-line text-md text-[#6E6E6E]"></i>
              </div>
            )}
            {activeRoute === "users" ? (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/users")}
              >
                <i className="ri-user-smile-fill text-md text-[#050301]"></i>
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/users")}
              >
                <i className="ri-user-smile-line text-md text-[#6E6E6E]"></i>
              </div>
            )}
            {activeRoute === "profile" ? (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <i className="ri-user-4-fill text-md text-[#050301]"></i>
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <i className="ri-user-4-line text-md text-[#6E6E6E]"></i>
              </div>
            )}
          </div>
          <div className="flex px-3 py-2 cursor-pointer rounded-xl bg-[#FCFCFC] shadow-xl shadow-black/10 space-x-4">
            <i
              className="ri-contract-right-line text-md"
              onClick={() => navigate("/")}
            ></i>
            <div
              className="flex lg:hidden"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <i className="ri-close-line text-md"></i>
              ) : (
                <i className="ri-menu-line text-md"></i>
              )}
            </div>
          </div>
        </div>
        {openNav ? (
          <div className="fixed lg:hidden top-0 left-0 w-4/5 bg-[#FCFCFC] h-[100svh] shadow-xl shadow-black/10 ease-in-out duration-150 flex flex-col items-center justify-center space-y-6">
            <p
              className="text-xs font-normal"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </p>
            <p
              className="text-xs font-normal"
              onClick={() => navigate("/history")}
            >
              History
            </p>
            <p
              className="text-xs font-normal"
              onClick={() => navigate("/users")}
            >
              Users
            </p>
            <p
              className="text-xs font-normal"
              onClick={() => navigate("/profile")}
            >
              Profile
            </p>
          </div>
        ) : (
          <div className="fixed lg:hidden top-0 left-[-100%] w-4/5 bg-[#FCFCFC] h-[100svh] shadow-xl shadow-black/10 ease-in-out duration-75"></div>
        )}
      </div>
    </div>
  );
};

export default Navigation;

import React from "react";
import Navigation from "../components/Navigation";

const History = () => {
  return (
    <>
      <Navigation />
      <div className="w-full py-10 bg-[#EDEDED]"></div>
      <div className="w-full min-h-screen bg-[#EDEDED] flex flex-col items-center justify-start p-6 font-DM">
        <div className="w-full lg:w-3/6 flex flex-col items-start justify-center">
          <p className="text-sm font-semibold">History Overview</p>
        </div>
      </div>
    </>
  );
};

export default History;

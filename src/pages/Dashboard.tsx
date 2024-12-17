import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts";
import {
  RiDashboardFill,
  RiDeleteBin7Line,
  RiScales2Line,
  RiTruckLine,
} from "react-icons/ri";
import Result from "../components/prediction/Result";

const Dashboard = () => {
  const [reportDate, setReportDate] = useState("");
  const [loadTime, setLoadTime] = useState("");
  const [loadWeight, setLoadWeight] = useState("");
  const [temperature, setTemperature] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [population, setPopulation] = useState("");
  const [GDP, setGDP] = useState("");
  const [dropoffSite, setDropoffSite] = useState("");
  const [routeType, setRouteType] = useState("");
  const [loadType, setLoadType] = useState("");
  const [raining, setRaining] = useState("No");
  const [holiday, setHoliday] = useState("No");
  const [event, setEvent] = useState("No");

  const [rainOpened, setRainOpened] = useState(false);
  const [holidayOpened, setHolidayOpened] = useState(false);
  const [eventOpened, setEventOpened] = useState(false);

  const [predictionPage, setPredictionPage] = useState(false);

  const toggleRain = () => {
    if (raining === "No") {
      setRaining("Yes");
    } else if (raining === "Yes") {
      setRaining("No");
    }
  };

  const toggleHoliday = () => {
    if (holiday === "No") {
      setHoliday("Yes");
    } else if (holiday === "Yes") {
      setHoliday("No");
    }
  };

  const toggleEvent = () => {
    if (event === "No") {
      setEvent("Yes");
    } else if (event === "Yes") {
      setEvent("No");
    }
  };

  return (
    <>
      <Navigation />
      <div className="w-full py-10 bg-[#EDEDED]"></div>
      <div className="w-full min-h-screen bg-[#EDEDED] flex flex-col items-center justify-start p-6 font-DM">
        <div className="w-full lg:w-3/6 flex flex-col items-center justify-center space-y-6">
          <div className="w-full flex flex-row items-center justify-start gap-2">
            <div className="p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
              <RiDashboardFill size={16} color="white" />
            </div>
            <div className="w-full flex flex-col items-start justify-center">
              <p className="text-xs font-semibold upp">Dashboard</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                fill all fields with the information needed
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center space-y-4">
            <div className="w-full flex flex-col items-start justify-center space-y-2">
              <p className="text-xs font-normal">Report Date</p>
              <input
                type="date"
                className="w-full text-xs font-normal rounded-xl px-6 py-4 outline-none bg-[#FCFCFC]"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center space-y-2">
              <p className="text-xs font-normal">Load Time</p>
              <input
                type="time"
                className="w-full text-xs font-normal rounded-xl px-6 py-4 outline-none bg-[#FCFCFC]"
                value={loadTime}
                onChange={(e) => setLoadTime(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center space-y-2">
              <p className="text-xs font-normal">Load Weight</p>
              <input
                type="text"
                className="w-full text-xs font-normal rounded-xl px-6 py-4 outline-none bg-[#FCFCFC]"
                value={loadWeight}
                onChange={(e) => setLoadWeight(e.target.value)}
                placeholder="load weight"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center space-y-2">
              <p className="text-xs font-normal">Temperature</p>
              <input
                type="text"
                className="w-full text-xs font-normal rounded-xl px-6 py-4 outline-none bg-[#FCFCFC]"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                placeholder="temperature"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center space-y-2">
              <p className="text-xs font-normal">Wind Speed</p>
              <input
                type="text"
                className="w-full text-xs font-normal rounded-xl px-6 py-4 outline-none bg-[#FCFCFC]"
                value={windSpeed}
                onChange={(e) => setWindSpeed(e.target.value)}
                placeholder="wind speed"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center space-y-2">
              <p className="text-xs font-normal">Population</p>
              <input
                type="text"
                className="w-full text-xs font-normal rounded-xl px-6 py-4 outline-none bg-[#FCFCFC]"
                value={population}
                onChange={(e) => setPopulation(e.target.value)}
                placeholder="population"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center space-y-2">
              <p className="text-xs font-normal">GDP</p>
              <input
                type="text"
                className="w-full text-xs font-normal rounded-xl px-6 py-4 outline-none bg-[#FCFCFC]"
                value={GDP}
                onChange={(e) => setGDP(e.target.value)}
                placeholder="gdp per capita"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center space-y-2">
              <p className="text-xs font-normal">Dropoff Site</p>
              <input
                type="text"
                className="w-full text-xs font-normal rounded-xl px-6 py-4 outline-none bg-[#FCFCFC]"
                value={dropoffSite}
                onChange={(e) => setDropoffSite(e.target.value)}
                placeholder="drop-off site"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center space-y-2">
              <p className="text-xs font-normal">Route Type</p>
              <input
                type="text"
                className="w-full text-xs font-normal rounded-xl px-6 py-4 outline-none bg-[#FCFCFC]"
                value={routeType}
                onChange={(e) => setRouteType(e.target.value)}
                placeholder="route type"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center space-y-2">
              <p className="text-xs font-normal">Load Type</p>
              <input
                type="text"
                className="w-full text-xs font-normal rounded-xl px-6 py-4 outline-none bg-[#FCFCFC]"
                value={loadType}
                onChange={(e) => setLoadType(e.target.value)}
                placeholder="load type"
              />
            </div>
            <div className=" w-full flex flex-col items-start justify-center space-y-2">
              <p className="text-xs font-normal">Raining?</p>
              <div
                className="w-full flex flex-row items-center justify-between px-6 py-3.5 rounded-xl bg-[#FCFCFC] cursor-pointer"
                onClick={toggleRain}
              >
                <p className="text-xs font-normal">{raining}</p>
                <i className="ri-refresh-line text-sm"></i>
              </div>
            </div>
            <div className=" w-full flex flex-col items-start justify-center space-y-2">
              <p className="text-xs font-normal">Holiday?</p>
              <div
                className="w-full flex flex-row items-center justify-between px-6 py-3.5 rounded-xl bg-[#FCFCFC] cursor-pointer"
                onClick={toggleHoliday}
              >
                <p className="text-xs font-normal">{holiday}</p>
                <i className="ri-refresh-line text-sm"></i>
              </div>
            </div>
            <div className=" w-full flex flex-col items-start justify-center space-y-2">
              <p className="text-xs font-normal">Has Event?</p>
              <div
                className="w-full flex flex-row items-center justify-between px-6 py-3.5 rounded-xl bg-[#FCFCFC] cursor-pointer"
                onClick={toggleEvent}
              >
                <p className="text-xs font-normal">{event}</p>
                <i className="ri-refresh-line text-sm"></i>
              </div>
            </div>
          </div>
          <div className=" w-full flex items-center justify-end">
            <div
              className="flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-tr from-[#466600] to-[#699900] shadow-xl shadow-black/10 cursor-pointer"
              onClick={() => setPredictionPage(true)}
            >
              <p className="text-xs font-normal text-white">
                Generate Prediction
              </p>
            </div>
          </div>
        </div>
      </div>
      {predictionPage && <Result onClose={() => setPredictionPage(false)} />}
    </>
  );
};

export default Dashboard;

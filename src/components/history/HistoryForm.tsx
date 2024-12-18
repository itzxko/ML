import axios from "axios";
import React, { useState } from "react";
import { RiCheckLine, RiCloseLine, RiFolder6Line } from "react-icons/ri";
import Notification from "../Notification";

const HistoryForm = ({ data, onClose }: { data: any; onClose: () => void }) => {
  console.log(data);
  const [notif, setNotif] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [actualLW, setActualLW] = useState("");

  const updatePrediction = async () => {
    try {
      let url = `http://localhost:8080/api/predictions/${data._id}`;

      let response = await axios.put(url, {
        reportDate: data.reportDate,
        loadTime: data.loadTime,
        predictedLoadWeight: data.predictedLoadWeight,
        actualLoadWeight: actualLW,
        temperature: data.temperature,
        windSpeed: data.windSpeed,
        humidity: data.humidity,
        population: data.population,
        gdpPerCapita: data.gdpPerCapita,
      });

      if (response.data.success) {
        setNotif(true);
        setError(false);
        setMessage(response.data.success);
      }
    } catch (error: any) {
      setError(true);
      setMessage(error.response.data.error);
      setNotif(true);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full min-h-[100svh] bg-black/50 flex items-start justify-start p-4 overflow-y-auto font-DM z-20">
        <div className="w-full min-h-full flex flex-col items-center justify-center">
          {/* card */}
          <div className="w-full lg:w-2/6 bg-[#FCFCFC] p-6 rounded-xl space-y-6">
            <div className="w-full flex flex-row justify-between items-center space-x-4">
              <div className="flex flex-row items-center justify-start space-x-2 w-1/2">
                <div className="p-2 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiFolder6Line color="white" size={14} />
                </div>
                <div className="w-3/5 flex flex-row space-x-1 ">
                  <p className="w-full text-xs font-semibold truncate">
                    Update History
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2">
                <div
                  className="p-2 rounded-full bg-[#EDEDED] cursor-pointer"
                  onClick={updatePrediction}
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
            <div className="w-full flex flex-col items-center justify-center">
              <div className="w-full flex-col items-start justify-center space-y-2">
                <p className="text-xs font-normal">Actual Load Weight</p>
                <input
                  type="text"
                  className="w-full outline-none px-6 py-3 rounded-xl bg-[#EDEDED] text-xs font-normal"
                  placeholder="actual load weight"
                  value={actualLW}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setActualLW(value);
                    }
                  }}
                />
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

export default HistoryForm;

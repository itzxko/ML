import React, { useState } from "react";
import {
  RiCloseLine,
  RiDnaLine,
  RiDonutChartFill,
  RiFolder6Line,
} from "react-icons/ri";
import Notification from "../Notification";
import axios from "axios";

const Result = ({
  input,
  data,
  onClose,
}: {
  input: any;
  data: any;
  onClose: () => void;
}) => {
  const [notif, setNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const savePrediction = async () => {
    try {
      let url = `http://localhost:8080/api/predictions/`;

      let response = await axios.post(url, {
        reportDate: input.reportDate,
        loadTime: input.loadTime,
        predictedLoadWeight: data.predictedLoadWeight,
        temperature: input.temperature,
        windSpeed: input.windSpeed,
        humidity: input.humidity,
        population: input.population,
        gdpPerCapita: input.GDP,
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
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full min-h-[100svh] bg-black/50 flex items-start justify-start p-4 overflow-y-auto font-DM z-20">
        <div className="w-full min-h-full flex flex-col items-center justify-center">
          {/* card */}
          <div className="w-full lg:w-2/6 flex flex-col items-center justify-center bg-[#FCFCFC] p-6 rounded-xl gap-8">
            <div className="w-full flex flex-col items-center justify-center gap-4">
              <div className="w-full flex flex-row justify-between items-center space-x-4">
                <div className="flex flex-row items-center justify-start space-x-2 w-1/2">
                  <div className="p-2 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#466600] to-[#699900]">
                    <RiDnaLine color="white" size={14} />
                  </div>
                  <div className="w-3/5 flex flex-row space-x-1 ">
                    <p className="w-full text-xs font-semibold truncate">
                      Prediction Results
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center gap-4">
                <div className="w-full flex flex-row px-6 py-3 rounded-xl bg-[#EDEDED] items-center justify-between gap-2">
                  <p className="text-xs font-normal text-[#6E6E6E]">
                    Predicted Load Weight:
                  </p>
                  <p className="text-xs font-semibold">
                    {data ? data.predictedLoadWeight : "No Data"}
                  </p>
                </div>
                <div className="w-full flex flex-row px-6 py-3 rounded-xl bg-[#EDEDED] items-center justify-between gap-2">
                  <p className="text-xs font-normal text-[#6E6E6E]">
                    Predicted Load Weight Min:
                  </p>
                  <p className="text-xs font-semibold">
                    {data ? data.predictedLoadWeightMin : "No Data"}
                  </p>
                </div>
                <div className="w-full flex flex-row px-6 py-3 rounded-xl bg-[#EDEDED] items-center justify-between gap-2">
                  <p className="text-xs font-normal text-[#6E6E6E]">
                    Predicted Load Weight Max:
                  </p>
                  <p className="text-xs font-semibold">
                    {data ? data.predictedLoadWeightMax : "No Data"}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-row items-center justify-end gap-2">
              <div
                className="flex px-6 py-3 rounded-xl bg-gradient-to-tr from-[#9C7C00] to-[#D2AF26] cursor-pointer"
                onClick={() => onClose()}
              >
                <p className="text-xs font-normal text-white">Discard</p>
              </div>
              <div
                className="flex px-6 py-3 rounded-xl bg-gradient-to-tr from-[#466600] to-[#699900] cursor-pointer"
                onClick={() => savePrediction()}
              >
                <p className="text-xs font-normal text-white">Save</p>
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

export default Result;

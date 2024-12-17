import React, { useState } from "react";
import {
  RiCloseLine,
  RiDnaLine,
  RiDonutChartFill,
  RiFolder6Line,
} from "react-icons/ri";
import Notification from "../Notification";

const Result = ({ onClose }: { onClose: () => void }) => {
  const [notif, setNotif] = useState(false);

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
                  <p className="text-xs font-semibold">1200</p>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-4">
              <div className="w-full flex flex-row justify-between items-center space-x-4">
                <div className="flex flex-row items-center justify-start space-x-2 w-1/2">
                  <div className="p-2 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#466600] to-[#699900]">
                    <RiDonutChartFill color="white" size={14} />
                  </div>
                  <div className="w-3/5 flex flex-row space-x-1 ">
                    <p className="w-full text-xs font-semibold truncate">
                      Error Metrics
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center gap-4">
                <div className="w-full flex flex-row px-6 py-3 rounded-xl bg-[#EDEDED] items-center justify-between gap-4">
                  <p className="text-xs font-normal text-[#6E6E6E] truncate">
                    Mean Absolute Percentage Error (MAPE):
                  </p>
                  <p className="text-xs font-semibold">1200</p>
                </div>
                <div className="w-full flex flex-row px-6 py-3 rounded-xl bg-[#EDEDED] items-center justify-between gap-4">
                  <p className="text-xs font-normal text-[#6E6E6E] truncate">
                    Mean Absolute Percentage Error with No Zeros (MAPE):
                  </p>
                  <p className="text-xs font-semibold">1200</p>
                </div>
                <div className="w-full flex flex-row px-6 py-3 rounded-xl bg-[#EDEDED] items-center justify-between gap-4">
                  <p className="text-xs font-normal text-[#6E6E6E]">
                    Mean Absolute Error (MAE):
                  </p>
                  <p className="text-xs font-semibold">1200</p>
                </div>
                <div className="w-full flex flex-row px-6 py-3 rounded-xl bg-[#EDEDED] items-center justify-between gap-4">
                  <p className="text-xs font-normal text-[#6E6E6E] truncate">
                    Mean Squared Error (MSE):
                  </p>
                  <p className="text-xs font-semibold">1200</p>
                </div>
                <div className="w-full flex flex-row px-6 py-3 rounded-xl bg-[#EDEDED] items-center justify-between gap-4">
                  <p className="text-xs font-normal text-[#6E6E6E] truncate">
                    Root Mean Squared Error (RMSE):
                  </p>
                  <p className="text-xs font-semibold">1200</p>
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
                onClick={() => setNotif(true)}
              >
                <p className="text-xs font-normal text-white">Save</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {notif && (
        <Notification
          message="Successfully Saved"
          onClose={() => {
            onClose();
            setNotif(false);
          }}
        />
      )}
    </>
  );
};

export default Result;

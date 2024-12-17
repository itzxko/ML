import React from "react";
import { RiCheckLine, RiCloseLine, RiFolder6Line } from "react-icons/ri";

const HistoryForm = ({ onClose }: { onClose: () => void }) => {
  return (
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
          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex-col items-start justify-center space-y-2">
              <p className="text-xs font-normal">Actual Load Weight</p>
              <input
                type="text"
                className="w-full outline-none px-6 py-3 rounded-xl bg-[#EDEDED] text-xs font-normal"
                placeholder="actual load weight"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryForm;

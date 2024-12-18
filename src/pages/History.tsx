import {
  RiBardFill,
  RiDeleteBin7Line,
  RiEdit2Line,
  RiScales2Line,
  RiTimerLine,
  RiWindow2Fill,
} from "react-icons/ri";
import Navigation from "../components/Navigation";
import { BarChart, LineChart } from "@mui/x-charts";
import { useState } from "react";
import HistoryForm from "../components/history/HistoryForm";

const History = () => {
  const [historyform, setHistoryForm] = useState(false);

  return (
    <>
      <Navigation />
      <div className="w-full py-10 bg-[#EDEDED]"></div>
      <div className="w-full min-h-screen bg-[#EDEDED] flex flex-col items-center justify-start p-4 font-DM">
        <div className="w-full lg:w-3/6 flex flex-col items-center justify-center gap-6">
          <div className="w-full flex flex-row items-center justify-start gap-2">
            <div className="p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
              <RiTimerLine size={16} color="white" />
            </div>
            <div className="w-full flex flex-col items-start justify-center">
              <p className="text-xs font-semibold">Prediction History</p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                visualizations and comparizons of predictions
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-4">
            <div className="w-full flex flex-col items-center justify-center p-6 rounded-xl bg-[#FCFCFC] gap-8">
              <div className="w-full flex flex-row items-start justify-between gap-2">
                <div className="w-3/4 flex flex-col items-start justify-center gap-4">
                  <div className="max-w-full flex flex-row items-center justify-start px-6 py-3 rounded-full gap-2 bg-gradient-to-tr from-[#466600] to-[#699900]">
                    <RiBardFill size={16} color="white" />
                    <p className="text-xs font-normal text-white w-full truncate">
                      Predicted Load Weight: 80 tonssss
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-start px-6 py-3 rounded-full gap-2 bg-gradient-to-tr from-[#9C7C00] to-[#D2AF26]">
                    <RiBardFill size={16} color="white" />
                    <p className="text-xs font-normal text-white">
                      Actual Load Weight: N/A
                    </p>
                  </div>
                </div>
                <div
                  className="p-2 rounded-full flex items-center justify-center bg-[#EDEDED] cursor-pointer"
                  onClick={() => setHistoryForm(true)}
                >
                  <RiEdit2Line size={16} color="black" />
                </div>
              </div>
              <div className="w-full flex flex-col gap-6 items-center justify-center">
                <div className="w-full flex flex-col items-start justify-center">
                  <div className="w-full flex flex-col items-start justify-center">
                    <p className="text-xs font-semibold">Bar Chart</p>
                    <p className="text-xs font-normal text-[#6E6E6E]">
                      prediction representation using bar chart
                    </p>
                  </div>
                  <BarChart
                    series={[
                      { data: [35], color: "#466600" },
                      { data: [24], color: "#9C7C00" },
                    ]}
                    height={300}
                    xAxis={[{ data: ["Q1"], scaleType: "band" }]}
                    grid={{ vertical: true, horizontal: true }}
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center">
                  <div className="w-full flex flex-col items-start justify-center">
                    <p className="text-xs font-semibold">Line Graph</p>
                    <p className="text-xs font-normal text-[#6E6E6E]">
                      prediction representation using line graph
                    </p>
                  </div>
                  <LineChart
                    xAxis={[{ data: [1, 2] }]}
                    series={[
                      {
                        data: [2, 5.5],
                        color: "#466600",
                      },
                    ]}
                    height={300}
                    className="w-full"
                    grid={{ vertical: true, horizontal: true }}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center gap-4">
                <div className="w-full flex flex-row items-center justify-start">
                  <p className="text-xs font-semibold">Prediction Data</p>
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-1">
                  <div className="w-full flex flex-row items-center justify-start gap-2 border-b border-black/20 py-2">
                    <p className="text-xs font-normal text-[#6E6E6E] w-1/2 text-start">
                      Predicted Load Weight:
                    </p>
                    <p className="text-xs font-semibold text-[#466600] w-1/2 text-end">
                      80tons
                    </p>
                  </div>
                  <div className="w-full flex flex-row items-center justify-start gap-2 border-b border-black/20 py-2">
                    <p className="text-xs font-normal text-[#6E6E6E] w-1/2 text-start">
                      Actual Load Weight:
                    </p>
                    <p className="text-xs font-semibold text-[#9C7C00] w-1/2 text-end">
                      N/A
                    </p>
                  </div>
                  <div className="w-full flex flex-row items-center justify-start gap-2 border-b border-black/20 py-2">
                    <p className="text-xs font-normal text-[#6E6E6E] w-1/2 text-start">
                      Report Date:
                    </p>
                    <p className="text-xs font-semibold  w-1/2 text-end">
                      05/24/24
                    </p>
                  </div>
                  <div className="w-full flex flex-row items-center justify-start gap-2 border-b border-black/20 py-2">
                    <p className="text-xs font-normal text-[#6E6E6E] w-1/2 text-start">
                      Load Time:
                    </p>
                    <p className="text-xs font-semibold  w-1/2 text-end">
                      2:00 P.M.
                    </p>
                  </div>
                  <div className="w-full flex flex-row items-center justify-start gap-2 border-b border-black/20 py-2">
                    <p className="text-xs font-normal text-[#6E6E6E] w-1/2 text-start">
                      Temperature:
                    </p>
                    <p className="text-xs font-semibold  w-1/2 text-end">
                      30 C
                    </p>
                  </div>
                  <div className="w-full flex flex-row items-center justify-start gap-2 border-b border-black/20 py-2">
                    <p className="text-xs font-normal text-[#6E6E6E] w-1/2 text-start">
                      Wind Speed:
                    </p>
                    <p className="text-xs font-semibold w-1/2 text-end">
                      60 km/h
                    </p>
                  </div>
                  <div className="w-full flex flex-row items-center justify-start gap-2 border-b border-black/20 py-2">
                    <p className="text-xs font-normal text-[#6E6E6E] w-1/2 text-start">
                      Humidity:
                    </p>
                    <p className="text-xs font-semibold w-1/2 text-end">10%</p>
                  </div>
                  <div className="w-full flex flex-row items-center justify-start gap-2 border-b border-black/20 py-2">
                    <p className="text-xs font-normal text-[#6E6E6E] w-1/2 text-start">
                      Population:
                    </p>
                    <p className="text-xs font-semibold w-1/2 text-end">
                      286,000
                    </p>
                  </div>
                  <div className="w-full flex flex-row items-center justify-start gap-2 border-b border-black/20 py-2">
                    <p className="text-xs font-normal text-[#6E6E6E] w-1/2 text-start">
                      GDP Per Capita:
                    </p>
                    <p className="text-xs font-semibold w-1/2 text-end">
                      $17,500
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {historyform && <HistoryForm onClose={() => setHistoryForm(false)} />}
    </>
  );
};

export default History;

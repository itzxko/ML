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
import { useEffect, useState } from "react";
import HistoryForm from "../components/history/HistoryForm";
import axios from "axios";

const History = () => {
  const [historyform, setHistoryForm] = useState(false);
  const [history, setHistory] = useState([]);
  const [selectedPrediction, setSelectedPrediction] = useState<any | null>(
    null
  );
  const [selected, setSelected] = useState<any | null>(null);

  const getHistory = async () => {
    try {
      let url = `http://localhost:8080/api/predictions/`;

      let response = await axios.get(url);

      if (response.data.success) {
        setHistory(response.data.predictions);
      }
    } catch (error: any) {
      setHistory([]);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

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
          <div className="w-full p-6 rounded-xl gap-6 flex flex-col items-center justify-center bg-[#FCFCFC] ">
            <div className="w-full flex flex-col items-start justify-center">
              <div className="w-full flex flex-col items-start justify-center">
                <p className="text-xs font-semibold">Line Graph</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  prediction representation using line graph
                </p>
              </div>
              <LineChart
                xAxis={[
                  {
                    data: Array(selected ? 2 : history.length)
                      .fill(0)
                      .map((_, i) => i + 1),
                  },
                ]}
                series={[
                  {
                    data: selected
                      ? [selected.predictedLoadWeight]
                      : history.map((h: any) => [h.predictedLoadWeight]).flat(),
                    color: "#466600",
                  },
                  {
                    data: selected
                      ? [selected.actualLoadWeight]
                      : history.map((h: any) => [h.actualLoadWeight]).flat(),
                    color: "#9C7C00",
                  },
                ]}
                height={300}
                className="w-full"
                grid={{ vertical: true, horizontal: true }}
              />
            </div>
            <div className="w-full flex flex-col gap-6 items-center justify-center ">
              <div className="w-full flex flex-col items-start justify-center">
                <div className="w-full flex flex-col items-start justify-center">
                  <p className="text-xs font-semibold">Bar Chart</p>
                  <p className="text-xs font-normal text-[#6E6E6E]">
                    prediction representation using bar chart
                  </p>
                </div>
                <BarChart
                  series={[
                    {
                      data: selected
                        ? [selected.predictedLoadWeight]
                        : history.map((h: any) => h.predictedLoadWeight),
                      color: "#466600",
                    },
                    {
                      data: selected
                        ? [selected.actualLoadWeight]
                        : history.map((h: any) => h.actualLoadWeight),
                      color: "#9C7C00",
                    },
                  ]}
                  xAxis={[
                    {
                      data: selected
                        ? [selected.reportDate]
                        : history.map((h: any) => h.reportDate),
                      scaleType: "band",
                    },
                  ]}
                  height={300}
                  grid={{ vertical: true, horizontal: true }}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-4">
            {history.map((prediction: any) => (
              <div
                className="w-full flex flex-col items-center justify-center p-6 rounded-xl bg-[#FCFCFC] gap-8 cursor-pointer"
                key={prediction._id}
                onClick={() =>
                  setSelected({
                    predictedLoadWeight: prediction.predictedLoadWeight,
                    actualLoadWeight: prediction.actualLoadWeight,
                    reportDate: prediction.reportDate,
                  })
                }
              >
                <div className="w-full flex flex-row items-start justify-between gap-2">
                  <div className="w-3/4 flex flex-col items-start justify-center gap-4">
                    <div className="max-w-full flex flex-row items-center justify-start px-6 py-3 rounded-full gap-2 bg-gradient-to-tr from-[#466600] to-[#699900]">
                      <RiBardFill size={16} color="white" />
                      <p className="text-xs font-normal text-white w-full truncate">
                        Predicted Load Weight: {prediction.predictedLoadWeight}
                      </p>
                    </div>
                    <div className="flex flex-row items-center justify-start px-6 py-3 rounded-full gap-2 bg-gradient-to-tr from-[#9C7C00] to-[#D2AF26]">
                      <RiBardFill size={16} color="white" />
                      <p className="text-xs font-normal text-white">
                        Actual Load Weight: {prediction.actualLoadWeight}
                      </p>
                    </div>
                  </div>
                  <div
                    className="p-2 rounded-full flex items-center justify-center bg-[#EDEDED] cursor-pointer"
                    onClick={() => {
                      setHistoryForm(true);
                      setSelectedPrediction(prediction);
                    }}
                  >
                    <RiEdit2Line size={16} color="black" />
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
                        {prediction.predictedLoadWeight}
                      </p>
                    </div>
                    <div className="w-full flex flex-row items-center justify-start gap-2 border-b border-black/20 py-2">
                      <p className="text-xs font-normal text-[#6E6E6E] w-1/2 text-start">
                        Actual Load Weight:
                      </p>
                      <p className="text-xs font-semibold text-[#9C7C00] w-1/2 text-end">
                        {prediction.actualLoadWeight}
                      </p>
                    </div>
                    <div className="w-full flex flex-row items-center justify-start gap-2 border-b border-black/20 py-2">
                      <p className="text-xs font-normal text-[#6E6E6E] w-1/2 text-start">
                        Report Date:
                      </p>
                      <p className="text-xs font-semibold  w-1/2 text-end">
                        {prediction.reportDate}
                      </p>
                    </div>
                    <div className="w-full flex flex-row items-center justify-start gap-2 border-b border-black/20 py-2">
                      <p className="text-xs font-normal text-[#6E6E6E] w-1/2 text-start">
                        Load Time:
                      </p>
                      <p className="text-xs font-semibold  w-1/2 text-end">
                        {prediction.loadTime}
                      </p>
                    </div>
                    <div className="w-full flex flex-row items-center justify-start gap-2 border-b border-black/20 py-2">
                      <p className="text-xs font-normal text-[#6E6E6E] w-1/2 text-start">
                        Temperature:
                      </p>
                      <p className="text-xs font-semibold  w-1/2 text-end">
                        {prediction.temperature}
                      </p>
                    </div>
                    <div className="w-full flex flex-row items-center justify-start gap-2 border-b border-black/20 py-2">
                      <p className="text-xs font-normal text-[#6E6E6E] w-1/2 text-start">
                        Wind Speed:
                      </p>
                      <p className="text-xs font-semibold w-1/2 text-end">
                        {prediction.windSpeed}
                      </p>
                    </div>
                    <div className="w-full flex flex-row items-center justify-start gap-2 border-b border-black/20 py-2">
                      <p className="text-xs font-normal text-[#6E6E6E] w-1/2 text-start">
                        Humidity:
                      </p>
                      <p className="text-xs font-semibold w-1/2 text-end">
                        {prediction.humidity}
                      </p>
                    </div>
                    <div className="w-full flex flex-row items-center justify-start gap-2 border-b border-black/20 py-2">
                      <p className="text-xs font-normal text-[#6E6E6E] w-1/2 text-start">
                        Population:
                      </p>
                      <p className="text-xs font-semibold w-1/2 text-end">
                        {prediction.population}
                      </p>
                    </div>
                    <div className="w-full flex flex-row items-center justify-start gap-2 border-b border-black/20 py-2">
                      <p className="text-xs font-normal text-[#6E6E6E] w-1/2 text-start">
                        GDP Per Capita
                      </p>
                      <p className="text-xs font-semibold w-1/2 text-end">
                        {prediction.gdpPerCapita}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {historyform && (
        <HistoryForm
          data={selectedPrediction}
          onClose={() => {
            setHistoryForm(false);
            getHistory();
            setSelected(null);
          }}
        />
      )}
    </>
  );
};

export default History;

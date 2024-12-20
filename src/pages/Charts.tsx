import {
  RiBardFill,
  RiCloseFill,
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
import Notification from "../components/Notification";

const Charts = () => {
  const [historyform, setHistoryForm] = useState(false);
  const [historyMonth, setHistoryMonth] = useState([]);
  const [historyDay, setHistoryDay] = useState([]);
  const [selectedPrediction, setSelectedPrediction] = useState<any | null>(
    null
  );
  const [selected, setSelected] = useState<any | null>(null);
  const [notif, setNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [historyFilter, setHistoryFilter] = useState([]);

  const getHistoryByMonth = async () => {
    try {
      let url = `http://localhost:8080/api/predictions?byMonth=true`;

      let response = await axios.get(url);

      if (response.data.success) {
        setHistoryMonth(response.data.predictions);
      }
    } catch (error: any) {
      setHistoryMonth([]);
    }
  };

  const getHistoryByDay = async () => {
    try {
      let url = `http://localhost:8080/api/predictions?byDay=true`;

      let response = await axios.get(url);

      if (response.data.success) {
        setHistoryDay(response.data.predictions);
      }
    } catch (error: any) {
      setHistoryDay([]);
    }
  };

  const getHistoryFilter = async () => {
    if (startDate && endDate) {
      try {
        let url = `http://localhost:8080/api/predictions?startDate=${startDate}&endDate=${endDate}`;

        let response = await axios.get(url);

        if (response.data.success) {
          setHistoryFilter(response.data.predictions);
        }
      } catch (error: any) {
        setHistoryFilter([]);
      }
    }
  };

  useEffect(() => {
    if (startDate !== "" && endDate !== "") {
      getHistoryFilter();
    } else {
      getHistoryByMonth();
      getHistoryByDay();
      setHistoryFilter([]);
    }
  }, [startDate, endDate]);

  //month
  const monthAxis = historyMonth.map(
    (history: any) =>
      `${history._id.year}-${String(history._id.month).padStart(2, "0")}`
  );
  const monthPredicted = historyMonth.map(
    (history: any) => history.totalPredictedLoadWeight
  );
  const monthActual = historyMonth.map(
    (history: any) => history.totalActualLoadWeight
  );

  //day
  const dayAxis = historyDay.map(
    (history: any) =>
      `${history._id.year}-${String(history._id.month).padStart(
        2,
        "0"
      )}-${String(history._id.day).padStart(2, "0")}`
  );

  const dayPredicted = historyDay.map(
    (history: any) => history.totalPredictedLoadWeight
  );
  const dayActual = historyDay.map(
    (history: any) => history.totalActualLoadWeight
  );

  //filter
  const filterAxis = historyFilter.map(
    (history: any) => new Date(history.reportDate)
  ); // x-axis as dates
  const filterPredicted = historyFilter.map(
    (history: any) => history.predictedLoadWeight
  ); // Predicted Load
  const filterActual = historyFilter.map(
    (history: any) => history.actualLoadWeight
  ); // Actual Load

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
          <div className="w-full flex flex-row items-end justify-between gap-4">
            <div className="w-full flex flex-col items-start justify-center gap-1">
              <p className="text-xs font-normal">Start Date</p>
              <input
                type="date"
                className="outline-none text-xs px-4 py-2 lg:px-6 lg:py-4 rounded-full w-full bg-[#FCFCFC] truncate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-1">
              <p className="text-xs font-normal">End Date</p>
              <input
                type="date"
                className="outline-none text-xs px-4 py-2 lg:px-6 lg:py-4 rounded-full w-full bg-[#FCFCFC] truncate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={!startDate}
                min={startDate}
              />
            </div>
            {startDate && endDate && (
              <div
                className="p-2 lg:p-3.5 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]"
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                }}
              >
                <RiCloseFill size={16} color="white" />
              </div>
            )}
          </div>
          <div className="w-full p-6 rounded-xl gap-6 flex flex-col items-center justify-center bg-[#FCFCFC] ">
            <div className="w-full flex flex-col items-start justify-center gap-6">
              <div className="w-full flex flex-col items-start justify-center">
                <p className="text-xs font-semibold">Line Graph</p>
                <p className="text-xs font-normal text-[#6E6E6E]">
                  prediction representation using line graph
                </p>
              </div>
              <LineChart
                xAxis={[
                  {
                    id: "x-axis",
                    scaleType: "band",
                    data: startDate && endDate ? filterAxis : monthAxis,
                  },
                ]}
                series={[
                  {
                    id: "predicted",
                    label: "Predicted Load Weight",
                    data:
                      startDate && endDate ? filterPredicted : monthPredicted,
                    color: "#9C7C00",
                  },
                  {
                    id: "actual",
                    label: "Actual Load Weight",
                    data: startDate && endDate ? filterActual : monthActual,
                    color: "#466600",
                  },
                ]}
                height={300}
                grid={{ vertical: true, horizontal: true }}
              />
            </div>
          </div>
          <div className="w-full p-6 rounded-xl gap-6 flex flex-col items-center justify-center bg-[#FCFCFC] ">
            <div className="w-full flex flex-col gap-6 items-center justify-center ">
              <div className="w-full flex flex-col items-start justify-center">
                <div className="w-full flex flex-col items-start justify-center">
                  <p className="text-xs font-semibold">Bar Chart</p>
                  <p className="text-xs font-normal text-[#6E6E6E]">
                    prediction representation using bar chart
                  </p>
                </div>
                <BarChart
                  xAxis={[
                    {
                      id: "x-axis",
                      scaleType: "band",
                      data: startDate && endDate ? filterAxis : dayAxis,
                    },
                  ]}
                  series={[
                    {
                      id: "predicted",
                      label: "Predicted Load Weight",
                      data:
                        startDate && endDate ? filterPredicted : dayPredicted,
                      color: "#9C7C00",
                    },
                    {
                      id: "actual",
                      label: "Actual Load Weight",
                      data: startDate && endDate ? filterActual : dayActual,
                      color: "#466600",
                    },
                  ]}
                  height={300}
                  grid={{ vertical: true, horizontal: true }}
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
            getHistoryByMonth();
            setSelected(null);
          }}
        />
      )}
      {historyform && (
        <HistoryForm
          data={selectedPrediction}
          onClose={() => {
            setHistoryForm(false);
            getHistoryByMonth();
            setSelected(null);
          }}
        />
      )}
    </>
  );
};

export default Charts;

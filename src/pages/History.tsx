import {
  RiBardFill,
  RiDeleteBin7Line,
  RiEdit2Line,
  RiScales2Line,
  RiSearch2Line,
  RiTimerLine,
  RiWindow2Fill,
} from "react-icons/ri";
import Navigation from "../components/Navigation";
import { BarChart, LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import HistoryForm from "../components/history/HistoryForm";
import axios from "axios";
import Notification from "../components/Notification";

const History = () => {
  const [historyform, setHistoryForm] = useState(false);
  const [history, setHistory] = useState([]);
  const [selectedPrediction, setSelectedPrediction] = useState<any | null>(
    null
  );
  const [search, setSearch] = useState("");

  const [notif, setNotif] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getHistory();
  }, [search]);

  const getHistory = async () => {
    try {
      let url = `http://localhost:8080/api/predictions?predictionId=${search}`;

      let response = await axios.get(url);

      if (response.data.success) {
        setHistory(response.data.predictions);
      }
    } catch (error: any) {
      setHistory([]);
    }
  };

  const deletePrediction = async (predictionId: string) => {
    if (predictionId) {
      try {
        let url = `http://localhost:8080/api/predictions/${predictionId}`;

        let response = await axios.delete(url);

        if (response.data.success) setMessage(response.data.success);
        setNotif(true);
      } catch (error: any) {
        setMessage(error.response.data.error);
        setNotif(true);
      }
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

          <div className="w-full flex flex-row items-center justify-between px-6 py-4 gap-2 bg-[#FCFCFC] rounded-full">
            <div className="w-full flex flex-row items-center justify-start gap-4">
              <RiSearch2Line size={16} color="#6E6E6E" />
              <input
                type="text"
                className="text-xs font-normal outline-none w-full"
                placeholder="search for history using id"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-4">
            <table className="w-full table-auto border-collapse bg-[#FCFCFC] text-sm text-left rounded-xl">
              <thead className="">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-[#6E6E6E]">
                    ID
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-[#6E6E6E]">
                    Predicted Load Weight
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-[#6E6E6E]">
                    Actual Load Weight
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-[#6E6E6E]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((prediction: any) => (
                  <tr key={prediction._id} className="border-t">
                    <td className=" text-xs px-6 py-3 uppercase">
                      #{prediction._id}
                    </td>
                    <td className=" text-xs px-6 py-3">
                      {prediction.predictedLoadWeight}
                    </td>
                    <td className=" text-xs px-6 py-3">
                      {prediction.actualLoadWeight}
                    </td>
                    <td className="px-6 py-3 flex flex-row gap-2">
                      <div
                        className="p-2 rounded-full flex items-center justify-center bg-[#EDEDED] cursor-pointer"
                        onClick={() => {
                          setHistoryForm(true);
                          setSelectedPrediction(prediction);
                        }}
                      >
                        <RiEdit2Line size={16} color="black" />
                      </div>
                      <div
                        className="p-2 rounded-full flex items-center justify-center bg-[#EDEDED] cursor-pointer"
                        onClick={() => {
                          deletePrediction(prediction._id);
                        }}
                      >
                        <RiDeleteBin7Line size={16} color="black" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {notif && (
        <Notification
          message={message}
          onClose={() => {
            setNotif(false);
            getHistory();
          }}
        />
      )}
      {historyform && (
        <HistoryForm
          data={selectedPrediction}
          onClose={() => {
            setHistoryForm(false);
            getHistory();
          }}
        />
      )}
    </>
  );
};

export default History;

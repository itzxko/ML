import { useEffect, useState } from "react";
import {
  RiAddLine,
  RiDeleteBin7Line,
  RiEdit2Line,
  RiTruckFill,
} from "react-icons/ri";
import Navigation from "../components/Navigation";
import axios from "axios";
import Notification from "../components/Notification";
import TruckForm from "../components/trucks/TruckForm";

const Trucks = () => {
  const [truckForm, setTruckForm] = useState(false);
  const [trucks, setTrucks] = useState([]);

  const [notif, setNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedTruck, setSelectedTruck] = useState("");

  const getTrucks = async () => {
    try {
      let url = `http://localhost:8080/api/trucks`;

      let response = await axios.get(url);

      if (response.data.success) {
        setTrucks(response.data.trucks);
      }
    } catch (error: any) {
      setTrucks([]);
      console.log(error.response.data.error);
    }
  };

  const deleteTruck = async (truckId: string) => {
    if (truckId) {
      try {
        let url = `http://localhost:8080/api/trucks/${truckId}`;

        let response = await axios.delete(url);

        if (response.data.success) {
          setNotif(true);
          setMessage(response.data.success);
        }
      } catch (error: any) {
        setNotif(true);
        setMessage(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    getTrucks();
  }, []);

  return (
    <>
      <Navigation />
      <div className="w-full py-10 bg-[#EDEDED]"></div>
      <div className="w-full min-h-screen bg-[#EDEDED] flex flex-col items-center justify-start p-6 font-DM space-y-6">
        <div className="w-full lg:w-3/6 flex flex-row items-center justify-start gap-2">
          <div className="p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900]">
            <RiTruckFill size={16} color="white" />
          </div>
          <div className="w-full flex flex-row items-center justify-between gap-4">
            <div className="w-full lg:w-3/6 flex flex-col items-start justify-center">
              <p className="text-xs font-semibold">Trucks </p>
              <p className="text-xs font-normal text-[#6E6E6E]">
                add, edit or update trucks
              </p>
            </div>
            <div
              className="p-2 rounded-full bg-[#FCFCFC] cursor-pointer"
              onClick={() => setTruckForm(true)}
            >
              <RiAddLine size={16} color="black" />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {trucks.map((truck: any) => (
            <div
              className="p-6 rounded-xl bg-[#FCFCFC] flex flex-col gap-8 items-center justify-center"
              key={truck._id}
            >
              <div className="w-full flex flex-row items-center justify-between">
                <div className="w-1/2 flex flex-col items-start justify-center">
                  <p className="text-xs font-semibold w-full truncate">
                    {truck.name}
                  </p>
                  <p className="text-xs font-normal text-[#6E6E6E] w-full truncate uppercase">
                    #{truck._id}
                  </p>
                </div>
                <div className="flex flex-row gap-2">
                  <div
                    className=" flex flex-row items-center justify-center p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900] cursor-pointer"
                    onClick={() => {
                      setSelectedTruck(truck._id);
                      setTruckForm(true);
                    }}
                  >
                    <RiEdit2Line size={16} color="white" />
                  </div>
                  <div
                    className=" flex flex-row items-center justify-center p-2 rounded-full bg-gradient-to-tr from-[#466600] to-[#699900] cursor-pointer"
                    onClick={() => deleteTruck(truck._id)}
                  >
                    <RiDeleteBin7Line size={16} color="white" />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col items-start justify-center">
                <p className="text-xs font-normal">
                  Capacity: {truck.capacity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {truckForm && (
        <TruckForm
          truckId={selectedTruck}
          onClose={() => {
            setSelectedTruck("");
            getTrucks();
            setTruckForm(false);
          }}
        />
      )}
      {notif && (
        <Notification
          message={message}
          onClose={() => {
            setNotif(false);
            getTrucks();
          }}
        />
      )}
    </>
  );
};

export default Trucks;

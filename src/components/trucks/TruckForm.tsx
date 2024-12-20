import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  RiCheckLine,
  RiCloseLine,
  RiEye2Line,
  RiEyeCloseLine,
  RiFolder6Line,
  RiRefreshLine,
} from "react-icons/ri";
import Notification from "../Notification";

const TruckForm = ({
  truckId,
  onClose,
}: {
  truckId: string;
  onClose: () => void;
}) => {
  const [truckName, setTruckName] = useState("");
  const [capacity, setCapacity] = useState("");

  const [notif, setNotif] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const getTruckInfo = async () => {
    if (truckId) {
      try {
        let url = `http://localhost:8080/api/trucks/${truckId}`;

        let response = await axios.get(url);

        if (response.data.success === true) {
          setTruckName(response.data.truck.name);
          setCapacity(response.data.truck.capacity);
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const updateTruck = async () => {
    if (truckId) {
      try {
        let url = `http://localhost:8080/api/trucks/${truckId}`;

        let response = await axios.put(url, {
          name: truckName,
          capacity: capacity,
        });

        if (response.data.success) {
          setNotif(true);
          setError(false);
          setMessage(response.data.success);
        }
      } catch (error: any) {
        setNotif(true);
        setError(false);
        setMessage(error.response.data.message);
      }
    }
  };

  const addTruck = async () => {
    try {
      let url = `http://localhost:8080/api/trucks/`;

      let response = await axios.post(url, {
        name: truckName,
        capacity: capacity,
      });

      if (response.data.success) {
        setNotif(true);
        setError(false);
        setMessage(response.data.success);
      }
    } catch (error: any) {
      setNotif(true);
      setError(false);
      setMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    if (truckId) {
      getTruckInfo();
    }
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full min-h-[100svh] bg-black/50 flex items-start justify-start p-4 overflow-y-auto font-DM z-20">
        <div className="w-full min-h-full flex flex-col items-center justify-center">
          {/* card */}
          <div className="w-full lg:w-2/6 bg-[#FCFCFC] p-6 rounded-xl">
            <div className="w-full flex flex-row justify-between items-center space-x-4 pb-6">
              <div className="flex flex-row items-center justify-start space-x-2 w-1/2">
                <div className="p-2 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#466600] to-[#699900]">
                  <RiFolder6Line color="white" size={14} />
                </div>
                <div className="w-3/5 flex flex-row space-x-1 ">
                  <p className="w-full text-xs font-semibold truncate">
                    {truckId ? "Edit Truck Information" : "Add New Truck"}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2">
                <div
                  className="p-2 rounded-full bg-[#EDEDED] cursor-pointer"
                  onClick={() => {
                    if (!truckId) {
                      addTruck();
                    } else {
                      updateTruck();
                    }
                  }}
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
            <div className="w-full flex flex-col items-center justify-center gap-4">
              <div className="w-full flex flex-col items-start justify-center gap-2">
                <p className="text-xs font-normal">Truck Name</p>
                <input
                  type="text"
                  className="w-full px-6 py-4 rounded-xl bg-[#EDEDED] outline-none text-xs"
                  placeholder="truck name"
                  value={truckName}
                  onChange={(e) => setTruckName(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col items-start justify-center gap-2">
                <p className="text-xs font-normal">Truck Capacity</p>
                <input
                  type="text"
                  className="w-full px-6 py-4 rounded-xl bg-[#EDEDED] outline-none text-xs"
                  placeholder="capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
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

export default TruckForm;

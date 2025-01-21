import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstace from "../axios/axios";

const AdminPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [events, setEvents] = useState();
  const fetchEvents = async () => {
    try {
      const response = await axiosInstace.get("/event");
      setEvents(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    user.role === "user" ? navigate("/") : "";
    fetchEvents();
  }, [user]);
  return (
    <div className="flex gap-2 flex-wrap">
      {events && events.length
        ? events.map((e, i) => {
            return (
              <a
                key={e._id}
                href="#"
                className="block max-w-sm p-6 relative min-w-[300px] bg-white border border-gray-200 rounded-lg z-[-10] hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {e.title}
                </h5>
                <p className="font-normal  text-gray-700 dark:text-gray-400">
                    Venue:
                  {e.venue}
                </p>
                <p className="text-green-500">
                  <span className="text-gray-400">Type:</span> {e.type}
                </p>
                <p className="text-blue-300">
                  <span className="text-gray-400">Date:</span>
                  {e.date}
                </p>
                
                {/* <FaRegEdit
                  onClick={() => handleEdit(task._id)}
                  className="absolute top-4 right-4 text-white text-xl"
                />
                <MdOutlineDelete
                  onClick={() => handleDelete(task._id)}
                  className="absolute top-4 right-10 text-red-500 text-xl"
                /> */}
              </a>
            );
          })
        : ""}
    </div>
  );
};

export default AdminPage;

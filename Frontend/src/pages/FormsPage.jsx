import React, { useEffect, useState } from "react";
import axiosInstace from "../axios/axios";

const FormsPage = () => {
  const [forms, setForms] = useState();
  const fetchForms = async () => {
    try {
      const response = await axiosInstace.get("/form");
      setForms(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchForms();
  }, []);
  return (
    <div className="flex gap-2 flex-wrap">
      {forms && forms.length
        ? forms.map((f, i) => {
            return (
              <a
                key={f._id}
                href="#"
                className="block max-w-sm p-6 relative  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {f.formName}
                </h5>
                {/* <p className="font-normal  text-gray-700 dark:text-gray-400">
                  Venue:
                  {e.venue}
                </p>
                <p className="text-green-500">
                  <span className="text-gray-400">Type:</span> {e.type}
                </p>
                <p className="text-blue-300">
                  <span className="text-gray-400">Date:</span> {e.date}
                </p> */}
              </a>
            );
          })
        : ""}
    </div>
  );
};

export default FormsPage;

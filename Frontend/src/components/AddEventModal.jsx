import React, { useEffect, useState } from "react";
import axiosInstace from "../axios/axios";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

const AddEventModal = () => {
  const user = useSelector((state)=> state.user)
  const [showModal, setShowModal] = useState(false);
  const [forms, setForms] = useState([]);
  const closeModal = () => {
    setShowModal(false);
  };

  const fetchForms = async () => {
    try {
      const { data } = await axiosInstace.get("/form");
      console.log(data);
      setForms(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const { handleChange, handleSubmit } = useFormik({
    initialValues: {
      title: "",
      venue: "",
      type: "",
      date: "",
      form: forms[0]?._id,
    },
    enableReinitialize: true,

    onSubmit: async (values) => {
      try {
        console.log(values);
        
        const response = await axiosInstace.post(
          "/event/add",
           values ,
          {
            headers: { authorization: `Bearer ${user?.token}` },
          }
        );
        closeModal()
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  useEffect(() => {
    fetchForms();
  }, []);
  return (
    <>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md transform transition duration-200 ease-in-out active:scale-95"
        onClick={() => setShowModal((pre) => !pre)}
      >
        AddEvent
      </button>
      {showModal ? (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-[9] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside
            className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm"
          >
            <div className="flex items-center pb-4 text-xl font-medium text-slate-800">
              Build Your Custom Form
            </div>
            <hr />
            <div className="w-[100%] flex flex-col justify-center gap-2 m-2">
              <input
                onChange={handleChange}
                name="title"
                type="text"
                placeholder="Title"
                className="rounded-md text-black bg-gray-200 p-2 w-[70%]"
              />
              <input
                onChange={handleChange}
                name="venue"
                type="text"
                placeholder="Venue"
                className="rounded-md text-black bg-gray-200 p-2 w-[70%]"
              />
              <input
                onChange={handleChange}
                name="type"
                type="text"
                placeholder="Type"
                className="rounded-md text-black bg-gray-200 p-2 w-[70%]"
              />
              <input
                onChange={handleChange}
                name="date"
                type="date"
                placeholder=""
                className="rounded-md text-black bg-gray-200 p-2 w-[70%]"
              />

              <select
                onChange={handleChange}
                className="w-[200px] p-3 rounded-md"
                name="form"
              >
                {forms.map((f) => {
                  return (
                    <option
                      key={f._id}
                      name="form"
                      onChange={handleChange}
                      value={f._id}
                    >
                      {f.formName}
                    </option>
                  );
                })}
              </select>
            </div>
            <hr />

            <div className="flex items-center pt-4 justify-end">
              <button
                onClick={closeModal}
                className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                type="button"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AddEventModal;

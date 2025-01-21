import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import InputModal from "./InputModal";
import { useModal } from "../context/ModalContext";
import { useSelector } from "react-redux";
import axiosInstace from "../axios/axios";

const BuildFormModal = () => {
  const navigate = useNavigate();
  const { showModal, setShowModal } = useModal();
  const form = useSelector((state) => state.form);
  const user = useSelector((state) => state.user);
  const [formName, setFormName] = useState();
  const [showFormNameInput, setShowFormNameInput] = useState(false);
  console.log(formName, "form name");

  const closeModal = () => {
    setShowModal(false);
  };
  const fields = [
    "text",
    "textarea",
    "password",
    "number",
    "radio",
    "checkbox",
    // "dropdown",
    "date",
  ];

  const handleInputSelect = (inputType) => {
    console.log(inputType);

    switch (inputType) {
      case "text":
        setShowModal(false);
        navigate("/build/text");
        break;
      case "number":
        setShowModal(false);
        navigate("/build/number");
        break;
      case "textarea":
        setShowModal(false);
        navigate("/build/textarea");
        break;
      case "dropdown":
        console.log("Handling dropdown input");
        // Handle number input
        break;
      case "radio":
        setShowModal(false);
        navigate("/build/radio");
        break;
      case "checkbox":
        setShowModal(false);
        navigate("/build/checkbox");
        break;
      case "date":
        console.log("Handling date input");
        navigate("/build/date");
        // Handle date input
        break;
      case "password":
        setShowModal(false);
        navigate("/build/password");
        break;

      default:
        console.log("Unhandled input type");
        // Handle default case or unknown input types
        break;
    }
  };

  const handleSaveForm = async () => {
    console.log("complete form", form);
    setShowFormNameInput(true);
    try {
      if (formName.length) {
        const response = await axiosInstace.post("/form/add",{form,formName},{
          headers: { authorization: `Bearer ${user?.token}` },
        });
        console.log(response);
        setShowFormNameInput(false)
        setShowModal(false)
      }
    } catch (error) {
      console.log(error.message);
    //   setShowFormNameInput(false)

    }
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md transform transition duration-200 ease-in-out active:scale-95"
        onClick={() => setShowModal((pre) => !pre)}
      >
        Build Form
      </button>
      {showModal ? (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside
            className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm"
          >
            <div className="flex items-center pb-4 text-xl font-medium text-slate-800">
              Build Your Custom Form
            </div>
            <hr />

            {showFormNameInput ? (
              <div className="flex w-[90%] p-2 items-center">
                <input
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="rounded-md p-2 w-full m-2 bg-gray-200"
                  type="text"
                  placeholder="enter Form Name"
                />
              </div>
            ) : (
              <div className="flex mt-3  flex-wrap gap-2">
                {fields.map((value, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => handleInputSelect(value)}
                      className="min-w-[110px] text-md font-md px-4 py-2 text-gray-700 rounded-md bg-red-200"
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex items-center pt-4 justify-end">
              <button
                onClick={closeModal}
                className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveForm}
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

export default BuildFormModal;

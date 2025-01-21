import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";// import { addField } from "../redux/slices/FormSlice";
import { useParams } from "react-router-dom";
import { addField } from "../redux/slices/FormSlice";

const InputModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { type } = useParams();
  const { setShowModal } = useModal();
  // Define the state for input fields
  const [inputFieldsCount, setInputFieldsCount] = useState([
    {
      id: 1,
      name: "",
      type: `${type}`,
      placeholder: "",
      title:""
  
    },
  ]);
  const [showInputModal, setShowInputModal] = useState(true);

  // Close modal function
  const closeModal = () => {
    setShowModal(true);
    navigate(-1);
  };

  // Handle field value change
  const handleChange = (
    e,
    id,
    atributeType
  ) => {

    const updatedValue = e.target.value;
    setInputFieldsCount((prev) =>
      prev.map((elem) => {
        if (elem.id === id) {
          if (atributeType === "name") {
            return { ...elem, name: updatedValue,type};
          } else if (atributeType === "placeholder") {
            return { ...elem, placeholder: updatedValue,type};
          }
        }
        return elem;
      })
    );
    
  };

  const handleTitleChange = (e) => {
    setInputFieldsCount((prev) =>
      prev.map((elem) => {
        if (elem.type && (elem.type === "radio" || elem.type === "checkbox")) {
          return { ...elem, title: e.target.value }  // Type assertion here
        }
        return elem;
      })
    );
    
  }

  // Handle adding a new input field
  const handleAddField = () => {
    setInputFieldsCount((prev) => [
      ...prev,
      {
        id: prev.length + 1, // Ensure the ID is unique
        name: "",
        type: "",
        placeholder: "",
        title:""
      },
    ]);
  };

  const handleInputFieldDelete = (id) => {
    if (inputFieldsCount.length === 1) {
      return;
    }
    setInputFieldsCount((prev) => prev.filter((field) => field.id !== id));
  };

  const handleSubmit = () => {
    console.log(inputFieldsCount, "final data");
    dispatch(addField({ fields: inputFieldsCount }));
    setShowModal(true);
    navigate(-1);
  };

  return (
    <>
      {showInputModal && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-[999]  grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative m-4 p-4 w-2/5 min-w-[40%]  max-w-[40%] max-h-[400px] overflow-y-scroll rounded-lg bg-white shadow-sm"
          >
            <div className="flex items-center pb-4 text-xl font-medium text-slate-800">
              Add {type} Field
            </div>
            <hr />
            <div className="mt-3 flex flex-col items-center justify-center gap-2">
              {
                type === "radio" || type === "checkbox" ? 
                   <input  onChange={handleTitleChange} className="w-[100%] mb-2 bg-gray-200 rounded-md  p-3" type="text" placeholder={`Enter Title for ${type}`} />
                :""
              }
              {inputFieldsCount?.map((field) => (
                <div key={field.id} className="flex gap-2 w-[100%]">
                  <input
                    onChange={(e) => handleChange(e, field.id, "name")}
                    className={`px-7 ${type && type === "radio" || type === "checkbox" || type === "date" || type === "textarea" ? "w-[90%]" :"w-[40%]"} py-3 rounded-md bg-gray-200 `}
                    type="text"
                    placeholder="name"
                    value={field.name}
                  />
                  {type && type != "radio" && type != "checkbox" && type != "date" && type != "textarea" ? (
                    <input
                      onChange={(e) => handleChange(e, field.id, "placeholder")}
                      className="px-7 w-[40%] py-3 rounded-md bg-gray-200"
                      type="text"
                      placeholder="placeholder"
                      value={field.placeholder}
                    />
                  ) : (
                    ""
                  )}
                  <div className="flex gap-2">
                    <button onClick={handleAddField} className="text-2xl">
                      +
                    </button>
                    <button onClick={() => handleInputFieldDelete(field.id)}>
                      <MdOutlineDelete className="text-xl text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
      )}
    </>
  );
};

export default InputModal;

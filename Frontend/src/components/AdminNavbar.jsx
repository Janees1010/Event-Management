import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import BuildFormModal from "./BuildFormModal";
import AddEventModal from "./AddEventModal";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  
  return (
    <>
      <div className="flex fixed w-full justify-between px-[50px] py-3 bg-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">Form Builder</h1>
        </div>
        <div className="flex gap-2">
          <div>
            <BuildFormModal />
          </div>
          <div>
              <AddEventModal />
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-[22%] h-[90vh] mt-[60px] py-10 px-3 text-gray-700 bg-gray-100">
          <div className="flex flex-col gap-4">
            <Link to="/admin/forms"  className="bg-blue-200 text-center text-md rounded-md py-2 font-md active:scale-95 transition-all ease-in text-blue-700">
              My Forms
            </Link>
            <Link to="/admin"  className="bg-blue-200 text-md text-center rounded-md py-2 font-md active:scale-95 transition-all ease-in text-blue-700">
              Events
            </Link>
          </div>
          <hr className="text-black" />
        </div>
        <div className="flex-1 mt-[60px] p-3">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;

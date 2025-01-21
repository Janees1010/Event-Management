import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AdminPage from "./pages/AdminPage";
import AdminNavbar from "./components/AdminNavbar";
import InputModal from "./components/InputModal";
import FormsPage from "./pages/FormsPage";
import FormPreview from "./pages/FormPreview";

const App = () => {
  return (
    <>
      <Routes>
         <Route path='/' element={<Navbar />}>
              <Route index element={<Home />} />
              {/* <Route path="/add" element={<AddTask />} />
              <Route path='/edit/:id' element={<EditTaskPage />} /> */}
                <Route path="/build/:type" element={<InputModal />} />
                <Route path="/registration/:id" element={<FormPreview />} />
         </Route> 
         <Route path="/admin" element={<AdminNavbar />}>
             <Route index  element={<AdminPage />} />
             <Route path="forms" element={<FormsPage />} />
         </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;

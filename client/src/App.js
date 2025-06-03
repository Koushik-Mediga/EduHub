import { useState } from "react";
import "./App.css";
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import Error from "./pages/Error";
import OtpPage from "./pages/OtpPage";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import LogoutBox from "./components/common/LogoutBox";
import Settings from "./components/core/Dashboard/Settings";
import DeleteAccountModal from "./components/common/DeleteAccountModal";
import UpdateProfilePictureModal from "./components/common/UpdateProfilePictureModal";
import Mycourses from "./components/core/Dashboard/Mycourses";


function App() {

  return (
   <div className="w-screen min-h-screen bg-richblack-900 font-inter flex flex-col">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/error" element={<Error/>}></Route>
      <Route path="/verifyotp" element={<OtpPage/>}></Route>
      <Route path="/changepassword" element={<ChangePassword/>}></Route>
      <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}>
        <Route path="my-profile" index element={<MyProfile/>}></Route>
        <Route path="logout" element={<LogoutBox/>}></Route>
        <Route path="settings" element={<Settings/>}></Route>
        <Route path="deleteaccount" element={<DeleteAccountModal/>}></Route>
        <Route path="updateprofilepicture" element={<UpdateProfilePictureModal/>}></Route>
        <Route path="my-courses" element={<Mycourses/>}></Route>
      </Route>
      <Route path="*" element={<Error errorMessage="Page Not Found" errorStatus="404"/>}></Route>
    </Routes>
   </div>
  );
}

export default App;

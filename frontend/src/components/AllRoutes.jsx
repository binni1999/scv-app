import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "../screen/Login";
import Signup from "../screen/Signup";
import UserScreen from "../screen/UserScreen";
import Example from "../screen/Example";
import Contact from "../pages/Contact";
import UserContacts from "../pages/UserContacts";
import ContactModal from "../pages/ContactModal";
import ContactUs from "../general/ContactUs";
import UserHome from "./UserHome";
import Dashboard from "../screen/Dashboard";
import Profile from "../screen/Profile";
import UpdateContact from "../pages/UpdateContact";
import ProtectedRoutes from "./ProtectedRoutes";
import DirectMessage from "./DirectMessage";
import FeedbackPage from "./FeedbackPage";
import { useSelector } from "react-redux";
import ErrorPage from "../general/ErrorPage";

import Sidebar from "../screen/Sidebar";

const AllRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Routes>
        {userInfo ? (
          <Route path="/" element={<UserHome />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="" element={<ProtectedRoutes />}>
          <Route path="/add-contact" element={<Contact />} />
          <Route index={true} path="/view-contact" element={<UserContacts />} />
          <Route
            path="/view-contact/page/:curPage/search"
            element={<UserContacts />}
          />
          <Route
            path="/view-contact/page/:curPage"
            element={<UserContacts />}
          />
          <Route
            path="/view-contact/search/:keyword/pageNumber/:pageNumber"
            element={<UserContacts />}
          />
          <Route
            path="/update-contact/:contactId"
            element={<UpdateContact />}
          />
          <Route path="/contact-modal/:contactId" element={<ContactModal />} />
          <Route path="/direct-message" element={<DirectMessage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default AllRoutes;

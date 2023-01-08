import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/Navigation";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import React from "react";
import Signup from "./pages/Signup";
import NewChat from "./pages/NewChat";
import RegisterListener from "./pages/RegisterListener";
import ListenerChat from "./pages/ListenerChat";
import ListenerLogin from "./pages/ListenerLogin";
import Landing_page from "./Landing_page/Landing_page";
import AboutUs from "./AboutUs/About_Us";
import PandC from "./PandC/PandC";
import Blogs from "./Blogs/Blogs";
import ContactUs from "./ContactUs/ContactUs";
import VideoCall from "./components/VideoCall";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/listenerregister" element={<RegisterListener />} />
        <Route path="/ListenerChat" element={<ListenerChat />} />
        <Route path="/listenerlogin" element={<ListenerLogin />} />
        <Route path="/" element={<Landing_page />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/PandC" element={<PandC />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/videocall" element={<VideoCall />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

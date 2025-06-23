import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import ProducerProfile from "../pages/ProducerProfile";
import ArtistProfile from "../pages/ArtistProfile";
import StudioLoged from "../pages/StudioLoged";
import ReservarEstudio from "../pages/ReservarEstudio";
import Navbar from "../components/Navbar";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/login" element={<><Navbar /><Login /></>} />
        <Route path="/register" element={<><Navbar /><Register /></>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/producer-profile" element={<ProducerProfile />} />
        <Route path="/artist-profile" element={<ArtistProfile />} />
        <Route path="/studio-loged" element={<StudioLoged />} />
        <Route path="/estudios" element={<ReservarEstudio />} />
        <Route path="/reservar/:id" element={<ReservarEstudio />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

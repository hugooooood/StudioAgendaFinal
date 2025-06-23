import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ArtistProfile from "../pages/ArtistProfile";
import ProducerProfile from "../pages/ProducerProfile";
import StudioLoged from "../pages/StudioLoged"; // ✅ Importar StudioLoged

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página de inicio */}
        <Route path="/" element={<Home />} />

        {/* Página de login */}
        <Route path="/login" element={<Login />} />

        {/* Página de registro */}
        <Route path="/register" element={<Register />} />

        {/* Perfil general */}
        <Route path="/profile" element={<Profile />} />

        {/* Perfiles específicos */}
        <Route path="/artist-profile" element={<ArtistProfile />} />
        <Route path="/producer-profile" element={<ProducerProfile />} />

        {/* ✅ Nueva ruta añadida para redirección post-registro */}
        <Route path="/studio-loged" element={<StudioLoged />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

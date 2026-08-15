import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Jurisdictions from "./pages/Jurisdictions";
import JurisdictionDetail from "./pages/JurisdictionDetail";
import Process from "./pages/Process";
import Track from "./pages/Track";
import Start from "./pages/Start";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/jurisdictions" element={<Jurisdictions />} />
        <Route path="/jurisdictions/:slug" element={<JurisdictionDetail />} />
        <Route path="/process" element={<Process />} />
        <Route path="/track" element={<Track />} />
        <Route path="/start" element={<Start />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

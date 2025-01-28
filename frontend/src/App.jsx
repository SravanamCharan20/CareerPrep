import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Roadmap from "./pages/Roadmap";
import HackathonsPage from "./pages/HackathonsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-18"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/roadmaps" element={<Roadmap />} />
          <Route path="/hackathons" element={<HackathonsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
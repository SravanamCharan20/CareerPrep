import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import HackathonsPage from "./pages/HackathonsPage";
import MernProjects from "./pages/MernProjects";
import Projects from "./pages/Projects";
import MLProjects from "./pages/MLProjects";
import Roadmaps from "./pages/Roadmaps";
import FrontendRoadmap from "./pages/roadmaps/FrontendRoadmap";
import BackendRoadmap from './pages/roadmaps/BackendRoadmap';
import MobileRoadmap from './pages/roadmaps/MobileRoadmap';
import AIRoadmap from './pages/roadmaps/AIRoadmap';
import { RoadmapProvider } from './contexts/RoadmapContext';
import CareerPaths from "./pages/CareerPaths";
import Certifications from './pages/Certifications';
import { PrivateRoute } from './components/PrivateRoute';
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SavedItems from "./pages/SavedItems";
import Activity from "./pages/Activity";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <RoadmapProvider>
      <BrowserRouter>
        <Navbar />
        <div className="pt-18"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/hackathons" element={<HackathonsPage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/mlprojects" element={<MLProjects />} />
            <Route path="/mernprojects" element={<MernProjects />} />
            <Route path="/roadmaps" element={<Roadmaps />} />
            <Route path="/careerpaths" element={<CareerPaths />} />
            <Route 
              path="/roadmaps/*" 
              element={
                <PrivateRoute>
                  <Routes>
                    <Route index element={<Roadmaps />} />
                    <Route path="frontend" element={<FrontendRoadmap />} />
                    <Route path="backend" element={<BackendRoadmap />} />
                    <Route path="mobile" element={<MobileRoadmap />} />
                    <Route path="ai" element={<AIRoadmap />} />
                  </Routes>
                </PrivateRoute>
              }
            />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/saved" element={<PrivateRoute><SavedItems /></PrivateRoute>} />
            <Route path="/activity" element={<PrivateRoute><Activity /></PrivateRoute>} />
            <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          </Routes>
        </div>
      </BrowserRouter>
    </RoadmapProvider>
  );
}
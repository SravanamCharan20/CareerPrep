import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
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
import SearchResults from "./pages/SearchResults";
import Bookmarks from "./pages/Bookmarks";
import ChatBot from './components/ChatBot';
import FrontendPath from './pages/paths/FrontendPath';
import BackendPath from './pages/paths/BackendPath';
import FullStackPath from './pages/paths/FullStackPath';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
                <Route path="/careerpaths/frontenddeveloper" element={<FrontendPath />} />
                <Route path="/careerpaths/backenddeveloper" element={<BackendPath />} />
                <Route path="/careerpaths/fullstackdeveloper" element={<FullStackPath />} />
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
                <Route path="/search" element={<SearchResults />} />
                <Route path="/bookmarks" element={<PrivateRoute><Bookmarks /></PrivateRoute>} />
              </Routes>
            </div>
            <ChatBot />
          </BrowserRouter>
        </RoadmapProvider>
      </PersistGate>
    </Provider>
  );
}
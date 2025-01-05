import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Jobs } from './pages/Jobs';
import { Hackathons } from './pages/Hackathons';
import { Practice } from './pages/Practice';
import { Questions } from './pages/Questions';
import { Projects } from './pages/Projects';
import { Community } from './pages/Community';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-primary-900">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/hackathons" element={<Hackathons />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
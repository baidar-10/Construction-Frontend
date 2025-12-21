import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WorkerProvider } from './context/WorkerContext';
import { BookingProvider } from './context/BookingContext';

// Pages - Make sure these files exist in src/pages/
import HomePage from './pages/HomePage';
import WorkerDirectoryPage from './pages/WorkerDirectoryPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import EnhancedRegister from './pages/EnhancedRegister';
import WelcomePage from './pages/WelcomePage';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

function App() {
  return (
    <AuthProvider>
      <WorkerProvider>
        <BookingProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/workers" element={<WorkerDirectoryPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<NotFoundPage />} />
                  <Route path="/register" element={<EnhancedRegister />} />
                  <Route path="/welcome" element={<WelcomePage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </BookingProvider>
      </WorkerProvider>
    </AuthProvider>
  );
}

export default App;
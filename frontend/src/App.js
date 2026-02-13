import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedUserRoute from './components/ProtectedUserRoute';
import ProtectedOrganizerRoute from './components/ProtectedOrganizerRoute';

// Pages
import EventsList from './pages/EventsList';
import EventDetail from './pages/EventDetail';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import OrganizerLogin from './pages/OrganizerLogin';
import OrganizerRegister from './pages/OrganizerRegister';
import MyTickets from './pages/MyTickets';
import OrganizerDashboard from './pages/OrganizerDashboard';

// Styles
import './styles/index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<EventsList />} />
          <Route path="/event/:id" element={<EventDetail />} />

          {/* User Auth Routes */}
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister />} />

          {/* Organizer Auth Routes */}
          <Route path="/organizer/login" element={<OrganizerLogin />} />
          <Route path="/organizer/register" element={<OrganizerRegister />} />

          {/* User Protected Routes */}
          <Route
            path="/my-tickets"
            element={
              <ProtectedUserRoute>
                <MyTickets />
              </ProtectedUserRoute>
            }
          />

          {/* Organizer Protected Routes */}
          <Route
            path="/organizer/dashboard"
            element={
              <ProtectedOrganizerRoute>
                <OrganizerDashboard />
              </ProtectedOrganizerRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

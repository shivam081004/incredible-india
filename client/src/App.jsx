import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MapDiscovery from './pages/MapDiscovery';
import RouteFinder from './pages/RouteFinder';
import Hotels from './pages/Hotels';
import AIGuide from './pages/AIGuide';
import Navbar from './components/Navbar';
import LiveValidationDashboard from './components/LiveValidationDashboard';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-5xl mb-4">🏛️</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <MapDiscovery />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/route-finder"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <RouteFinder />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/hotels"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Hotels />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-guide"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <AIGuide />
            </>
          </ProtectedRoute>
        }
      />

      {/* Default route */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* 404 route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <>
      <AppRoutes />
      <LiveValidationDashboard />
    </>
  );
}

export default App;

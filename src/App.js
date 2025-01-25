// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Hotels from './pages/Hotels';
import Reservations from './pages/Reservations';
import Reports from './pages/Reports';
import AdminLogin from './pages/Login';

const ProtectedRoute = ({ element: Component, isAuthenticated, role, requiredRole, ...rest }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  return <Component {...rest} />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const [, payload] = token.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      setIsAuthenticated(true);
      setRole(decodedPayload.role);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div style={appContainerStyle}>
        {isAuthenticated && <Sidebar />}
        <div style={contentStyle}>
          <Routes>
            <Route path="/login" element={<AdminLogin onLogin={handleLogin} />} />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Dashboard}
                  isAuthenticated={isAuthenticated}
                  role={role}
                  requiredRole="admin"
                />
              }
            />
            <Route
              path="/hotels"
              element={
                <ProtectedRoute
                  element={Hotels}
                  isAuthenticated={isAuthenticated}
                  role={role}
                  requiredRole="admin"
                />
              }
            />
            <Route
              path="/reservations"
              element={
                <ProtectedRoute
                  element={Reservations}
                  isAuthenticated={isAuthenticated}
                  role={role}
                  requiredRole="admin"
                />
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute
                  element={Reports}
                  isAuthenticated={isAuthenticated}
                  role={role}
                  requiredRole="admin"
                />
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const appContainerStyle = {
  display: 'flex',
};

const contentStyle = {
  marginLeft: '250px',
  padding: '20px',
  flexGrow: 1,
};

export default App;

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Hotels from './pages/Hotels';
import Reservations from './pages/Reservations';
import Reports from './pages/Reports';

const App = () => {
  return (
    <Router>
      <div style={appContainerStyle}>
        <Sidebar />
        <div style={contentStyle}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<Navigate to="/" />} />
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

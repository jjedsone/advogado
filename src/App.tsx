import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdvogadoProvider } from './context/AdvogadoContext';
import AdminDashboard from './pages/Admin/AdminDashboard';
import SitePublico from './pages/Site/SitePublico';
import './App.css';

function App() {
  return (
    <AdvogadoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SitePublico />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AdvogadoProvider>
  );
}

export default App;

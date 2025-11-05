import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdvogadoProvider } from './context/AdvogadoContext';
import AdminDashboard from './pages/Admin/AdminDashboard.tsx';
import AdminLogin from './pages/Admin/AdminLogin.tsx';
import SitePublico from './pages/Site/SitePublico.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import './App.css';

function App() {
  return (
    <AdvogadoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SitePublico />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AdvogadoProvider>
  );
}

export default App;

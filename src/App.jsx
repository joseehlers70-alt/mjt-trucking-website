import { Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import HomePage from './pages/HomePage.jsx';
import TruckDetailPage from './pages/TruckDetailPage.jsx';
import TrucksPage from './pages/TrucksPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/trucks" element={<TrucksPage />} />
      <Route path="/trucks/:slug" element={<TruckDetailPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

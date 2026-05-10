import { Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Home from '../pages/Home';
import Search from '../pages/Search';
import ProfessionalProfile from '../pages/ProfessionalProfile';
import Auth from '../pages/Auth';
import ProfessionalDashboard from '../pages/ProfessionalDashboard';
import ClientDashboard from '../pages/ClientDashboard';
import Chat from '../pages/Chat';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return <Routes><Route element={<PublicLayout />}><Route path="/" element={<Home />} /><Route path="/buscar" element={<Search />} /><Route path="/profissional/:id" element={<ProfessionalProfile />} /><Route path="/login" element={<Auth />} /><Route path="/chat" element={<Chat />} /></Route><Route element={<ProtectedRoute />}><Route path="/dashboard" element={<DashboardLayout />}><Route path="profissional" element={<ProfessionalDashboard />} /><Route path="cliente" element={<ClientDashboard />} /></Route></Route><Route path="*" element={<NotFound />} /></Routes>;
}

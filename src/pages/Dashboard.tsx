import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardHome } from '@/components/dashboard/views/DashboardHome';
import { ClientsView } from '@/components/dashboard/views/ClientsView';
import { StockView } from '@/components/dashboard/views/StockView';
import { NewServiceView } from '@/components/dashboard/views/NewServiceView';
import { ReportsView } from '@/components/dashboard/views/ReportsView';
import { EmployeesView } from '@/components/dashboard/views/EmployeesView';
import { SettingsView } from '@/components/dashboard/views/SettingsView';
import { ScheduleView } from '@/components/dashboard/views/ScheduleView';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

// Mapeamento de rotas para views
const viewMap = {
  '': 'dashboard',
  'schedule': 'schedule',
  'clients': 'clients',
  'stock': 'stock',
  'new-service': 'new-service',
  'reports': 'reports',
  'employees': 'employees',
  'settings': 'settings'
};

export const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [activeView, setActiveView] = useState('dashboard');

  // Atualiza a view ativa baseado na rota atual
  useEffect(() => {
    const path = location.pathname.split('/dashboard/')[1] || '';
    setActiveView(viewMap[path] || 'dashboard');
  }, [location]);

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`
          fixed md:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <DashboardSidebar 
            activeView={activeView} 
            onViewChange={(view) => {
              setActiveView(view);
              setIsSidebarOpen(false);
            }} 
          />
        </div>

        {/* Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto w-full md:w-[calc(100%-16rem)] pt-16 md:pt-0">
          <div className="p-3 sm:p-6">
            <Routes>
              <Route index element={<DashboardHome />} />
              <Route path="schedule" element={<ScheduleView />} />
              <Route path="clients" element={<ClientsView />} />
              <Route path="stock" element={<StockView />} />
              <Route path="new-service" element={<NewServiceView />} />
              <Route path="reports" element={<ReportsView />} />
              <Route path="employees" element={<EmployeesView />} />
              <Route path="settings" element={<SettingsView />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

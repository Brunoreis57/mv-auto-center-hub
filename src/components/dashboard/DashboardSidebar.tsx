import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Plus,
  Settings,
  LogOut,
  DollarSign,
  UserPlus,
  Calendar
} from 'lucide-react';

interface DashboardSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeView, onViewChange }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getMenuItems = (role: UserRole) => {
    const baseItems = [
      { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
      { id: 'schedule', title: 'Agenda', icon: Calendar, path: '/dashboard/schedule' },
      { id: 'clients', title: 'Clientes', icon: Users, path: '/dashboard/clients' },
      { id: 'stock', title: 'Estoque', icon: Package, path: '/dashboard/stock' },
      { id: 'new-service', title: 'Novo Serviço', icon: Plus, path: '/dashboard/new-service' },
    ];

    if (role === 'administrador' || role === 'desenvolvedor') {
      baseItems.push(
        { id: 'reports', title: 'Relatórios', icon: DollarSign, path: '/dashboard/reports' },
        { id: 'employees', title: 'Funcionários', icon: UserPlus, path: '/dashboard/employees' }
      );
    }

    if (role === 'desenvolvedor') {
      baseItems.push({ id: 'settings', title: 'Configurações', icon: Settings, path: '/dashboard/settings' });
    }

    return baseItems;
  };

  const menuItems = getMenuItems(user?.role || 'funcionario');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMenuClick = (item: { id: string; path: string }) => {
    onViewChange(item.id);
    navigate(item.path);
  };

  return (
    <div className="flex flex-col h-full bg-background border-r border-mv-blue-100 dark:border-mv-blue-800">
      {/* Header */}
      <div className="p-4 border-b border-mv-blue-100 dark:border-mv-blue-800">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/logos/logo.png.png" 
            alt="MV Auto Center Logo" 
            className="h-8 w-auto"
          />
          <div>
            <h2 className="font-bold text-base bg-mv-gradient bg-clip-text text-transparent">
              MV Auto Center
            </h2>
            <p className="text-xs text-muted-foreground">Sistema de Gestão</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-3">
          <h3 className="px-3 text-xs font-medium text-muted-foreground mb-3">Menu Principal</h3>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
                  ${activeView === item.id 
                    ? 'bg-mv-blue-100 text-mv-blue-700 dark:bg-mv-blue-900 dark:text-mv-blue-300' 
                    : 'text-foreground hover:bg-mv-blue-50 dark:hover:bg-mv-blue-900/50'
                  }
                `}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span>{item.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-mv-blue-100 dark:border-mv-blue-800 p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
            <ThemeToggle />
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full justify-start text-sm border-mv-blue-200 hover:bg-mv-blue-50 dark:border-mv-blue-700 dark:hover:bg-mv-blue-900"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
};

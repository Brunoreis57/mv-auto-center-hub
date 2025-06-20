import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Car, 
  Clock, 
  CheckCircle, 
  DollarSign,
  Calendar,
  TrendingUp,
  Eye
} from 'lucide-react';

export const DashboardHome: React.FC = () => {
  const navigate = useNavigate();
  
  const todayStats = {
    totalClients: 12,
    inProgress: 5,
    completed: 7,
    revenue: 1850
  };

  const recentServices = [
    {
      id: 1,
      client: 'João Silva',
      car: 'Honda Civic - ABC-1234',
      service: 'Lavagem Premium',
      time: '14:30',
      status: 'completed'
    },
    {
      id: 2,
      client: 'Maria Santos',
      car: 'Toyota Corolla - XYZ-9876',
      service: 'Troca de Óleo',
      time: '15:00',
      status: 'in-progress'
    }
  ];

  const upcomingServices = [
    {
      id: 3,
      client: 'Carlos Oliveira',
      car: 'VW Golf - DEF-5555',
      service: 'Detalhamento Completo',
      date: 'Amanhã',
      time: '09:30',
      status: 'scheduled'
    },
    {
      id: 4,
      client: 'Ana Costa',
      car: 'Ford Focus - GHI-7777',
      service: 'Vitrificação',
      date: 'Amanhã',
      time: '14:00',
      status: 'scheduled'
    },
    {
      id: 5,
      client: 'Pedro Santos',
      car: 'Fiat Argo - JKL-9999',
      service: 'Polimento',
      date: 'Em 2 dias',
      time: '10:00',
      status: 'scheduled'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">Finalizado</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs">Em Andamento</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs">Agendado</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">Desconhecido</Badge>;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Visão geral do dia {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
        <Button 
          className="bg-mv-gradient hover:opacity-90 w-full sm:w-auto"
          onClick={() => navigate('schedule')}
        >
          <Calendar className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Ver Agenda Completa</span>
          <span className="sm:hidden">Agenda</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card className="bg-card/90 dark:bg-card/75">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-mv-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-mv-blue-700 dark:text-mv-blue-300">
              {todayStats.totalClients}
            </div>
            <p className="text-xs text-muted-foreground">+2 em relação a ontem</p>
          </CardContent>
        </Card>

        <Card className="bg-card/90 dark:bg-card/75">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Em Andamento</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-yellow-700 dark:text-yellow-300">
              {todayStats.inProgress}
            </div>
            <p className="text-xs text-muted-foreground">Serviços ativos</p>
          </CardContent>
        </Card>

        <Card className="bg-card/90 dark:bg-card/75">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Finalizados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-green-700 dark:text-green-300">
              {todayStats.completed}
            </div>
            <p className="text-xs text-muted-foreground">Serviços concluídos</p>
          </CardContent>
        </Card>

        <Card className="bg-card/90 dark:bg-card/75">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Faturamento</CardTitle>
            <DollarSign className="h-4 w-4 text-mv-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-mv-blue-700 dark:text-mv-blue-300">
              R$ {todayStats.revenue.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +15% vs ontem
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Services */}
        <Card className="bg-card/90 dark:bg-card/75">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Car className="h-5 w-5 text-mv-blue-600" />
              Últimos Atendimentos
            </CardTitle>
            <CardDescription className="text-sm">
              Serviços realizados e em andamento hoje
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {recentServices.map((service) => (
                <div key={service.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-background/50 rounded-lg space-y-2 sm:space-y-0 hover:bg-background/70 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
                      <h4 className="font-medium text-sm sm:text-base">{service.client}</h4>
                      {getStatusBadge(service.status)}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground break-words">{service.car}</p>
                    <p className="text-xs sm:text-sm font-medium text-mv-blue-600">{service.service}</p>
                  </div>
                  <div className="flex flex-row sm:flex-col sm:text-right items-center sm:items-end justify-between sm:justify-start gap-2">
                    <p className="text-sm font-medium">{service.time}</p>
                    <Button variant="ghost" size="sm" className="h-8 px-2 sm:mt-1">
                      <Eye className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Ver Detalhes</span>
                      <span className="sm:hidden">Ver</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Services */}
        <Card className="bg-card/90 dark:bg-card/75">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Calendar className="h-5 w-5 text-mv-blue-600" />
              Próximos Atendimentos
            </CardTitle>
            <CardDescription className="text-sm">
              Serviços agendados para os próximos dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {upcomingServices.map((service) => (
                <div key={service.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-background/50 rounded-lg space-y-2 sm:space-y-0 hover:bg-background/70 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
                      <h4 className="font-medium text-sm sm:text-base">{service.client}</h4>
                      {getStatusBadge(service.status)}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground break-words">{service.car}</p>
                    <p className="text-xs sm:text-sm font-medium text-mv-blue-600">{service.service}</p>
                  </div>
                  <div className="flex flex-row sm:flex-col sm:text-right items-center sm:items-end justify-between sm:justify-start gap-2">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{service.date}</p>
                      <p className="text-sm font-medium">{service.time}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 px-2 sm:mt-1">
                      <Eye className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Ver Detalhes</span>
                      <span className="sm:hidden">Ver</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

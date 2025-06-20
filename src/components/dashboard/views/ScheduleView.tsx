import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { 
  Car, 
  Clock, 
  CheckCircle,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';

// Função auxiliar para formatar a data no formato YYYY-MM-DD
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Função auxiliar para verificar se duas datas são o mesmo dia
const isSameDay = (date1: Date, date2: Date): boolean => {
  return formatDate(date1) === formatDate(date2);
};

export const ScheduleView: React.FC = () => {
  const [date, setDate] = React.useState<Date>(new Date());

  // Dados mockados de agendamentos para o mês todo
  const allScheduleData = {
    // Hoje
    [formatDate(new Date())]: [
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
    ],
    // Amanhã
    [formatDate(new Date(Date.now() + 86400000))]: [
      {
        id: 3,
        client: 'Carlos Oliveira',
        car: 'VW Golf - DEF-5555',
        service: 'Detalhamento Completo',
        time: '15:30',
        status: 'scheduled'
      }
    ],
    // Depois de amanhã
    [formatDate(new Date(Date.now() + 172800000))]: [
      {
        id: 4,
        client: 'Ana Costa',
        car: 'Ford Focus - GHI-7777',
        service: 'Vitrificação',
        time: '16:00',
        status: 'scheduled'
      }
    ]
  };

  // Função para obter os agendamentos do dia selecionado
  const getScheduleForDate = (selectedDate: Date) => {
    return allScheduleData[formatDate(selectedDate)] || [];
  };

  // Função para verificar se uma data tem agendamentos
  const hasSchedule = (day: Date) => {
    return !!allScheduleData[formatDate(day)];
  };

  // Função para renderizar o conteúdo do dia no calendário
  const renderDayContent = (day: Date) => {
    const schedules = allScheduleData[formatDate(day)];
    if (!schedules) return null;

    return (
      <div className="w-1.5 h-1.5 bg-mv-blue-600 rounded-full absolute bottom-1 left-1/2 transform -translate-x-1/2" />
    );
  };

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

  // Ordenar agendamentos por horário
  const sortedSchedules = React.useMemo(() => {
    return getScheduleForDate(date).sort((a, b) => {
      return a.time.localeCompare(b.time);
    });
  }, [date]);

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Agenda</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Visualize e gerencie todos os agendamentos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-4 sm:gap-6">
        {/* Calendar */}
        <Card className="bg-card/90 dark:bg-card/75">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CalendarIcon className="h-5 w-5 text-mv-blue-600" />
              Calendário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border p-3"
              components={{
                DayContent: ({ date: dayDate }) => (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <span className={`
                      w-8 h-8 flex items-center justify-center rounded-full
                      ${isSameDay(dayDate, date) ? 'bg-mv-blue-600 text-white' : ''}
                    `}>
                      {dayDate.getDate()}
                    </span>
                    {renderDayContent(dayDate)}
                  </div>
                ),
              }}
              classNames={{
                head_cell: "w-10 h-10 font-normal text-muted-foreground",
                cell: "w-10 h-10 text-center p-0 relative [&:has([aria-selected])]:bg-transparent focus-within:relative focus-within:z-20",
                day: "w-10 h-10 p-0 font-normal aria-selected:opacity-100 hover:bg-transparent",
                nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse",
              }}
            />
          </CardContent>
        </Card>

        {/* Schedule List */}
        <Card className="bg-card/90 dark:bg-card/75">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-mv-blue-600" />
                  Agendamentos
                </CardTitle>
                <CardDescription className="capitalize">
                  {date.toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </CardDescription>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sortedSchedules.length > 0 ? (
                sortedSchedules.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-background/50 rounded-lg space-y-2 sm:space-y-0 hover:bg-background/70 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
                        <h4 className="font-medium text-sm sm:text-base">{appointment.client}</h4>
                        {getStatusBadge(appointment.status)}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">{appointment.car}</p>
                      <p className="text-xs sm:text-sm font-medium text-mv-blue-600">{appointment.service}</p>
                    </div>
                    <div className="flex flex-row sm:flex-col sm:text-right items-center sm:items-end justify-between sm:justify-start gap-2">
                      <p className="text-sm font-medium">{appointment.time}</p>
                      <Button variant="ghost" size="sm" className="h-8 px-2 sm:mt-1">
                        <Eye className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Ver Detalhes</span>
                        <span className="sm:hidden">Ver</span>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhum agendamento para este dia</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 
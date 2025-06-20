import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, TrendingUp, Users, Package, Download } from 'lucide-react';

interface ReportData {
  period: string;
  totalRevenue: number;
  totalServices: number;
  totalClients: number;
  averageTicket: number;
  topServices: { name: string; count: number; revenue: number }[];
}

const mockReportData: ReportData = {
  period: 'Junho 2024',
  totalRevenue: 45680.50,
  totalServices: 187,
  totalClients: 98,
  averageTicket: 244.28,
  topServices: [
    { name: 'Lavagem Premium', count: 45, revenue: 13500.00 },
    { name: 'Troca de Óleo', count: 38, revenue: 9500.00 },
    { name: 'Detalhamento Completo', count: 28, revenue: 11200.00 },
    { name: 'Vitrificação', count: 15, revenue: 7500.00 },
    { name: 'Polimento Técnico', count: 22, revenue: 6600.00 }
  ]
};

export const ReportsView: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [reportData] = useState<ReportData>(mockReportData);

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold bg-mv-gradient bg-clip-text text-transparent">
          Relatórios Financeiros
        </h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensal</SelectItem>
              <SelectItem value="yearly">Anual</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-mv-gradient hover:opacity-90 w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card className="bg-card/90 dark:bg-card/75">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              R$ {reportData.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              +12.5% em relação ao período anterior
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/90 dark:bg-card/75">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Serviços</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{reportData.totalServices}</div>
            <p className="text-xs text-muted-foreground">
              +8.2% em relação ao período anterior
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/90 dark:bg-card/75">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Atendidos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{reportData.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              +15.3% em relação ao período anterior
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/90 dark:bg-card/75">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              R$ {reportData.averageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              +5.1% em relação ao período anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/90 dark:bg-card/75">
        <CardHeader>
          <CardTitle>Serviços Mais Vendidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {reportData.topServices.map((service, index) => (
              <div key={service.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-background/50 border rounded-lg space-y-2 sm:space-y-0">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Badge variant="secondary">#{index + 1}</Badge>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">{service.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{service.count} serviços realizados</p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-bold text-green-600 text-sm sm:text-base">
                    R$ {service.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    R$ {(service.revenue / service.count).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / serviço
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

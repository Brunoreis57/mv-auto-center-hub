import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { User, Car, CheckSquare, AlertCircle, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const services = [
  { id: 'lavagem-simples', name: 'Lavagem Simples', price: 25 },
  { id: 'lavagem-premium', name: 'Lavagem Premium', price: 45 },
  { id: 'lavacao-tecnica', name: 'Lavação Técnica e Detalhamento', price: 120 },
  { id: 'higienizacao', name: 'Higienização + Hidratação + Limpeza de Couro', price: 80 },
  { id: 'vitrificacao', name: 'Vitrificação de Pintura + Espelhamento', price: 300 },
  { id: 'enceramento', name: 'Enceramento e Aplicação de Cera', price: 60 },
  { id: 'polimento', name: 'Polimento Técnico', price: 150 },
  { id: 'cristalizacao', name: 'Cristalização de Vidros', price: 90 },
  { id: 'troca-oleo', name: 'Troca de Óleo', price: 80 }
];

const carConditions = [
  'Arranhões na lataria',
  'Riscos nos vidros', 
  'Amassados',
  'Pintura desbotada',
  'Interior sujo',
  'Bancos manchados',
  'Tapetes desgastados'
];

const additionalServices = [
  'Aplicação de película nos vidros',
  'Proteção de bancos em couro',
  'Aromatização interna',
  'Limpeza do motor',
  'Impermeabilização de bancos',
  'Tratamento antiestático'
];

export const NewServiceView: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedAdditional, setSelectedAdditional] = useState<string[]>([]);
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    email: '',
    carModel: '',
    carPlate: '',
    carYear: ''
  });
  const [observations, setObservations] = useState('');
  const { toast } = useToast();

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleConditionToggle = (condition: string) => {
    setSelectedConditions(prev =>
      prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  const handleAdditionalToggle = (additional: string) => {
    setSelectedAdditional(prev =>
      prev.includes(additional)
        ? prev.filter(a => a !== additional)
        : [...prev, additional]
    );
  };

  const calculateTotal = () => {
    return services
      .filter(service => selectedServices.includes(service.id))
      .reduce((total, service) => total + service.price, 0);
  };

  const handleConfirmService = () => {
    if (!customerData.name || !customerData.phone || !customerData.carModel || !customerData.carPlate) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios do cliente e veículo",
        variant: "destructive"
      });
      return;
    }

    if (selectedServices.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um serviço",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save to a database or API
    console.log('Service Data:', {
      customer: customerData,
      services: selectedServices,
      conditions: selectedConditions,
      additional: selectedAdditional,
      total: calculateTotal(),
      observations,
      createdAt: new Date().toISOString()
    });

    toast({
      title: "Sucesso",
      description: `Serviço confirmado! Total: R$ ${calculateTotal().toFixed(2)}`,
    });

    // Reset form
    setCustomerData({
      name: '',
      phone: '',
      email: '',
      carModel: '',
      carPlate: '',
      carYear: ''
    });
    setSelectedServices([]);
    setSelectedConditions([]);
    setSelectedAdditional([]);
    setObservations('');
  };

  const handleSaveDraft = () => {
    toast({
      title: "Rascunho Salvo",
      description: "O orçamento foi salvo como rascunho",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-mv-gradient bg-clip-text text-transparent">
        Novo Serviço
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dados do Cliente */}
        <Card className="bg-card/90 dark:bg-card/75">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Dados do Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={customerData.name}
                onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nome do cliente"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="cliente@email.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dados do Veículo */}
        <Card className="bg-card/90 dark:bg-card/75">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Dados do Veículo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="carModel">Modelo do Carro *</Label>
              <Input
                id="carModel"
                value={customerData.carModel}
                onChange={(e) => setCustomerData(prev => ({ ...prev, carModel: e.target.value }))}
                placeholder="Honda Civic"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="carPlate">Placa *</Label>
                <Input
                  id="carPlate"
                  value={customerData.carPlate}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, carPlate: e.target.value }))}
                  placeholder="ABC-1234"
                  required
                />
              </div>
              <div>
                <Label htmlFor="carYear">Ano</Label>
                <Input
                  id="carYear"
                  value={customerData.carYear}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, carYear: e.target.value }))}
                  placeholder="2020"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Serviços Disponíveis */}
      <Card className="bg-card/90 dark:bg-card/75">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Serviços Solicitados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex items-center space-x-3 bg-background/50 p-3 rounded-lg"
              >
                <Checkbox
                  id={service.id}
                  checked={selectedServices.includes(service.id)}
                  onCheckedChange={() => handleServiceToggle(service.id)}
                />
                <div className="flex-1 flex items-center justify-between">
                  <Label
                    htmlFor={service.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {service.name}
                  </Label>
                  <Badge variant="secondary">
                    R$ {service.price.toFixed(2)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Condições do Veículo */}
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Condições do Veículo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {carConditions.map((condition) => (
              <div
                key={condition}
                className="flex items-center space-x-3 bg-background/50 p-3 rounded-lg"
              >
                <Checkbox
                  id={condition}
                  checked={selectedConditions.includes(condition)}
                  onCheckedChange={() => handleConditionToggle(condition)}
                />
                <Label
                  htmlFor={condition}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {condition}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Serviços Adicionais */}
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Serviços Adicionais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {additionalServices.map((additional) => (
              <div
                key={additional}
                className="flex items-center space-x-3 bg-background/50 p-3 rounded-lg"
              >
                <Checkbox
                  id={additional}
                  checked={selectedAdditional.includes(additional)}
                  onCheckedChange={() => handleAdditionalToggle(additional)}
                />
                <Label
                  htmlFor={additional}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {additional}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Observações e Total */}
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Observações e Total
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="observations">Observações</Label>
            <Textarea
              id="observations"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Observações adicionais sobre o serviço..."
              rows={3}
            />
          </div>
          <Separator />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total dos Serviços</p>
              <p className="text-2xl font-bold">
                R$ {calculateTotal().toFixed(2)}
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" className="flex-1 sm:flex-initial" onClick={handleSaveDraft}>
                Salvar Rascunho
              </Button>
              <Button className="bg-mv-gradient hover:opacity-90 flex-1 sm:flex-initial" onClick={handleConfirmService}>
                Confirmar Serviço
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

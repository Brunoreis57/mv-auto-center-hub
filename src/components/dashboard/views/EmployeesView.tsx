import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Trash2, User, Mail, Phone, Calendar } from 'lucide-react';
import { UserRole } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  hireDate: string;
  isActive: boolean;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@mvauto.com',
    phone: '(11) 99999-9999',
    role: 'funcionario',
    hireDate: '2024-01-15',
    isActive: true
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@mvauto.com',
    phone: '(11) 88888-8888',
    role: 'administrador',
    hireDate: '2023-06-10',
    isActive: true
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro@mvauto.com',
    phone: '(11) 77777-7777',
    role: 'funcionario',
    hireDate: '2024-03-20',
    isActive: false
  }
];

export const EmployeesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'funcionario' as UserRole
  });
  const { toast } = useToast();

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'desenvolvedor':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'administrador':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'funcionario':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleAddEmployee = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const newEmployee: Employee = {
      id: Date.now().toString(),
      ...formData,
      hireDate: new Date().toISOString().split('T')[0],
      isActive: true
    };

    if (editingEmployee) {
      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id ? { ...newEmployee, id: editingEmployee.id, hireDate: editingEmployee.hireDate } : emp
      ));
      toast({
        title: "Sucesso",
        description: "Funcionário atualizado com sucesso"
      });
    } else {
      setEmployees([...employees, newEmployee]);
      toast({
        title: "Sucesso",
        description: "Funcionário adicionado com sucesso"
      });
    }

    setFormData({ name: '', email: '', phone: '', role: 'funcionario' });
    setEditingEmployee(null);
    setIsDialogOpen(false);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      role: employee.role
    });
    setIsDialogOpen(true);
  };

  const handleDeleteEmployee = (employeeId: string) => {
    setEmployees(employees.filter(emp => emp.id !== employeeId));
    toast({
      title: "Sucesso",
      description: "Funcionário removido com sucesso"
    });
  };

  const toggleEmployeeStatus = (employeeId: string) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId ? { ...emp, isActive: !emp.isActive } : emp
    ));
    toast({
      title: "Sucesso",
      description: "Status do funcionário atualizado"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-mv-gradient bg-clip-text text-transparent">
          Gestão de Funcionários
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-mv-gradient hover:opacity-90" onClick={() => {
              setEditingEmployee(null);
              setFormData({ name: '', email: '', phone: '', role: 'funcionario' });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Funcionário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingEmployee ? 'Editar Funcionário' : 'Adicionar Funcionário'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nome completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@mvauto.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input 
                  id="phone" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Cargo *</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value as UserRole })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="funcionario">Funcionário</SelectItem>
                    <SelectItem value="administrador">Administrador</SelectItem>
                    <SelectItem value="desenvolvedor">Desenvolvedor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-mv-gradient hover:opacity-90" onClick={handleAddEmployee}>
                {editingEmployee ? 'Salvar' : 'Adicionar'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="bg-card/90 dark:bg-card/75 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-mv-blue-100 dark:bg-mv-blue-900 rounded-full">
                    <User className="h-6 w-6 text-mv-blue-600 dark:text-mv-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {employee.name}
                      <Badge className={getRoleBadgeColor(employee.role)}>
                        {employee.role.charAt(0).toUpperCase() + employee.role.slice(1)}
                      </Badge>
                      <Badge variant={employee.isActive ? "default" : "secondary"}>
                        {employee.isActive ? "Ativo" : "Inativo"}
                      </Badge>
                    </CardTitle>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4 flex-shrink-0" />
                        <span>{employee.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <span>{employee.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span>Contratado em {new Date(employee.hireDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => handleEditEmployee(employee)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => toggleEmployeeStatus(employee.id)}>
                    {employee.isActive ? "Desativar" : "Ativar"}
                  </Button>
                  <Button variant="destructive" size="sm" className="w-full sm:w-auto" onClick={() => handleDeleteEmployee(employee.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhum funcionário encontrado.</p>
        </div>
      )}
    </div>
  );
};

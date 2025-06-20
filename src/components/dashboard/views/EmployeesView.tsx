import React, { useState, useEffect } from 'react';
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
import { userServices } from '@/lib/services/users';

type Role = 'administrador' | 'funcionario';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
  created_at: string;
}

export const EmployeesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'funcionario' as Role
  });
  const { toast } = useToast();

  // Carregar funcionários
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await userServices.findAll();
      // Garantir que o role seja do tipo correto e converter a data
      const typedEmployees = data.map(emp => ({
        id: emp.id,
        name: emp.name,
        email: emp.email,
        role: emp.role === 'administrador' ? 'administrador' as const : 'funcionario' as const,
        active: emp.active,
        created_at: new Date(emp.created_at).toISOString()
      }));
      setEmployees(typedEmployees);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar funcionários",
        variant: "destructive"
      });
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeColor = (role: Role) => {
    switch (role) {
      case 'administrador':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'funcionario':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleAddEmployee = async () => {
    try {
      if (!formData.name || !formData.email || (!editingEmployee && !formData.password)) {
        toast({
          title: "Erro",
          description: "Preencha todos os campos obrigatórios",
          variant: "destructive"
        });
        return;
      }

      if (editingEmployee) {
        await userServices.update(editingEmployee.id, {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          ...(formData.password ? { password: formData.password } : {})
        });
        toast({
          title: "Sucesso",
          description: "Funcionário atualizado com sucesso"
        });
      } else {
        await userServices.create({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        });
        toast({
          title: "Sucesso",
          description: "Funcionário adicionado com sucesso"
        });
      }

      loadEmployees();
      setFormData({ name: '', email: '', password: '', role: 'funcionario' });
      setEditingEmployee(null);
      setIsDialogOpen(false);
    } catch (error: any) {
      console.error('Erro ao salvar funcionário:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao salvar funcionário. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      password: '',
      role: employee.role
    });
    setIsDialogOpen(true);
  };

  const handleDeleteEmployee = async (employeeId: string) => {
    try {
      await userServices.delete(employeeId);
      loadEmployees();
      toast({
        title: "Sucesso",
        description: "Funcionário removido com sucesso"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao remover funcionário",
        variant: "destructive"
      });
    }
  };

  const toggleEmployeeStatus = async (employee: Employee) => {
    try {
      await userServices.update(employee.id, {
        active: !employee.active
      });
      loadEmployees();
      toast({
        title: "Sucesso",
        description: "Status do funcionário atualizado"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar status do funcionário",
        variant: "destructive"
      });
    }
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
              setFormData({ name: '', email: '', password: '', role: 'funcionario' });
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
                <Label htmlFor="password">{editingEmployee ? 'Nova Senha (opcional)' : 'Senha *'}</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="********"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Função</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value: Role) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="funcionario">Funcionário</SelectItem>
                    <SelectItem value="administrador">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
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

      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-gray-500" />
        <Input
          placeholder="Buscar funcionários..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className={!employee.active ? 'opacity-70' : ''}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <Badge className={getRoleBadgeColor(employee.role)}>
                  {employee.role.charAt(0).toUpperCase() + employee.role.slice(1)}
                </Badge>
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditEmployee(employee)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteEmployee(employee.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 opacity-70" />
                  <span className="text-sm font-medium">{employee.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 opacity-70" />
                  <span className="text-sm">{employee.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 opacity-70" />
                  <span className="text-sm">
                    {new Date(employee.created_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => toggleEmployeeStatus(employee)}
                >
                  {employee.active ? 'Desativar' : 'Ativar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

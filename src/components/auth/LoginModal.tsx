import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Car, Lock, User } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao sistema MV Auto Center",
        });
        onSuccess();
        onClose();
      } else {
        toast({
          title: "Erro no login",
          description: "E-mail ou senha incorretos",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { role: 'Funcionário', email: 'funcionario@mvauto.com', password: '123456' },
    { role: 'Administrador', email: 'admin@mvauto.com', password: '123456' },
    { role: 'Desenvolvedor', email: 'dev@mvauto.com', password: '123456' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-4 sm:p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-mv-gradient rounded-lg">
              <Car className="h-5 w-5 text-white" />
            </div>
            Login - MV Auto Center
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="focus:border-mv-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="focus:border-mv-blue-500"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-mv-gradient hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Entrando...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Entrar
                </>
              )}
            </Button>
          </form>

          {/* Demo Accounts */}
          <Card className="border-mv-blue-100 dark:border-mv-blue-800">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-mv-blue-600" />
                Contas de Demonstração
              </CardTitle>
              <CardDescription className="text-sm">
                Use uma das contas abaixo para testar o sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2 space-y-2">
              {demoAccounts.map((account, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <div>
                    <Badge 
                      variant="secondary"
                      className="mb-0.5 bg-mv-blue-100 text-mv-blue-800 dark:bg-mv-blue-900 dark:text-mv-blue-200"
                    >
                      {account.role}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      <div>{account.email}</div>
                      <div>Senha: {account.password}</div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEmail(account.email);
                      setPassword(account.password);
                    }}
                    className="border-mv-blue-200 hover:bg-mv-blue-50 dark:border-mv-blue-700 dark:hover:bg-mv-blue-900"
                  >
                    Usar
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

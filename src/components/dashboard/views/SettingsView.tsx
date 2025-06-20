import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Settings, Palette, Globe, DollarSign, Save, Upload, Eye, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';

interface SiteSettings {
  siteName: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  facebookUrl: string;
  instagramUrl: string;
  whatsappNumber: string;
}

interface VisualSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderRadius: 'none' | 'small' | 'medium' | 'large';
  fontFamily: 'inter' | 'roboto' | 'poppins' | 'system';
  buttonStyle: 'default' | 'soft' | 'outline' | 'gradient';
  cardStyle: 'default' | 'glass' | 'bordered' | 'elevated';
  isDarkMode: boolean;
  useCustomColors: boolean;
  logo?: string;
  banner?: string;
}

interface ServicePrice {
  id: string;
  name: string;
  price: number;
  description: string;
  isActive: boolean;
}

const mockSiteSettings: SiteSettings = {
  siteName: 'MV Centro Automotivo',
  heroTitle: 'MV Centro Automotivo',
  heroSubtitle: 'Cuidamos do seu veículo com excelência e dedicação',
  aboutText: 'Especialistas em estética automotiva com mais de 10 anos de experiência no mercado.',
  contactPhone: '(11) 99999-9999',
  contactEmail: 'contato@mvauto.com',
  contactAddress: 'Rua dos Automóveis, 123 - São Paulo/SP',
  facebookUrl: 'https://facebook.com/mvauto',
  instagramUrl: 'https://instagram.com/mvauto',
  whatsappNumber: '11999999999'
};

const mockServicePrices: ServicePrice[] = [
  { id: '1', name: 'Lavagem Premium', price: 150.00, description: 'Lavagem externa e interna completa', isActive: true },
  { id: '2', name: 'Troca de Óleo', price: 80.00, description: 'Troca de óleo e filtro', isActive: true },
  { id: '3', name: 'Detalhamento Completo', price: 400.00, description: 'Detalhamento completo do veículo', isActive: true },
  { id: '4', name: 'Vitrificação', price: 500.00, description: 'Vitrificação de pintura + espelhamento', isActive: true },
  { id: '5', name: 'Polimento Técnico', price: 300.00, description: 'Polimento técnico profissional', isActive: true }
];

export const SettingsView: React.FC = () => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(mockSiteSettings);
  const [servicePrices, setServicePrices] = useState<ServicePrice[]>(mockServicePrices);
  const { visualSettings, updateVisualSettings, resetVisualSettings } = useTheme();
  const [activeTab, setActiveTab] = useState('site');
  const [isSaving, setIsSaving] = useState(false);

  const handleSiteSettingChange = (field: keyof SiteSettings, value: string) => {
    setSiteSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleServicePriceChange = (serviceId: string, field: keyof ServicePrice, value: any) => {
    setServicePrices(prev => prev.map(service => 
      service.id === serviceId ? { ...service, [field]: value } : service
    ));
  };

  const handleVisualSettingChange = (field: keyof VisualSettings, value: any) => {
    updateVisualSettings({ [field]: value });
  };

  const handleResetVisualSettings = () => {
    resetVisualSettings();
    toast({
      title: "Configurações Resetadas",
      description: "As configurações visuais foram restauradas para o padrão.",
    });
  };

  const handleSaveSettings = async () => {
    try {
      setIsSaving(true);
      
      // Validações básicas
      if (!siteSettings.siteName || !siteSettings.heroTitle) {
        toast({
          title: "Erro",
          description: "Nome do site e título principal são obrigatórios",
          variant: "destructive"
        });
        return;
      }

      // Aqui seria a chamada para a API
      // const response = await api.post('/settings', { siteSettings, servicePrices, visualSettings });
      
      // Simulando um delay para feedback visual
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Sucesso",
        description: "Configurações salvas com sucesso!",
      });

      // Aqui você poderia atualizar o estado global da aplicação se necessário
      // updateGlobalSettings({ siteSettings, servicePrices, visualSettings });
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar as configurações. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-mv-gradient bg-clip-text text-transparent">
          Configurações do Sistema
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" disabled={isSaving}>
            <Eye className="h-4 w-4 mr-2" />
            Pré-visualizar
          </Button>
          <Button 
            className="bg-mv-gradient hover:opacity-90" 
            onClick={handleSaveSettings}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </div>

      <Badge variant="outline" className="mb-4">
        <Settings className="h-3 w-3 mr-1" />
        Modo Desenvolvedor
      </Badge>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="site">Site</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="advanced">Avançado</TabsTrigger>
        </TabsList>

        <TabsContent value="site" className="space-y-6">
          <Card className="bg-card/90 dark:bg-card/75">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Informações do Site
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nome do Site</Label>
                  <Input
                    id="siteName"
                    value={siteSettings.siteName}
                    onChange={(e) => handleSiteSettingChange('siteName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroTitle">Título Principal</Label>
                  <Input
                    id="heroTitle"
                    value={siteSettings.heroTitle}
                    onChange={(e) => handleSiteSettingChange('heroTitle', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="heroSubtitle">Subtítulo</Label>
                <Input
                  id="heroSubtitle"
                  value={siteSettings.heroSubtitle}
                  onChange={(e) => handleSiteSettingChange('heroSubtitle', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aboutText">Texto Sobre a Empresa</Label>
                <Textarea
                  id="aboutText"
                  value={siteSettings.aboutText}
                  onChange={(e) => handleSiteSettingChange('aboutText', e.target.value)}
                  rows={3}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Telefone</Label>
                  <Input
                    id="contactPhone"
                    value={siteSettings.contactPhone}
                    onChange={(e) => handleSiteSettingChange('contactPhone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={siteSettings.contactEmail}
                    onChange={(e) => handleSiteSettingChange('contactEmail', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactAddress">Endereço</Label>
                <Input
                  id="contactAddress"
                  value={siteSettings.contactAddress}
                  onChange={(e) => handleSiteSettingChange('contactAddress', e.target.value)}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebookUrl">Facebook</Label>
                  <Input
                    id="facebookUrl"
                    value={siteSettings.facebookUrl}
                    onChange={(e) => handleSiteSettingChange('facebookUrl', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagramUrl">Instagram</Label>
                  <Input
                    id="instagramUrl"
                    value={siteSettings.instagramUrl}
                    onChange={(e) => handleSiteSettingChange('instagramUrl', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsappNumber">WhatsApp</Label>
                  <Input
                    id="whatsappNumber"
                    value={siteSettings.whatsappNumber}
                    onChange={(e) => handleSiteSettingChange('whatsappNumber', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card className="bg-card/90 dark:bg-card/75">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Preços dos Serviços
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {servicePrices.map((service) => (
                  <div key={service.id} className="bg-background/50 border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{service.name}</h3>
                      <Switch
                        checked={service.isActive}
                        onCheckedChange={(checked) => 
                          handleServicePriceChange(service.id, 'isActive', checked)
                        }
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Preço</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={service.price}
                          onChange={(e) => 
                            handleServicePriceChange(service.id, 'price', parseFloat(e.target.value))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Descrição</Label>
                        <Input
                          value={service.description}
                          onChange={(e) => 
                            handleServicePriceChange(service.id, 'description', e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="design" className="space-y-6">
          <Card className="bg-card/90 dark:bg-card/75">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Personalização Visual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Modo Escuro */}
              <div className="flex items-center justify-between">
                <Label>Modo Escuro</Label>
                <ThemeToggle />
              </div>

              <Separator />

              {/* Logo e Banner */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Logo do Sistema</Label>
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden">
                      {visualSettings.logo ? (
                        <img 
                          src={visualSettings.logo} 
                          alt="Logo" 
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                handleVisualSettingChange('logo', event.target.result as string);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                        id="logo-upload"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById('logo-upload')?.click()}
                        className="w-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Escolher Logo
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Recomendado: PNG ou SVG com fundo transparente, 512x512px
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Banner Principal</Label>
                  <div className="flex items-start gap-4">
                    <div className="w-48 h-24 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden">
                      {visualSettings.banner ? (
                        <img 
                          src={visualSettings.banner} 
                          alt="Banner" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                handleVisualSettingChange('banner', event.target.result as string);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                        id="banner-upload"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById('banner-upload')?.click()}
                        className="w-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Escolher Banner
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Recomendado: Imagem em alta resolução, proporção 2:1 (ex: 1920x960px)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Cores Personalizadas */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Usar Cores Personalizadas</Label>
                    <p className="text-sm text-muted-foreground">
                      Ative para personalizar as cores do sistema
                    </p>
                  </div>
                  <Switch
                    checked={visualSettings.useCustomColors}
                    onCheckedChange={(checked) => handleVisualSettingChange('useCustomColors', checked)}
                  />
                </div>

                {visualSettings.useCustomColors && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Cor Primária</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={visualSettings.primaryColor}
                          onChange={(e) => handleVisualSettingChange('primaryColor', e.target.value)}
                          className="w-12 h-9 p-1"
                        />
                        <Input
                          type="text"
                          value={visualSettings.primaryColor}
                          onChange={(e) => handleVisualSettingChange('primaryColor', e.target.value)}
                          className="font-mono"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor">Cor Secundária</Label>
                      <div className="flex gap-2">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={visualSettings.secondaryColor}
                          onChange={(e) => handleVisualSettingChange('secondaryColor', e.target.value)}
                          className="w-12 h-9 p-1"
                        />
                        <Input
                          type="text"
                          value={visualSettings.secondaryColor}
                          onChange={(e) => handleVisualSettingChange('secondaryColor', e.target.value)}
                          className="font-mono"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accentColor">Cor de Destaque</Label>
                      <div className="flex gap-2">
                        <Input
                          id="accentColor"
                          type="color"
                          value={visualSettings.accentColor}
                          onChange={(e) => handleVisualSettingChange('accentColor', e.target.value)}
                          className="w-12 h-9 p-1"
                        />
                        <Input
                          type="text"
                          value={visualSettings.accentColor}
                          onChange={(e) => handleVisualSettingChange('accentColor', e.target.value)}
                          className="font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Estilo dos Elementos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Bordas Arredondadas</Label>
                  <Select
                    value={visualSettings.borderRadius}
                    onValueChange={(value: any) => handleVisualSettingChange('borderRadius', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha o estilo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sem arredondamento</SelectItem>
                      <SelectItem value="small">Suave</SelectItem>
                      <SelectItem value="medium">Médio</SelectItem>
                      <SelectItem value="large">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Fonte do Sistema</Label>
                  <Select
                    value={visualSettings.fontFamily}
                    onValueChange={(value: any) => handleVisualSettingChange('fontFamily', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha a fonte" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="poppins">Poppins</SelectItem>
                      <SelectItem value="system">Fonte do Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Estilo dos Botões</Label>
                  <Select
                    value={visualSettings.buttonStyle}
                    onValueChange={(value: any) => handleVisualSettingChange('buttonStyle', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha o estilo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Padrão</SelectItem>
                      <SelectItem value="soft">Suave</SelectItem>
                      <SelectItem value="outline">Contorno</SelectItem>
                      <SelectItem value="gradient">Gradiente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Estilo dos Cards</Label>
                  <Select
                    value={visualSettings.cardStyle}
                    onValueChange={(value: any) => handleVisualSettingChange('cardStyle', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha o estilo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Padrão</SelectItem>
                      <SelectItem value="glass">Vidro</SelectItem>
                      <SelectItem value="bordered">Bordas</SelectItem>
                      <SelectItem value="elevated">Elevado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleResetVisualSettings}
                  disabled={isSaving}
                >
                  Restaurar Padrão
                </Button>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Dica</AlertTitle>
                  <AlertDescription>
                    As alterações visuais são aplicadas em tempo real. Clique em "Salvar Alterações" para manter as mudanças permanentemente.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Avançadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Modo de Manutenção</Label>
                    <p className="text-sm text-muted-foreground">Ativar página de manutenção</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Analytics</Label>
                    <p className="text-sm text-muted-foreground">Ativar Google Analytics</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Cache</Label>
                    <p className="text-sm text-muted-foreground">Ativar cache de páginas</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Backup do Sistema</Label>
                <Button variant="outline" className="w-full">
                  Fazer Backup Completo
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

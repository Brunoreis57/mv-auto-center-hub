import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Package, AlertTriangle, Droplets, Wrench } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StockItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
  unit: string;
  price: number;
  supplier: string;
  lastUpdate: string;
}

const mockStock: StockItem[] = [
  {
    id: '1',
    name: 'Shampoo Automotivo',
    category: 'Lavagem',
    quantity: 25,
    minQuantity: 10,
    unit: 'Litros',
    price: 35.90,
    supplier: 'Química Total',
    lastUpdate: '2024-06-15'
  },
  {
    id: '2',
    name: 'Óleo Motor 5W30',
    category: 'Troca de Óleo',
    quantity: 5,
    minQuantity: 15,
    unit: 'Litros',
    price: 89.90,
    supplier: 'Lubrificantes Pro',
    lastUpdate: '2024-06-18'
  },
  {
    id: '3',
    name: 'Cera de Carnaúba',
    category: 'Lavagem',
    quantity: 18,
    minQuantity: 5,
    unit: 'Unidades',
    price: 45.50,
    supplier: 'Car Care',
    lastUpdate: '2024-06-12'
  },
  {
    id: '4',
    name: 'Filtro de Óleo',
    category: 'Troca de Óleo',
    quantity: 3,
    minQuantity: 10,
    unit: 'Unidades',
    price: 25.90,
    supplier: 'Peças & Filtros',
    lastUpdate: '2024-06-10'
  },
  {
    id: '5',
    name: 'Pano de Microfibra',
    category: 'Lavagem',
    quantity: 30,
    minQuantity: 20,
    unit: 'Unidades',
    price: 12.90,
    supplier: 'Car Care',
    lastUpdate: '2024-06-14'
  },
  {
    id: '6',
    name: 'Óleo Motor 5W40',
    category: 'Troca de Óleo',
    quantity: 8,
    minQuantity: 12,
    unit: 'Litros',
    price: 95.90,
    supplier: 'Lubrificantes Pro',
    lastUpdate: '2024-06-17'
  }
];

const categories = ['Lavagem', 'Troca de Óleo'];
const units = ['Litros', 'Unidades', 'Quilos', 'Metros'];

export const StockView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stock, setStock] = useState<StockItem[]>(mockStock);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 0,
    minQuantity: 0,
    unit: '',
    price: 0,
    supplier: ''
  });
  const { toast } = useToast();

  const filteredStock = stock.filter(item =>
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'all' || item.category === categories[parseInt(activeTab)])
  );

  const getLowStockItems = () => stock.filter(item => item.quantity <= item.minQuantity);

  const getStockStatus = (item: StockItem) => {
    if (item.quantity <= item.minQuantity) {
      return { variant: 'destructive' as const, label: 'Estoque Baixo' };
    }
    if (item.quantity <= item.minQuantity * 1.5) {
      return { variant: 'secondary' as const, label: 'Atenção' };
    }
    return { variant: 'default' as const, label: 'Normal' };
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.category || !formData.unit || !formData.supplier) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const newItem: StockItem = {
      id: Date.now().toString(),
      ...formData,
      lastUpdate: new Date().toISOString().split('T')[0]
    };

    if (editingItem) {
      setStock(stock.map(item => item.id === editingItem.id ? { ...newItem, id: editingItem.id } : item));
      toast({
        title: "Sucesso",
        description: "Produto atualizado com sucesso"
      });
    } else {
      setStock([...stock, newItem]);
      toast({
        title: "Sucesso",
        description: "Produto adicionado com sucesso"
      });
    }

    setFormData({ name: '', category: '', quantity: 0, minQuantity: 0, unit: '', price: 0, supplier: '' });
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  const handleEditProduct = (item: StockItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      minQuantity: item.minQuantity,
      unit: item.unit,
      price: item.price,
      supplier: item.supplier
    });
    setIsDialogOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    setStock(stock.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity, lastUpdate: new Date().toISOString().split('T')[0] }
        : item
    ));
    toast({
      title: "Sucesso",
      description: "Quantidade atualizada"
    });
  };

  const lowStockItems = getLowStockItems();

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold bg-mv-gradient bg-clip-text text-transparent">
          Controle de Estoque
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-mv-gradient hover:opacity-90 w-full sm:w-auto" onClick={() => {
              setEditingItem(null);
              setFormData({ name: '', category: '', quantity: 0, minQuantity: 0, unit: '', price: 0, supplier: '' });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Produto *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nome do produto"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantidade *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minQuantity">Quantidade Mínima *</Label>
                  <Input
                    id="minQuantity"
                    type="number"
                    value={formData.minQuantity}
                    onChange={(e) => setFormData({ ...formData, minQuantity: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unidade *</Label>
                <Select
                  value={formData.unit}
                  onValueChange={(value) => setFormData({ ...formData, unit: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Preço *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Fornecedor *</Label>
                <Input
                  id="supplier"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  placeholder="Nome do fornecedor"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddProduct}>
                {editingItem ? 'Salvar Alterações' : 'Adicionar Produto'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50/90 dark:border-yellow-900 dark:bg-yellow-900/20">
          <CardHeader className="py-3">
            <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
              <AlertTriangle className="h-5 w-5" />
              Alerta de Estoque Baixo
            </CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="space-y-2">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span className="text-yellow-800 dark:text-yellow-200">{item.name}</span>
                  <span className="text-yellow-600 dark:text-yellow-400">
                    {item.quantity} {item.unit}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Stock Tabs */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="all" className="flex-1 sm:flex-none">
            <Package className="h-4 w-4 mr-2" />
            Todos
          </TabsTrigger>
          <TabsTrigger value="0" className="flex-1 sm:flex-none">
            <Droplets className="h-4 w-4 mr-2" />
            Lavagem
          </TabsTrigger>
          <TabsTrigger value="1" className="flex-1 sm:flex-none">
            <Wrench className="h-4 w-4 mr-2" />
            Troca de Óleo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4">
            {filteredStock.map((item) => (
              <StockItemCard
                key={item.id}
                item={item}
                onEdit={handleEditProduct}
                onUpdateQuantity={handleUpdateQuantity}
                getStockStatus={getStockStatus}
              />
            ))}
          </div>
        </TabsContent>

        {categories.map((category, index) => (
          <TabsContent key={category} value={index.toString()} className="mt-6">
            <div className="grid gap-4">
              {filteredStock
                .filter((item) => item.category === category)
                .map((item) => (
                  <StockItemCard
                    key={item.id}
                    item={item}
                    onEdit={handleEditProduct}
                    onUpdateQuantity={handleUpdateQuantity}
                    getStockStatus={getStockStatus}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

interface StockItemCardProps {
  item: StockItem;
  onEdit: (item: StockItem) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  getStockStatus: (item: StockItem) => { variant: 'destructive' | 'secondary' | 'default'; label: string };
}

const StockItemCard: React.FC<StockItemCardProps> = ({ item, onEdit, onUpdateQuantity, getStockStatus }) => {
  const status = getStockStatus(item);
  
  return (
    <Card className="border-mv-blue-100 dark:border-mv-blue-800 bg-gray-50/80 dark:bg-background hover:bg-gray-100/80 dark:hover:bg-accent transition-colors">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{item.name}</h3>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Fornecedor: {item.supplier}</p>
            <p className="text-sm">
              Preço: <span className="font-medium">R$ {item.price.toFixed(2)}</span>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
              >
                -
              </Button>
              <div className="w-16 text-center">
                <p className="font-medium">{item.quantity}</p>
                <p className="text-xs text-muted-foreground">{item.unit}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

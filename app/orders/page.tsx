'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const orders = [
  {
    id: 'ORD-001',
    client: 'Ana Silva',
    project: 'TCC - Engenharia Civil',
    date: '2024-04-10',
    status: 'Concluído',
    priority: 'Alta',
    value: 'R$ 1.200,00',
    payment: 'PAGO',
  },
  {
    id: 'ORD-002',
    client: 'Bruno Costa',
    project: 'Artigo Científico - Medicina',
    date: '2024-04-12',
    status: 'Em Andamento',
    priority: 'Média',
    value: 'R$ 850,00',
    payment: 'Pendente',
  },
  {
    id: 'ORD-003',
    client: 'Carla Oliveira',
    project: 'Relatório de Estágio',
    date: '2024-04-13',
    status: 'Pendente',
    priority: 'Baixa',
    value: 'R$ 450,00',
    payment: 'NAO PAGO',
  },
];

const statusStyles = {
  'Concluído': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Em Andamento': 'bg-blue-100 text-blue-700 border-blue-200',
  'Pendente': 'bg-amber-100 text-amber-700 border-amber-200',
};

const paymentStyles = {
  'PAGO': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'NAO PAGO': 'bg-red-100 text-red-700 border-red-200',
  'Pendente': 'bg-amber-100 text-amber-700 border-amber-200',
  'CONCLUIDO': 'bg-blue-100 text-blue-700 border-blue-200',
};

const priorityStyles = {
  'Alta': 'bg-red-100 text-red-700 border-red-200',
  'Média': 'bg-orange-100 text-orange-700 border-orange-200',
  'Baixa': 'bg-slate-100 text-slate-700 border-slate-200',
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderList, setOrderList] = useState(orders);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);

  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    ra: '',
    course: '',
    workType: '',
    paymentStatus: 'Pendente',
    projectLevel: '1',
    semester: '',
    poloCity: '',
    observations: '',
    priority: 'medium',
    value: '',
    projectTitle: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOrder) {
      setOrderList(prev => prev.map(o => o.id === editingOrder.id ? {
        ...o,
        client: formData.clientName,
        project: formData.projectTitle || formData.workType,
        payment: formData.paymentStatus,
        value: `R$ ${parseFloat(formData.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      } : o));
      toast.success('Pedido atualizado com sucesso!');
    } else {
      const newOrder = {
        id: `ORD-00${orderList.length + 1}`,
        client: formData.clientName,
        project: formData.projectTitle || formData.workType,
        date: new Date().toISOString().split('T')[0],
        status: 'Pendente',
        priority: formData.priority === 'high' ? 'Alta' : formData.priority === 'medium' ? 'Média' : 'Baixa',
        value: `R$ ${parseFloat(formData.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        payment: formData.paymentStatus,
      };
      setOrderList(prev => [newOrder, ...prev]);
      toast.success('Novo pedido registrado!');
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      clientName: '',
      clientPhone: '',
      ra: '',
      course: '',
      workType: '',
      paymentStatus: 'Pendente',
      projectLevel: '1',
      semester: '',
      poloCity: '',
      observations: '',
      priority: 'medium',
      value: '',
      projectTitle: ''
    });
    setEditingOrder(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (order: any) => {
    setEditingOrder(order);
    setFormData({
      clientName: order.client,
      clientPhone: '',
      ra: '',
      course: '',
      workType: order.project,
      paymentStatus: order.payment,
      projectLevel: '1',
      semester: '',
      poloCity: '',
      observations: '',
      priority: order.priority === 'Alta' ? 'high' : order.priority === 'Média' ? 'medium' : 'low',
      value: order.value.replace('R$ ', '').replace('.', '').replace(',', '.'),
      projectTitle: order.project
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
      setOrderList(prev => prev.filter(o => o.id !== id));
      toast.error('Pedido excluído com sucesso');
    }
  };

  const togglePayment = (id: string, current: string) => {
    const nextStatus = current === 'PAGO' ? 'NAO PAGO' : current === 'NAO PAGO' ? 'Pendente' : 'PAGO';
    setOrderList(prev => prev.map(o => o.id === id ? { ...o, payment: nextStatus } : o));
    toast.info(`Status de pagamento alterado para ${nextStatus}`);
  };

  const filteredOrders = orderList.filter(o => 
    o.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Pedidos</h2>
            <p className="text-slate-500">Gerencie e acompanhe todos os projetos acadêmicos.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              if (!open) resetForm();
              setIsDialogOpen(open);
            }}>
              <DialogTrigger render={
                <Button className="bg-blue-600 hover:bg-blue-700 gap-2" onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-4 h-4" />
                  Novo Pedido
                </Button>
              } />
              <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>{editingOrder ? 'Editar Pedido' : 'Criar Novo Pedido'}</DialogTitle>
                    <DialogDescription>
                      Preencha os detalhes do projeto acadêmico.
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="pr-4 max-h-[60vh]">
                    <div className="grid gap-6 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Nome do Cliente</label>
                          <Input 
                            value={formData.clientName}
                            onChange={(e) => handleInputChange('clientName', e.target.value)}
                            placeholder="Nome completo" 
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Telefone</label>
                          <Input 
                            value={formData.clientPhone}
                            onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                            placeholder="(00) 00000-0000" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">RA (Registro Acadêmico)</label>
                          <Input 
                            value={formData.ra}
                            onChange={(e) => handleInputChange('ra', e.target.value)}
                            placeholder="Número do RA" 
                          />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Curso</label>
                          <Input 
                            value={formData.course}
                            onChange={(e) => handleInputChange('course', e.target.value)}
                            placeholder="Ex: Engenharia Civil" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Tipo de Trabalho</label>
                          <Input 
                            value={formData.workType}
                            onChange={(e) => handleInputChange('workType', e.target.value)}
                            placeholder="Ex: TCC, Artigo, Relatório" 
                          />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Pagamento</label>
                          <Select value={formData.paymentStatus} onValueChange={(v) => handleInputChange('paymentStatus', v)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Status do pagamento" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PAGO">PAGO</SelectItem>
                              <SelectItem value="NAO PAGO">NAO PAGO</SelectItem>
                              <SelectItem value="Pendente">Pendente</SelectItem>
                              <SelectItem value="CONCLUIDO">CONCLUIDO</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Nível do Projeto</label>
                          <Select value={formData.projectLevel} onValueChange={(v) => handleInputChange('projectLevel', v)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Nível" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Semestre</label>
                          <Input 
                            value={formData.semester}
                            onChange={(e) => handleInputChange('semester', e.target.value)}
                            placeholder="Ex: 5º" 
                          />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Polo/Cidade</label>
                          <Input 
                            value={formData.poloCity}
                            onChange={(e) => handleInputChange('poloCity', e.target.value)}
                            placeholder="Cidade" 
                          />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Observações</label>
                        <Textarea 
                          value={formData.observations}
                          onChange={(e) => handleInputChange('observations', e.target.value)}
                          placeholder="Detalhes adicionais do trabalho..." 
                          className="min-h-[100px]" 
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Prioridade</label>
                          <Select value={formData.priority} onValueChange={(v) => handleInputChange('priority', v)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Prioridade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Baixa</SelectItem>
                              <SelectItem value="medium">Média</SelectItem>
                              <SelectItem value="high">Alta</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Valor</label>
                          <Input 
                            type="number" 
                            value={formData.value}
                            onChange={(e) => handleInputChange('value', e.target.value)}
                            placeholder="0.00" 
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                  <DialogFooter className="mt-6">
                    <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">{editingOrder ? 'Salvar Alterações' : 'Registrar Pedido'}</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Pesquisar por ID, cliente ou projeto..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Status</SelectItem>
                <SelectItem value="done">Concluído</SelectItem>
                <SelectItem value="progress">Em Andamento</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-bold">ID</TableHead>
                <TableHead className="font-bold">Cliente / Projeto</TableHead>
                <TableHead className="font-bold">Data</TableHead>
                <TableHead className="font-bold">Pagamento</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Valor</TableHead>
                <TableHead className="text-right font-bold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium text-blue-600">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{order.client}</span>
                      <span className="text-xs text-slate-500">{order.project}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{order.date}</TableCell>
                  <TableCell>
                    <button 
                      onClick={() => togglePayment(order.id, order.payment)}
                      className="transition-all active:scale-90 hover:brightness-95"
                      title="Clique para alternar status de pagamento"
                    >
                      <Badge variant="outline" className={cn("font-semibold cursor-pointer shadow-sm px-3 py-0.5", paymentStyles[order.payment as keyof typeof paymentStyles])}>
                        {order.payment}
                      </Badge>
                    </button>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("font-medium", statusStyles[order.status as keyof typeof statusStyles])}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold text-slate-900">{order.value}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-slate-400 hover:text-blue-600"
                        onClick={() => handleEdit(order)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-slate-400 hover:text-red-600"
                        onClick={() => handleDelete(order.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger render={
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        } />
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2">
                            <Eye className="w-4 h-4" /> Detalhes
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}

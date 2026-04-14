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

const orders: any[] = [];

const statusStyles = {
  'Concluído': 'bg-[#00c875] text-white border-transparent',
  'Em Andamento': 'bg-[#fdab3d] text-white border-transparent',
  'Pendente': 'bg-[#c4c4c4] text-white border-transparent',
  'Atrasado': 'bg-[#e2445c] text-white border-transparent',
};

const paymentStyles = {
  'PAGO': 'bg-[#00c875] text-white border-transparent',
  'NAO PAGO': 'bg-[#e2445c] text-white border-transparent',
  'Pendente': 'bg-[#ffcb00] text-slate-900 border-transparent',
  'CONCLUIDO': 'bg-[#579bfc] text-white border-transparent',
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderList, setOrderList] = useState<any[]>([]);
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
    projectTitle: '',
    status: 'Pendente'
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
        status: formData.status,
        priority: formData.priority === 'high' ? 'Alta' : formData.priority === 'medium' ? 'Média' : 'Baixa',
        value: `R$ ${parseFloat(formData.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      } : o));
      toast.success('Pedido atualizado com sucesso!');
    } else {
      const newOrder = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        client: formData.clientName,
        project: formData.projectTitle || formData.workType,
        date: new Date().toLocaleDateString('pt-BR'),
        status: formData.status || 'Pendente',
        priority: formData.priority === 'high' ? 'Alta' : formData.priority === 'medium' ? 'Média' : 'Baixa',
        value: `R$ ${parseFloat(formData.value || '0').toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
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
      projectTitle: '',
      status: 'Pendente'
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
      value: order.value.replace('R$ ', '').replace(/\./g, '').replace(',', '.'),
      projectTitle: order.project,
      status: order.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setOrderList(prev => prev.filter(o => o.id !== id));
    toast.error('Pedido excluído com sucesso');
  };

  const togglePayment = (id: string, current: string) => {
    const statuses = ['Pendente', 'PAGO', 'NAO PAGO', 'CONCLUIDO'];
    const currentIndex = statuses.indexOf(current);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    setOrderList(prev => prev.map(o => o.id === id ? { ...o, payment: nextStatus } : o));
    toast.info(`Pagamento alterado para ${nextStatus}`, { duration: 1000 });
  };

  const toggleStatus = (id: string, current: string) => {
    const statuses = ['Pendente', 'Em Andamento', 'Concluído', 'Atrasado'];
    const currentIndex = statuses.indexOf(current);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    setOrderList(prev => prev.map(o => o.id === id ? { ...o, status: nextStatus } : o));
    toast.info(`Status alterado para ${nextStatus}`, { duration: 1000 });
  };

  const filteredOrders = orderList.filter(o => 
    o.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-800">Quadro de Pedidos</h2>
            <p className="text-sm text-slate-500">Visualize e gerencie o fluxo de trabalho acadêmico.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 border-slate-200 text-slate-600 hover:bg-slate-50">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              if (!open) resetForm();
              setIsDialogOpen(open);
            }}>
              <DialogTrigger render={
                <Button className="h-9 bg-[#0073ea] hover:bg-[#0060c5] text-white shadow-none" onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Item
                </Button>
              } />
              <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden border-none shadow-2xl">
                <form onSubmit={handleSubmit}>
                  <div className="bg-[#0073ea] p-6 text-white">
                    <DialogTitle className="text-2xl font-bold">{editingOrder ? 'Editar Pedido' : 'Novo Pedido Acadêmico'}</DialogTitle>
                    <DialogDescription className="text-blue-100">
                      Insira as informações detalhadas para o acompanhamento do projeto.
                    </DialogDescription>
                  </div>
                  
                  <ScrollArea className="max-h-[70vh] p-6">
                    <div className="space-y-6">
                      <section className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Informações do Cliente</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700">Nome Completo</label>
                            <Input 
                              value={formData.clientName}
                              onChange={(e) => handleInputChange('clientName', e.target.value)}
                              className="h-10 border-slate-200 focus:ring-[#0073ea]"
                              placeholder="Ex: João Silva"
                              required
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700">Telefone / WhatsApp</label>
                            <Input 
                              value={formData.clientPhone}
                              onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                              className="h-10 border-slate-200 focus:ring-[#0073ea]"
                              placeholder="(00) 00000-0000"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700">RA</label>
                            <Input 
                              value={formData.ra}
                              onChange={(e) => handleInputChange('ra', e.target.value)}
                              className="h-10 border-slate-200 focus:ring-[#0073ea]"
                              placeholder="Registro Acadêmico"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700">Curso</label>
                            <Input 
                              value={formData.course}
                              onChange={(e) => handleInputChange('course', e.target.value)}
                              className="h-10 border-slate-200 focus:ring-[#0073ea]"
                              placeholder="Ex: Administração"
                            />
                          </div>
                        </div>
                      </section>

                      <section className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Detalhes do Projeto</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700">Título / Tipo de Trabalho</label>
                            <Input 
                              value={formData.workType}
                              onChange={(e) => handleInputChange('workType', e.target.value)}
                              className="h-10 border-slate-200 focus:ring-[#0073ea]"
                              placeholder="Ex: TCC I, Artigo Científico"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700">Status Inicial</label>
                            <Select value={formData.status} onValueChange={(v) => handleInputChange('status', v ?? 'Pendente')}>
                              <SelectTrigger className="h-10 border-slate-200">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pendente">Pendente</SelectItem>
                                <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                                <SelectItem value="Concluído">Concluído</SelectItem>
                                <SelectItem value="Atrasado">Atrasado</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700">Nível (1-10)</label>
                            <Select value={formData.projectLevel} onValueChange={(v) => handleInputChange('projectLevel', v ?? '1')}>
                              <SelectTrigger className="h-10 border-slate-200">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[...Array(10)].map((_, i) => (
                                  <SelectItem key={i+1} value={(i+1).toString()}>{i+1}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700">Semestre</label>
                            <Input 
                              value={formData.semester}
                              onChange={(e) => handleInputChange('semester', e.target.value)}
                              className="h-10 border-slate-200 focus:ring-[#0073ea]"
                              placeholder="Ex: 8º"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700">Polo / Cidade</label>
                            <Input 
                              value={formData.poloCity}
                              onChange={(e) => handleInputChange('poloCity', e.target.value)}
                              className="h-10 border-slate-200 focus:ring-[#0073ea]"
                              placeholder="Ex: São Paulo"
                            />
                          </div>
                        </div>
                      </section>

                      <section className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Financeiro & Notas</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700">Valor do Projeto</label>
                            <Input 
                              type="number"
                              value={formData.value}
                              onChange={(e) => handleInputChange('value', e.target.value)}
                              className="h-10 border-slate-200 focus:ring-[#0073ea]"
                              placeholder="0,00"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700">Status de Pagamento</label>
                            <Select value={formData.paymentStatus} onValueChange={(v) => handleInputChange('paymentStatus', v ?? 'Pendente')}>
                              <SelectTrigger className="h-10 border-slate-200">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="PAGO">PAGO</SelectItem>
                                <SelectItem value="NAO PAGO">NÃO PAGO</SelectItem>
                                <SelectItem value="Pendente">Pendente</SelectItem>
                                <SelectItem value="CONCLUIDO">CONCLUÍDO</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">Observações Internas</label>
                          <Textarea 
                            value={formData.observations}
                            onChange={(e) => handleInputChange('observations', e.target.value)}
                            className="min-h-[100px] border-slate-200 focus:ring-[#0073ea]"
                            placeholder="Notas sobre o projeto, requisitos especiais..."
                          />
                        </div>
                      </section>
                    </div>
                  </ScrollArea>

                  <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <Button type="button" variant="ghost" onClick={resetForm} className="text-slate-500 hover:bg-slate-200">
                      Cancelar
                    </Button>
                    <Button type="submit" className="bg-[#0073ea] hover:bg-[#0060c5] px-8">
                      {editingOrder ? 'Salvar Alterações' : 'Criar Pedido'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search & Filters Rail */}
        <div className="flex items-center gap-4 py-2 border-b border-slate-100">
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Pesquisar..." 
              className="h-8 pl-9 border-none bg-transparent focus-visible:ring-0 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="h-4 w-px bg-slate-200" />
          <Button variant="ghost" size="sm" className="h-8 text-slate-500 gap-2">
            <Filter className="w-4 h-4" />
            Filtros
          </Button>
        </div>

        {/* Monday Style Table */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <Table className="border-collapse">
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-b border-slate-100">
                <TableHead className="w-12 text-center text-[11px] font-bold uppercase text-slate-400">#</TableHead>
                <TableHead className="min-w-[250px] text-[11px] font-bold uppercase text-slate-400">Item / Cliente</TableHead>
                <TableHead className="w-40 text-center text-[11px] font-bold uppercase text-slate-400">Status</TableHead>
                <TableHead className="w-40 text-center text-[11px] font-bold uppercase text-slate-400">Pagamento</TableHead>
                <TableHead className="w-32 text-center text-[11px] font-bold uppercase text-slate-400">Data</TableHead>
                <TableHead className="w-32 text-right text-[11px] font-bold uppercase text-slate-400">Valor</TableHead>
                <TableHead className="w-24 text-right text-[11px] font-bold uppercase text-slate-400">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-slate-400 italic">
                    Nenhum pedido encontrado. Clique em "Novo Item" para começar.
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order, idx) => (
                  <TableRow key={order.id} className="group hover:bg-slate-50/80 border-b border-slate-50 last:border-0 transition-colors">
                    <TableCell className="text-center text-xs text-slate-400 font-mono">
                      {idx + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900 leading-tight">{order.project}</span>
                        <span className="text-xs text-slate-500">{order.client}</span>
                      </div>
                    </TableCell>
                    <TableCell className="p-1">
                      <button 
                        onClick={() => toggleStatus(order.id, order.status)}
                        className={cn(
                          "w-full h-8 flex items-center justify-center text-[11px] font-bold uppercase tracking-wider transition-all hover:brightness-95 active:scale-[0.98]",
                          statusStyles[order.status as keyof typeof statusStyles] || 'bg-slate-100 text-slate-400'
                        )}
                      >
                        {order.status}
                      </button>
                    </TableCell>
                    <TableCell className="p-1">
                      <button 
                        onClick={() => togglePayment(order.id, order.payment)}
                        className={cn(
                          "w-full h-8 flex items-center justify-center text-[11px] font-bold uppercase tracking-wider transition-all hover:brightness-95 active:scale-[0.98]",
                          paymentStyles[order.payment as keyof typeof paymentStyles] || 'bg-slate-100 text-slate-400'
                        )}
                      >
                        {order.payment}
                      </button>
                    </TableCell>
                    <TableCell className="text-center text-xs text-slate-500">
                      {order.date}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-slate-700 text-sm">
                      {order.value}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-slate-400 hover:text-[#0073ea] hover:bg-blue-50"
                          onClick={() => handleEdit(order)}
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50"
                          onClick={() => handleDelete(order.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger render={
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                              <MoreHorizontal className="w-3.5 h-3.5" />
                            </Button>
                          } />
                          <DropdownMenuContent align="end" className="w-48 p-1">
                            <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-bold uppercase text-slate-400">Opções do Item</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-xs">
                              <Eye className="w-3.5 h-3.5" /> Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-xs text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleDelete(order.id)}>
                              <Trash2 className="w-3.5 h-3.5" /> Excluir Pedido
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}

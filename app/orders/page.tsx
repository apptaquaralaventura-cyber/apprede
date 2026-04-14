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
  },
  {
    id: 'ORD-002',
    client: 'Bruno Costa',
    project: 'Artigo Científico - Medicina',
    date: '2024-04-12',
    status: 'Em Andamento',
    priority: 'Média',
    value: 'R$ 850,00',
  },
  {
    id: 'ORD-003',
    client: 'Carla Oliveira',
    project: 'Relatório de Estágio',
    date: '2024-04-13',
    status: 'Pendente',
    priority: 'Baixa',
    value: 'R$ 450,00',
  },
  {
    id: 'ORD-004',
    client: 'Diego Santos',
    project: 'Dissertação de Mestrado',
    date: '2024-04-14',
    status: 'Em Andamento',
    priority: 'Alta',
    value: 'R$ 3.500,00',
  },
  {
    id: 'ORD-005',
    client: 'Elena Martins',
    project: 'Projeto de Pesquisa',
    date: '2024-04-15',
    status: 'Pendente',
    priority: 'Média',
    value: 'R$ 600,00',
  },
];

const statusStyles = {
  'Concluído': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Em Andamento': 'bg-blue-100 text-blue-700 border-blue-200',
  'Pendente': 'bg-amber-100 text-amber-700 border-amber-200',
};

const priorityStyles = {
  'Alta': 'bg-red-100 text-red-700 border-red-200',
  'Média': 'bg-orange-100 text-orange-700 border-orange-200',
  'Baixa': 'bg-slate-100 text-slate-700 border-slate-200',
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');

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
            <Dialog>
              <DialogTrigger render={
                <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                  <Plus className="w-4 h-4" />
                  Novo Pedido
                </Button>
              } />
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Criar Novo Pedido</DialogTitle>
                  <DialogDescription>
                    Preencha os detalhes do novo projeto acadêmico.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Cliente</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Ana Silva</SelectItem>
                        <SelectItem value="2">Bruno Costa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Título do Projeto</label>
                    <Input placeholder="Ex: TCC Engenharia" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Prioridade</label>
                      <Select>
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
                      <Input type="number" placeholder="0.00" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full">Criar Pedido</Button>
                </DialogFooter>
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
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Prioridade</TableHead>
                <TableHead className="font-bold">Valor</TableHead>
                <TableHead className="text-right font-bold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
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
                    <Badge variant="outline" className={cn("font-medium", statusStyles[order.status as keyof typeof statusStyles])}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("font-medium", priorityStyles[order.priority as keyof typeof priorityStyles])}>
                      {order.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold text-slate-900">{order.value}</TableCell>
                  <TableCell className="text-right">
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
                          <Eye className="w-4 h-4" /> Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit className="w-4 h-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600">
                          <Trash2 className="w-4 h-4" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

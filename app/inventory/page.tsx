'use client';

import React from 'react';
import { 
  Package, 
  Search, 
  Plus, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight,
  History,
  MoreHorizontal
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const inventory = [
  {
    id: 'INV-001',
    name: 'Papel A4 Premium',
    category: 'Papelaria',
    stock: 45,
    minStock: 20,
    unit: 'Resmas',
    status: 'Em Estoque',
    lastUpdate: '2024-04-12'
  },
  {
    id: 'INV-002',
    name: 'Toner Impressora HP',
    category: 'Suprimentos',
    stock: 3,
    minStock: 5,
    unit: 'Unidades',
    status: 'Estoque Baixo',
    lastUpdate: '2024-04-10'
  },
  {
    id: 'INV-003',
    name: 'Pastas Suspensas',
    category: 'Organização',
    stock: 120,
    minStock: 50,
    unit: 'Unidades',
    status: 'Em Estoque',
    lastUpdate: '2024-04-05'
  },
  {
    id: 'INV-004',
    name: 'Canetas Esferográficas',
    category: 'Papelaria',
    stock: 8,
    minStock: 25,
    unit: 'Caixas',
    status: 'Crítico',
    lastUpdate: '2024-04-14'
  },
];

export default function InventoryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Estoque</h2>
            <p className="text-slate-500">Controle de materiais e suprimentos da consultoria.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Item
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total de Itens</p>
                <h3 className="text-2xl font-bold text-slate-900">156</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Estoque Baixo</p>
                <h3 className="text-2xl font-bold text-slate-900">12</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                <History className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Movimentações (Mês)</p>
                <h3 className="text-2xl font-bold text-slate-900">84</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Table */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Pesquisar itens no estoque..." className="pl-10 max-w-md" />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-bold">Item</TableHead>
                  <TableHead className="font-bold">Categoria</TableHead>
                  <TableHead className="font-bold text-center">Estoque Atual</TableHead>
                  <TableHead className="font-bold text-center">Mínimo</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="font-bold">Última Atualização</TableHead>
                  <TableHead className="text-right font-bold">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((item) => (
                  <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell>
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="text-xs text-slate-500">{item.id}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none">
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-bold text-slate-900">
                      {item.stock} {item.unit}
                    </TableCell>
                    <TableCell className="text-center text-slate-500">
                      {item.minStock} {item.unit}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "font-medium",
                          item.status === 'Em Estoque' && "bg-emerald-50 text-emerald-700 border-emerald-200",
                          item.status === 'Estoque Baixo' && "bg-amber-50 text-amber-700 border-amber-200",
                          item.status === 'Crítico' && "bg-red-50 text-red-700 border-red-200"
                        )}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">{item.lastUpdate}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

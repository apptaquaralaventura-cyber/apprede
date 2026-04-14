'use client';

import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ClipboardCheck, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout';
import { cn } from '@/lib/utils';

const stats = [
  { 
    title: 'Total de Pedidos', 
    value: '1,284', 
    change: '+12.5%', 
    trend: 'up', 
    icon: ClipboardCheck,
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  { 
    title: 'Clientes Ativos', 
    value: '452', 
    change: '+3.2%', 
    trend: 'up', 
    icon: Users,
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  { 
    title: 'Faturamento Mensal', 
    value: 'R$ 45.200', 
    change: '+18.7%', 
    trend: 'up', 
    icon: DollarSign,
    color: 'text-emerald-600',
    bg: 'bg-emerald-100'
  },
  { 
    title: 'Pedidos Pendentes', 
    value: '24', 
    change: '-5.4%', 
    trend: 'down', 
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
];

const revenueData = [
  { name: 'Jan', value: 32000 },
  { name: 'Fev', value: 38000 },
  { name: 'Mar', value: 35000 },
  { name: 'Abr', value: 45200 },
  { name: 'Mai', value: 42000 },
  { name: 'Jun', value: 48000 },
];

const orderStatusData = [
  { name: 'Concluídos', value: 65, color: '#10b981' },
  { name: 'Em Andamento', value: 25, color: '#3b82f6' },
  { name: 'Pendentes', value: 10, color: '#f59e0b' },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
          <p className="text-slate-500">Bem-vindo de volta! Aqui está o resumo da Rede Play hoje.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={cn("p-2 rounded-lg", stat.bg)}>
                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                  </div>
                  <div className={cn(
                    "flex items-center text-xs font-medium",
                    stat.trend === 'up' ? "text-emerald-600" : "text-red-600"
                  )}>
                    {stat.change}
                    {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4 border-none shadow-sm">
            <CardHeader>
              <CardTitle>Faturamento</CardTitle>
              <CardDescription>Desempenho financeiro nos últimos 6 meses.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickFormatter={(value) => `R$ ${value/1000}k`}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 border-none shadow-sm">
            <CardHeader>
              <CardTitle>Status dos Pedidos</CardTitle>
              <CardDescription>Distribuição atual de pedidos.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-4 mt-4 w-full px-4">
                {orderStatusData.map((item) => (
                  <div key={item.name} className="flex flex-col items-center">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs text-slate-500 font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

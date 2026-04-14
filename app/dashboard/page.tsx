'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  ClipboardCheck, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Loader2
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

import { getOrders } from '@/lib/actions/orders';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export default function DashboardPage() {
  const [stats, setStats] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [orderStatusData, setOrderStatusData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      const orders = await getOrders();
      
      // Calculate Stats
      const totalOrders = orders.length;
      const pendingOrders = orders.filter(o => o.status === 'Pendente').length;
      const totalRevenue = orders.reduce((acc, o) => acc + (o.value || 0), 0);
      
      // Mocking change for now, in real app would compare with last month
      setStats([
        { 
          title: 'Total de Pedidos', 
          value: totalOrders.toString(), 
          change: '+0%', 
          trend: 'up', 
          icon: ClipboardCheck,
          color: 'text-blue-600',
          bg: 'bg-blue-100'
        },
        { 
          title: 'Clientes Ativos', 
          value: new Set(orders.map(o => o.clientName)).size.toString(), 
          change: '+0%', 
          trend: 'up', 
          icon: Users,
          color: 'text-purple-600',
          bg: 'bg-purple-100'
        },
        { 
          title: 'Faturamento Total', 
          value: `R$ ${totalRevenue.toLocaleString('pt-BR')}`, 
          change: '+0%', 
          trend: 'up', 
          icon: DollarSign,
          color: 'text-emerald-600',
          bg: 'bg-emerald-100'
        },
        { 
          title: 'Pedidos Pendentes', 
          value: pendingOrders.toString(), 
          change: '0%', 
          trend: 'down', 
          icon: Clock,
          color: 'text-amber-600',
          bg: 'bg-amber-100'
        },
      ]);

      // Calculate Revenue Data (last 6 months)
      const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const currentMonth = new Date().getMonth();
      const last6Months = [];
      for (let i = 5; i >= 0; i--) {
        const m = (currentMonth - i + 12) % 12;
        const monthName = months[m];
        const monthRevenue = orders
          .filter(o => new Date(o.createdAt).getMonth() === m)
          .reduce((acc, o) => acc + (o.value || 0), 0);
        last6Months.push({ name: monthName, value: monthRevenue });
      }
      setRevenueData(last6Months);

      // Calculate Order Status Data
      const statuses = ['Concluído', 'Em Andamento', 'Pendente', 'Atrasado'];
      const statusCounts = statuses.map(s => ({
        name: s,
        value: orders.filter(o => o.status === s).length
      }));
      const total = statusCounts.reduce((acc, s) => acc + s.value, 0);
      setOrderStatusData(statusCounts.map((s, i) => ({
        ...s,
        percentage: total > 0 ? Math.round((s.value / total) * 100) : 0,
        color: COLORS[i]
      })));

      setIsLoading(false);
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }
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

'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap,
  Calendar,
  MoreVertical,
  UserPlus
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const clients = [
  {
    id: 1,
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    phone: '(11) 98765-4321',
    university: 'USP',
    course: 'Engenharia Civil',
    semester: '8º Semestre',
    ordersCount: 3,
    status: 'Ativo',
    avatar: 'https://i.pravatar.cc/150?u=ana'
  },
  {
    id: 2,
    name: 'Bruno Costa',
    email: 'bruno.c@email.com',
    phone: '(21) 99888-7766',
    university: 'UFRJ',
    course: 'Medicina',
    semester: '10º Semestre',
    ordersCount: 1,
    status: 'Ativo',
    avatar: 'https://i.pravatar.cc/150?u=bruno'
  },
  {
    id: 3,
    name: 'Carla Oliveira',
    email: 'carla.oli@email.com',
    phone: '(31) 97777-6655',
    university: 'UFMG',
    course: 'Direito',
    semester: '4º Semestre',
    ordersCount: 2,
    status: 'Inativo',
    avatar: 'https://i.pravatar.cc/150?u=carla'
  },
  {
    id: 4,
    name: 'Diego Santos',
    email: 'diego.s@email.com',
    phone: '(41) 96666-5544',
    university: 'PUC-PR',
    course: 'Administração',
    semester: 'Graduado',
    ordersCount: 5,
    status: 'Ativo',
    avatar: 'https://i.pravatar.cc/150?u=diego'
  },
];

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Clientes</h2>
            <p className="text-slate-500">Gerencie a base de alunos e pesquisadores.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <UserPlus className="w-4 h-4" />
            Novo Cliente
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Buscar por nome, e-mail, universidade ou curso..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">Filtros</Button>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <Card key={client.id} className="border-none shadow-sm hover:shadow-md transition-shadow group">
              <CardHeader className="p-6 pb-4 flex flex-row items-start justify-between space-y-0">
                <div className="flex items-center gap-4">
                  <Avatar className="w-14 h-14 border-2 border-white shadow-sm">
                    <AvatarImage src={client.avatar} />
                    <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                      {client.name}
                    </h3>
                    <Badge variant={client.status === 'Ativo' ? 'default' : 'secondary'} className={client.status === 'Ativo' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}>
                      {client.status}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger render={
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4 text-slate-400" />
                    </Button>
                  } />
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="w-4 h-4 text-slate-400" />
                    {client.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="w-4 h-4 text-slate-400" />
                    {client.phone}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Universidade</p>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                      {client.university}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Pedidos</p>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      {client.ordersCount} Projetos
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Curso / Semestre</p>
                  <p className="text-sm font-medium text-slate-700">{client.course} • {client.semester}</p>
                </div>

                <Button variant="outline" className="w-full mt-4 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-all">
                  Ver Histórico Completo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

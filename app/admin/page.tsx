'use client';

import React from 'react';
import { 
  Settings, 
  Users, 
  Shield, 
  Key, 
  Database, 
  Bell, 
  Globe,
  Plus,
  MoreVertical,
  Mail,
  Lock
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const systemUsers = [
  {
    id: 1,
    name: 'Charles Han',
    email: 'charles@redplay.com',
    role: 'Administrador',
    status: 'Ativo',
    avatar: 'https://github.com/shadcn.png'
  },
  {
    id: 2,
    name: 'Juliana Silva',
    email: 'juliana@redplay.com',
    role: 'Editor',
    status: 'Ativo',
    avatar: 'https://i.pravatar.cc/150?u=juliana'
  },
  {
    id: 3,
    name: 'Ricardo Lima',
    email: 'ricardo@redplay.com',
    role: 'Visualizador',
    status: 'Inativo',
    avatar: 'https://i.pravatar.cc/150?u=ricardo'
  },
];

export default function AdminPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Administração</h2>
          <p className="text-slate-500">Gerencie usuários, permissões e configurações globais do sistema.</p>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-slate-100 p-1 rounded-xl">
            <TabsTrigger value="users" className="rounded-lg px-6 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Usuários
            </TabsTrigger>
            <TabsTrigger value="permissions" className="rounded-lg px-6 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Permissões
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-lg px-6 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Segurança
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-lg px-6 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Gerenciamento de Usuários</h3>
              <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                <Plus className="w-4 h-4" />
                Convidar Usuário
              </Button>
            </div>

            <Card className="border-none shadow-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="font-bold">Usuário</TableHead>
                    <TableHead className="font-bold">Função</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="text-right font-bold">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900">{user.name}</span>
                            <span className="text-xs text-slate-500">{user.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-medium">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            user.status === 'Ativo' ? "bg-emerald-500" : "bg-slate-300"
                          )}></div>
                          <span className="text-sm text-slate-600">{user.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4 text-slate-400" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Níveis de Acesso
                  </CardTitle>
                  <CardDescription>Defina o que cada função pode fazer no sistema.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {['Administrador', 'Editor', 'Visualizador'].map((role) => (
                    <div key={role} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <span className="font-bold text-slate-900">{role}</span>
                      <Button variant="ghost" size="sm" className="text-blue-600 font-bold">Configurar</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-blue-600" />
                    Restrições Globais
                  </CardTitle>
                  <CardDescription>Configurações de segurança para todos os usuários.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="font-bold">Autenticação em Duas Etapas</Label>
                      <p className="text-xs text-slate-500">Exigir 2FA para todos os administradores.</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="font-bold">Expiração de Senha</Label>
                      <p className="text-xs text-slate-500">Forçar troca de senha a cada 90 dias.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Logs de Atividade</CardTitle>
                <CardDescription>Histórico de ações realizadas no painel administrativo.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'Login realizado', user: 'Charles Han', time: 'Há 5 minutos', ip: '192.168.1.1' },
                    { action: 'Pedido ORD-001 editado', user: 'Juliana Silva', time: 'Há 1 hora', ip: '192.168.1.5' },
                    { action: 'Novo usuário convidado', user: 'Charles Han', time: 'Ontem às 15:30', ip: '192.168.1.1' },
                  ].map((log, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{log.action}</span>
                        <span className="text-xs text-slate-500">{log.user} • {log.ip}</span>
                      </div>
                      <span className="text-xs text-slate-400">{log.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

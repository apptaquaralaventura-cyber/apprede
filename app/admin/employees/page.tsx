'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Mail, 
  Shield, 
  Search,
  Loader2,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import DashboardLayout from '@/components/DashboardLayout';
import { getUsers, createUser, deleteUser } from '@/lib/actions/users';

export default function EmployeesPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    const data = await getUsers();
    setUsers(data);
    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createUser(formData);
    if (res.success) {
      toast.success('Funcionário cadastrado com sucesso!');
      setIsDialogOpen(false);
      setFormData({ name: '', email: '', role: 'user' });
      fetchUsers();
    } else {
      toast.error(res.error || 'Erro ao cadastrar');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja remover este funcionário?')) {
      const res = await deleteUser(id);
      if (res.success) {
        toast.error('Funcionário removido');
        fetchUsers();
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Funcionários</h2>
            <p className="text-slate-500">Gerencie a equipe e permissões de acesso.</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                <UserPlus className="w-4 h-4" />
                Novo Funcionário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Cadastrar Funcionário</DialogTitle>
                  <DialogDescription>
                    Adicione um novo membro à equipe da Rede Play.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Nome Completo</label>
                    <Input 
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Ex: Maria Souza" 
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">E-mail</label>
                    <Input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="maria@redeplay.com" 
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Nível de Acesso</label>
                    <Select value={formData.role} onValueChange={(v) => handleInputChange('role', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="user">Consultor Acadêmico</SelectItem>
                        <SelectItem value="viewer">Visualizador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Cadastrar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Pesquisar por nome ou e-mail..." 
            className="pl-10 max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Card className="border-none shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Data de Cadastro</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-slate-500 italic">
                      Nenhum funcionário encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn(
                          "font-medium",
                          user.role === 'admin' ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-blue-50 text-blue-700 border-blue-200"
                        )}>
                          {user.role === 'admin' ? 'Administrador' : user.role === 'user' ? 'Consultor' : 'Visualizador'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-500">
                        {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-slate-400 hover:text-red-600"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

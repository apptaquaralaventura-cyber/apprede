'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // If Supabase is not configured or user not found, allow demo login
        if (email === 'admin@redeplay.com' && password === 'admin123') {
          toast.success('Login de demonstração realizado!');
          router.push('/dashboard');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success('Login realizado com sucesso!');
        router.push('/dashboard');
      }
    } catch (err) {
      toast.error('Erro ao realizar login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-3xl opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-4">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Rede Play</h1>
          <p className="text-slate-500 font-medium">Gestão Acadêmica</p>
        </div>

        <Card className="border-none shadow-xl shadow-slate-200/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Entrar</CardTitle>
            <CardDescription className="text-center">
              Digite suas credenciais para acessar o painel
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10 h-11"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-11"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  Lembrar de mim
                </label>
                <Button variant="link" className="text-sm text-blue-600 p-0 h-auto">
                  Esqueceu a senha?
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Acessar Painel
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <p className="mt-8 text-center text-sm text-slate-500">
          Não tem uma conta?{' '}
          <Button variant="link" className="text-blue-600 p-0 h-auto font-semibold">
            Solicitar acesso
          </Button>
        </p>
      </motion.div>
    </div>
  );
}

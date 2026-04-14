'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Users2,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              RP
            </div>
            <span className="font-bold text-xl text-slate-900">Rede Play</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Funcionalidades</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">Sobre Nós</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contato</a>
          </div>
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700">Acessar Sistema</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
              Líder em Consultoria Acadêmica
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
              Gestão Inteligente para sua <br />
              <span className="text-blue-600">Consultoria Acadêmica</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
              Otimize seus processos, gerencie pedidos com precisão e ofereça a melhor experiência para seus alunos com a plataforma Rede Play.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8 text-lg gap-2">
                  Começar Agora <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                Ver Demonstração
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Tudo o que você precisa em um só lugar</h2>
            <p className="text-slate-600">Desenvolvido especificamente para as demandas da Rede Play.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Gestão de Pedidos",
                desc: "Acompanhe o status de cada projeto em tempo real, desde a solicitação até a entrega final."
              },
              {
                icon: Users2,
                title: "Controle de Clientes",
                desc: "Base de dados centralizada com histórico completo de cada aluno e suas consultorias."
              },
              {
                icon: BarChart3,
                title: "Relatórios Detalhados",
                desc: "Visualize o desempenho da sua consultoria com gráficos de faturamento e produtividade."
              },
              {
                icon: ShieldCheck,
                title: "Segurança de Dados",
                desc: "Seus dados e os de seus clientes protegidos com criptografia de ponta a ponta."
              },
              {
                icon: GraduationCap,
                title: "Foco Acadêmico",
                desc: "Campos específicos para RA, semestre, universidade e tipos de trabalhos acadêmicos."
              },
              {
                icon: CheckCircle2,
                title: "Gestão de Estoque",
                desc: "Controle de materiais e recursos necessários para a operação da sua consultoria."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-400 uppercase tracking-widest mb-12">Confiado por Consultores em Todo o Brasil</h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            <div className="text-3xl font-black text-slate-900">ANHANGUERA</div>
            <div className="text-3xl font-black text-slate-900">UNOPAR</div>
            <div className="text-3xl font-black text-slate-900">ESTÁCIO</div>
            <div className="text-3xl font-black text-slate-900">PUC</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                RP
              </div>
              <span className="font-bold text-xl">Rede Play</span>
            </div>
            <p className="text-slate-400 max-w-sm">
              Transformando a gestão acadêmica com tecnologia e inteligência. O parceiro ideal para sua consultoria crescer.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pedidos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Clientes</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Suporte</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-slate-800 text-center text-slate-500 text-sm">
          © 2026 Rede Play Consultoria Acadêmica. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { LayoutDashboard, Users, ShoppingCart, Package, DollarSign, Settings, LogOut, Search, Building2, PackagePlus, ShieldCheck, Star, Receipt, ShoppingBag, FileCode, BarChart3, Printer } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('saas_token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return <div className="h-screen w-screen flex items-center justify-center bg-slate-50 font-medium text-slate-500">Autenticando...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden p-3 gap-3">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-slate-100">
          <Header />
          <main className="flex-1 p-8 overflow-auto">{children}</main>
        </div>
    </div>
  );
}

function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('saas_token');
    localStorage.removeItem('saas_user');
    router.push('/login');
  };

  const menuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "PDV (Frente de Caixa)", href: "/pdv", icon: ShoppingCart },
    { name: "Gestão Fiscal & Notas", href: "/sales", icon: FileCode },
    { name: "Produtos & Estoque", href: "/products", icon: Package },
    { name: "Movimentações (Estoque)", href: "/purchases", icon: PackagePlus },
    { name: "Fornecedores", href: "/suppliers", icon: Building2 },
    { name: "Gestão de Compras", href: "/procurement", icon: ShoppingBag },
    { name: "Clientes", href: "/customers", icon: Users },
    { name: "CRM & Fidelidade", href: "/crm", icon: Star },
    { name: "Gestão de Equipe", href: "/team", icon: ShieldCheck },
    { name: "Financeiro", href: "/financial", icon: DollarSign },
    { name: "Central de Impressão", href: "/print", icon: Printer },
    { name: "Relatórios & BI", href: "/reports", icon: BarChart3 },
    { name: "Configurações", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 rounded-2xl text-white flex flex-col shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none"></div>
      <div className="p-6 border-b border-slate-800/60 relative z-10">
        <h1 className="text-2xl font-black text-emerald-400 tracking-tighter drop-shadow-md">MERCADO<span className="text-white">PDV</span></h1>
        <p className="text-xs text-slate-400 mt-1 font-medium tracking-wide">SaaS Varejo Pro</p>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar relative z-10">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
              item.name === "Dashboard" 
                ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] font-semibold" 
                : "text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1"
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800/60 relative z-10">
        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all hover:-translate-y-0.5 font-medium">
          <LogOut size={20} />
          Sair
        </button>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 z-20">
      <div className="relative w-96 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Pesquisar produtos, clientes, cupons..." 
          className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none text-sm transition-all placeholder:text-slate-400"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-bold">Admin Supermercado</p>
          <p className="text-xs text-slate-500">Filial Centro</p>
        </div>
        <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold border border-emerald-200">
          A
        </div>
      </div>
    </header>
  );
}

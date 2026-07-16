"use client";

import { Users, Search, Plus, CreditCard, MapPin, ShoppingBag, Star, History } from "lucide-react";
import { useState } from "react";

export default function CustomersPage() {
  const [activeTab, setActiveTab] = useState("cadastro");

  const mockCustomers = [
    { 
      id: 1, 
      name: "Maria Silva", 
      cpf: "111.222.333-44", 
      phone: "(11) 98765-4321", 
      address: "Rua das Flores, 123 - Centro, São Paulo/SP",
      limit: 500, 
      debt: 150.50,
      loyaltyPoints: 1250,
      totalPurchases: 45,
      lastPurchase: "14/06/2026"
    },
    { 
      id: 2, 
      name: "João Pedro Souza", 
      cpf: "22.333.444/0001-55", 
      phone: "(11) 91234-5678", 
      address: "Av. Paulista, 1000 - Bela Vista, São Paulo/SP",
      limit: 1000, 
      debt: 0,
      loyaltyPoints: 340,
      totalPurchases: 12,
      lastPurchase: "02/06/2026"
    },
    { 
      id: 3, 
      name: "Fernanda Costa", 
      cpf: "333.444.555-66", 
      phone: "(11) 99988-7766", 
      address: "Rua Augusta, 500 - Consolação, São Paulo/SP",
      limit: 300, 
      debt: 280.00,
      loyaltyPoints: 2100,
      totalPurchases: 89,
      lastPurchase: "15/06/2026"
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestão de Clientes</h2>
          <p className="text-slate-500 mt-1">Cadastro completo, limites de fiado e programa de fidelidade.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-sm shadow-sm">
          <Plus size={18} /> Novo Cliente
        </button>
      </div>

      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab("cadastro")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === "cadastro" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Cadastro Geral
        </button>
        <button 
          onClick={() => setActiveTab("fiado")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === "fiado" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Controle de Fiado / Crédito
        </button>
        <button 
          onClick={() => setActiveTab("fidelidade")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === "fidelidade" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Histórico & Fidelidade
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nome, CPF/CNPJ ou telefone..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm"
            />
          </div>
        </div>

        {activeTab === "cadastro" && (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Nome do Cliente</th>
                <th className="px-6 py-4">CPF / CNPJ</th>
                <th className="px-6 py-4">Contato</th>
                <th className="px-6 py-4">Endereço Completo</th>
                <th className="px-6 py-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockCustomers.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                      {c.name.charAt(0)}
                    </div>
                    {c.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-500">{c.cpf}</td>
                  <td className="px-6 py-4">{c.phone}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MapPin size={14} className="text-slate-400" /> {c.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-indigo-600 font-bold cursor-pointer hover:underline">Editar</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "fiado" && (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4 text-center">Limite de Crédito</th>
                <th className="px-6 py-4 text-center">Saldo Devedor (Fiado)</th>
                <th className="px-6 py-4 text-center">Crédito Disponível</th>
                <th className="px-6 py-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockCustomers.map(c => {
                const available = c.limit - c.debt;
                const critical = available < 50;
                return (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{c.name}</td>
                    <td className="px-6 py-4 text-center text-slate-500 font-medium">R$ {c.limit.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center font-bold text-red-500">R$ {c.debt.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${critical ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        R$ {available.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg flex items-center justify-center gap-1 mx-auto hover:bg-indigo-200 transition">
                        <CreditCard size={14} /> Receber Fatura
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {activeTab === "fidelidade" && (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4 text-center">Histórico de Compras</th>
                <th className="px-6 py-4 text-center">Última Compra</th>
                <th className="px-6 py-4 text-center">Pontuação de Fidelidade</th>
                <th className="px-6 py-4 text-center">Ações CRM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockCustomers.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{c.name}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 font-medium">
                      <ShoppingBag size={14} className="text-blue-500" /> {c.totalPurchases} pedidos
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-slate-500">{c.lastPurchase}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 font-bold text-amber-500">
                      <Star size={16} fill="currentColor" /> {c.loyaltyPoints} pts
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg flex items-center justify-center gap-1 mx-auto hover:bg-slate-200 transition">
                      <History size={14} /> Ver Extrato
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

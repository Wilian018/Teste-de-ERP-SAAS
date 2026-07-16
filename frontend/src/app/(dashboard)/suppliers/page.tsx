"use client";

import { Building2, Search, Plus, Edit2, Trash2, Mail, Phone, MapPin, History, PackageOpen, DollarSign } from "lucide-react";
import { useState } from "react";

export default function SuppliersPage() {
  const [activeTab, setActiveTab] = useState("dados");

  const mockSuppliers = [
    { 
      id: "1", 
      cnpj: "12.345.678/0001-90", 
      name: "Ambev S.A.", 
      legalName: "Companhia de Bebidas das Américas",
      email: "vendas@ambev.com.br", 
      phone: "(11) 9999-8888",
      contactPerson: "Carlos Silva",
      address: "Rua Dr. Renato Paes de Barros, 1017 - Itaim Bibi, São Paulo/SP",
      totalOrders: 24,
      lastOrder: "10/06/2026",
      totalSpent: 45200.00,
      mainProducts: "Cervejas, Refrigerantes, Água"
    },
    { 
      id: "2", 
      cnpj: "09.876.543/0001-21", 
      name: "Coca-Cola Femsa", 
      legalName: "Spal Indústria Brasileira de Bebidas S/A",
      email: "contato@cocacola.com", 
      phone: "(11) 3333-4444",
      contactPerson: "Ana Oliveira",
      address: "Av. Engenheiro Alberto de Zagottis, 352 - Jurubatuba, São Paulo/SP",
      totalOrders: 18,
      lastOrder: "05/06/2026",
      totalSpent: 38500.50,
      mainProducts: "Refrigerantes, Sucos"
    },
    { 
      id: "3", 
      cnpj: "44.555.666/0001-00", 
      name: "Moinho Santa Clara", 
      legalName: "Indústria e Comércio de Farinhas Santa Clara Ltda",
      email: "pedidos@moinho.com.br", 
      phone: "(41) 3222-1111",
      contactPerson: "Ricardo Mendes",
      address: "Rodovia BR-116, Km 15 - Distrito Industrial, Curitiba/PR",
      totalOrders: 42,
      lastOrder: "12/06/2026",
      totalSpent: 12400.00,
      mainProducts: "Farinha de Trigo, Misturas para Bolo"
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestão de Fornecedores</h2>
          <p className="text-slate-500 mt-1">Cadastro de parceiros, contatos comerciais e histórico de compras.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition font-medium text-sm shadow-sm">
          <Plus size={18} /> Novo Fornecedor
        </button>
      </div>

      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab("dados")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === "dados" ? "border-emerald-600 text-emerald-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Dados Completos & Contatos
        </button>
        <button 
          onClick={() => setActiveTab("historico")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === "historico" ? "border-emerald-600 text-emerald-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Histórico de Compras
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        
        {/* Barra de Pesquisa */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por Razão Social, Nome Fantasia ou CNPJ..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 text-sm"
            />
          </div>
        </div>

        {/* Tabela Dados Completos */}
        {activeTab === "dados" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Empresa (Fantasia / Razão Social)</th>
                  <th className="px-6 py-4">CNPJ</th>
                  <th className="px-6 py-4">Contatos Principais</th>
                  <th className="px-6 py-4">Endereço Completo</th>
                  <th className="px-6 py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockSuppliers.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold">
                          <Building2 size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{s.name}</p>
                          <p className="text-xs text-slate-500 max-w-[200px] truncate" title={s.legalName}>{s.legalName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-500">{s.cnpj}</td>
                    <td className="px-6 py-4 space-y-1.5">
                      <div className="flex items-center gap-2 text-slate-600"><Phone size={14} className="text-slate-400" /> {s.phone}</div>
                      <div className="flex items-center gap-2 text-slate-600"><Mail size={14} className="text-slate-400" /> {s.email}</div>
                      <div className="text-xs text-slate-400 font-medium pt-1">Resp: {s.contactPerson}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2 text-slate-500 max-w-[250px]">
                        <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" /> 
                        <span className="leading-tight">{s.address}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg flex items-center justify-center gap-1 hover:bg-slate-200 transition">
                          <Edit2 size={14} /> Editar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tabela Histórico de Compras */}
        {activeTab === "historico" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Fornecedor</th>
                  <th className="px-6 py-4">Principais Categorias Fornecidas</th>
                  <th className="px-6 py-4 text-center">Volume de Pedidos (NFs)</th>
                  <th className="px-6 py-4 text-center">Última Entrada</th>
                  <th className="px-6 py-4 text-center">Total Gasto (Histórico)</th>
                  <th className="px-6 py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockSuppliers.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{s.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-500">
                        <PackageOpen size={16} className="text-emerald-500" /> {s.mainProducts}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-slate-600">
                      {s.totalOrders} notas
                    </td>
                    <td className="px-6 py-4 text-center text-slate-500 font-medium">
                      {s.lastOrder}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-slate-800 bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                        R$ {s.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg flex items-center justify-center gap-1 mx-auto hover:bg-emerald-200 transition">
                        <History size={14} /> Ver Extrato
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
      </div>
    </div>
  );
}

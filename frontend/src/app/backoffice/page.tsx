"use client";

import React, { useState, useEffect } from "react";
import { Building2, Users, Receipt, Ban, CheckCircle, ShieldAlert } from "lucide-react";

export default function BackofficePage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCompanies([
        { id: "1", name: "Mercadinho São José", cnpj: "11.222.333/0001-44", usersCount: 3, salesCount: 145, active: true },
        { id: "2", name: "Supermercado Central", cnpj: "44.555.666/0001-77", usersCount: 12, salesCount: 890, active: true },
        { id: "3", name: "Mini Mercado da Esquina", cnpj: "88.999.000/0001-11", usersCount: 1, salesCount: 45, active: false },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const toggleStatus = (id: string, currentStatus: boolean) => {
    setCompanies(companies.map(c => c.id === id ? { ...c, active: !currentStatus } : c));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 text-emerald-600 mb-2">
              <ShieldAlert size={28} />
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Painel Master</h1>
            </div>
            <p className="text-slate-500 font-medium">Visão global de todos os clientes do SaaS.</p>
          </div>
          
          <div className="bg-white px-6 py-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Clientes</div>
              <div className="text-2xl font-black text-slate-800">{companies.length}</div>
            </div>
            <div className="h-10 w-px bg-slate-200"></div>
            <div className="text-right">
              <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Receita Mensal</div>
              <div className="text-2xl font-black text-emerald-600">R$ 1.500</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500 font-bold uppercase tracking-wider">
                  <th className="p-4">Empresa (Inquilino)</th>
                  <th className="p-4">Usuários</th>
                  <th className="p-4">Volume (Vendas)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={5} className="p-8 text-center text-slate-400 font-medium">Carregando dados...</td></tr>
                ) : (
                  companies.map((company) => (
                    <tr key={company.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${company.active ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}>
                            <Building2 size={20} />
                          </div>
                          <div>
                            <div className="font-bold text-slate-800">{company.name}</div>
                            <div className="text-sm text-slate-500 font-mono">{company.cnpj}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-slate-600 font-medium">
                          <Users size={16} className="text-slate-400" />
                          {company.usersCount} ativos
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-slate-600 font-medium">
                          <Receipt size={16} className="text-slate-400" />
                          {company.salesCount} notas
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${company.active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                          {company.active ? "Ativo" : "Bloqueado"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => toggleStatus(company.id, company.active)}
                          className={`px-4 py-2 text-sm font-bold rounded-lg transition flex items-center justify-center gap-2 ml-auto ${company.active ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`}
                        >
                          {company.active ? (
                            <React.Fragment><Ban size={16} /> Bloquear</React.Fragment>
                          ) : (
                            <React.Fragment><CheckCircle size={16} /> Desbloquear</React.Fragment>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Users, Search, Plus, UserPlus, CreditCard, Star, FileText, CheckCircle2, History, X } from "lucide-react";

export default function CustomersPage() {
  const [activeTab, setActiveTab] = useState("geral");
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    cpfCnpj: "",
    creditLimit: "0"
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem('saas_token');
      const res = await fetch(`${API_URL}/api/customers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCustomers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleOpenModal = (customer: any = null) => {
    if (customer) {
      setEditingId(customer.id);
      setFormData({
        name: customer.name,
        cpfCnpj: customer.cpfCnpj,
        creditLimit: customer.creditLimit.toString()
      });
    } else {
      setEditingId(null);
      setFormData({ name: "", cpfCnpj: "", creditLimit: "0" });
    }
    setIsModalOpen(true);
  };

  const handleSaveCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('saas_token');
    try {
      const payload = {
        name: formData.name,
        cpfCnpj: formData.cpfCnpj,
        creditLimit: Number(formData.creditLimit)
      };

      const url = editingId ? `${API_URL}/api/customers/${editingId}` : `${API_URL}/api/customers`;
      const method = editingId ? "PATCH" : "POST";

      await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });
      setIsModalOpen(false);
      fetchCustomers();
    } catch (err) {
      alert("Erro ao salvar cliente.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestão de Clientes</h2>
          <p className="text-slate-500 mt-1">Cadastro completo, limites de fiado e programa de fidelidade.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-sm shadow-sm"
        >
          <Plus size={18} /> Novo Cliente
        </button>
      </div>

      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab("geral")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === "geral" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Cadastro Geral
        </button>
        <button 
          onClick={() => setActiveTab("fiado")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === "fiado" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Controle de Fiado / Crédito
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

        {isLoading ? (
          <div className="text-center py-10 text-slate-500">Carregando clientes...</div>
        ) : (
          <>
            {activeTab === "geral" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">Nome do Cliente</th>
                      <th className="px-6 py-4">CPF / CNPJ</th>
                      <th className="px-6 py-4 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {customers.length === 0 ? (
                      <tr><td colSpan={3} className="text-center py-6">Nenhum cliente cadastrado.</td></tr>
                    ) : (
                      customers.map(c => (
                        <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-indigo-50 text-indigo-600 font-bold rounded-full flex items-center justify-center">
                                {c.name.charAt(0)}
                              </div>
                              <span className="font-bold text-slate-800">{c.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-600">{c.cpfCnpj}</td>
                          <td className="px-6 py-4 text-center">
                            <button onClick={() => handleOpenModal(c)} className="font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded">Editar</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "fiado" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">Cliente</th>
                      <th className="px-6 py-4">Limite de Crédito</th>
                      <th className="px-6 py-4">Crédito Disponível</th>
                      <th className="px-6 py-4 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {customers.map(c => (
                      <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-800">{c.name}</td>
                        <td className="px-6 py-4 text-slate-600">R$ {Number(c.creditLimit).toFixed(2)}</td>
                        <td className="px-6 py-4 font-bold text-emerald-600">R$ {Number(c.creditLimit).toFixed(2)}</td>
                        <td className="px-6 py-4 text-center">
                          <button onClick={() => alert("Em breve: Integração com Faturas")} className="text-xs flex items-center justify-center gap-1 mx-auto bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-200 font-bold transition">
                            <FileText size={14}/> Receber Fatura
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b text-slate-800 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold">{editingId ? 'Editar Cliente' : 'Novo Cliente'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSaveCustomer} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nome Completo</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">CPF ou CNPJ</label>
                <input type="text" required value={formData.cpfCnpj} onChange={e => setFormData({...formData, cpfCnpj: e.target.value})} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Limite de Crédito (R$)</label>
                <input type="number" step="0.01" required value={formData.creditLimit} onChange={e => setFormData({...formData, creditLimit: e.target.value})} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-500" />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border font-bold rounded-lg hover:bg-slate-50">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

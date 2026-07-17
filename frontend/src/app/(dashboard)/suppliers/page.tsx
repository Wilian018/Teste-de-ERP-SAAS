"use client";

import { useState, useEffect } from "react";
import { Building2, Search, Plus, MapPin, Phone, Mail, Edit, History, X } from "lucide-react";

export default function SuppliersPage() {
  const [activeTab, setActiveTab] = useState("dados");
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    cnpj: "",
    email: "",
    phone: ""
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const fetchSuppliers = async () => {
    try {
      const token = localStorage.getItem('saas_token');
      const res = await fetch(`${API_URL}/api/suppliers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSuppliers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleOpenModal = (supplier: any = null) => {
    if (supplier) {
      setEditingId(supplier.id);
      setFormData({
        name: supplier.name,
        cnpj: supplier.cnpj,
        email: supplier.email || "",
        phone: supplier.phone || ""
      });
    } else {
      setEditingId(null);
      setFormData({ name: "", cnpj: "", email: "", phone: "" });
    }
    setIsModalOpen(true);
  };

  const handleSaveSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('saas_token');
    try {
      const payload = { ...formData };
      const url = editingId ? `${API_URL}/api/suppliers/${editingId}` : `${API_URL}/api/suppliers`;
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
      fetchSuppliers();
    } catch (err) {
      alert("Erro ao salvar fornecedor.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestão de Fornecedores</h2>
          <p className="text-slate-500 mt-1">Cadastro de parceiros, contatos comerciais e histórico de compras.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition font-medium text-sm shadow-sm"
        >
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
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
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

        {isLoading ? (
          <div className="text-center py-10 text-slate-500">Carregando fornecedores...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Empresa (Razão Social)</th>
                  <th className="px-6 py-4">CNPJ</th>
                  <th className="px-6 py-4">Contatos</th>
                  <th className="px-6 py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {suppliers.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-6">Nenhum fornecedor cadastrado.</td></tr>
                ) : (
                  suppliers.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                            <Building2 size={20} />
                          </div>
                          <div>
                            <div className="font-bold text-slate-800">{s.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-600">{s.cnpj}</td>
                      <td className="px-6 py-4">
                        <div className="space-y-1 text-xs text-slate-500">
                          {s.phone && <div className="flex items-center gap-2"><Phone size={12}/> {s.phone}</div>}
                          {s.email && <div className="flex items-center gap-2"><Mail size={12}/> {s.email}</div>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => handleOpenModal(s)} className="text-xs flex items-center justify-center gap-1 mx-auto bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-200 font-bold transition">
                          <Edit size={14}/> Editar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b text-slate-800 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold">{editingId ? 'Editar Fornecedor' : 'Novo Fornecedor'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSaveSupplier} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Razão Social</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">CNPJ</label>
                <input type="text" required value={formData.cnpj} onChange={e => setFormData({...formData, cnpj: e.target.value})} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-emerald-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Telefone</label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-emerald-500" />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border font-bold rounded-lg hover:bg-slate-50">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

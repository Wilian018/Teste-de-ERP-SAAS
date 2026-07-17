"use client";

import { useState, useEffect } from "react";
import { Settings, Building2, CreditCard, Paintbrush } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("empresa");
  const [company, setCompany] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", cnpj: "" });
  const [isSaving, setIsSaving] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchCompany = async () => {
      const token = localStorage.getItem('saas_token');
      try {
        const res = await fetch(`${API_URL}/api/companies/my-company`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setCompany(data);
          setFormData({ name: data.name, cnpj: data.cnpj });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCompany();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const token = localStorage.getItem('saas_token');
    try {
      await fetch(`${API_URL}/api/companies/my-company`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      alert("Configurações atualizadas com sucesso!");
    } catch (err) {
      alert("Erro ao atualizar configurações.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Configurações</h2>
        <p className="text-slate-500 mt-1">Ajuste os dados da sua empresa e preferências do ERP.</p>
      </div>

      <div className="flex border-b border-slate-200">
        <button onClick={() => setActiveTab("empresa")} className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === "empresa" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
          <div className="flex items-center gap-2"><Building2 size={16}/> Dados da Empresa</div>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {activeTab === "empresa" && company && (
          <form onSubmit={handleSave} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Razão Social / Nome Fantasia</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">CNPJ</label>
                <input type="text" value={formData.cnpj} onChange={e => setFormData({...formData, cnpj: e.target.value})} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-500" />
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button disabled={isSaving} type="submit" className="bg-indigo-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
                {isSaving ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        )}
        {!company && <div className="p-10 text-center text-slate-500">Carregando dados...</div>}
      </div>
    </div>
  );
}

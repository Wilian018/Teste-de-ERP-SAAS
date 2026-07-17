"use client";

import { useState, useEffect } from "react";
import { Users, Gift, TrendingUp, Search, Star, MessageCircle, Send, PhoneCall, Mail, History, Plus, X } from "lucide-react";

export default function CRMPage() {
  const [activeTab, setActiveTab] = useState("clientes");
  
  // States para a API
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal de Nova Campanha
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", message: "", targetGroup: "TODOS", status: "DRAFT" });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const mockCustomers = [
    { id: 1, name: "Maria Silva", phone: "(11) 98765-4321", email: "maria@email.com", totalSpent: 4500.00, points: 450, lastVisit: "Ontem" },
    { id: 2, name: "João Pedro Souza", phone: "(11) 91234-5678", email: "joao@email.com", totalSpent: 2150.50, points: 215, lastVisit: "Há 3 dias" },
  ];

  const mockHistory = [
    { id: 1, date: "15/06/2026 14:30", customer: "Maria Silva", type: "WhatsApp", reason: "Campanha Dia das Mães", status: "Lida", operator: "Bot" },
    { id: 2, date: "14/06/2026 10:15", customer: "João Pedro Souza", type: "Ligação", reason: "Cobrança de Fiado", status: "Atendeu", operator: "Admin" },
    { id: 3, date: "10/06/2026 09:00", customer: "Fernanda Costa", type: "E-mail", reason: "Boas Vindas (Novo Cadastro)", status: "Enviado", operator: "Sistema" },
  ];

  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem('saas_token');
      const res = await fetch(`${API_URL}/api/crm/campaigns`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setCampaigns(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleSaveCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('saas_token');
    try {
      await fetch(`${API_URL}/api/crm/campaigns`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      setIsModalOpen(false);
      setFormData({ name: "", message: "", targetGroup: "TODOS", status: "DRAFT" });
      fetchCampaigns();
    } catch (err) {
      alert("Erro ao criar campanha.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">CRM & Relacionamento</h2>
          <p className="text-slate-500 mt-1">Gestão de clientes, fidelização (cashback), histórico de interações e disparos.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-sm shadow-sm">
          <Gift size={18} /> Nova Campanha
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-indigo-100 text-indigo-600 p-4 rounded-xl"><Users size={24} /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Clientes na Base</p>
            <h3 className="text-2xl font-black text-slate-800">1,204</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-amber-100 text-amber-600 p-4 rounded-xl"><Star size={24} /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Pontos de Fidelidade</p>
            <h3 className="text-2xl font-black text-slate-800">45.2K</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-emerald-100 text-emerald-600 p-4 rounded-xl"><MessageCircle size={24} /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Interações (Mês)</p>
            <h3 className="text-2xl font-black text-slate-800">892</h3>
          </div>
        </div>
      </div>

      <div className="flex border-b border-slate-200 overflow-x-auto custom-scrollbar">
        <button 
          onClick={() => setActiveTab("clientes")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "clientes" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Base de Clientes & Fidelidade
        </button>
        <button 
          onClick={() => setActiveTab("campanhas")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "campanhas" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Campanhas em Massa
        </button>
        <button 
          onClick={() => setActiveTab("historico")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "historico" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Histórico de Contatos
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        
        {/* Tab 1: Clientes e Fidelidade */}
        {activeTab === "clientes" && (
          <>
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Buscar cliente por nome, email ou telefone..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Cadastro de Cliente</th>
                    <th className="px-6 py-4">Contatos</th>
                    <th className="px-6 py-4 text-center">Última Visita</th>
                    <th className="px-6 py-4 text-right">LTV (Gasto Total)</th>
                    <th className="px-6 py-4 text-center">Programa de Fidelidade</th>
                    <th className="px-6 py-4 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockCustomers.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">{c.name.charAt(0)}</div>
                        {c.name}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-500 space-y-1">
                        <div className="flex items-center gap-2"><PhoneCall size={12}/> {c.phone}</div>
                        <div className="flex items-center gap-2"><Mail size={12}/> {c.email}</div>
                      </td>
                      <td className="px-6 py-4 text-center text-slate-500">{c.lastVisit}</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-800">R$ {c.totalSpent.toFixed(2)}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold flex items-center justify-center gap-1 w-fit mx-auto">
                          <Star size={12} className="fill-amber-500" /> {c.points} pts
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition" title="Enviar Oferta 1x1 no WhatsApp">
                          <MessageCircle size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Tab 2: Campanhas Integradas */}
        {activeTab === "campanhas" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Campanha</th>
                  <th className="px-6 py-4">Público Alvo</th>
                  <th className="px-6 py-4">Copy (Mensagem)</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Disparado Em</th>
                  <th className="px-6 py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr><td colSpan={6} className="text-center py-6">Carregando...</td></tr>
                ) : campaigns.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-6">Nenhuma campanha criada. Clique em "Nova Campanha".</td></tr>
                ) : (
                  campaigns.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">{c.name}</td>
                      <td className="px-6 py-4 text-indigo-600 font-bold text-xs"><span className="bg-indigo-50 px-2 py-1 rounded">{c.targetGroup}</span></td>
                      <td className="px-6 py-4 text-slate-500 italic max-w-[200px] truncate">&quot;{c.message}&quot;</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${c.status === 'SENT' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-slate-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-center">
                        {c.status === 'DRAFT' && (
                          <button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-md font-bold shadow-sm flex items-center justify-center gap-1 mx-auto hover:bg-indigo-700">
                            <Send size={12} /> Disparar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Histórico de Contatos */}
        {activeTab === "historico" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Data / Hora</th>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4 text-center">Canal de Contato</th>
                  <th className="px-6 py-4">Motivo da Interação</th>
                  <th className="px-6 py-4 text-center">Operador</th>
                  <th className="px-6 py-4 text-center">Status / Retorno</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockHistory.map(h => (
                  <tr key={h.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-500 text-xs">{h.date}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{h.customer}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 flex items-center justify-center gap-1 w-fit mx-auto rounded text-xs font-bold ${
                        h.type === 'WhatsApp' ? 'bg-emerald-100 text-emerald-700' :
                        h.type === 'Ligação' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {h.type === 'WhatsApp' ? <MessageCircle size={12}/> : h.type === 'Ligação' ? <PhoneCall size={12}/> : <Mail size={12}/>}
                        {h.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-600">{h.reason}</td>
                    <td className="px-6 py-4 text-center text-slate-500 font-medium">{h.operator}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{h.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* MODAL NOVA CAMPANHA */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b text-slate-800 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold">Nova Campanha</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveCampaign} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nome da Campanha</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Público Alvo</label>
                <select value={formData.targetGroup} onChange={e => setFormData({...formData, targetGroup: e.target.value})} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-500">
                  <option value="TODOS">Todos os Clientes</option>
                  <option value="VIP">Clientes VIP (Alto valor em compras)</option>
                  <option value="INATIVOS">Clientes Inativos (> 30 dias)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Mensagem (SMS / WhatsApp)</label>
                <textarea required rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-500" placeholder="Olá! Temos uma oferta especial para você..."></textarea>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border font-bold rounded-lg hover:bg-slate-50">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">Salvar Campanha</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

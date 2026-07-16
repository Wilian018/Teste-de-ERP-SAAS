"use client";

import { useState } from "react";
import { Users, Search, Plus, Shield, ShieldCheck, UserCog, UserCheck, Trash2, Edit2, Key, History, Activity } from "lucide-react";

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState("usuarios");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [teamList, setTeamList] = useState([
    { id: "1", name: "João Pedro", email: "joao@mercadopdv.com", role: "ADMIN", active: true, lastLogin: "Agora mesmo" },
    { id: "2", name: "Maria Silva", email: "maria@mercadopdv.com", role: "MANAGER", active: true, lastLogin: "Há 2 horas" },
    { id: "3", name: "Carlos Souza", email: "carlos@mercadopdv.com", role: "CASHIER", active: true, lastLogin: "Ontem às 18:30" },
    { id: "4", name: "Ana Beatriz", email: "ana@mercadopdv.com", role: "CASHIER", active: false, lastLogin: "Semana passada" },
  ]);

  const [formData, setFormData] = useState({ name: "", email: "", role: "CASHIER", password: "" });

  const handleSaveEmployee = () => {
    if (!formData.name || !formData.email) return;

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      active: true,
      lastLogin: "Nunca acessou",
    };

    setTeamList([newUser, ...teamList]);
    setIsAddModalOpen(false);
    setFormData({ name: "", email: "", role: "CASHIER", password: "" });
  };

  const mockLogs = [
    { id: 101, time: "15/06/2026 14:32", user: "Carlos Souza", action: "Abertura de Caixa", module: "PDV (Frente de Caixa)", ip: "192.168.1.10" },
    { id: 102, time: "15/06/2026 12:15", user: "Maria Silva", action: "Estorno de Venda #1004", module: "Gestão Fiscal", ip: "192.168.1.5" },
    { id: 103, time: "15/06/2026 09:00", user: "João Pedro", action: "Alteração Preço: Arroz 5kg", module: "Produtos & Estoque", ip: "172.16.0.44" },
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ADMIN': return <ShieldCheck size={16} className="text-purple-600" />;
      case 'MANAGER': return <UserCog size={16} className="text-blue-600" />;
      case 'CASHIER': return <UserCheck size={16} className="text-emerald-600" />;
      default: return <Users size={16} />;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN': return <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-2">{getRoleIcon(role)} Administrador</span>;
      case 'MANAGER': return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-2">{getRoleIcon(role)} Gerente</span>;
      case 'CASHIER': return <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-2">{getRoleIcon(role)} Caixa</span>;
      default: return <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">Colaborador</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Controle de Funcionários</h2>
          <p className="text-slate-500 mt-1">Gestão de usuários, matriz de permissões (perfis) e auditoria do sistema.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-sm shadow-sm"
        >
          <Plus size={18} /> Novo Funcionário
        </button>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800">Novo Funcionário</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nome Completo</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-slate-200 rounded-lg px-4 py-2 outline-none focus:border-indigo-500" placeholder="Ex: João Silva" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">E-mail</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border border-slate-200 rounded-lg px-4 py-2 outline-none focus:border-indigo-500" placeholder="joao@empresa.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Perfil de Acesso</label>
                <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full border border-slate-200 rounded-lg px-4 py-2 outline-none focus:border-indigo-500">
                  <option value="CASHIER">Caixa</option>
                  <option value="MANAGER">Gerente</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Senha Provisória</label>
                <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full border border-slate-200 rounded-lg px-4 py-2 outline-none focus:border-indigo-500" placeholder="••••••••" />
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition">Cancelar</button>
              <button onClick={handleSaveEmployee} className="px-4 py-2 font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition">Salvar Funcionário</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex border-b border-slate-200 overflow-x-auto custom-scrollbar">
        <button 
          onClick={() => setActiveTab("usuarios")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "usuarios" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Usuários do Sistema
        </button>
        <button 
          onClick={() => setActiveTab("permissoes")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "permissoes" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Perfis & Permissões
        </button>
        <button 
          onClick={() => setActiveTab("auditoria")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "auditoria" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Auditoria (Logs)
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        
        {/* Tab 1: Usuários */}
        {activeTab === "usuarios" && (
          <>
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar funcionário por nome ou email..." 
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm"
                />
              </div>
              <select className="border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 outline-none focus:border-indigo-500">
                <option>Todos os Perfis</option>
                <option>Administrador</option>
                <option>Gerente</option>
                <option>Caixa</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Usuário</th>
                    <th className="px-6 py-4">Perfil Atribuído</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4">Último Acesso</th>
                    <th className="px-6 py-4 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {teamList.map(user => (
                    <tr key={user.id} className={`hover:bg-slate-50 transition-colors ${!user.active ? 'opacity-60' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 block">{user.name}</span>
                            <span className="text-xs text-slate-500">{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${user.active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {user.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                        {user.lastLogin}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition">
                            <Edit2 size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Tab 2: Perfis e Permissões */}
        {activeTab === "permissoes" && (
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Key size={20} className="text-indigo-600"/> Matriz de Permissões</h3>
              <button className="text-sm font-bold text-indigo-600 hover:underline">Criar Novo Perfil</button>
            </div>
            
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Módulo do Sistema</th>
                    <th className="px-6 py-4 text-center bg-purple-50/50">Administrador</th>
                    <th className="px-6 py-4 text-center bg-blue-50/50">Gerente</th>
                    <th className="px-6 py-4 text-center bg-emerald-50/50">Caixa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">PDV (Frente de Caixa)</td>
                    <td className="px-6 py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600" /></td>
                    <td className="px-6 py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600" /></td>
                    <td className="px-6 py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600" /></td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">Financeiro & DRE</td>
                    <td className="px-6 py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600" /></td>
                    <td className="px-6 py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600" /></td>
                    <td className="px-6 py-4 text-center"><input type="checkbox" className="w-4 h-4 accent-indigo-600" /></td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">Gestão de Equipe</td>
                    <td className="px-6 py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600" /></td>
                    <td className="px-6 py-4 text-center"><input type="checkbox" className="w-4 h-4 accent-indigo-600" /></td>
                    <td className="px-6 py-4 text-center"><input type="checkbox" className="w-4 h-4 accent-indigo-600" /></td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">Autorizar Estornos/Descontos</td>
                    <td className="px-6 py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600" /></td>
                    <td className="px-6 py-4 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600" /></td>
                    <td className="px-6 py-4 text-center"><input type="checkbox" className="w-4 h-4 accent-indigo-600" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Auditoria (Logs) */}
        {activeTab === "auditoria" && (
          <div className="overflow-x-auto">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <span className="font-bold text-slate-700 text-sm flex items-center gap-2"><Activity size={16} /> Log de Eventos do Sistema</span>
            </div>
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Data / Hora</th>
                  <th className="px-6 py-4">Usuário</th>
                  <th className="px-6 py-4">Módulo afetado</th>
                  <th className="px-6 py-4">Ação Realizada</th>
                  <th className="px-6 py-4 text-right">IP de Origem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{log.time}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{log.user}</td>
                    <td className="px-6 py-4 text-indigo-600 font-medium text-xs"><span className="bg-indigo-50 px-2 py-1 rounded">{log.module}</span></td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{log.action}</td>
                    <td className="px-6 py-4 text-right font-mono text-xs text-slate-400">{log.ip}</td>
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

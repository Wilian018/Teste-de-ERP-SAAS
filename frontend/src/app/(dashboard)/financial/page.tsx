"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, DollarSign, Plus, ArrowUpRight, ArrowDownRight, Briefcase, FileText, CheckCircle2, AlertCircle, RefreshCcw, Layers, X } from "lucide-react";

export default function FinancialPage() {
  const [activeTab, setActiveTab] = useState("fluxo");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"INCOME" | "EXPENSE">("INCOME");
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    dueDate: new Date().toISOString().split("T")[0],
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('saas_token');
      const res = await fetch(`${API_URL}/api/financial`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleOpenModal = (type: "INCOME" | "EXPENSE") => {
    setModalType(type);
    setFormData({ description: "", amount: "", dueDate: new Date().toISOString().split("T")[0] });
    setIsModalOpen(true);
  };

  const handleSaveTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('saas_token');
    try {
      await fetch(`${API_URL}/api/financial`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          type: modalType,
          description: formData.description,
          amount: Number(formData.amount),
          dueDate: new Date(formData.dueDate).toISOString(),
          status: "PENDING"
        })
      });
      setIsModalOpen(false);
      fetchTransactions();
    } catch (err) {
      alert("Erro ao salvar lançamento.");
    }
  };

  const handleReconcile = async (id: string) => {
    const token = localStorage.getItem('saas_token');
    try {
      await fetch(`${API_URL}/api/financial/${id}/reconcile`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTransactions();
    } catch (err) {
      alert("Erro ao conciliar.");
    }
  };

  // Cálculos baseados nos dados reais
  const incomeTotal = transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + Number(t.amount), 0);
  const expenseTotal = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + Number(t.amount), 0);
  const balance = incomeTotal - expenseTotal;

  const payables = transactions.filter(t => t.type === 'EXPENSE' && t.status === 'PENDING');
  const receivables = transactions.filter(t => t.type === 'INCOME' && t.status === 'PENDING');
  const latestExtrato = [...transactions].sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestão Financeira</h2>
          <p className="text-slate-500 mt-1">Controle de caixa, contas, conciliação e Demonstração do Resultado (DRE).</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleOpenModal("INCOME")}
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition font-medium text-sm shadow-sm"
          >
            <Plus size={18} /> Nova Receita
          </button>
          <button 
            onClick={() => handleOpenModal("EXPENSE")}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium text-sm shadow-sm"
          >
            <Plus size={18} /> Nova Despesa
          </button>
        </div>
      </div>

      <div className="flex border-b border-slate-200 overflow-x-auto custom-scrollbar">
        <button 
          onClick={() => setActiveTab("fluxo")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "fluxo" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Fluxo de Caixa
        </button>
        <button 
          onClick={() => setActiveTab("contas")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "contas" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Contas a Pagar & Receber
        </button>
        <button 
          onClick={() => setActiveTab("conciliacao")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "conciliacao" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Conciliação Bancária
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-slate-500">Carregando dados financeiros...</div>
      ) : (
        <>
          {/* Tab 1: Fluxo de Caixa */}
          {activeTab === "fluxo" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><ArrowUpRight size={24} /></div>
                  </div>
                  <p className="text-sm font-medium text-slate-500">Receitas Totais</p>
                  <h3 className="text-3xl font-black text-slate-800 mt-1">R$ {incomeTotal.toFixed(2)}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-red-100 text-red-600 rounded-xl"><ArrowDownRight size={24} /></div>
                  </div>
                  <p className="text-sm font-medium text-slate-500">Despesas Totais</p>
                  <h3 className="text-3xl font-black text-slate-800 mt-1">R$ {expenseTotal.toFixed(2)}</h3>
                </div>
                <div className={`${balance >= 0 ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-red-600 border-red-500 text-white'} p-6 rounded-2xl shadow-lg border`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-white/20 text-white rounded-xl"><DollarSign size={24} /></div>
                  </div>
                  <p className="text-sm font-medium text-white/80">Saldo Atual (Caixa)</p>
                  <h3 className="text-3xl font-black mt-1">R$ {balance.toFixed(2)}</h3>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 text-lg">Últimas Transações (Extrato)</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4">Data Vencimento</th>
                        <th className="px-6 py-4">Descrição da Movimentação</th>
                        <th className="px-6 py-4 text-center">Status</th>
                        <th className="px-6 py-4 text-right">Valor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {latestExtrato.length === 0 ? (
                        <tr><td colSpan={4} className="text-center py-6">Nenhuma transação encontrada.</td></tr>
                      ) : (
                        latestExtrato.map(t => (
                          <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">{new Date(t.dueDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4 font-bold text-slate-800">{t.description || '-'}</td>
                            <td className="px-6 py-4 text-center">
                              {t.status === 'PAID' ? 
                                <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">CONCILIADO</span> :
                                <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold">PENDENTE</span>
                              }
                            </td>
                            <td className={`px-6 py-4 text-right font-bold ${t.type === 'INCOME' ? 'text-emerald-600' : 'text-red-600'}`}>
                              {t.type === 'INCOME' ? '+' : '-'} R$ {Number(t.amount).toFixed(2)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Tab 2: Contas a Pagar e Receber */}
          {activeTab === "contas" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* A Pagar */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-red-50 flex justify-between items-center">
                  <h3 className="font-bold text-red-800 flex items-center gap-2"><ArrowDownRight size={18} /> Contas a Pagar (Pendentes)</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3">Descrição</th>
                        <th className="px-4 py-3 text-center">Vencimento</th>
                        <th className="px-4 py-3 text-right">Valor</th>
                        <th className="px-4 py-3 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {payables.length === 0 && <tr><td colSpan={4} className="text-center py-4">Tudo pago!</td></tr>}
                      {payables.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 font-bold text-slate-800">{p.description}</td>
                          <td className="px-4 py-3 text-center">
                            <span className="px-2 py-1 rounded text-xs font-bold bg-slate-100 text-slate-600">{new Date(p.dueDate).toLocaleDateString()}</span>
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-red-600">R$ {Number(p.amount).toFixed(2)}</td>
                          <td className="px-4 py-3 text-center">
                            <button onClick={() => handleReconcile(p.id)} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition font-bold">Baixar</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* A Receber */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-emerald-50 flex justify-between items-center">
                  <h3 className="font-bold text-emerald-800 flex items-center gap-2"><ArrowUpRight size={18} /> Contas a Receber (Pendentes)</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3">Descrição</th>
                        <th className="px-4 py-3 text-center">Vencimento</th>
                        <th className="px-4 py-3 text-right">Valor</th>
                        <th className="px-4 py-3 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {receivables.length === 0 && <tr><td colSpan={4} className="text-center py-4">Nada a receber.</td></tr>}
                      {receivables.map(r => (
                        <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 font-bold text-slate-800">{r.description}</td>
                          <td className="px-4 py-3 text-center">
                            <span className="px-2 py-1 rounded text-xs font-bold bg-slate-100 text-slate-600">{new Date(r.dueDate).toLocaleDateString()}</span>
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-emerald-600">R$ {Number(r.amount).toFixed(2)}</td>
                          <td className="px-4 py-3 text-center">
                            <button onClick={() => handleReconcile(r.id)} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition font-bold">Receber</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Conciliação Bancária */}
          {activeTab === "conciliacao" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2"><RefreshCcw size={18} className="text-indigo-600"/> Conciliação Bancária</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-100 font-semibold text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">Data Vencimento</th>
                      <th className="px-6 py-4">Descrição no ERP</th>
                      <th className="px-6 py-4 text-right">Valor Extrato</th>
                      <th className="px-6 py-4 text-center">Ação / Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {transactions.map(t => (
                      <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium">{new Date(t.dueDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4 font-bold text-slate-800">{t.description}</td>
                        <td className={`px-6 py-4 text-right font-bold ${t.type === 'INCOME' ? 'text-emerald-600' : 'text-red-600'}`}>R$ {Number(t.amount).toFixed(2)}</td>
                        <td className="px-6 py-4 text-center">
                          {t.status === 'PAID' ? (
                            <span className="flex items-center justify-center gap-1 text-emerald-600 font-bold text-xs"><CheckCircle2 size={14}/> OK</span>
                          ) : (
                            <button onClick={() => handleReconcile(t.id)} className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-bold shadow-sm hover:bg-indigo-700">Conciliar</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal Lançamento Financeiro */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className={`p-6 border-b text-white flex justify-between items-center ${modalType === 'INCOME' ? 'bg-emerald-600' : 'bg-red-600'}`}>
              <h2 className="text-xl font-bold flex items-center gap-2">
                {modalType === 'INCOME' ? <ArrowUpRight /> : <ArrowDownRight />}
                {modalType === 'INCOME' ? 'Nova Receita' : 'Nova Despesa'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSaveTransaction} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Descrição</label>
                <input 
                  type="text" required
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:border-indigo-500" 
                  placeholder="Ex: Conta de Luz, Venda PDV..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Valor (R$)</label>
                  <input 
                    type="number" step="0.01" required
                    value={formData.amount}
                    onChange={e => setFormData({...formData, amount: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:border-indigo-500" 
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Vencimento / Data</label>
                  <input 
                    type="date" required
                    value={formData.dueDate}
                    onChange={e => setFormData({...formData, dueDate: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:border-indigo-500" 
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className={`flex-1 px-4 py-2 text-white font-bold rounded-lg transition ${modalType === 'INCOME' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

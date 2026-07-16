"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Plus, ArrowUpRight, ArrowDownRight, Briefcase, FileText, CheckCircle2, AlertCircle, RefreshCcw, Layers } from "lucide-react";

export default function FinancialPage() {
  const [activeTab, setActiveTab] = useState("fluxo");

  const mockPayables = [
    { id: "CP-101", desc: "Fornecedor Ambev S.A.", costCenter: "Custo com Mercadorias (CMV)", dueDate: "18/06/2026", amount: 4500.00, status: "VENCE HOJE" },
    { id: "CP-102", desc: "Conta de Luz (Enel)", costCenter: "Despesas Operacionais", dueDate: "22/06/2026", amount: 850.00, status: "A VENCER" },
  ];

  const mockReceivables = [
    { id: "CR-201", desc: "Fatura Cartão Stone", costCenter: "Receitas de Vendas", dueDate: "19/06/2026", amount: 12400.00, status: "A RECEBER" },
    { id: "CR-202", desc: "Fiado Cliente João P.", costCenter: "Receitas de Vendas", dueDate: "15/06/2026", amount: 350.00, status: "ATRASADO" },
  ];

  const mockReconciliation = [
    { date: "15/06/2026", descBank: "PIX RECEBIDO - MARIA S", descSys: "Venda PDV #441", amount: 145.00, status: "CONCILIADO" },
    { date: "15/06/2026", descBank: "TARIFA BANCARIA", descSys: "-", amount: -45.00, status: "PENDENTE" },
    { date: "16/06/2026", descBank: "PAG TITULO 34191", descSys: "Pagamento Fornecedor", amount: -1250.00, status: "CONCILIADO" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestão Financeira</h2>
          <p className="text-slate-500 mt-1">Controle de caixa, contas, conciliação e Demonstração do Resultado (DRE).</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition font-medium text-sm shadow-sm">
            <Plus size={18} /> Nova Receita
          </button>
          <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium text-sm shadow-sm">
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
        <button 
          onClick={() => setActiveTab("dre")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "dre" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          DRE & Centro de Custos
        </button>
      </div>

      {/* Tab 1: Fluxo de Caixa */}
      {activeTab === "fluxo" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><ArrowUpRight size={24} /></div>
                <span className="text-emerald-600 font-bold text-sm">+15%</span>
              </div>
              <p className="text-sm font-medium text-slate-500">Receitas (Mês Atual)</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">R$ 145.500,00</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-red-100 text-red-600 rounded-xl"><ArrowDownRight size={24} /></div>
                <span className="text-slate-400 font-bold text-sm">-2%</span>
              </div>
              <p className="text-sm font-medium text-slate-500">Despesas (Mês Atual)</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">R$ 82.300,00</h3>
            </div>
            <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg border border-indigo-500 text-white">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-indigo-500 text-white rounded-xl"><DollarSign size={24} /></div>
              </div>
              <p className="text-sm font-medium text-indigo-200">Saldo Atual (Caixa)</p>
              <h3 className="text-3xl font-black mt-1">R$ 63.200,00</h3>
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
                    <th className="px-6 py-4">Data</th>
                    <th className="px-6 py-4">Descrição da Movimentação</th>
                    <th className="px-6 py-4">Centro de Custo</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Valor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">15/06/2026</td>
                    <td className="px-6 py-4 font-bold text-slate-800">Fechamento de Caixa 01</td>
                    <td className="px-6 py-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium border border-slate-200 flex items-center w-fit gap-1"><Layers size={12}/> Vendas (Operacional)</span></td>
                    <td className="px-6 py-4 text-center"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">RECEBIDO</span></td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-600">+ R$ 4.520,00</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">14/06/2026</td>
                    <td className="px-6 py-4 font-bold text-slate-800">Pagamento Fornecedor (Ambev)</td>
                    <td className="px-6 py-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium border border-slate-200 flex items-center w-fit gap-1"><Layers size={12}/> Estoque (Operacional)</span></td>
                    <td className="px-6 py-4 text-center"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">PAGO</span></td>
                    <td className="px-6 py-4 text-right font-bold text-red-600">- R$ 1.250,00</td>
                  </tr>
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
              <h3 className="font-bold text-red-800 flex items-center gap-2"><ArrowDownRight size={18} /> Contas a Pagar</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Descrição / Fornecedor</th>
                    <th className="px-4 py-3 text-center">Vencimento</th>
                    <th className="px-4 py-3 text-right">Valor</th>
                    <th className="px-4 py-3 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockPayables.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-800">{p.desc}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{p.costCenter}</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${p.status === 'VENCE HOJE' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>{p.dueDate}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-red-600">R$ {p.amount.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">
                        <button className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded hover:bg-emerald-100 hover:text-emerald-700 transition">Baixar</button>
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
              <h3 className="font-bold text-emerald-800 flex items-center gap-2"><ArrowUpRight size={18} /> Contas a Receber</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Descrição / Cliente</th>
                    <th className="px-4 py-3 text-center">Vencimento</th>
                    <th className="px-4 py-3 text-right">Valor</th>
                    <th className="px-4 py-3 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockReceivables.map(r => (
                    <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-800">{r.desc}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{r.costCenter}</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${r.status === 'ATRASADO' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>{r.dueDate}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-emerald-600">R$ {r.amount.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">
                        <button className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded hover:bg-emerald-100 hover:text-emerald-700 transition">Receber</button>
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
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition font-medium text-sm shadow-sm">
              <FileText size={16} /> Importar OFX
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-100 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Data Extrato</th>
                  <th className="px-6 py-4">Lançamento no Banco</th>
                  <th className="px-6 py-4">Equivalente no Sistema (ERP)</th>
                  <th className="px-6 py-4 text-right">Valor Extrato</th>
                  <th className="px-6 py-4 text-center">Ação / Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockReconciliation.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium">{r.date}</td>
                    <td className="px-6 py-4 font-mono text-slate-500">{r.descBank}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{r.descSys}</td>
                    <td className={`px-6 py-4 text-right font-bold ${r.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}>R$ {r.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      {r.status === 'CONCILIADO' ? (
                        <span className="flex items-center justify-center gap-1 text-emerald-600 font-bold text-xs"><CheckCircle2 size={14}/> OK</span>
                      ) : (
                        <button className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-bold shadow-sm hover:bg-indigo-700">Conciliar</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: DRE e Centro de Custos */}
      {activeTab === "dre" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2"><Briefcase className="text-indigo-600" /> Demonstração do Resultado (DRE)</h3>
            <select className="border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 outline-none focus:border-indigo-500 bg-white">
              <option>Junho / 2026</option>
              <option>Maio / 2026</option>
            </select>
          </div>
          <div className="p-8 space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="font-bold text-slate-700 text-lg">1. Receita Bruta de Vendas</span>
              <span className="font-bold text-emerald-600 text-lg">R$ 145.500,00</span>
            </div>
            <div className="flex justify-between items-center py-2 text-slate-600 pl-4">
              <span>(-) Impostos sobre Vendas (Simples Nacional)</span>
              <span className="text-red-500">- R$ 5.820,00</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100 bg-slate-50 px-4 rounded-lg">
              <span className="font-bold text-slate-800">2. Receita Líquida</span>
              <span className="font-bold text-slate-800">R$ 139.680,00</span>
            </div>
            <div className="flex justify-between items-center py-2 text-slate-600 pl-4">
              <span className="flex items-center gap-1.5"><Layers size={14} className="text-slate-400"/> Custo das Mercadorias Vendidas (Centro de Custo: CMV)</span>
              <span className="text-red-500">- R$ 72.300,00</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100 bg-slate-50 px-4 rounded-lg">
              <span className="font-bold text-slate-800">3. Lucro Bruto</span>
              <span className="font-bold text-emerald-600">R$ 67.380,00</span>
            </div>
            <div className="flex justify-between items-center py-2 text-slate-600 pl-4">
              <span className="flex items-center gap-1.5"><Layers size={14} className="text-slate-400"/> Despesas Operacionais (Centro de Custo: Fixo)</span>
              <span className="text-red-500">- R$ 12.000,00</span>
            </div>
            <div className="flex justify-between items-center py-2 text-slate-600 pl-4 border-b border-slate-100">
              <span className="flex items-center gap-1.5"><Layers size={14} className="text-slate-400"/> Despesas com Pessoal (Centro de Custo: RH)</span>
              <span className="text-red-500">- R$ 25.000,00</span>
            </div>
            <div className="flex justify-between items-center py-6 bg-indigo-50 px-4 rounded-xl mt-4 border border-indigo-100">
              <span className="font-black text-indigo-900 text-xl">LUCRO LÍQUIDO DO EXERCÍCIO</span>
              <span className="font-black text-emerald-600 text-2xl">R$ 30.380,00</span>
            </div>
            <p className="text-center text-xs text-slate-400 mt-4">Margem de Lucro Líquida: 20.8%</p>
          </div>
        </div>
      )}
    </div>
  );
}

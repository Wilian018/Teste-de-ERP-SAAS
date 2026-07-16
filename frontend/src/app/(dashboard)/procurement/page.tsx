"use client";

import { useState } from "react";
import { ShoppingBag, Search, Plus, CheckCircle2, ClipboardCheck, History, AlertCircle, FileText, Truck } from "lucide-react";

export default function ProcurementPage() {
  const [activeTab, setActiveTab] = useState("pedidos");

  const mockPurchaseOrders = [
    { id: "PC-0042", date: "15/06/2026", supplier: "Ambev S.A.", items: 45, total: 12500.00, status: "EMITIDO", expected: "18/06/2026" },
    { id: "PC-0043", date: "16/06/2026", supplier: "Moinho Santa Clara", items: 12, total: 3400.00, status: "EM COTAÇÃO", expected: "-" },
    { id: "PC-0044", date: "16/06/2026", supplier: "Coca-Cola Indústrias", items: 28, total: 8900.00, status: "APROVADO", expected: "20/06/2026" },
  ];

  const mockReceiving = [
    { id: "REC-991", poRef: "PC-0040", supplier: "Sadia S.A.", nf: "102.551", status: "AGUARDANDO CONFERÊNCIA", items: 150, date: "16/06/2026" },
    { id: "REC-992", poRef: "PC-0041", supplier: "Nestlé", nf: "88.421", status: "DIVERGÊNCIA", items: 400, date: "16/06/2026" },
  ];

  const mockHistory = [
    { id: "PC-0038", date: "10/06/2026", supplier: "Ambev S.A.", total: 15000.00, status: "CONCLUÍDO", receivingDate: "12/06/2026" },
    { id: "PC-0039", date: "11/06/2026", supplier: "Bunge Alimentos", total: 6700.00, status: "CANCELADO", receivingDate: "-" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestão de Compras</h2>
          <p className="text-slate-500 mt-1">Cotações, emissão de pedidos, recebimento de mercadoria e conferência cega.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-sm shadow-sm">
          <Plus size={18} /> Novo Pedido de Compra
        </button>
      </div>

      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab("pedidos")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === "pedidos" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Pedidos de Compra
        </button>
        <button 
          onClick={() => setActiveTab("recebimento")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === "recebimento" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Recebimento & Conferência
        </button>
        <button 
          onClick={() => setActiveTab("historico")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === "historico" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Histórico
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        
        {/* Barra de Pesquisa */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por Fornecedor, Nro do Pedido ou NF..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm"
            />
          </div>
        </div>

        {/* Tab 1: Pedidos de Compra */}
        {activeTab === "pedidos" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Nº Pedido</th>
                  <th className="px-6 py-4">Fornecedor</th>
                  <th className="px-6 py-4 text-center">Itens Cotados</th>
                  <th className="px-6 py-4 text-right">Valor Estimado</th>
                  <th className="px-6 py-4 text-center">Previsão Entrega</th>
                  <th className="px-6 py-4 text-center">Status do Pedido</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockPurchaseOrders.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-indigo-600 flex items-center gap-2">
                      <FileText size={16} /> {p.id}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">{p.supplier}</td>
                    <td className="px-6 py-4 text-center font-medium text-slate-600">{p.items} un</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-700">R$ {p.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center text-slate-500 font-medium">
                      <div className="flex items-center justify-center gap-1">
                        <Truck size={14} className="text-slate-400" /> {p.expected}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider ${
                        p.status === 'EM COTAÇÃO' ? 'bg-slate-100 text-slate-600' : 
                        p.status === 'APROVADO' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Recebimento e Conferência */}
        {activeTab === "recebimento" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Fila de Conferência</th>
                  <th className="px-6 py-4">Fornecedor & Pedido Ref.</th>
                  <th className="px-6 py-4">Nota Fiscal</th>
                  <th className="px-6 py-4 text-center">Volume</th>
                  <th className="px-6 py-4 text-center">Status (Conferência)</th>
                  <th className="px-6 py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockReceiving.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-slate-700">{r.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{r.supplier}</div>
                      <div className="text-xs text-indigo-500 font-mono mt-0.5">Ref: {r.poRef}</div>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-600 bg-slate-50/50">NF-e {r.nf}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-600">{r.items} un</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold flex items-center justify-center gap-1 w-fit mx-auto ${r.status === 'DIVERGÊNCIA' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                        {r.status === 'DIVERGÊNCIA' && <AlertCircle size={14} />} {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg flex items-center justify-center gap-1 mx-auto hover:bg-indigo-200 transition">
                        <ClipboardCheck size={14} /> Iniciar Conferência
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Histórico */}
        {activeTab === "historico" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Pedido Finalizado</th>
                  <th className="px-6 py-4">Fornecedor</th>
                  <th className="px-6 py-4 text-center">Data Emissão</th>
                  <th className="px-6 py-4 text-center">Data Recebimento</th>
                  <th className="px-6 py-4 text-right">Valor Final Pago</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockHistory.map(h => (
                  <tr key={h.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-slate-600">{h.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{h.supplier}</td>
                    <td className="px-6 py-4 text-center text-slate-500 font-medium">{h.date}</td>
                    <td className="px-6 py-4 text-center text-slate-500 font-medium">{h.receivingDate}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-700">R$ {h.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${h.status === 'CONCLUÍDO' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {h.status}
                      </span>
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

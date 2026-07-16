"use client";

import { ShoppingBag, Search, Plus, PackagePlus, ArrowRightLeft, ShieldAlert, FileDigit, TrendingDown, ClipboardList } from "lucide-react";
import { useState } from "react";

export default function InventoryMovementsPage() {
  const [activeTab, setActiveTab] = useState("entradas");

  const mockPurchases = [
    { id: "ENT-1001", date: "15/06/2026", type: "Compra Fornecedor", origin: "Ambev S.A.", total: 4500.00, status: "CONCLUÍDO" },
    { id: "ENT-1002", date: "16/06/2026", type: "Compra Fornecedor", origin: "Coca-Cola Indústrias", total: 1250.00, status: "CONCLUÍDO" },
    { id: "ENT-1003", date: "18/06/2026", type: "Devolução Cliente", origin: "João Pedro Souza", total: 85.00, status: "PENDENTE" },
  ];

  const mockTransfers = [
    { id: "SAI-2001", date: "14/06/2026", type: "Transferência Filial", dest: "Filial Zona Sul", items: 45, status: "EM TRÂNSITO" },
    { id: "SAI-2002", date: "16/06/2026", type: "Transferência Filial", dest: "Depósito Central", items: 120, status: "CONCLUÍDO" },
    { id: "SAI-2003", date: "17/06/2026", type: "Saída Avulsa (Uso Interno)", dest: "Copa/Cozinha", items: 3, status: "CONCLUÍDO" },
  ];

  const mockAdjustments = [
    { id: "AJ-3001", date: "10/06/2026", type: "Perda/Avaria", product: "Óleo de Soja 900ml", qty: "-2 un", reason: "Embalagem Danificada", status: "LANÇADO" },
    { id: "AJ-3002", date: "12/06/2026", type: "Vencimento", product: "Leite Integral 1L", qty: "-12 un", reason: "Lote Vencido (LT009X)", status: "LANÇADO" },
    { id: "AJ-3003", date: "15/06/2026", type: "Inventário (Balanço)", product: "Arroz Branco 5kg", qty: "+5 un", reason: "Sobra no Balanço Físico", status: "LANÇADO" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Movimentações de Estoque</h2>
          <p className="text-slate-500 mt-1">Controle de Entradas, Saídas, Transferências, Perdas e Balanço Geral.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition font-medium text-sm shadow-sm">
            <ClipboardList size={18} /> Iniciar Inventário
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-sm shadow-sm">
            <PackagePlus size={18} /> Nova Movimentação
          </button>
        </div>
      </div>

      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab("entradas")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === "entradas" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Entradas de Mercadoria
        </button>
        <button 
          onClick={() => setActiveTab("saidas")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === "saidas" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Saídas & Transferências
        </button>
        <button 
          onClick={() => setActiveTab("ajustes")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === "ajustes" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Ajustes, Perdas & Vencimentos
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        
        {/* Barra de Pesquisa */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar pelo código do documento, nota ou produto..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm"
            />
          </div>
        </div>

        {/* Tab 1: Entradas */}
        {activeTab === "entradas" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Documento (Entrada)</th>
                  <th className="px-6 py-4">Origem / Fornecedor</th>
                  <th className="px-6 py-4 text-center">Tipo de Movimento</th>
                  <th className="px-6 py-4 text-center">Data</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockPurchases.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-indigo-600">{p.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-50 text-indigo-500 rounded-lg flex items-center justify-center">
                          <ShoppingBag size={16} />
                        </div>
                        <span className="font-bold text-slate-800">{p.origin}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600">{p.type}</td>
                    <td className="px-6 py-4 text-center font-medium text-slate-500">{p.date}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.status === 'CONCLUÍDO' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Saídas e Transferências */}
        {activeTab === "saidas" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Documento (Saída)</th>
                  <th className="px-6 py-4">Destino / Filial</th>
                  <th className="px-6 py-4 text-center">Tipo de Movimento</th>
                  <th className="px-6 py-4 text-center">Itens (Qtd)</th>
                  <th className="px-6 py-4 text-center">Data</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockTransfers.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-amber-600">{t.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-amber-50 text-amber-500 rounded-lg flex items-center justify-center">
                          <ArrowRightLeft size={16} />
                        </div>
                        <span className="font-bold text-slate-800">{t.dest}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600">{t.type}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{t.items} un</td>
                    <td className="px-6 py-4 text-center font-medium text-slate-500">{t.date}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${t.status === 'CONCLUÍDO' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Ajustes, Perdas e Vencimentos */}
        {activeTab === "ajustes" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Protocolo (Ajuste)</th>
                  <th className="px-6 py-4">Motivo / Tipo</th>
                  <th className="px-6 py-4">Produto Afetado</th>
                  <th className="px-6 py-4 text-center">Ajuste Qtd</th>
                  <th className="px-6 py-4 text-center">Justificativa / Lote</th>
                  <th className="px-6 py-4 text-center">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockAdjustments.map(a => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-red-500">{a.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.type === 'Inventário (Balanço)' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}>
                          {a.type === 'Inventário (Balanço)' ? <FileDigit size={16} /> : <TrendingDown size={16} />}
                        </div>
                        <span className="font-bold text-slate-800">{a.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-600">{a.product}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-black ${a.qty.includes('+') ? 'text-emerald-600' : 'text-red-600'}`}>{a.qty}</span>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-500 text-xs flex items-center justify-center gap-1">
                      {a.type === 'Vencimento' && <ShieldAlert size={14} className="text-amber-500" />} {a.reason}
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-slate-500">{a.date}</td>
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

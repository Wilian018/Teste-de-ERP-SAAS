"use client";

import { useState } from "react";
import { Search, Receipt, Download, FileText, FileCode, CheckCircle2, AlertTriangle, FileArchive, Settings2 } from "lucide-react";

export default function FiscalPage() {
  const [activeTab, setActiveTab] = useState("notas");

  const mockSales = [
    { id: "1005", date: "15/06/2026 14:30", customer: "Consumidor Final", amount: 154.90, type: "NFC-e", status: "Autorizada", key: "35260611222333000144650010000010051000010051" },
    { id: "1004", date: "15/06/2026 12:15", customer: "Maria Silva", amount: 45.00, type: "NFC-e", status: "Autorizada", key: "35260611222333000144650010000010041000010041" },
    { id: "1003", date: "15/06/2026 10:00", customer: "Moinho Santa Clara", amount: 3200.00, type: "NF-e", status: "Aguardando Sefaz", key: "Gerando..." },
  ];

  const mockTaxes = [
    { rule: "Venda Interna (Tributação Normal)", cfop: "5102", csosn: "0102", cst: "00", aliquota: "18%", desc: "Venda de mercadoria adquirida de terceiros dentro do estado." },
    { rule: "Venda Interestadual (Sem ST)", cfop: "6102", csosn: "0102", cst: "00", aliquota: "12%", desc: "Venda de mercadoria adquirida de terceiros para fora do estado." },
    { rule: "Devolução de Compra", cfop: "5202", csosn: "0400", cst: "90", aliquota: "0%", desc: "Devolução de mercadoria recebida de fornecedor." },
  ];

  const mockNcm = [
    { ncm: "1006.30.21", desc: "Arroz Semibranqueado ou Branqueado", impostoFed: "0.00%", impostoEst: "7.00%" },
    { ncm: "1507.90.11", desc: "Óleo de Soja Refinado em Recipientes", impostoFed: "9.25%", impostoEst: "18.00%" },
    { ncm: "2202.10.00", desc: "Águas, incluindo minerais e gaseificadas (Refrigerantes)", impostoFed: "14.00%", impostoEst: "25.00%" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestão Fiscal & Tributária</h2>
          <p className="text-slate-500 mt-1">Emissão de notas (NFC-e/NF-e), geração de SPED e matriz de tributação.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-sm shadow-sm">
          <FileText size={18} /> Emitir NF-e Manual
        </button>
      </div>

      <div className="flex border-b border-slate-200 overflow-x-auto custom-scrollbar">
        <button 
          onClick={() => setActiveTab("notas")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "notas" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Monitor de Notas (NFC-e / NF-e)
        </button>
        <button 
          onClick={() => setActiveTab("sped")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "sped" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Apuração & Arquivos SPED
        </button>
        <button 
          onClick={() => setActiveTab("tributacao")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "tributacao" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Regras de Tributação (CFOP, CST, CSOSN)
        </button>
        <button 
          onClick={() => setActiveTab("ncm")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "ncm" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Tabela NCM & IBPT
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        
        {/* Tab 1: Monitor de Notas */}
        {activeTab === "notas" && (
          <>
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar por N° do Pedido, Cliente ou Chave da Nota..." 
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Doc / Data Emissão</th>
                    <th className="px-6 py-4">Cliente / Destinatário</th>
                    <th className="px-6 py-4 text-center">Tipo</th>
                    <th className="px-6 py-4 text-right">Valor Total</th>
                    <th className="px-6 py-4">Status Sefaz & Chave de Acesso</th>
                    <th className="px-6 py-4 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockSales.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800">#{s.id}</p>
                        <p className="text-xs text-slate-400">{s.date}</p>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">{s.customer}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${s.type === 'NF-e' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                          {s.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-slate-800">R$ {s.amount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className={`text-xs font-bold flex items-center gap-1 ${s.status.includes('Autorizada') ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {s.status.includes('Autorizada') ? <CheckCircle2 size={14}/> : <AlertTriangle size={14}/>} {s.status}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono mt-1">{s.key}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded transition" title="Baixar DANFE / Cupom PDF">
                            <Receipt size={16} />
                          </button>
                          <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition" title="Baixar XML">
                            <Download size={16} />
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

        {/* Tab 2: SPED */}
        {activeTab === "sped" && (
          <div className="p-8">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
                <FileArchive size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Geração de Arquivo SPED Fiscal / Contribuições</h3>
              <p className="text-slate-500">
                Selecione o período de apuração para consolidar todas as notas emitidas (NFC-e/NF-e), recebidas e movimentações de estoque (Bloco K) no formato TXT validado pelo PVA da Receita Federal.
              </p>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-6 grid grid-cols-2 gap-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Mês de Referência</label>
                  <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500">
                    <option>Junho / 2026</option>
                    <option>Maio / 2026</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Tipo de Arquivo</label>
                  <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500">
                    <option>SPED Fiscal (ICMS/IPI)</option>
                    <option>SPED Contribuições (PIS/COFINS)</option>
                    <option>Sintegra</option>
                  </select>
                </div>
              </div>
              <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                <Download size={20} /> Gerar e Baixar Arquivo
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Regras de Tributação (CST, CFOP, CSOSN) */}
        {activeTab === "tributacao" && (
          <div className="overflow-x-auto">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <span className="font-bold text-slate-700 text-sm flex items-center gap-2"><Settings2 size={16} /> Matriz Fiscal da Empresa</span>
              <button className="text-xs font-bold text-indigo-600 hover:underline">Adicionar Regra</button>
            </div>
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Regra de Operação</th>
                  <th className="px-6 py-4 text-center">CFOP</th>
                  <th className="px-6 py-4 text-center">CSOSN (Simples)</th>
                  <th className="px-6 py-4 text-center">CST (Lucro Real/Pres.)</th>
                  <th className="px-6 py-4 text-center">Alíquota ICMS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockTaxes.map((t, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{t.rule}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{t.desc}</div>
                    </td>
                    <td className="px-6 py-4 text-center font-mono font-bold text-indigo-600">{t.cfop}</td>
                    <td className="px-6 py-4 text-center font-mono font-medium text-slate-600">{t.csosn}</td>
                    <td className="px-6 py-4 text-center font-mono font-medium text-slate-600">{t.cst}</td>
                    <td className="px-6 py-4 text-center font-bold text-emerald-600">{t.aliquota}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 4: NCM e Impostos (IBPT) */}
        {activeTab === "ncm" && (
          <div className="overflow-x-auto">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar código NCM ou descrição do produto..." 
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm"
                />
              </div>
            </div>
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">NCM</th>
                  <th className="px-6 py-4">Descrição da Mercadoria</th>
                  <th className="px-6 py-4 text-center">Imposto Fed. Aproximado</th>
                  <th className="px-6 py-4 text-center">Imposto Est. Aproximado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockNcm.map((n, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-indigo-600">{n.ncm}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{n.desc}</td>
                    <td className="px-6 py-4 text-center font-bold text-red-500">{n.impostoFed}</td>
                    <td className="px-6 py-4 text-center font-bold text-amber-500">{n.impostoEst}</td>
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

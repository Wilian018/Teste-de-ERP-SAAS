"use client";

import { useState } from "react";
import { Printer, Tag, Receipt, Settings2, CheckCircle2, Play, AlertTriangle, RefreshCcw, Search, Barcode } from "lucide-react";

export default function PrintPage() {
  const [activeTab, setActiveTab] = useState("etiquetas");

  const mockPrinters = [
    { id: 1, name: "Caixa 01 - Térmica", model: "Epson TM-T20X", type: "Cupom Não Fiscal / NFC-e (80mm)", status: "Conectada", conn: "USB" },
    { id: 2, name: "Retaguarda - Etiquetas", model: "Zebra ZD230", type: "Etiquetas / Código de Barras", status: "Conectada", conn: "Rede (192.168.1.55)" },
    { id: 3, name: "Caixa 02 - Térmica", model: "Bematech MP-4200", type: "Cupom Não Fiscal / NFC-e (80mm)", status: "Desconectada", conn: "USB" },
  ];

  const mockQueue = [
    { id: "J-891", type: "Cupom Fiscal (NFC-e)", origin: "Caixa 01", doc: "Venda #1005", time: "Há 2 min", status: "Imprimindo..." },
    { id: "J-890", type: "Comprovante TEF", origin: "Caixa 01", doc: "Transação #4459", time: "Há 2 min", status: "Concluído" },
    { id: "J-889", type: "Fechamento de Caixa", origin: "Caixa 02", doc: "Turno Manhã", time: "Há 1h", status: "Concluído" },
  ];

  const mockTags = [
    { id: 1, ean: "7891234567890", name: "Arroz Branco Tipo 1 - 5kg", price: 24.90, qty: 15 },
    { id: 2, ean: "7890987654321", name: "Óleo de Soja 900ml", price: 8.50, qty: 45 },
    { id: 3, ean: "7891112223334", name: "Leite Integral 1L", price: 5.80, qty: 24 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Central de Impressão</h2>
          <p className="text-slate-500 mt-1">Gerenciamento de impressoras térmicas, etiquetas de gôndola e spooler de caixa.</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition font-medium text-sm shadow-sm">
          <Settings2 size={18} /> Instalar Spooler Local (Windows)
        </button>
      </div>

      <div className="flex border-b border-slate-200 overflow-x-auto custom-scrollbar">
        <button 
          onClick={() => setActiveTab("etiquetas")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "etiquetas" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Etiquetas & Códigos de Barras
        </button>
        <button 
          onClick={() => setActiveTab("spooler")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "spooler" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Fila de Impressão (Cupons)
        </button>
        <button 
          onClick={() => setActiveTab("hardware")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "hardware" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Impressoras Térmicas (Hardware)
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        
        {/* Tab 1: Etiquetas e Códigos de Barras */}
        {activeTab === "etiquetas" && (
          <>
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Buscar produto para adicionar à fila de etiquetas..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm" />
              </div>
              <select className="border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 outline-none focus:border-indigo-500 bg-white min-w-[200px]">
                <option>Layout: Gôndola (Padrão)</option>
                <option>Layout: Promoção (Amarelo)</option>
                <option>Layout: Pequena (Joias/Roupas)</option>
              </select>
              <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-bold text-sm shadow-sm">
                <Printer size={18} /> Imprimir Fila (84 etiq.)
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Produto</th>
                    <th className="px-6 py-4">Código de Barras (EAN)</th>
                    <th className="px-6 py-4 text-center">Preço a Imprimir</th>
                    <th className="px-6 py-4 text-center">Qtd Etiquetas</th>
                    <th className="px-6 py-4 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockTags.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">{t.name}</td>
                      <td className="px-6 py-4 font-mono text-slate-500 flex items-center gap-2">
                        <Barcode size={16} className="text-slate-400"/> {t.ean}
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-emerald-600">R$ {t.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-center">
                        <input type="number" defaultValue={t.qty} className="w-16 text-center border border-slate-200 rounded-md py-1 outline-none focus:border-indigo-500" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-xs text-red-500 hover:underline font-medium">Remover</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Tab 2: Fila de Impressão (Spooler) */}
        {activeTab === "spooler" && (
          <div className="overflow-x-auto">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <span className="font-bold text-slate-700 text-sm flex items-center gap-2"><RefreshCcw size={16} /> Fila em Tempo Real</span>
              <button className="text-xs font-bold text-red-600 hover:underline">Limpar Fila de Impressão</button>
            </div>
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">ID Job</th>
                  <th className="px-6 py-4">Documento / Tipo</th>
                  <th className="px-6 py-4">Origem</th>
                  <th className="px-6 py-4 text-center">Hora</th>
                  <th className="px-6 py-4 text-center">Status Sefaz / Spooler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockQueue.map((q, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-indigo-600">{q.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{q.type}</div>
                      <div className="text-xs text-slate-500">{q.doc}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-600">{q.origin}</td>
                    <td className="px-6 py-4 text-center text-slate-500">{q.time}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold flex items-center justify-center gap-1 w-fit mx-auto ${q.status === 'Imprimindo...' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {q.status === 'Imprimindo...' ? <RefreshCcw size={12} className="animate-spin"/> : <CheckCircle2 size={12}/>} {q.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Hardware (Impressoras Térmicas) */}
        {activeTab === "hardware" && (
          <div className="overflow-x-auto">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <span className="font-bold text-slate-700 text-sm">Dispositivos Reconhecidos</span>
              <button className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-200 transition font-bold text-xs">
                <Search size={14} /> Buscar Impressoras na Rede
              </button>
            </div>
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Nome Lógico</th>
                  <th className="px-6 py-4">Modelo Físico</th>
                  <th className="px-6 py-4">Interface (Porta)</th>
                  <th className="px-6 py-4">Finalidade de Impressão</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Teste</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockPrinters.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{p.name}</td>
                    <td className="px-6 py-4 font-medium text-slate-600">{p.model}</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{p.conn}</td>
                    <td className="px-6 py-4 text-slate-600">{p.type}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold flex items-center justify-center gap-1 w-fit mx-auto ${p.status === 'Conectada' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {p.status === 'Conectada' ? <CheckCircle2 size={12}/> : <AlertTriangle size={12}/>} {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-md font-bold shadow-sm flex items-center justify-center gap-1 mx-auto hover:bg-slate-200 disabled:opacity-50" disabled={p.status !== 'Conectada'}>
                        <Play size={12} /> Testar
                      </button>
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

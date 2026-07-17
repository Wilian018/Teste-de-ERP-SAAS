"use client";

import { useState, useEffect } from "react";
import { FileCode, Search, Download, ExternalLink, Filter } from "lucide-react";

export default function FiscalSalesPage() {
  const [sales, setSales] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchSales = async () => {
      const token = localStorage.getItem('saas_token');
      try {
        const res = await fetch(`${API_URL}/api/sales`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          setSales(await res.json());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSales();
  }, []);

  const handleSimulateDownload = (type: string) => {
    alert(`Gerando arquivo ${type}... Em um ambiente de produção real, isso faria o download do arquivo assinado digitalmente pelo SEFAZ.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestão Fiscal & Notas</h2>
          <p className="text-slate-500 mt-1">Histórico de vendas, emissão de NF-e, NFC-e e exportação SPED.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleSimulateDownload('SPED')} className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition font-medium text-sm shadow-sm">
            <Download size={18} /> Exportar SPED Fiscal
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por Nro da Nota, Cliente ou Data..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm"
            />
          </div>
          <button className="flex items-center gap-2 border border-slate-200 text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-100 transition font-medium text-sm">
            <Filter size={18} /> Filtros
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-10 text-slate-500">Carregando histórico fiscal...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Data / Hora</th>
                  <th className="px-6 py-4">Nº Venda (Ref)</th>
                  <th className="px-6 py-4 text-center">Itens</th>
                  <th className="px-6 py-4 text-right">Valor Total</th>
                  <th className="px-6 py-4 text-center">Status Sefaz</th>
                  <th className="px-6 py-4 text-center">Ações Fiscais</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sales.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-6">Nenhuma venda registrada ainda. Vá ao PDV e faça a primeira venda!</td></tr>
                ) : (
                  sales.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-600">{new Date(s.createdAt).toLocaleString()}</td>
                      <td className="px-6 py-4 font-mono font-bold text-indigo-600">{s.id.split('-')[0].toUpperCase()}</td>
                      <td className="px-6 py-4 text-center font-bold text-slate-700">{s.items?.length || 0} un</td>
                      <td className="px-6 py-4 text-right font-black text-emerald-600">R$ {Number(s.totalAmount).toFixed(2)}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">AUTORIZADA</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleSimulateDownload('DANFE')} className="text-xs bg-slate-100 text-slate-700 px-2 py-1.5 rounded flex items-center gap-1 hover:bg-slate-200 font-bold transition">
                            <ExternalLink size={14}/> DANFE
                          </button>
                          <button onClick={() => handleSimulateDownload('XML')} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1.5 rounded flex items-center gap-1 hover:bg-indigo-100 font-bold transition">
                            <FileCode size={14}/> XML
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

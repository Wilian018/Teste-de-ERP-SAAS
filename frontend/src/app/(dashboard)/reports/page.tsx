"use client";

import { BarChart3, TrendingUp, Package, Users, DollarSign, FileCode, ShoppingCart, Download, Filter, FileText } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    {
      category: "Comercial & Vendas",
      items: [
        { name: "Vendas por Período", desc: "Volume de vendas diário, semanal e mensal.", icon: ShoppingCart, color: "text-blue-500", bg: "bg-blue-50" },
        { name: "Rentabilidade e Lucro", desc: "Análise de margem de lucro por pedido e curva ABC.", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
      ]
    },
    {
      category: "Estoque & Catálogo",
      items: [
        { name: "Posição de Estoque (Inventário)", desc: "Relatório de saldo atual, custo e valor de venda projetado.", icon: Package, color: "text-indigo-500", bg: "bg-indigo-50" },
        { name: "Giro de Produtos", desc: "Produtos mais vendidos, menos vendidos e curva de ruptura.", icon: Package, color: "text-indigo-500", bg: "bg-indigo-50" },
      ]
    },
    {
      category: "Relacionamento (CRM)",
      items: [
        { name: "Análise de Clientes", desc: "Ticket médio, LTV, pontuação de fidelidade e clientes inativos.", icon: Users, color: "text-amber-500", bg: "bg-amber-50" },
      ]
    },
    {
      category: "Controladoria & Contábil",
      items: [
        { name: "Financeiro Consolidado", desc: "Fluxo de caixa previsto x realizado, e inadimplência.", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
        { name: "Mapa Fiscal e Impostos", desc: "Resumo de notas emitidas, impostos recolhidos e substituição tributária.", icon: FileCode, color: "text-slate-600", bg: "bg-slate-100" },
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Central de Relatórios & BI</h2>
          <p className="text-slate-500 mt-1">Gere relatórios analíticos em PDF e Excel para tomada de decisão.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition font-medium text-sm shadow-sm">
            <Filter size={18} /> Filtros Globais
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {reports.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-lg font-bold text-slate-800 mb-4">{section.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map((report, rIdx) => (
                <div key={rIdx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group cursor-pointer flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${report.bg} ${report.color}`}>
                        <report.icon size={20} />
                      </div>
                      <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition">{report.name}</h4>
                    </div>
                    <p className="text-sm text-slate-500">{report.desc}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 pt-4 border-t border-slate-100">
                    <button className="flex-1 flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 px-3 py-2 rounded-lg text-xs font-bold transition">
                      <BarChart3 size={14} /> Visualizar
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 text-slate-600 px-3 py-2 rounded-lg text-xs font-bold transition">
                      <Download size={14} /> Exportar Excel
                    </button>
                    <button className="w-10 flex items-center justify-center bg-slate-50 hover:bg-red-50 hover:text-red-600 text-slate-600 py-2 rounded-lg transition" title="Exportar PDF">
                      <FileText size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

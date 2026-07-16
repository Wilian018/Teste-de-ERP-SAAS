"use client";

import { useState } from "react";
import { PackagePlus, Search, Edit2, Trash2, Box, ShieldAlert, Tag, Percent, Image as ImageIcon } from "lucide-react";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("catalogo");

  const mockProducts = [
    { 
      id: 1, 
      barcode: "7891234567890", 
      internalCode: "00102",
      sku: "ARZ-BCO-5KG",
      name: "Arroz Branco Tipo 1", 
      brand: "Tio João", 
      category: "Alimentos Básicos", 
      unit: "Pct 5kg",
      costPrice: 18.50,
      sellPrice: 24.90,
      margin: 34.5,
      stock: 120 
    },
    { 
      id: 2, 
      barcode: "7890987654321", 
      internalCode: "00544",
      sku: "OLE-SOJ-900ML",
      name: "Óleo de Soja", 
      brand: "Liza", 
      category: "Óleos e Gorduras", 
      unit: "Un 900ml",
      costPrice: 6.20,
      sellPrice: 8.50,
      margin: 37.0,
      stock: 45 
    },
    { 
      id: 3, 
      barcode: "7891112223334", 
      internalCode: "00891",
      sku: "LT-INT-1L",
      name: "Leite Integral", 
      brand: "Itambé", 
      category: "Laticínios", 
      unit: "Cx 1L",
      costPrice: 4.10,
      sellPrice: 5.80,
      margin: 41.4,
      stock: 350 
    },
  ];

  const mockBatches = [
    { id: 1, product: "Óleo de Soja 900ml", batch: "L2390A", expiry: "2026-08-15", qty: 20, status: "Normal" },
    { id: 2, product: "Arroz Branco Tipo 1", batch: "AR551B", expiry: "2026-06-20", qty: 5, status: "Vencendo" },
    { id: 3, product: "Leite Integral", batch: "LT009X", expiry: "2025-12-10", qty: 12, status: "Vencido" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Catálogo e Estoque</h2>
          <p className="text-slate-500 mt-1">Gestão de produtos, SKUs, precificação, lotes e validades.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition font-medium text-sm shadow-sm">
          <PackagePlus size={18} /> Novo Produto
        </button>
      </div>

      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab("catalogo")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === "catalogo" ? "border-emerald-600 text-emerald-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Cadastro de Produtos & Preços
        </button>
        <button 
          onClick={() => setActiveTab("lotes")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === "lotes" ? "border-emerald-600 text-emerald-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Controle de Lotes & Validade
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
               type="text" 
               placeholder="Buscar por nome, EAN, Código Interno ou SKU..." 
               className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 text-sm"
            />
          </div>
        </div>

        {activeTab === "catalogo" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Foto / Produto (Códigos)</th>
                  <th className="px-6 py-4">Classificação / Unidade</th>
                  <th className="px-6 py-4 text-center">Formação de Preço</th>
                  <th className="px-6 py-4 text-center">Estoque Total</th>
                  <th className="px-6 py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockProducts.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center text-slate-300 shrink-0">
                          <ImageIcon size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 leading-tight">{p.name}</p>
                          <div className="flex flex-col gap-0.5 mt-1 text-[11px] text-slate-500 font-mono">
                            <span>EAN: {p.barcode}</span>
                            <span>SKU: {p.sku} | Int: {p.internalCode}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-slate-700 flex items-center gap-1.5"><Tag size={12}/> {p.category}</span>
                        <span className="text-xs text-slate-500">Marca: <span className="font-bold text-slate-600">{p.brand}</span></span>
                        <span className="text-xs text-slate-500">Und: <span className="font-medium">{p.unit}</span></span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex justify-between w-32 text-xs">
                          <span className="text-slate-500">Custo:</span>
                          <span className="font-medium text-slate-700">R$ {p.costPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between w-32 text-xs border-b border-slate-200 pb-1">
                          <span className="text-slate-500">Margem:</span>
                          <span className="font-bold text-blue-600 flex items-center gap-0.5">{p.margin}% <Percent size={10}/></span>
                        </div>
                        <div className="flex justify-between w-32 text-sm pt-0.5">
                          <span className="text-slate-600 font-medium">Venda:</span>
                          <span className="font-black text-emerald-600">R$ {p.sellPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg text-sm border border-slate-200">
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 p-2 rounded transition"><Edit2 size={16} /></button>
                        <button className="text-slate-400 hover:text-red-600 bg-slate-50 hover:bg-red-50 p-2 rounded transition"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "lotes" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Produto</th>
                  <th className="px-6 py-4">Código do Lote</th>
                  <th className="px-6 py-4 text-center">Qtd Atual no Lote</th>
                  <th className="px-6 py-4 text-center">Data de Validade</th>
                  <th className="px-6 py-4 text-center">Status de Validade</th>
                  <th className="px-6 py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockBatches.map(b => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{b.product}</td>
                    <td className="px-6 py-4 font-mono font-medium text-slate-600 bg-slate-50/50">{b.batch}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{b.qty} un</td>
                    <td className="px-6 py-4 text-center font-medium">{b.expiry}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold flex items-center justify-center gap-1 w-fit mx-auto ${b.status === 'Vencendo' ? 'bg-amber-100 text-amber-700' : b.status === 'Vencido' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {(b.status === 'Vencendo' || b.status === 'Vencido') && <ShieldAlert size={12} />} {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1.5 rounded hover:bg-slate-200 transition">Movimentar Baixa</button>
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

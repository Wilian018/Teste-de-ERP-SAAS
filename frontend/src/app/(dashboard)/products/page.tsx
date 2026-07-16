"use client";

import { useState, useEffect } from "react";
import { PackagePlus, Search, Edit2, Trash2, Box, ShieldAlert, Tag, Percent, Image as ImageIcon, X } from "lucide-react";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("catalogo");
  
  // Estado real da API
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal de Produto
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  // Dados do formulário
  const [formData, setFormData] = useState({
    name: '', sku: '', barcode: '', brand: '', 
    costPrice: 0, salePrice: 0, stockQty: 0
  });

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const token = localStorage.getItem('saas_token');
      const res = await fetch(`${API_URL}/api/products`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = (product: any = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || '',
        sku: product.sku || '',
        barcode: product.barcode || '',
        brand: product.brand || '',
        costPrice: Number(product.costPrice) || 0,
        salePrice: Number(product.salePrice) || 0,
        stockQty: product.stockQty || 0,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '', sku: '', barcode: '', brand: '', 
        costPrice: 0, salePrice: 0, stockQty: 0
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const token = localStorage.getItem('saas_token');
    
    try {
      const method = editingProduct ? 'PATCH' : 'POST';
      const url = editingProduct ? `${API_URL}/api/products/${editingProduct.id}` : `${API_URL}/api/products`;
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          costPrice: Number(formData.costPrice),
          salePrice: Number(formData.salePrice),
          stockQty: Number(formData.stockQty)
        }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts();
      } else {
        alert('Erro ao salvar produto.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão ao salvar.');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto permanentemente?')) return;
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const token = localStorage.getItem('saas_token');
    
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchProducts();
      } else {
        alert('Erro ao excluir produto.');
      }
    } catch (e) {
      alert('Erro de conexão.');
    }
  };

  const mockBatches = [
    { id: 1, product: "Óleo de Soja 900ml", batch: "L2390A", expiry: "2026-08-15", qty: 20, status: "Normal" },
    { id: 2, product: "Arroz Branco Tipo 1", batch: "AR551B", expiry: "2026-06-20", qty: 5, status: "Vencendo" },
    { id: 3, product: "Leite Integral", batch: "LT009X", expiry: "2025-12-10", qty: 12, status: "Vencido" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Catálogo e Estoque</h2>
          <p className="text-slate-500 mt-1">Gestão de produtos, SKUs, precificação, lotes e validades.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition font-medium text-sm shadow-sm"
        >
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

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden min-h-[400px]">
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
          <div className="overflow-x-auto relative">
            {isLoading ? (
               <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 min-h-[300px]">
                  <p className="text-slate-500 font-medium">Carregando produtos...</p>
               </div>
            ) : null}
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
                {products.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      Nenhum produto cadastrado na sua base. Clique em "Novo Produto" para começar.
                    </td>
                  </tr>
                )}
                {products.map(p => {
                  const cost = Number(p.costPrice) || 0;
                  const sell = Number(p.salePrice) || 0;
                  const margin = cost > 0 ? (((sell - cost) / sell) * 100).toFixed(1) : 0;
                  
                  return (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center text-slate-300 shrink-0">
                          <ImageIcon size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 leading-tight">{p.name}</p>
                          <div className="flex flex-col gap-0.5 mt-1 text-[11px] text-slate-500 font-mono">
                            <span>EAN: {p.barcode || 'N/A'}</span>
                            <span>SKU: {p.sku || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-slate-700 flex items-center gap-1.5"><Tag size={12}/> {p.ncm ? `NCM: ${p.ncm}` : 'Sem Classe'}</span>
                        <span className="text-xs text-slate-500">Marca: <span className="font-bold text-slate-600">{p.brand || 'Diversos'}</span></span>
                        <span className="text-xs text-slate-500">Und: <span className="font-medium">Un</span></span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex justify-between w-32 text-xs">
                          <span className="text-slate-500">Custo:</span>
                          <span className="font-medium text-slate-700">R$ {cost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between w-32 text-xs border-b border-slate-200 pb-1">
                          <span className="text-slate-500">Margem:</span>
                          <span className="font-bold text-blue-600 flex items-center gap-0.5">{margin}% <Percent size={10}/></span>
                        </div>
                        <div className="flex justify-between w-32 text-sm pt-0.5">
                          <span className="text-slate-600 font-medium">Venda:</span>
                          <span className="font-black text-emerald-600">R$ {sell.toFixed(2)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg text-sm border border-slate-200">
                        {p.stockQty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleOpenModal(p)}
                          className="text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 p-2 rounded transition"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(p.id)}
                          className="text-slate-400 hover:text-red-600 bg-slate-50 hover:bg-red-50 p-2 rounded transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )})}
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
                      <button 
                        onClick={() => alert("Funcionalidade em desenvolvimento: O painel de movimentação de estoque será liberado na fase 2 do PDV.")}
                        className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1.5 rounded hover:bg-slate-200 transition"
                      >
                        Movimentar Baixa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Produto */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Nome do Produto *</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">SKU</label>
                  <input 
                    type="text"
                    value={formData.sku}
                    onChange={e => setFormData({...formData, sku: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Código de Barras (EAN)</label>
                  <input 
                    type="text"
                    value={formData.barcode}
                    onChange={e => setFormData({...formData, barcode: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Marca</label>
                  <input 
                    type="text"
                    value={formData.brand}
                    onChange={e => setFormData({...formData, brand: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Estoque Inicial</label>
                  <input 
                    type="number"
                    value={formData.stockQty}
                    onChange={e => setFormData({...formData, stockQty: Number(e.target.value)})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Preço de Custo (R$)</label>
                  <input 
                    type="number"
                    step="0.01"
                    value={formData.costPrice}
                    onChange={e => setFormData({...formData, costPrice: Number(e.target.value)})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Preço de Venda (R$) *</label>
                  <input 
                    required
                    type="number"
                    step="0.01"
                    value={formData.salePrice}
                    onChange={e => setFormData({...formData, salePrice: Number(e.target.value)})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-end gap-3 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-lg font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 rounded-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition"
                >
                  {editingProduct ? 'Atualizar Produto' : 'Salvar Produto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, Search, Plus, Building2, Package, CheckCircle2, X } from "lucide-react";

export default function ProcurementPage() {
  const [activeTab, setActiveTab] = useState("pedidos");
  const [purchases, setPurchases] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    supplierId: "",
    items: [] as any[]
  });

  const [newItem, setNewItem] = useState({ productId: "", quantity: 1, unitCost: "" });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('saas_token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const [purRes, supRes, prodRes] = await Promise.all([
        fetch(`${API_URL}/api/purchases`, { headers }),
        fetch(`${API_URL}/api/suppliers`, { headers }),
        fetch(`${API_URL}/api/products`, { headers })
      ]);

      if (purRes.ok) setPurchases(await purRes.json());
      if (supRes.ok) setSuppliers(await supRes.json());
      if (prodRes.ok) setProducts(await prodRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddItem = () => {
    if (!newItem.productId || !newItem.quantity || !newItem.unitCost) return;
    const prod = products.find(p => p.id === newItem.productId);
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { ...newItem, name: prod?.name, quantity: Number(newItem.quantity), unitCost: Number(newItem.unitCost) }]
    }));
    setNewItem({ productId: "", quantity: 1, unitCost: "" });
  };

  const handleRemoveItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSavePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.items.length === 0) {
      alert("Adicione pelo menos um produto ao pedido!");
      return;
    }
    const totalAmount = formData.items.reduce((acc, i) => acc + (i.quantity * i.unitCost), 0);
    
    const token = localStorage.getItem('saas_token');
    try {
      await fetch(`${API_URL}/api/purchases`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          supplierId: formData.supplierId,
          totalAmount,
          items: formData.items.map(i => ({ productId: i.productId, quantity: i.quantity, unitCost: i.unitCost }))
        })
      });
      setIsModalOpen(false);
      setFormData({ supplierId: "", items: [] });
      fetchData();
    } catch (err) {
      alert("Erro ao salvar pedido.");
    }
  };

  const calculateTotal = () => {
    return formData.items.reduce((acc, item) => acc + (item.quantity * item.unitCost), 0);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestão de Compras</h2>
          <p className="text-slate-500 mt-1">Cotações, emissão de pedidos e recebimento de mercadorias.</p>
        </div>
        <button 
          onClick={() => {
            setFormData({ supplierId: "", items: [] });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-sm shadow-sm"
        >
          <Plus size={18} /> Novo Pedido de Compra
        </button>
      </div>

      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab("pedidos")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === "pedidos" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Histórico de Pedidos
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por Fornecedor ou Nro do Pedido..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-10 text-slate-500">Carregando compras...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Nº Pedido</th>
                  <th className="px-6 py-4">Fornecedor</th>
                  <th className="px-6 py-4 text-center">Itens Cotados</th>
                  <th className="px-6 py-4 text-right">Valor Final</th>
                  <th className="px-6 py-4 text-center">Data</th>
                  <th className="px-6 py-4 text-center">Status do Pedido</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {purchases.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-6">Nenhum pedido cadastrado.</td></tr>
                ) : (
                  purchases.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-indigo-600">{p.id.split('-')[0].toUpperCase()}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-indigo-50 text-indigo-500 rounded-lg flex items-center justify-center">
                            <Building2 size={16} />
                          </div>
                          <span className="font-bold text-slate-800">{p.supplier.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-slate-600 font-bold">{p.items.reduce((sum: number, i: any) => sum + i.quantity, 0)} un</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-800">R$ {Number(p.totalAmount).toFixed(2)}</td>
                      <td className="px-6 py-4 text-center font-medium text-slate-500">{new Date(p.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 flex justify-center items-center gap-1 w-max mx-auto`}>
                          <CheckCircle2 size={14}/> RECEBIDO
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden my-8">
            <div className="p-6 border-b text-slate-800 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold">Lançar Novo Pedido de Compra</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSavePurchase} className="p-6 space-y-6">
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="block text-sm font-bold text-slate-700 mb-1">Fornecedor / Origem da Mercadoria</label>
                <select required value={formData.supplierId} onChange={e => setFormData({...formData, supplierId: e.target.value})} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-500">
                  <option value="">Selecione o Fornecedor...</option>
                  {suppliers.map(s => <option key={s.id} value={s.id}>{s.name} ({s.cnpj})</option>)}
                </select>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2"><Package size={18}/> Produtos do Pedido</h3>
                
                {/* Add Item Form */}
                <div className="grid grid-cols-12 gap-2 mb-4 items-end">
                  <div className="col-span-6">
                    <label className="block text-xs font-bold text-slate-500 mb-1">Produto</label>
                    <select value={newItem.productId} onChange={e => setNewItem({...newItem, productId: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500">
                      <option value="">Buscar Produto...</option>
                      {products.map(p => <option key={p.id} value={p.id}>{p.name} (Atual: R$ {Number(p.costPrice).toFixed(2)})</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-500 mb-1">Qtd.</label>
                    <input type="number" min="1" value={newItem.quantity} onChange={e => setNewItem({...newItem, quantity: Number(e.target.value)})} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" />
                  </div>
                  <div className="col-span-3">
                    <label className="block text-xs font-bold text-slate-500 mb-1">Custo (R$)</label>
                    <input type="number" step="0.01" value={newItem.unitCost} onChange={e => setNewItem({...newItem, unitCost: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" />
                  </div>
                  <div className="col-span-1">
                    <button type="button" onClick={handleAddItem} className="w-full bg-slate-800 text-white p-2 rounded-lg hover:bg-slate-900 font-bold flex justify-center">+</button>
                  </div>
                </div>

                {/* Added Items List */}
                {formData.items.length > 0 && (
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 border-b">
                        <tr>
                          <th className="px-4 py-2">Item</th>
                          <th className="px-4 py-2 text-center">Qtd</th>
                          <th className="px-4 py-2 text-right">Unitário</th>
                          <th className="px-4 py-2 text-right">Total</th>
                          <th className="px-4 py-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.items.map((item, idx) => (
                          <tr key={idx} className="border-b last:border-0 hover:bg-slate-50">
                            <td className="px-4 py-2 font-medium">{item.name}</td>
                            <td className="px-4 py-2 text-center">{item.quantity}</td>
                            <td className="px-4 py-2 text-right">R$ {item.unitCost.toFixed(2)}</td>
                            <td className="px-4 py-2 text-right font-bold text-slate-800">R$ {(item.quantity * item.unitCost).toFixed(2)}</td>
                            <td className="px-4 py-2 text-center">
                              <button type="button" onClick={() => handleRemoveItem(idx)} className="text-red-500 hover:text-red-700"><X size={16}/></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <span className="font-bold text-emerald-800">Valor Total do Pedido</span>
                <span className="text-2xl font-black text-emerald-600">R$ {calculateTotal().toFixed(2)}</span>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border font-bold text-slate-600 rounded-xl hover:bg-slate-50">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/20">Finalizar e Receber Compra</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

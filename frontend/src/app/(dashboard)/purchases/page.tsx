"use client";

import { useState, useEffect } from "react";
import { PackagePlus, Search, ArrowRightLeft, TrendingDown, ClipboardList, X, ShieldAlert, FileDigit, Plus } from "lucide-react";

export default function StockMovementsPage() {
  const [activeTab, setActiveTab] = useState("historico");
  const [movements, setMovements] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    productId: "",
    type: "IN", // IN, OUT, ADJUSTMENT
    quantity: "",
    reason: ""
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('saas_token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const [moveRes, prodRes] = await Promise.all([
        fetch(`${API_URL}/api/stock`, { headers }),
        fetch(`${API_URL}/api/products`, { headers })
      ]);

      if (moveRes.ok) setMovements(await moveRes.json());
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

  const handleSaveMovement = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('saas_token');
    try {
      await fetch(`${API_URL}/api/stock/move`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          productId: formData.productId,
          type: formData.type,
          quantity: Number(formData.quantity),
          reason: formData.reason
        })
      });
      setIsMoveModalOpen(false);
      setIsInventoryModalOpen(false);
      setFormData({ productId: "", type: "IN", quantity: "", reason: "" });
      fetchData(); // Reload data
    } catch (err) {
      alert("Erro ao salvar movimentação.");
    }
  };

  const openMoveModal = () => {
    setFormData({ productId: "", type: "IN", quantity: "", reason: "" });
    setIsMoveModalOpen(true);
  };

  const openInventoryModal = () => {
    setFormData({ productId: "", type: "ADJUSTMENT", quantity: "", reason: "Balanço/Inventário" });
    setIsInventoryModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Movimentações de Estoque</h2>
          <p className="text-slate-500 mt-1">Controle de Entradas, Saídas, Ajustes e Inventário (Balanço).</p>
        </div>
        <div className="flex gap-2">
          <button onClick={openInventoryModal} className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition font-medium text-sm shadow-sm">
            <ClipboardList size={18} /> Iniciar Inventário
          </button>
          <button onClick={openMoveModal} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-sm shadow-sm">
            <PackagePlus size={18} /> Nova Movimentação
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar histórico de movimentações..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-10 text-slate-500">Carregando histórico...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Protocolo</th>
                  <th className="px-6 py-4">Data / Hora</th>
                  <th className="px-6 py-4">Tipo</th>
                  <th className="px-6 py-4">Produto</th>
                  <th className="px-6 py-4 text-center">Qtd</th>
                  <th className="px-6 py-4">Motivo/Justificativa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {movements.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-6">Nenhuma movimentação registrada.</td></tr>
                ) : (
                  movements.map(m => (
                    <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-400">{m.id.split('-')[0]}</td>
                      <td className="px-6 py-4 font-medium text-slate-500">{new Date(m.createdAt).toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          m.type === 'IN' ? 'bg-emerald-100 text-emerald-700' :
                          m.type === 'OUT' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {m.type === 'IN' ? 'ENTRADA' : m.type === 'OUT' ? 'SAÍDA' : 'AJUSTE/BALANÇO'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-800">{m.product?.name || 'Produto Excluído'}</td>
                      <td className={`px-6 py-4 text-center font-black ${
                          m.type === 'IN' ? 'text-emerald-600' : m.type === 'OUT' ? 'text-red-600' : 'text-slate-800'
                        }`}>
                        {m.type === 'IN' ? '+' : m.type === 'OUT' ? '-' : ''}{m.quantity}
                      </td>
                      <td className="px-6 py-4 text-slate-500">{m.reason || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Nova Movimentação */}
      {isMoveModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b text-slate-800 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold">Registrar Movimentação</h2>
              <button onClick={() => setIsMoveModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveMovement} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Produto</label>
                <select required value={formData.productId} onChange={e => setFormData({...formData, productId: e.target.value})} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-500">
                  <option value="">Selecione o produto...</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (Estoque atual: {p.stockQty})</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Tipo</label>
                  <select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-500">
                    <option value="IN">Entrada (+)</option>
                    <option value="OUT">Saída (-)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Quantidade</label>
                  <input type="number" required min="1" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Motivo / Justificativa</label>
                <input type="text" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} placeholder="Ex: Devolução, Compra sem NF, Avaria..." className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-500" />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsMoveModalOpen(false)} className="flex-1 px-4 py-2 border font-bold rounded-lg hover:bg-slate-50">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">Salvar Movimentação</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Inventário */}
      {isInventoryModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border-t-4 border-amber-500">
            <div className="p-6 border-b text-slate-800 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold flex items-center gap-2"><ClipboardList className="text-amber-500"/> Contagem / Inventário</h2>
              <button onClick={() => setIsInventoryModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveMovement} className="p-6 space-y-4">
              <p className="text-sm text-slate-500 mb-4">Insira a quantidade REAL contada na prateleira. O sistema ajustará o estoque para este valor exato.</p>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Produto</label>
                <select required value={formData.productId} onChange={e => setFormData({...formData, productId: e.target.value})} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-amber-500">
                  <option value="">Selecione o produto...</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (Atual no sistema: {p.stockQty})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Quantidade Real (Contada na prateleira)</label>
                <input type="number" required min="0" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-amber-500 font-black text-amber-700 text-lg" />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsInventoryModalOpen(false)} className="flex-1 px-4 py-2 border font-bold rounded-lg hover:bg-slate-50">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600">Ajustar Saldo</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

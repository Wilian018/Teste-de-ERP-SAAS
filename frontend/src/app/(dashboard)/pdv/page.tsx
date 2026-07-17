"use client";

import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Plus, Trash2, CheckCircle2 } from "lucide-react";

export default function PdvPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Checkout states
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("dinheiro");
  const [amountPaid, setAmountPaid] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('saas_token');
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const [prodRes, custRes] = await Promise.all([
          fetch(`${API_URL}/api/products`, { headers }),
          fetch(`${API_URL}/api/customers`, { headers })
        ]);
        if (prodRes.ok) setProducts(await prodRes.json());
        if (custRes.ok) setCustomers(await custRes.json());
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.barcode?.includes(searchTerm));

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        if (existing.quantity >= product.stockQty) {
          alert("Estoque insuficiente!");
          return prev;
        }
        return prev.map(item => item.productId === product.id ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.salePrice } : item);
      }
      if (product.stockQty <= 0) {
        alert("Produto sem estoque!");
        return prev;
      }
      return [...prev, { productId: product.id, name: product.name, quantity: 1, salePrice: Number(product.salePrice), total: Number(product.salePrice) }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.total, 0);
  const change = Number(amountPaid) - cartTotal;

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    const token = localStorage.getItem('saas_token');
    try {
      await fetch(`${API_URL}/api/sales/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          customerId: selectedCustomer || null,
          items: cart.map(item => ({ productId: item.productId, quantity: item.quantity })),
          paymentMethod
        })
      });
      setIsCheckoutModalOpen(false);
      setIsSuccessModalOpen(true);
      setCart([]);
      setSelectedCustomer("");
      setAmountPaid("");
      
      // Atualizar lista de produtos para pegar novo estoque
      const res = await fetch(`${API_URL}/api/products`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setProducts(await res.json());

    } catch (err) {
      alert("Erro ao finalizar venda.");
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex gap-6 animate-in fade-in duration-500">
      
      {/* Esquerda: Produtos */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por código de barras ou nome do produto..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-medium"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(p => (
              <button 
                key={p.id}
                onClick={() => addToCart(p)}
                disabled={p.stockQty <= 0}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all ${p.stockQty > 0 ? 'bg-white border-slate-200 hover:border-indigo-500 hover:shadow-md hover:-translate-y-1' : 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed'}`}
              >
                <div className="w-16 h-16 bg-slate-100 rounded-lg mb-3 flex items-center justify-center text-slate-400">
                  {p.imageUrl ? <img src={p.imageUrl} alt={p.name} className="rounded-lg object-cover w-full h-full" /> : <ShoppingCart size={24} />}
                </div>
                <h3 className="font-bold text-slate-800 text-sm line-clamp-2">{p.name}</h3>
                <p className="text-xs text-slate-500 mt-1">Estoque: {p.stockQty}</p>
                <p className="font-black text-indigo-600 mt-2">R$ {Number(p.salePrice).toFixed(2)}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Direita: Carrinho */}
      <div className="w-96 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden shrink-0">
        <div className="p-4 border-b border-slate-100 bg-indigo-600 text-white flex justify-between items-center">
          <h2 className="font-bold flex items-center gap-2"><ShoppingCart size={20} /> Carrinho Atual</h2>
          <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold">{cart.length} itens</span>
        </div>
        
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1"><User size={14}/> Cliente (Opcional - Cashback)</label>
          <select value={selectedCustomer} onChange={e => setSelectedCustomer(e.target.value)} className="w-full border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500">
            <option value="">Consumidor Final</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name} ({c.cpfCnpj})</option>)}
          </select>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <ShoppingCart size={48} className="mb-4 opacity-20" />
              <p>Carrinho vazio</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.productId} className="flex justify-between items-center p-3 border border-slate-100 rounded-xl bg-slate-50">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-slate-500">{item.quantity}x R$ {item.salePrice.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-black text-indigo-600">R$ {item.total.toFixed(2)}</span>
                  <button onClick={() => removeFromCart(item.productId)} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-slate-600">Total a Pagar</span>
            <span className="text-3xl font-black text-emerald-600">R$ {cartTotal.toFixed(2)}</span>
          </div>
          <button 
            disabled={cart.length === 0}
            onClick={() => setIsCheckoutModalOpen(true)}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-black text-lg py-4 rounded-xl shadow-lg transition-all active:scale-95"
          >
            PAGAR E FINALIZAR
          </button>
        </div>
      </div>

      {/* Modal Pagamento */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
            <div className="p-6 border-b text-center bg-emerald-500 text-white">
              <h2 className="text-2xl font-black mb-1">Pagamento</h2>
              <p className="text-emerald-100 font-medium">Total: R$ {cartTotal.toFixed(2)}</p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Forma de Pagamento</label>
                <div className="grid grid-cols-2 gap-3">
                  {['dinheiro', 'pix', 'credito', 'debito'].map(m => (
                    <button 
                      key={m} 
                      onClick={() => setPaymentMethod(m)}
                      className={`py-3 rounded-xl font-bold uppercase text-xs border-2 transition-all ${paymentMethod === m ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {paymentMethod === 'dinheiro' && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Valor Recebido (R$)</label>
                  <input type="number" step="0.01" value={amountPaid} onChange={e => setAmountPaid(e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-3 text-lg font-black outline-none focus:border-emerald-500 mb-2" />
                  {Number(amountPaid) > cartTotal && (
                    <div className="flex justify-between items-center text-sm font-bold text-slate-600">
                      <span>Troco:</span>
                      <span className="text-amber-600 text-lg">R$ {change.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setIsCheckoutModalOpen(false)} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition">Cancelar</button>
                <button onClick={handleCheckout} className="flex-1 py-3 bg-emerald-500 text-white font-black rounded-xl hover:bg-emerald-600 shadow-md">Confirmar Venda</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sucesso */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden p-8 text-center animate-in zoom-in-50">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">Venda Concluída!</h2>
            <p className="text-slate-500 mb-8">Estoque baixado e caixa atualizado.</p>
            <button onClick={() => setIsSuccessModalOpen(false)} className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 shadow-lg">Nova Venda</button>
          </div>
        </div>
      )}
    </div>
  );
}

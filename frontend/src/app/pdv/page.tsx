"use client";

import { ShoppingCart, Search, Plus, Trash2, CreditCard, User, LogOut, PackageSearch, Banknote } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  code: string;
}

const MOCK_PRODUCTS = [
  { code: "789101010", name: "Coca-Cola 2L", price: 9.99 },
  { code: "789101011", name: "Arroz Tipo 1 (5kg)", price: 24.50 },
  { code: "789101012", name: "Feijão Carioca (1kg)", price: 8.90 },
  { code: "789101013", name: "Pão Francês (Kg)", price: 14.90 },
  { code: "789101014", name: "Leite Integral 1L", price: 4.50 },
  { code: "789101015", name: "Detergente Líquido", price: 2.30 },
  { code: "789101016", name: "Óleo de Soja 900ml", price: 6.80 },
  { code: "789101017", name: "Cerveja Heineken 330ml", price: 5.50 },
  { code: "001", name: "Pão de Queijo", price: 3.50 },
  { code: "002", name: "Café Expresso", price: 5.00 }
];

export default function PDVPage() {
  const [barcode, setBarcode] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cashierStatus, setCashierStatus] = useState("FECHADO"); // FECHADO, LIVRE, OCUPADO, PAGAMENTO
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Modais Administrativos do Caixa
  const [isOpeningModalOpen, setIsOpeningModalOpen] = useState(true); // Abre direto se FECHADO
  const [openingBalance, setOpeningBalance] = useState("150.00");
  const [isSangriaModalOpen, setIsSangriaModalOpen] = useState(false);
  const [sangriaAmount, setSangriaAmount] = useState("");
  
  // Novos modais para atalhos
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isQtyModalOpen, setIsQtyModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [qtyMultiplier, setQtyMultiplier] = useState(1);
  const [clientName, setClientName] = useState("Consumidor Final");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.code.includes(searchQuery)
  );

  // Relógio em tempo real
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Atalhos de Teclado globais
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Evita o comportamento padrão do navegador para F2-F12
      if (['F2', 'F3', 'F4', 'F5', 'F12'].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'F2') setIsSearchModalOpen(true);
      if (e.key === 'F3') setIsQtyModalOpen(true);
      if (e.key === 'F4') setIsClientModalOpen(true);
      if (e.key === 'F12' && cart.length > 0 && cashierStatus === 'LIVRE') handleCheckout();
      if (e.key === 'Escape') {
        if (isSearchModalOpen || isQtyModalOpen || isClientModalOpen || isPaymentModalOpen || isSangriaModalOpen) {
          setIsSearchModalOpen(false);
          setIsQtyModalOpen(false);
          setIsClientModalOpen(false);
          setIsPaymentModalOpen(false);
          setIsSangriaModalOpen(false);
        } else {
          handleCancelSale();
        }
      }
      if (e.key === 'F5') {
        handleCancelItem();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cart, cashierStatus, isSearchModalOpen, isQtyModalOpen, isClientModalOpen, isPaymentModalOpen, isSangriaModalOpen]);

  const handleCancelSale = () => {
    if (cart.length === 0) return;
    if (window.confirm("Deseja cancelar a venda atual?")) {
      setCart([]);
      setClientName("Consumidor Final");
      setQtyMultiplier(1);
      setCashierStatus("LIVRE");
    }
  };

  const handleCancelItem = () => {
    if (cart.length === 0) return;
    const itemCode = window.prompt("Digite o número do item ou código para cancelar (ou deixe vazio para cancelar o último item):");
    if (itemCode !== null) {
      if (itemCode.trim() === "") {
        // Remove o último item adicionado (index 0 porque está invertido no state [newItem, ...cart])
        const newCart = [...cart];
        newCart.shift();
        setCart(newCart);
        if (newCart.length === 0) setCashierStatus("LIVRE");
      } else {
        // Encontra o item para remover
        const index = cart.findIndex(i => i.code === itemCode.trim() || i.id === itemCode.trim());
        if (index > -1) {
          const newCart = [...cart];
          newCart.splice(index, 1);
          setCart(newCart);
          if (newCart.length === 0) setCashierStatus("LIVRE");
        } else {
          alert("Item não encontrado na venda atual.");
        }
      }
    }
  };

  const handleOpenRegister = () => {
    setCashierStatus("LIVRE");
    setIsOpeningModalOpen(false);
  };

  const handleSangria = () => {
    alert(`Sangria de R$ ${sangriaAmount} realizada com sucesso!`);
    setIsSangriaModalOpen(false);
    setSangriaAmount("");
  };

  const handleScan = (e?: React.FormEvent, manualCode?: string) => {
    if (e) e.preventDefault();
    const codeToSearch = manualCode || barcode;
    if (!codeToSearch) return;
    
    setCashierStatus("OCUPADO");
    
    const product = MOCK_PRODUCTS.find(p => p.code === codeToSearch);
    
    const newItem = {
      id: Date.now().toString(),
      name: product ? product.name : "Produto Genérico",
      price: product ? product.price : 15.50,
      qty: 1,
      code: codeToSearch
    };

    const existingItemIndex = cart.findIndex(i => i.code === codeToSearch);
    if (existingItemIndex > -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].qty += qtyMultiplier;
      setCart(newCart);
    } else {
      setCart([{...newItem, qty: qtyMultiplier}, ...cart]);
    }
    
    setBarcode("");
    setQtyMultiplier(1); // Reseta a quantidade após bipar
    
    if (isSearchModalOpen) {
      setIsSearchModalOpen(false);
      setSearchQuery("");
    }
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const itemsCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleCheckout = () => {
    setCashierStatus("PAGAMENTO");
    setIsPaymentModalOpen(true);
  };

  const confirmPayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setCart([]);
      setCashierStatus("LIVRE");
      setIsPaymentModalOpen(false);
      setPaymentSuccess(false);
      setPhone("");
    }, 3000);
  };

  // Se o caixa estiver fechado, força o modal (e esconde o resto)
  if (cashierStatus === "FECHADO") {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-900 font-sans">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-in zoom-in-95">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <Banknote size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Abertura de Caixa</h2>
            <p className="text-slate-500 text-center">Informe o Fundo de Troco inicial para iniciar as vendas.</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-700">Fundo de Troco (R$)</label>
              <input 
                type="number" 
                value={openingBalance}
                onChange={(e) => setOpeningBalance(e.target.value)}
                className="w-full text-2xl font-bold text-slate-900 border-2 border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 text-center mt-1"
              />
            </div>
            <button 
              onClick={handleOpenRegister}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-lg transition shadow-lg"
            >
              Abrir Caixa
            </button>
            <Link href="/" className="block text-center text-slate-500 hover:text-slate-700 font-medium py-2">
              Voltar ao Painel
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex bg-slate-100 font-sans overflow-hidden">
      
      {/* Sidebar - Cupom Fiscal / Carrinho */}
      <div className="w-[450px] bg-white flex flex-col shadow-2xl z-10">
        <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <ShoppingCart size={24} className="text-emerald-400" /> MercadoPDV
            </h1>
            <p className="text-slate-400 text-sm mt-1">Caixa 01 • Operador: Admin</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsSangriaModalOpen(true)} className="p-2 bg-slate-800 hover:bg-amber-600 rounded-lg transition" title="Sangria (Retirada)">
               <Banknote size={20} />
            </button>
            <Link href="/" className="p-2 bg-slate-800 hover:bg-red-500 rounded-lg transition" title="Sair do PDV">
              <LogOut size={20} />
            </Link>
          </div>
        </div>

        {/* Status Bar */}
        <div className={`py-2 px-6 text-center text-sm font-bold tracking-widest ${cashierStatus === 'LIVRE' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
          CAIXA {cashierStatus}
        </div>

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
              <PackageSearch size={64} className="opacity-20" />
              <p className="font-medium text-lg">Caixa Livre</p>
              <p className="text-sm">Passe o código de barras no leitor</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 animate-in slide-in-from-right-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm">
                  {cart.length - index}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 leading-none">{item.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{item.code}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500">{item.qty}x R$ {item.price.toFixed(2)}</div>
                  <div className="font-black text-slate-800">R$ {(item.qty * item.price).toFixed(2)}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totais e Ações */}
        <div className="p-6 bg-white border-t border-slate-200">
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-slate-500 font-medium mb-1">Total da Venda</p>
              <p className="text-sm text-slate-400">{itemsCount} itens registrados</p>
            </div>
            <h2 className="text-5xl font-black text-emerald-600 tracking-tighter">
              <span className="text-2xl mr-1">R$</span>{total.toFixed(2)}
            </h2>
          </div>
        </div>
      </div>

      {/* Main Area - Input & Teclado */}
      <div className="flex-1 flex flex-col bg-slate-100">
        
        {/* Header Superior */}
        <div className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 text-slate-500 font-medium cursor-pointer hover:text-emerald-600 transition" onClick={() => setIsClientModalOpen(true)}>
            <User size={20} /> Cliente: {clientName}
          </div>
          <div className="flex flex-col items-end">
            <div className="text-slate-800 font-mono text-2xl font-bold tracking-tight">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-slate-400 text-xs font-medium">
              {currentTime.toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Barra de Pesquisa Compacta e Área Principal */}
        <div className="flex-1 flex flex-col p-8 bg-slate-50/50 overflow-hidden min-h-0">
          <form onSubmit={handleScan} className="w-full max-w-5xl mx-auto mb-8 shrink-0">
            <div className="relative group bg-white rounded-2xl shadow-sm border border-slate-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all flex items-center overflow-hidden">
              <div className="pl-6 pr-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <Search size={28} />
              </div>
              <input 
                type="text" 
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                autoFocus
                className="flex-1 py-5 text-2xl font-mono text-slate-800 placeholder-slate-300 outline-none bg-transparent"
                placeholder="CÓDIGO DE BARRAS (F2 para buscar)"
              />
              <div className="pr-6 text-sm font-bold text-slate-400 flex items-center gap-4">
                <span className="hidden lg:inline"><kbd className="bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200">F2</kbd> Busca</span>
                <span className="hidden lg:inline"><kbd className="bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200">F4</kbd> Cliente</span>
                <div className="pl-4 border-l border-slate-200">
                  Qtd: <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg ml-1">x{qtyMultiplier} (F3)</span>
                </div>
              </div>
            </div>
          </form>

          {/* Destaque do Produto Atual ou Tela Livre */}
          <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
            {cart.length === 0 ? (
              <div className="text-center animate-in fade-in zoom-in duration-500">
                 <div className="w-48 h-48 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8 border-8 border-white shadow-xl">
                   <ShoppingCart size={80} className="text-slate-300" />
                 </div>
                 <h2 className="text-4xl font-black text-slate-800 tracking-tight">CAIXA ABERTO</h2>
                 <p className="text-xl text-slate-500 mt-2 font-medium">Aguardando Cliente</p>
              </div>
            ) : (
              <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row animate-in slide-in-from-bottom-8 duration-500 max-h-full">
                <div className="md:w-1/3 bg-slate-50 p-6 flex items-center justify-center border-r border-slate-100">
                  <div className="w-full aspect-square bg-white rounded-3xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-300 relative overflow-hidden">
                    <PackageSearch size={120} strokeWidth={1} />
                    {cart[0].code === '789101010' && (
                      <div className="absolute inset-0 bg-red-600 flex items-center justify-center text-white font-black text-3xl transform -rotate-12">
                        COCA-COLA
                      </div>
                    )}
                  </div>
                </div>
                <div className="md:w-2/3 p-8 flex flex-col justify-between overflow-y-auto">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-bold text-slate-400 tracking-widest uppercase bg-slate-100 px-3 py-1 rounded-lg">{cart[0].code}</span>
                      <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Último Adicionado
                      </span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter mt-4 line-clamp-2">{cart[0].name}</h2>
                  </div>
                  <div className="mt-12 flex items-end justify-between border-t border-slate-100 pt-8">
                    <div>
                      <p className="text-slate-500 font-medium mb-1">Valor Unitário</p>
                      <p className="text-2xl font-bold text-slate-700">R$ {cart[0].price.toFixed(2)}</p>
                    </div>
                    <div className="text-center px-8 border-x border-slate-100">
                      <p className="text-slate-500 font-medium mb-1">Quantidade</p>
                      <p className="text-4xl font-black text-slate-800">{cart[0].qty}x</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-600 font-bold mb-1 uppercase tracking-widest text-sm">Total do Item</p>
                      <p className="text-6xl font-black text-emerald-600 tracking-tighter">R$ {(cart[0].price * cart[0].qty).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rodapé de Atalhos Rápidos */}
        <div className="h-32 bg-slate-900 p-4 grid grid-cols-4 gap-4 text-white">
          <button onClick={handleCancelSale} className="bg-slate-800 hover:bg-slate-700 rounded-xl flex flex-col items-center justify-center transition group">
            <span className="block text-xs text-slate-400 mb-1 font-bold"><kbd className="bg-slate-900 px-2 py-1 rounded">ESC</kbd></span>
            <span className="block font-medium group-hover:text-white">Cancelar Venda</span>
          </button>
          <button onClick={handleCancelItem} className="bg-slate-800 hover:bg-slate-700 rounded-xl flex flex-col items-center justify-center transition group">
            <span className="block text-xs text-slate-400 mb-1 font-bold"><kbd className="bg-slate-900 px-2 py-1 rounded">F5</kbd></span>
            <span className="block font-medium group-hover:text-white">Cancelar Item</span>
          </button>
          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="col-span-2 bg-emerald-600 hover:bg-emerald-500 p-6 rounded-xl text-center transition shadow-lg flex flex-col items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-emerald-200 text-sm font-bold tracking-widest mb-1"><kbd className="bg-emerald-700 px-2 py-1 rounded">F12</kbd></span>
            <span className="text-2xl font-black tracking-tight group-hover:scale-105 transition-transform flex items-center gap-3">
              <CreditCard size={28} /> FINALIZAR VENDA
            </span>
          </button>
        </div>
      </div>

      {/* Modal de Sangria */}
      {isSangriaModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="p-6 bg-amber-50 border-b border-amber-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-amber-900 flex items-center gap-2"><Banknote /> Retirada (Sangria)</h3>
                <button onClick={() => setIsSangriaModalOpen(false)} className="text-amber-400 hover:text-amber-700 font-bold">X</button>
              </div>
              <div className="p-8">
                <label className="text-sm font-bold text-slate-700">Valor a retirar (R$)</label>
                <input 
                  type="number" 
                  value={sangriaAmount}
                  onChange={(e) => setSangriaAmount(e.target.value)}
                  className="w-full text-2xl font-bold text-slate-900 border-2 border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-amber-500 text-center mt-1 mb-6"
                  placeholder="0.00"
                />
                <button onClick={handleSangria} className="w-full bg-amber-600 text-white font-bold py-4 rounded-xl hover:bg-amber-700 transition shadow-lg">
                  Confirmar Sangria
                </button>
              </div>
          </div>
        </div>
      )}

      {/* Modal de Pagamento (PIX) */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
            {paymentSuccess ? (
              <div className="p-12 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                  <CreditCard size={48} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">Pagamento Aprovado!</h3>
                <p className="text-slate-500">Recibo enviado para {phone || "o cliente"}.</p>
                <p className="text-slate-400 mt-6 text-sm">Preparando próximo caixa...</p>
              </div>
            ) : (
              <>
                <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-900">Pagamento Dinâmico</h3>
                  <button onClick={() => setIsPaymentModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">X</button>
                </div>
                <div className="p-8 flex flex-col items-center">
                  <p className="text-slate-500 mb-2">Total a Pagar</p>
                  <p className="text-5xl font-black text-emerald-600 mb-8">R$ {total.toFixed(2)}</p>
                  
                  {/* Fake QR Code */}
                  <div className="w-48 h-48 bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center mb-6 relative group overflow-hidden">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=mercado_pdv_pix_fake" alt="QR Code PIX" className="w-40 h-40 opacity-80 mix-blend-multiply" />
                  </div>
                  <p className="text-sm font-bold text-slate-700 bg-slate-100 px-4 py-2 rounded-lg mb-6 tracking-widest font-mono">PIX-178A-42B9</p>

                  <div className="w-full space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase">Enviar recibo por WhatsApp</label>
                      <input 
                        type="text" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(DD) 90000-0000" 
                        className="w-full mt-1 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-emerald-500"
                      />
                    </div>
                    <button onClick={confirmPayment} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition shadow-lg">
                      Simular Pagamento Confirmado
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal F2 - Busca */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-start justify-center pt-24 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Search size={20} className="text-emerald-500" /> Buscar Produto (F2)</h3>
                <button onClick={() => {setIsSearchModalOpen(false); setSearchQuery("");}} className="text-slate-400 hover:text-slate-700 font-bold"><kbd className="bg-slate-200 px-2 rounded">ESC</kbd></button>
              </div>
              <div className="p-6">
                <input 
                  type="text" 
                  autoFocus 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && filteredProducts.length > 0) {
                      handleScan(undefined, filteredProducts[0].code);
                    }
                  }}
                  placeholder="Digite o nome ou código do produto..." 
                  className="w-full text-xl font-medium text-slate-900 border-2 border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500" 
                />
                <div className="mt-4 border border-slate-100 rounded-xl overflow-hidden">
                   <div className="p-3 bg-slate-50 border-b border-slate-100 text-sm font-bold text-slate-500 flex justify-between">
                     <span>Resultados</span>
                     <span className="font-normal text-slate-400">Pressione ENTER para adicionar o primeiro</span>
                   </div>
                   <div className="max-h-64 overflow-y-auto">
                     {searchQuery === "" ? (
                       <div className="p-8 text-center text-slate-400">Comece a digitar para pesquisar...</div>
                     ) : filteredProducts.length === 0 ? (
                       <div className="p-8 text-center text-slate-400">Nenhum produto encontrado.</div>
                     ) : (
                       filteredProducts.map((product, idx) => (
                         <div 
                           key={product.code} 
                           onClick={() => handleScan(undefined, product.code)}
                           className={`p-4 border-b border-slate-50 flex justify-between items-center cursor-pointer hover:bg-emerald-50 transition-colors ${idx === 0 ? 'bg-slate-50' : ''}`}
                         >
                           <div>
                             <p className="font-bold text-slate-800">{product.name}</p>
                             <p className="text-xs text-slate-400">{product.code}</p>
                           </div>
                           <div className="font-bold text-emerald-600">
                             R$ {product.price.toFixed(2)}
                           </div>
                         </div>
                       ))
                     )}
                   </div>
                </div>
              </div>
          </div>
        </div>
      )}

      {/* Modal F3 - Quantidade */}
      {isQtyModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">Alterar Quantidade (F3)</h3>
                <button onClick={() => setIsQtyModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold"><kbd className="bg-slate-200 px-2 rounded">ESC</kbd></button>
              </div>
              <div className="p-6">
                <label className="text-sm font-bold text-slate-500">Multiplicador do próximo item</label>
                <input type="number" min="1" autoFocus value={qtyMultiplier} onChange={e => setQtyMultiplier(Number(e.target.value) || 1)} className="w-full text-4xl font-black text-center text-emerald-600 border-2 border-slate-200 rounded-xl px-4 py-4 mt-2 outline-none focus:border-emerald-500" />
                <button onClick={() => setIsQtyModalOpen(false)} className="mt-4 w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition">Confirmar (ENTER)</button>
              </div>
          </div>
        </div>
      )}

      {/* Modal F4 - Cliente */}
      {isClientModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><User size={20} className="text-emerald-500" /> Identificar Cliente (F4)</h3>
                <button onClick={() => setIsClientModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold"><kbd className="bg-slate-200 px-2 rounded">ESC</kbd></button>
              </div>
              <div className="p-6">
                <label className="text-sm font-bold text-slate-500">Nome ou CPF/CNPJ</label>
                <input type="text" autoFocus value={clientName === "Consumidor Final" ? "" : clientName} onChange={e => setClientName(e.target.value)} placeholder="000.000.000-00" className="w-full text-lg font-medium text-slate-900 border-2 border-slate-200 rounded-xl px-4 py-3 mt-2 outline-none focus:border-emerald-500" />
                <div className="mt-6 flex gap-3">
                  <button onClick={() => { setClientName("Consumidor Final"); setIsClientModalOpen(false); }} className="flex-1 bg-slate-100 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-200 transition">Não Identificar</button>
                  <button onClick={() => setIsClientModalOpen(false)} className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition">Confirmar</button>
                </div>
              </div>
          </div>
        </div>
      )}

    </div>
  );
}

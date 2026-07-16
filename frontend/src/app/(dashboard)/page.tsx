"use client";

import { TrendingUp, Package, DollarSign, ArrowUpRight, ArrowDownRight, BarChart3, AlertTriangle, Box } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Gerencial</h2>
        <p className="text-slate-500 mt-1">Visão completa dos indicadores financeiros e operacionais.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Faturamento Diário" 
          value="R$ 4.250,00" 
          icon={<DollarSign size={24} className="text-emerald-500" />} 
          trend="+15% vs Ontem" 
          trendUp={true} 
        />
        <StatCard 
          title="Faturamento Mensal" 
          value="R$ 124.500,00" 
          icon={<TrendingUp size={24} className="text-blue-500" />} 
          trend="+8% vs Mês Passado" 
          trendUp={true} 
        />
        <StatCard 
          title="Lucro Líquido (Mês)" 
          value="R$ 28.300,00" 
          icon={<BarChart3 size={24} className="text-indigo-500" />} 
          trend="Margem 22.7%" 
          trendUp={true} 
        />
        <StatCard 
          title="Fluxo de Caixa (Saldo)" 
          value="R$ 63.200,00" 
          icon={<DollarSign size={24} className="text-slate-700" />} 
          trend="Em Caixa" 
          trendUp={true} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráficos e Indicadores */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">Gráficos e Indicadores</h3>
              <p className="text-sm text-slate-500 font-medium">Evolução do faturamento diário</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all cursor-pointer">
              <option>Últimos 7 dias</option>
              <option>Últimos 15 dias</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-3 px-2">
            {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full bg-emerald-50 rounded-t-xl relative group-hover:bg-emerald-100 transition-colors" style={{ height: `${h}%` }}>
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-xl group-hover:from-emerald-400 group-hover:to-teal-300 transition-colors" style={{ height: `${h * 0.4}%` }}></div>
                </div>
                <span className="text-xs text-slate-400 font-bold group-hover:text-emerald-600 transition-colors">Dia {i+1}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-6 border-t border-slate-100/60 pt-4">
            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium"><div className="w-3 h-3 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-full shadow-sm"></div> Receita Bruta</div>
            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium"><div className="w-3 h-3 bg-emerald-100 rounded-full border border-emerald-200"></div> Receita Líquida</div>
          </div>
        </div>

        {/* Produtos Mais Vendidos */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-lg transition-shadow duration-300 flex flex-col">
          <h3 className="text-lg font-bold mb-1 text-slate-800 tracking-tight">Produtos Mais Vendidos</h3>
          <p className="text-sm text-slate-500 font-medium mb-4">Curva A - Top Saídas</p>
          <div className="flex-1 flex flex-col gap-2">
            <TopProduct name="Cerveja Heineken 330ml" qty="145" value="R$ 1.013,55" />
            <TopProduct name="Coca-Cola 2L" qty="112" value="R$ 952,00" />
            <TopProduct name="Pão Francês (Kg)" qty="85" value="R$ 765,00" />
            <TopProduct name="Arroz Tipo 1 (5kg)" qty="42" value="R$ 1.176,00" />
            <TopProduct name="Leite Integral 1L" qty="130" value="R$ 624,00" />
          </div>
        </div>
      </div>

      {/* Estoque Crítico */}
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-slate-100 flex flex-col hover:shadow-lg transition-shadow duration-300">
        <div className="p-5 border-b border-slate-100/50 flex justify-between items-center bg-gradient-to-r from-red-50/80 to-transparent rounded-t-2xl">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 tracking-tight">
            <div className="p-1.5 bg-red-100 rounded-lg"><AlertTriangle className="text-red-600" size={18} /></div> 
            Estoque Crítico (Risco de Ruptura)
          </h3>
          <button className="text-sm text-red-600 font-bold hover:text-white bg-red-50 hover:bg-red-500 px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">Gerar Pedido</button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-red-200 hover:shadow-md transition-all group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                <Box size={22} />
              </div>
              <div>
                <p className="font-bold text-slate-800 group-hover:text-red-600 transition-colors">Detergente Líquido</p>
                <p className="text-xs text-red-500 font-bold mt-0.5 bg-red-50 inline-block px-2 py-0.5 rounded-md">8 un restantes</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-xs font-medium">Saída: 3/dia</p>
              <p className="text-red-600 font-bold text-sm mt-0.5">Acaba em 2 dias</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-red-200 hover:shadow-md transition-all group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                <Box size={22} />
              </div>
              <div>
                <p className="font-bold text-slate-800 group-hover:text-red-600 transition-colors">Óleo de Soja 900ml</p>
                <p className="text-xs text-red-500 font-bold mt-0.5 bg-red-50 inline-block px-2 py-0.5 rounded-md">45 un restantes</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-xs font-medium">Saída: 10/dia</p>
              <p className="text-red-600 font-bold text-sm mt-0.5">Acaba em 4 dias</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, trendUp }: { title: string, value: string, icon: any, trend: string, trendUp: boolean }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">{icon}</div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-full ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
          {trendUp ? <ArrowUpRight size={14} strokeWidth={3} /> : <ArrowDownRight size={14} strokeWidth={3} />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h4 className="text-2xl font-black mt-1 text-slate-800 tracking-tight">{value}</h4>
      </div>
    </div>
  );
}

function TopProduct({ name, qty, value }: { name: string, qty: string, value: string }) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all hover:scale-[1.01] border border-transparent hover:border-slate-100 hover:shadow-sm cursor-pointer group">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
          <Package size={20} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
        </div>
        <div>
          <p className="font-semibold text-sm text-slate-800 group-hover:text-emerald-600 transition-colors">{name}</p>
          <p className="text-xs text-slate-500">{qty} un. vendidas</p>
        </div>
      </div>
      <p className="font-bold text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">{value}</p>
    </div>
  );
}

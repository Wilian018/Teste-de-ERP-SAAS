"use client";

import { useState } from "react";
import { Settings, Server, Usb, CreditCard, Key, Scale, ScanBarcode, Container, Building2, Store, Save, Activity, ShieldAlert, DatabaseBackup, FileLock2 } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("hardware");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Configurações & Integrações</h2>
          <p className="text-slate-500 mt-1">Configure os periféricos de frente de caixa, dados da empresa e comunicação com o PDV local.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition font-bold text-sm shadow-sm">
          <Save size={18} /> Salvar Configurações
        </button>
      </div>

      <div className="flex border-b border-slate-200 overflow-x-auto custom-scrollbar">
        <button 
          onClick={() => setActiveTab("hardware")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "hardware" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Equipamentos & Hardware (PDV)
        </button>
        <button 
          onClick={() => setActiveTab("empresa")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "empresa" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Dados da Empresa
        </button>
        <button 
          onClick={() => setActiveTab("integracoes")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "integracoes" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Integrações & APIs
        </button>
        <button 
          onClick={() => setActiveTab("seguranca")}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "seguranca" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Segurança, Backup & LGPD
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        
        {/* Tab 1: Hardware (Passo 12) */}
        {activeTab === "hardware" && (
          <div className="p-8">
            <div className="mb-6 pb-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Server size={20} className="text-indigo-600"/> Bridge Local (MercadoPDV Client)</h3>
                <p className="text-sm text-slate-500 mt-1">Para comunicar com o hardware, é necessário instalar o client local no Windows do caixa.</p>
              </div>
              <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 border border-emerald-100">
                <Activity size={16} /> Bridge Online (v1.2.4)
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Balanças */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 flex items-center gap-2"><Scale size={18} className="text-slate-400"/> Balança de Código de Barras / Serial</h4>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Protocolo da Balança</label>
                    <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500">
                      <option>Filizola (Platina/BP/MF)</option>
                      <option>Toledo (Prix 3/4/5)</option>
                      <option>Urano (POP)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Porta COM</label>
                      <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500">
                        <option>COM1</option>
                        <option>COM2</option>
                        <option>USB</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Baud Rate</label>
                      <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500">
                        <option>9600</option>
                        <option>4800</option>
                      </select>
                    </div>
                  </div>
                  <div className="pt-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
                      Extrair peso automaticamente pelo código EAN (Cód. 2)
                    </label>
                  </div>
                </div>
              </div>

              {/* Impressora e Gaveta */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 flex items-center gap-2"><Container size={18} className="text-slate-400"/> Impressora Térmica & Gaveta</h4>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Impressora Padrão (NFC-e)</label>
                    <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500">
                      <option>Epson TM-T20</option>
                      <option>Bematech MP-4200</option>
                      <option>Elgin i9</option>
                      <option>Genérica / Spooler do Windows</option>
                    </select>
                  </div>
                  <div className="pt-2 border-t border-slate-200 mt-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
                      Acionar Gaveta de Dinheiro ao finalizar venda em Espécie
                    </label>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 mt-2">Comando de Abertura (Gaveta)</label>
                    <input type="text" defaultValue="27,112,0,50,250" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 font-mono" />
                  </div>
                </div>
              </div>

              {/* TEF / PinPad */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 flex items-center gap-2"><CreditCard size={18} className="text-slate-400"/> TEF & PinPad</h4>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Gerenciador Padrão</label>
                    <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500">
                      <option>Pay&Go (Homologado)</option>
                      <option>Sitef</option>
                      <option>Stone (POS Integrado)</option>
                      <option>Nenhum (Utilizar POS Físico Avulso)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Porta do PinPad (Cabo Serial/USB)</label>
                    <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500">
                      <option>Auto (Recomendado)</option>
                      <option>COM3</option>
                      <option>COM4</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Leitor de Código de Barras */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 flex items-center gap-2"><ScanBarcode size={18} className="text-slate-400"/> Leitor de Código de Barras</h4>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-sm text-blue-800 mb-2">
                    Na maioria dos leitores modernos (USB), não é necessária configuração de porta. O leitor atua como uma emulação de teclado virtual.
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Comportamento do Leitor no PDV</label>
                    <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500">
                      <option>Adicionar item automaticamente após a leitura (Enter Automático)</option>
                      <option>Apenas preencher o campo e aguardar confirmação</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Empresa */}
        {activeTab === "empresa" && (
          <div className="p-8 max-w-2xl">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6"><Building2 size={20} className="text-indigo-600"/> Perfil do Supermercado</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Razão Social</label>
                  <input type="text" defaultValue="Mercado Bom Preço Ltda" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Nome Fantasia</label>
                  <input type="text" defaultValue="Supermercado Bom Preço" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">CNPJ</label>
                  <input type="text" defaultValue="11.222.333/0001-44" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Inscrição Estadual (IE)</label>
                  <input type="text" defaultValue="12345678910" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Integrações */}
        {activeTab === "integracoes" && (
          <div className="p-8 max-w-2xl">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6"><Key size={20} className="text-indigo-600"/> Tokens & Integrações</h3>
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="font-bold text-slate-800 mb-1">Certificado Digital (Sefaz)</h4>
                <p className="text-xs text-slate-500 mb-3">Necessário para assinar NFC-e e NF-e.</p>
                <div className="flex gap-2">
                  <input type="file" className="text-sm" />
                  <input type="password" placeholder="Senha do PFX" className="border border-slate-300 rounded-lg px-3 py-1 text-sm outline-none focus:border-indigo-500" />
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="font-bold text-slate-800 mb-1">Mercado Pago (PIX)</h4>
                <p className="text-xs text-slate-500 mb-3">Geração de QR Code dinâmico na tela do PDV.</p>
                <input type="text" placeholder="Access Token Prod" defaultValue="APP_USR-12345678-..." className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 font-mono" />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Segurança, Backup & LGPD */}
        {activeTab === "seguranca" && (
          <div className="p-8">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6"><ShieldAlert size={20} className="text-indigo-600"/> Gestão de Segurança & LGPD</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Backup Automático */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 flex items-center gap-2"><DatabaseBackup size={18} className="text-slate-400"/> Rotina de Backups (AWS S3)</h4>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 mb-2">
                    <span className="text-xs font-bold text-emerald-700">Status do Backup Diário</span>
                    <span className="text-xs font-bold text-emerald-700">ATIVO</span>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Horário de Sincronização em Nuvem</label>
                    <input type="time" defaultValue="03:00" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Retenção de Arquivos (Em Dias)</label>
                    <input type="number" defaultValue="30" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" />
                  </div>
                  <button className="w-full bg-slate-800 text-white text-xs font-bold py-2 rounded-lg mt-2 hover:bg-slate-900 transition">
                    Forçar Backup Agora
                  </button>
                </div>
              </div>

              {/* LGPD e Autenticação */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 flex items-center gap-2"><FileLock2 size={18} className="text-slate-400"/> Privacidade e Autenticação JWT</h4>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Duração do Refresh Token JWT (Sessão)</label>
                    <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500">
                      <option>12 Horas</option>
                      <option>24 Horas</option>
                      <option>7 Dias</option>
                    </select>
                  </div>
                  <div className="pt-2 border-t border-slate-200 mt-3 space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
                      Anonimizar dados de Clientes (Adequação LGPD) em exportações
                    </label>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
                      Forçar criptografia de banco de dados (At-Rest)
                    </label>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

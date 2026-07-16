"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, User, Mail, Lock, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    cnpj: '',
    adminName: '',
    adminEmail: '',
    adminPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && formData.companyName && formData.cnpj) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_URL}/api/auth/register-tenant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar conta');
      }

      // Sucesso
      setStep(3); // Success Screen
      
      setTimeout(() => {
        router.push('/login');
      }, 3000);
      
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Conta Criada!</h2>
        <p className="text-slate-500 font-medium mb-8">Sua empresa foi cadastrada com sucesso. Redirecionando para o login...</p>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full animate-pulse w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-10 md:p-12 rounded-3xl shadow-xl border border-slate-100">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Criar Conta</h2>
        <p className="text-slate-500 font-medium mt-1">
          {step === 1 ? 'Primeiro, conte-nos sobre sua empresa.' : 'Agora, crie o perfil de administrador.'}
        </p>
      </div>

      {/* Stepper */}
      <div className="flex gap-2 mb-8">
        <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-emerald-500' : 'bg-slate-200'} transition-colors`}></div>
        <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-emerald-500' : 'bg-slate-200'} transition-colors`}></div>
      </div>

      <form onSubmit={step === 1 ? handleNextStep : handleSubmit} className="space-y-5">
        {step === 1 ? (
          <div className="animate-in slide-in-from-right-8 duration-300">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nome da Empresa</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Building2 size={20} />
                </div>
                <input 
                  type="text" 
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl py-3 pl-12 pr-4 text-slate-800 font-medium transition outline-none" 
                  placeholder="Mercadinho do Bairro" 
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="block text-sm font-bold text-slate-700 mb-2">CNPJ</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <FileText size={20} />
                </div>
                <input 
                  type="text" 
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl py-3 pl-12 pr-4 text-slate-800 font-medium transition outline-none" 
                  placeholder="00.000.000/0000-00" 
                />
              </div>
            </div>
            
            <button type="submit" className="w-full mt-8 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2">
              Próximo Passo <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="animate-in slide-in-from-right-8 duration-300">
             <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nome Completo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User size={20} />
                </div>
                <input 
                  type="text" 
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl py-3 pl-12 pr-4 text-slate-800 font-medium transition outline-none" 
                  placeholder="João Silva" 
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="block text-sm font-bold text-slate-700 mb-2">E-mail Profissional</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail size={20} />
                </div>
                <input 
                  type="email" 
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl py-3 pl-12 pr-4 text-slate-800 font-medium transition outline-none" 
                  placeholder="joao@empresa.com" 
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="block text-sm font-bold text-slate-700 mb-2">Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={20} />
                </div>
                <input 
                  type="password" 
                  name="adminPassword"
                  value={formData.adminPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl py-3 pl-12 pr-4 text-slate-800 font-medium transition outline-none" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 rounded-xl transition">
                Voltar
              </button>
              <button type="submit" disabled={isLoading} className="w-2/3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2">
                {isLoading ? 'Criando Conta...' : 'Finalizar Cadastro'}
              </button>
            </div>
            {errorMsg && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium text-center">
                {errorMsg}
              </div>
            )}
          </div>
        )}
      </form>

      <div className="mt-8 text-center text-slate-500 font-medium text-sm">
        Já tem uma conta? <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-bold ml-1">Fazer Login</Link>
      </div>
    </div>
  );
}

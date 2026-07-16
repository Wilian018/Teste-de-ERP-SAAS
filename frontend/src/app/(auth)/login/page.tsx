"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Credenciais inválidas');
      }

      // Salva token no localStorage e vai pro painel
      localStorage.setItem('saas_token', data.access_token);
      localStorage.setItem('saas_user', JSON.stringify(data.user));
      
      router.push('/');
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-10 md:p-12 rounded-3xl shadow-xl border border-slate-100">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Bem-vindo de volta</h2>
        <p className="text-slate-500 font-medium mt-2">
          Insira suas credenciais para acessar o painel
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">E-mail</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Mail size={20} />
            </div>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl py-3 pl-12 pr-4 text-slate-800 font-medium transition outline-none" 
              placeholder="joao@empresa.com" 
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-slate-700">Senha</label>
            <Link href="#" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">Esqueceu a senha?</Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Lock size={20} />
            </div>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl py-3 pl-12 pr-4 text-slate-800 font-medium transition outline-none" 
              placeholder="••••••••" 
            />
          </div>
        </div>

        <button type="submit" disabled={isLoading} className="w-full mt-8 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2">
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Entrar no Sistema'}
          {!isLoading && <ArrowRight size={20} />}
        </button>
        {errorMsg && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium text-center">
            {errorMsg}
          </div>
        )}
      </form>

      <div className="mt-8 text-center text-slate-500 font-medium text-sm">
        Sua empresa ainda não usa o sistema? <br/>
        <Link href="/register" className="text-emerald-600 hover:text-emerald-700 font-bold inline-block mt-1">Crie sua conta agora</Link>
      </div>
    </div>
  );
}

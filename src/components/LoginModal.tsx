import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

import { supabase } from '../lib/supabase';

export default function LoginModal({ isOpen, onClose, onSuccess }: { isOpen: boolean, onClose: () => void, onSuccess: () => void }) {
  const [isLogin, setIsLogin] = React.useState(true);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            },
          },
        });
        if (error) throw error;
        alert('Conta criada com sucesso! Verifique o seu e-mail para confirmar a conta.');
        setIsLogin(true);
        return;
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro. Verifique os seus dados.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
        >
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex border-b border-slate-200">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${isLogin ? 'border-primary text-primary bg-white' : 'border-transparent text-slate-500 hover:text-primary'}`}
            >
              Entrar
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${!isLogin ? 'border-primary text-primary bg-white' : 'border-transparent text-slate-500 hover:text-primary'}`}
            >
              Registo
            </button>
          </div>
          
          <div className="p-8">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100">
                  {error}
                </div>
              )}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                  <input 
                    className="w-full rounded-lg border-slate-300 focus:ring-primary focus:border-primary p-3" 
                    placeholder="O seu nome" 
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">E-mail Corporativo</label>
                <input 
                  className="w-full rounded-lg border-slate-300 focus:ring-primary focus:border-primary p-3" 
                  placeholder="nome@empresa.com" 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Palavra-passe</label>
                <input 
                  className="w-full rounded-lg border-slate-300 focus:ring-primary focus:border-primary p-3" 
                  placeholder="••••••••" 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button 
                disabled={isLoading}
                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : null}
                {isLoading ? (isLogin ? 'A entrar...' : 'A criar conta...') : (isLogin ? 'Aceder ao Painel' : 'Criar Conta')}
              </button>
              
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-500">Ou continuar com</span></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="flex items-center justify-center gap-2 border border-slate-200 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8aNkjf_1ejT7713LE_Y6dTb2WJkPlblLwoVMfDBVpw6Uv-nBCNrbH9w46Mh1IxvmBRMi4livr4xfB_yQ3N4AwmjPj0x8bxWe_VYNnyQPsZCQnKafU7mZqAGbYtkNZBPdvQUvBxW0ik8JELgos7bQdVZUZ6ht_QHfF375tHPIKojZwFG1KMyi1mYgTO497_NEQ_gyNy5J2MY84r3FmNaxjQGEu8DZOXjMYH66Y5WMcPPKniLK9kYUQ5cDpKH1EOnsQQdvrRC9hLb0c" />
                  <span className="text-sm font-medium">Google</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-2 border border-slate-200 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <img alt="Microsoft" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx6KgZjsKyfPFioMMIgX8Cqef0-ldKfcRjsdyU67By0LMTPpI6_GMcbCmOOQIYif523J1MFkFkQtI_wybKemG3rf47edOTtb9h_eZMZ2Xfxt1Uk54cUYc9upO6sxPLNl-CuUnoL27dK-gpU-clhDKVVJVgI0vhzbaL2AVaQSkEfSJhbifFLSVeyiaHJh2izWQ0rwzUJYL1-_V_1uCGdMy3uJu8U3nSfxwNd13HIBMwfrxhyjniSkr66o_UUJzz_gxwdkvYgnDzO6Le" />
                  <span className="text-sm font-medium">Microsoft</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

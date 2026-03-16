import React from 'react';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import LoginModal from './components/LoginModal';

export default function App() {
  const [view, setView] = React.useState<'landing' | 'admin'>('landing');
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [runtimeError, setRuntimeError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Global error caught:", event.error);
      setRuntimeError(event.error?.message || "Erro desconhecido");
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
    setView('admin');
  };

  if (runtimeError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-red-100">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erro de Execução</h1>
          <p className="text-slate-600 mb-6">
            A aplicação encontrou um erro crítico. Verifique a consola do navegador para mais detalhes.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg mb-6 overflow-auto max-h-40">
            <code className="text-xs text-red-500">{runtimeError}</code>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {view === 'landing' ? (
        <LandingPage onLogin={() => setIsLoginOpen(true)} />
      ) : (
        <AdminDashboard />
      )}
      
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}

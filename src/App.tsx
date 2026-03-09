import React from 'react';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import LoginModal from './components/LoginModal';

export default function App() {
  const [view, setView] = React.useState<'landing' | 'admin'>('landing');
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
    setView('admin');
  };

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

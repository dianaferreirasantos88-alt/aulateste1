import React from 'react';
import { 
  Users, 
  ShieldAlert, 
  History, 
  Database, 
  Truck, 
  Search, 
  Bell, 
  Settings, 
  User,
  Plus,
  TrendingUp,
  CheckCircle2,
  Clock,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Package
} from 'lucide-react';
import { motion } from 'motion/react';

import { supabase } from '../lib/supabase';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = React.useState('utilizadores');
  const [userSubTab, setUserSubTab] = React.useState(0);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const [users, setUsers] = React.useState<any[]>([]);
  const [fleet, setFleet] = React.useState<any[]>([]);
  const [inventory, setInventory] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [usersRes, fleetRes, inventoryRes] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('fleet').select('*').order('created_at', { ascending: false }),
        supabase.from('inventory').select('*').order('created_at', { ascending: false })
      ]);

      if (usersRes.data) setUsers(usersRes.data);
      if (fleetRes.data) setFleet(fleetRes.data);
      if (inventoryRes.data) setInventory(inventoryRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;

    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    
    const newUser = {
      name,
      email,
      role,
      status: 'Ativo'
    };

    const { data, error } = await supabase.from('profiles').insert([newUser]).select();

    if (error) {
      console.error('Error adding user:', error);
      return;
    }

    if (data) {
      setUsers([data[0], ...users]);
    }
    setIsAddUserModalOpen(false);
  };

  const handleDeleteUser = async (id: string) => {
    const { error } = await supabase.from('profiles').delete().eq('id', id);
    if (error) {
      console.error('Error deleting user:', error);
      return;
    }
    setUsers(users.filter(u => u.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'utilizadores':
        return (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-primary">Gestão de Utilizadores</h1>
                <p className="text-slate-500 mt-1">Controle quem tem acesso e quais as permissões na plataforma Logística Pro.</p>
              </div>
              <button 
                onClick={() => setIsAddUserModalOpen(true)}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-primary/20"
              >
                <Plus className="w-5 h-5" />
                <span>Adicionar Administrador</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { label: 'Total Utilizadores', val: '124', icon: Users, change: '+5 este mês', trend: true },
                { label: 'Utilizadores Ativos', val: '118', icon: CheckCircle2, sub: '95% de taxa de atividade', success: true },
                { label: 'Novos Pedidos', val: '3', icon: Clock, sub: 'A aguardar aprovação', warning: true }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm font-medium">{stat.label}</span>
                    <div className={`p-2 rounded-lg ${stat.success ? 'bg-green-100 text-green-600' : stat.warning ? 'bg-orange-100 text-orange-600' : 'bg-primary/10 text-primary'}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold mt-2">{stat.val}</p>
                  {stat.change && (
                    <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> {stat.change}
                    </p>
                  )}
                  {stat.sub && <p className={`text-xs mt-1 ${stat.warning ? 'text-orange-500' : 'text-slate-400'}`}>{stat.sub}</p>}
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-slate-200 flex gap-8">
              {['LISTA DE UTILIZADORES', 'PERMISSÕES E FUNÇÕES', 'HISTÓRICO DE ACESSOS'].map((tab, i) => (
                <button 
                  key={i} 
                  onClick={() => setUserSubTab(i)}
                  className={`pb-4 text-sm font-bold tracking-wide transition-all ${userSubTab === i ? 'border-b-2 border-primary text-primary' : 'text-slate-500 hover:text-primary'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {userSubTab === 0 && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                        <th className="px-6 py-4">Nome</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Função</th>
                        <th className="px-6 py-4">Data de Criação</th>
                        <th className="px-6 py-4">Estado</th>
                        <th className="px-6 py-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                {user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                              </div>
                              <span className="font-semibold">{user.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-500 text-sm">{user.email}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${user.role === 'Admin Total' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-600'}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-500 text-sm">{new Date(user.created_at).toLocaleDateString('pt-PT')}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${user.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Ativo' ? 'bg-green-600' : 'bg-slate-400'}`}></span>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteUser(user.id)}
                                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-sm text-slate-500">A mostrar 3 de 124 utilizadores</p>
                  <div className="flex gap-2">
                    <button className="p-1 border border-slate-300 rounded hover:bg-white transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                    <button className="px-3 py-1 bg-primary text-white rounded text-sm font-medium">1</button>
                    <button className="px-3 py-1 border border-slate-300 rounded text-sm hover:bg-white transition-colors">2</button>
                    <button className="px-3 py-1 border border-slate-300 rounded text-sm hover:bg-white transition-colors">3</button>
                    <button className="p-1 border border-slate-300 rounded hover:bg-white transition-colors"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            )}

            {userSubTab === 1 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-primary">Configuração de Permissões</h2>
                    <p className="text-slate-500 mt-1">Configure o que cada função pode visualizar ou editar no sistema.</p>
                  </div>
                  <select className="bg-white border border-slate-300 rounded-lg text-sm font-medium px-4 py-2 focus:ring-primary focus:border-primary">
                    <option>Operador de Inventário</option>
                    <option>Admin Total</option>
                    <option>Visualizador de Frotas</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: 'Gestão de Inventário', icon: Database, items: [
                      { label: 'Ver stock atual', desc: 'Permite visualizar a quantidade de produtos em armazém.', checked: true },
                      { label: 'Dar entrada/saída de material', desc: 'Capacidade de registar novos produtos ou baixas de inventário.', checked: true },
                      { label: 'Editar preços de custo', desc: 'Permissão para alterar o valor financeiro dos ativos em stock.' }
                    ]},
                    { title: 'Gestão de Frotas', icon: Truck, items: [
                      { label: 'Rastreio em tempo real', desc: 'Visualizar a localização GPS de todos os veículos da frota.', checked: true },
                      { label: 'Atribuir rotas a condutores', desc: 'Definição de trajetos e entrega de serviços a motoristas.' },
                      { label: 'Gestão de Manutenções', desc: 'Agendamento e aprovação de revisões mecânicas.' }
                    ]}
                  ].map((section, i) => (
                    <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <section.icon className="w-5 h-5 text-primary" />
                        {section.title}
                      </h3>
                      <div className="space-y-4">
                        {section.items.map((item, j) => (
                          <label key={j} className="flex items-start gap-4 cursor-pointer group">
                            <input type="checkbox" defaultChecked={item.checked} className="mt-1 w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary" />
                            <div>
                              <p className="font-semibold text-sm group-hover:text-primary transition-colors">{item.label}</p>
                              <p className="text-xs text-slate-500">{item.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-lg font-bold transition-all">
                    Guardar Alterações na Função
                  </button>
                </div>
              </div>
            )}

            {userSubTab === 2 && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
                <History className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900">Histórico de Acessos</h3>
                <p className="text-slate-500 mt-2">Os logs detalhados de acesso serão carregados aqui.</p>
              </div>
            )}
          </>
        );
      case 'frota':
        return (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-primary">Gestão de Frota</h1>
                <p className="text-slate-500 mt-1">Monitorização e controlo de veículos e condutores.</p>
              </div>
              <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-primary/20">
                <Plus className="w-5 h-5" />
                <span>Adicionar Veículo</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">ID Veículo</th>
                    <th className="px-6 py-4">Modelo / Matrícula</th>
                    <th className="px-6 py-4">Condutor</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4">Localização</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fleet.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-primary">{v.id}</td>
                      <td className="px-6 py-4">
                        <p className="font-semibold">{v.model}</p>
                        <p className="text-xs text-slate-500">{v.plate}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{v.driver}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          v.status === 'Em Rota' ? 'bg-blue-100 text-blue-700' : 
                          v.status === 'Disponível' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {v.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{v.location}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-primary hover:underline text-xs font-bold">Ver Mapa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
      case 'inventario':
        return (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-primary">Inventário Geral</h1>
                <p className="text-slate-500 mt-1">Controlo de stock e ativos logísticos.</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-lg font-bold hover:bg-slate-50 transition-all">
                  Exportar CSV
                </button>
                <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-primary/20">
                  <Plus className="w-5 h-5" />
                  <span>Nova Entrada</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">SKU / ID</th>
                    <th className="px-6 py-4">Nome do Item</th>
                    <th className="px-6 py-4">Categoria</th>
                    <th className="px-6 py-4">Quantidade</th>
                    <th className="px-6 py-4">Nível Crítico</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inventory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-xs font-mono text-slate-500">{item.id}</td>
                      <td className="px-6 py-4 font-semibold">{item.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{item.category}</td>
                      <td className="px-6 py-4 font-bold text-lg">{item.qty} <span className="text-xs font-normal text-slate-400">{item.unit}</span></td>
                      <td className="px-6 py-4">
                        <div className="w-full bg-slate-100 rounded-full h-2 max-w-[100px]">
                          <div 
                            className={`h-2 rounded-full ${item.qty <= item.min_qty ? 'bg-red-500' : 'bg-green-500'}`}
                            style={{ width: `${Math.min((item.qty / (item.min_qty * 2)) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-primary"><Edit2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
      default:
        return <div className="p-20 text-center text-slate-400">Funcionalidade em desenvolvimento...</div>;
    }
  };

  return (
    <div className="flex h-screen bg-[#f6f6f8]">
      {/* Sidebar */}
      <aside className="w-64 hidden lg:flex flex-col bg-white border-r border-slate-200 p-4 gap-2">
        <div className="mb-4 px-2">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Painel Admin</h3>
        </div>
        <nav className="flex flex-col gap-1">
          {[
            { id: 'utilizadores', icon: Users, label: 'Utilizadores' },
            { id: 'acessos', icon: ShieldAlert, label: 'Funções e Acessos' },
            { id: 'logs', icon: History, label: 'Logs de Atividade' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
                activeTab === item.id ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
          <div className="my-4 border-t border-slate-100"></div>
          <button
            onClick={() => setActiveTab('inventario')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
              activeTab === 'inventario' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Database className="w-5 h-5" />
            <span>Inventário Geral</span>
          </button>
          <button
            onClick={() => setActiveTab('frota')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
              activeTab === 'frota' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Truck className="w-5 h-5" />
            <span>Gestão de Frota</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between bg-white border-b border-slate-200 px-6 py-3 lg:px-10">
          <div className="flex items-center gap-4 text-primary">
            <div className="w-8 h-8 flex items-center justify-center bg-primary rounded-lg text-white">
              <Truck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Logística Pro</h2>
          </div>
          
          <div className="flex flex-1 justify-end gap-4 lg:gap-8 items-center">
            <div className="hidden md:flex items-center bg-slate-100 rounded-lg border border-slate-200 px-3 py-1.5 w-64">
              <Search className="w-4 h-4 text-slate-500 mr-2" />
              <input 
                className="bg-transparent border-none p-0 text-sm focus:ring-0 w-full" 
                placeholder="Pesquisar utilizador..." 
              />
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">Admin Principal</p>
                <p className="text-xs text-slate-500 mt-1">Gestor de Sistema</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
                <User className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 max-w-[1400px] mx-auto w-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : renderContent()}
        </main>
        
        <footer className="bg-white border-t border-slate-200 px-10 py-4 text-center">
          <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Logística Pro © 2024 - Sistema de Gestão Corporativa</p>
        </footer>
      </div>

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-xl font-black text-primary">Novo Administrador</h3>
              <button onClick={() => setIsAddUserModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <Plus className="w-6 h-6 rotate-45 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Nome Completo</label>
                <input 
                  required 
                  name="name"
                  type="text" 
                  placeholder="Ex: António Silva"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email Corporativo</label>
                <input 
                  required 
                  name="email"
                  type="email" 
                  placeholder="a.silva@logpro.pt"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Função / Cargo</label>
                <select 
                  name="role"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                >
                  <option>Admin Total</option>
                  <option>Operador Inventário</option>
                  <option>Visualizador Frota</option>
                  <option>Gestor de Rotas</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
                >
                  Criar Acesso
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

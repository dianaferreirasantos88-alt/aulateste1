import React from 'react';
import { 
  Anchor, 
  Search, 
  ShieldCheck, 
  Clock, 
  Link as LinkIcon, 
  CheckCircle2, 
  MoreHorizontal,
  LayoutDashboard,
  Warehouse,
  Network,
  Ship,
  Truck,
  Rocket,
  ChevronRight,
  Menu,
  X,
  Globe,
  BarChart3,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

export default function LandingPage({ onLogin }: { onLogin: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showTracking, setShowTracking] = React.useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowTracking(true);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 text-primary cursor-pointer" onClick={() => setShowTracking(false)}>
              <Anchor className="w-8 h-8" />
              <span className="text-xl font-bold tracking-tight">Logística Pro</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              {['Funcionalidades', 'Armazéns', 'Frota', 'Rastreio', 'Preços'].map((item) => (
                <a 
                  key={item} 
                  href={item === 'Rastreio' ? '#' : `#${item.toLowerCase()}`} 
                  onClick={(e) => {
                    if (item === 'Rastreio') {
                      e.preventDefault();
                      document.getElementById('blockchain-section')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button 
                onClick={onLogin}
                className="px-4 py-2 text-sm font-semibold text-primary hover:bg-slate-100 rounded-lg transition-colors"
              >
                Login
              </button>
              <button className="px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm transition-all">
                Começar
              </button>
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {showTracking ? (
          <section className="py-12 bg-slate-50 min-h-[calc(100vh-64px)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <button 
                onClick={() => setShowTracking(false)}
                className="flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span className="text-sm font-bold">Voltar para a Home</span>
              </button>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-black text-primary">Rastreio: {searchQuery}</h2>
                        <p className="text-slate-500 text-sm mt-1">Última atualização: Há 12 minutos</p>
                      </div>
                      <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-200">
                        EM TRÂNSITO
                      </span>
                    </div>
                    
                    <div className="bg-slate-100 rounded-xl aspect-video relative overflow-hidden border border-slate-200">
                      <img 
                        className="w-full h-full object-cover" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAblDxGCSO8tVh8tbkGjEge6H02C78dcj7Fr5QbNapppb_MteA0cHmDVcwI40OtD3nar03Oy85EoyPwggN8m6R0z-MJFEeNV80-gWvwZ4amjEio8-B_F4iiZHrOld7Kn6kY2NI1OWwSd5h5_YDK9OPcZWGnOsBnNfiMNnMBu2U-INXKZNPRQOWlNCVurZtzYpkNEBLnRYuC5RtphrSSvD8-pfRSX-F19ZiVtkmIIm66n8nw9RQNwXylRTC--Su0HFIxlhTevRJo06_J"
                        alt="Tracking map"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-primary/10"></div>
                      {/* Route Line Mockup */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <path d="M200,300 Q400,100 600,250" fill="none" stroke="#0ea5e9" strokeWidth="4" strokeDasharray="8 4" className="animate-[dash_20s_linear_infinite]" />
                      </svg>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { label: 'Smart Contract', val: 'v2.4.1', icon: ShieldCheck },
                      { label: 'Consensus', val: 'PoS (99.9%)', icon: Network },
                      { label: 'Protocol', val: 'LPRO-X', icon: LinkIcon }
                    ].map((item, i) => (
                      <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <item.icon className="w-5 h-5 text-accent mb-2" />
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{item.label}</p>
                        <p className="text-sm font-bold text-slate-900">{item.val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 h-full">
                    <h3 className="font-bold text-slate-900 mb-8 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-accent" />
                      Histórico de Eventos
                    </h3>
                    <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                      {[
                        { title: 'Entrada em Águas Territoriais', loc: 'Costa Portuguesa', time: '12 Out, 14:20', hash: '0x82...f91a', active: true },
                        { title: 'Saída do Porto de Origem', loc: 'Porto de Xangai', time: '28 Set, 09:15', hash: '0x41...e28b', active: true },
                        { title: 'Carga Verificada e Selada', loc: 'Terminal 4, Xangai', time: '27 Set, 23:59', hash: '0x12...c44d', active: true },
                        { title: 'Reserva Confirmada', loc: 'Sistema Central', time: '25 Set, 10:00', hash: '0x99...a11b', active: true }
                      ].map((event, i) => (
                        <div key={i} className="flex gap-6 relative">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white z-10 ${event.active ? 'bg-accent text-white' : 'bg-slate-200 text-slate-400'}`}>
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-slate-900">{event.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{event.loc} • {event.time}</p>
                            <p className="text-[10px] font-mono text-slate-400 mt-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 inline-block">Hash: {event.hash}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
                      Logística Inteligente para o Mundo Moderno
                    </h1>
                    <p className="text-lg text-slate-600 mb-8 max-w-lg">
                      Otimize a sua cadeia de abastecimento com tecnologia de ponta, visibilidade total em tempo real e segurança baseada em Blockchain.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
                        Agendar Demo
                      </button>
                      <button className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all">
                        Saber Mais
                      </button>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="rounded-2xl overflow-hidden shadow-2xl border-8 border-white/50 bg-slate-200 aspect-video">
                      <img 
                        className="w-full h-full object-cover" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPdHO_L_TEB7LCS6MJumn483PVCXIw8Qo6ie0dT-ouoaPdkNiN9N_cEf_L-EUtIhcXY9om5okhaNQQcmbik9mtG9DEmcWEYV3LclBrrmoTgUKhNI0kALhtYzTAgPBcriuQWoVyscOvhJWWzf7Gv4XqGh654zXvB2W3Dc8k1AOJLZtjBboZ-vF-eUGOkV8ZphnKaf1ORvTZYeN_YvSvU-CZsXSJyA-IpzReCl0Qs4fAuSDGp-d6JWEogrPUePZltm4xAVQKq5tnHFRw"
                        alt="Modern warehouse"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 hidden sm:block">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-accent/10 rounded-full text-accent">
                          <Rocket className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">+45% Eficiência</p>
                          <p className="text-xs text-slate-500">Média em 2023</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Features Grid */}
            <section id="funcionalidades" className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-black text-slate-900">Soluções Completas de Gestão</h2>
                  <p className="text-slate-600 mt-4 text-lg">Tudo o que precisa para controlar a sua operação global com precisão cirúrgica.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { icon: Warehouse, title: 'Gestão de Armazém', desc: 'Controlo de stock inteligente, picking otimizado e inventário em tempo real com IA.' },
                    { icon: Network, title: 'Centros Distribuição', desc: 'Coordenação logística multi-ponto e gestão de fluxos transfronteiriços automatizada.' },
                    { icon: Ship, title: 'Navios e Frota', desc: 'Monitorização GPS de frotas marítimas e terrestres com telemetria avançada 24/7.' },
                    { icon: Truck, title: 'Gestão de Carga', desc: 'Otimização de rotas de entrega e consolidação de mercadorias para redução de custos.' }
                  ].map((feature, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -5 }}
                      className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all shadow-sm hover:shadow-md"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Warehouses Section */}
            <section id="armazéns" className="py-24 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                  <div className="max-w-2xl">
                    <h2 className="text-4xl font-black text-slate-900">Rede Global de Armazéns</h2>
                    <p className="text-slate-600 mt-4 text-lg">Presença estratégica nos principais hubs logísticos mundiais, garantindo rapidez e eficiência na distribuição.</p>
                  </div>
                  <button className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    Ver Mapa Completo <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { city: 'Sines, Portugal', type: 'Hub Logístico Atlântico', cap: '85,000 m²', img: 'https://picsum.photos/seed/sines/800/600' },
                    { city: 'Roterdão, Holanda', type: 'Centro de Distribuição Europeu', cap: '120,000 m²', img: 'https://picsum.photos/seed/rotterdam/800/600' },
                    { city: 'Singapura', type: 'Hub de Transbordo Asiático', cap: '200,000 m²', img: 'https://picsum.photos/seed/singapore/800/600' }
                  ].map((wh, i) => (
                    <div key={i} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img src={wh.img} alt={wh.city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">
                          {wh.type}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-900">{wh.city}</h3>
                        <div className="flex items-center gap-4 mt-4 text-sm text-slate-500 font-medium">
                          <div className="flex items-center gap-1.5">
                            <LayoutDashboard className="w-4 h-4 text-accent" />
                            {wh.cap}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            Operacional
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Fleet Section */}
            <section id="frota" className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square bg-slate-100">
                      <img 
                        src="https://picsum.photos/seed/truck-fleet/1000/1000" 
                        alt="Fleet" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
                      <div className="absolute bottom-8 left-8 right-8 text-white">
                        <p className="text-4xl font-black mb-2">500+</p>
                        <p className="text-sm font-bold uppercase tracking-widest opacity-80">Veículos em Operação Diária</p>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <span className="text-accent font-bold tracking-widest text-sm uppercase">Mobilidade de Carga</span>
                    <h2 className="text-4xl font-black text-slate-900 mt-2 mb-6">Frota Moderna e Sustentável</h2>
                    <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                      Investimos continuamente em veículos de última geração, incluindo frotas elétricas e híbridas, para reduzir a nossa pegada de carbono enquanto mantemos a máxima eficiência.
                    </p>
                    <div className="space-y-6">
                      {[
                        { title: 'Transporte Pesado', desc: 'Camiões de longo curso equipados com telemetria avançada.' },
                        { title: 'Last-Mile Delivery', desc: 'Furgões elétricos para entregas urbanas rápidas e silenciosas.' },
                        { title: 'Carga Especial', desc: 'Veículos refrigerados e para transporte de materiais perigosos.' }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">{item.title}</h4>
                            <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Blockchain Section */}
            <section id="blockchain-section" className="py-24 bg-primary text-white overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <span className="text-accent font-bold tracking-widest text-sm uppercase">Segurança de Dados</span>
                  <h2 className="text-4xl font-black mt-2 mb-4">Rastreio de Contentores via Blockchain</h2>
                  <p className="text-slate-300 max-w-2xl mx-auto">Garanta a integridade de cada etapa do transporte com o nosso livro de registo imutável e descentralizado.</p>
                </div>

                <div className="max-w-2xl mx-auto mb-16">
                  <form onSubmit={handleSearch} className="relative group">
                    <input 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/10 border-white/20 rounded-full py-5 px-8 text-white placeholder:text-white/40 focus:ring-accent focus:bg-white/20 focus:outline-none text-lg transition-all" 
                      placeholder="Insira ID do Contentor ou Bill of Lading..." 
                      type="text"
                    />
                    <button type="submit" className="absolute right-3 top-2.5 bg-accent text-white px-6 py-2.5 rounded-full font-bold hover:bg-accent/90 transition-all">
                      Pesquisar
                    </button>
                  </form>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                  {[
                    { icon: ShieldCheck, title: 'Registos Imutáveis', desc: 'Cada transação e mudança de estado é registada permanentemente, impossível de alterar ou apagar.' },
                    { icon: Clock, title: 'Tempo Real', desc: 'Notificações instantâneas de desalfandegamento, carga e descarga via smart contracts.' },
                    { icon: LinkIcon, title: 'Cadeia de Custódia', desc: 'Visibilidade total de quem manuseou a carga em cada ponto da viagem intermodal.' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/10">
                      <item.icon className="w-8 h-8 text-accent mb-4" />
                      <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Blockchain Timeline Mockup */}
                <div className="bg-white/5 rounded-3xl p-8 border border-white/10 max-w-4xl mx-auto">
                  <h5 className="font-bold mb-8 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    Histórico de Verificação: CNTR-7729-PT
                  </h5>
                  <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
                    <div className="flex gap-6 relative">
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center ring-4 ring-primary z-10">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Entregue no Destino Final</p>
                        <p className="text-xs text-slate-400">Lisboa, Portugal • 12 Set, 14:20 • Hash: 0x82...f91a</p>
                      </div>
                    </div>
                    <div className="flex gap-6 relative">
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center ring-4 ring-primary z-10">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Desalfandegamento Concluído</p>
                        <p className="text-xs text-slate-400">Porto de Sines • 11 Set, 09:15 • Hash: 0x41...e28b</p>
                      </div>
                    </div>
                    <div className="flex gap-6 relative">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center ring-4 ring-primary z-10">
                        <MoreHorizontal className="w-4 h-4 text-white/40" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white/60">Em Trânsito Marítimo</p>
                        <p className="text-xs text-slate-500">Atlântico Norte • 08 Set, 23:59</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Dashboard Preview Section */}
            <section className="py-24 bg-white overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-3 gap-12 items-center">
                  <div className="lg:col-span-1">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Controlo Centralizado na Ponta dos Dedos</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                      O nosso painel de controlo oferece uma visão holística da sua operação. Monitorize navios, KPIs de performance e estados de inventário numa única interface intuitiva.
                    </p>
                    <ul className="space-y-4">
                      {[
                        { icon: Globe, text: 'Mapas interativos em tempo real' },
                        { icon: BarChart3, text: 'Relatórios de emissões CO2' },
                        { icon: AlertCircle, text: 'Previsão de chegada via AI' }
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                          <span className="text-sm font-semibold text-slate-700">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <div className="bg-slate-900 rounded-2xl p-4 shadow-2xl border border-slate-800">
                      {/* Dashboard Header Mockup */}
                      <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 bg-red-500/80 rounded-full"></div>
                            <div className="w-2.5 h-2.5 bg-yellow-500/80 rounded-full"></div>
                            <div className="w-2.5 h-2.5 bg-green-500/80 rounded-full"></div>
                          </div>
                          <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
                          <nav className="flex gap-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                            <span className="text-accent">Global View</span>
                            <span>Analytics</span>
                            <span>Fleet</span>
                          </nav>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-white/5 rounded-full px-3 py-1.5 flex items-center gap-2 border border-white/10">
                            <Search className="w-3 h-3 text-white/40" />
                            <div className="w-32 h-2 bg-white/10 rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      {/* KPI Cards */}
                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
                        {[
                          { label: 'Navios Ativos', val: '42', change: '+3.2%', color: 'text-green-400' },
                          { label: 'Em Trânsito', val: '1,248', sub: 'unidades' },
                          { label: 'Utilização Armazém', val: '88.4%', sub: 'Capacidade Crítica' },
                          { label: 'Entregas 24h', val: '98%', pulse: true },
                          { label: 'Alertas Críticos', val: '03', color: 'text-red-400', border: 'border-red-500/20 bg-red-500/5' }
                        ].map((kpi, i) => (
                          <div key={i} className={`bg-white/5 p-3 rounded-xl border border-white/5 ${kpi.border || ''}`}>
                            <p className="text-[9px] text-white/40 uppercase font-bold mb-1">{kpi.label}</p>
                            <div className="flex items-end gap-2">
                              <p className={`text-xl font-bold ${kpi.color || 'text-white'} leading-none`}>{kpi.val}</p>
                              {kpi.change && <span className="text-[9px] text-green-400 flex items-center mb-0.5">{kpi.change}</span>}
                              {kpi.pulse && <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mb-1"></span>}
                            </div>
                            {kpi.sub && <p className="text-[9px] text-white/30 mt-1">{kpi.sub}</p>}
                          </div>
                        ))}
                      </div>

                      {/* Map and Table Mockup */}
                      <div className="space-y-4">
                        <div className="bg-slate-800 rounded-xl aspect-[21/9] relative overflow-hidden border border-white/5">
                          <img 
                            className="w-full h-full object-cover opacity-40 grayscale contrast-125" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAblDxGCSO8tVh8tbkGjEge6H02C78dcj7Fr5QbNapppb_MteA0cHmDVcwI40OtD3nar03Oy85EoyPwggN8m6R0z-MJFEeNV80-gWvwZ4amjEio8-B_F4iiZHrOld7Kn6kY2NI1OWwSd5h5_YDK9OPcZWGnOsBnNfiMNnMBu2U-INXKZNPRQOWlNCVurZtzYpkNEBLnRYuC5RtphrSSvD8-pfRSX-F19ZiVtkmIIm66n8nw9RQNwXylRTC--Su0HFIxlhTevRJo06_J"
                            alt="World map"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-primary/30 mix-blend-multiply"></div>
                          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-accent rounded-full animate-pulse shadow-[0_0_15px_rgba(14,165,233,0.8)]"></div>
                          <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(14,165,233,0.6)]"></div>
                        </div>
                        
                        <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                          <table className="w-full text-left">
                            <thead>
                              <tr className="border-b border-white/10 bg-white/5">
                                <th className="px-4 py-2 text-[9px] font-bold text-white/40 uppercase tracking-wider">Navio / Contentor</th>
                                <th className="px-4 py-2 text-[9px] font-bold text-white/40 uppercase tracking-wider">Destino</th>
                                <th className="px-4 py-2 text-[9px] font-bold text-white/40 uppercase tracking-wider">Estado</th>
                                <th className="px-4 py-2 text-[9px] font-bold text-white/40 uppercase tracking-wider text-right">ETA</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                              {[
                                { name: 'MAERSK-G3 / #CN-7729', dest: 'Porto de Sines, PT', status: 'VERIFICADO', eta: '14 Out, 09:30' },
                                { name: 'MSC-OSCAR / #CN-8102', dest: 'Roterdão, NL', status: 'VERIFICADO', eta: '15 Out, 22:15' },
                                { name: 'HMM-ALGECIRAS / #CN-4410', dest: 'Singapura, SG', status: 'PENDENTE', eta: '18 Out, 11:00', dim: true }
                              ].map((row, i) => (
                                <tr key={i} className={`hover:bg-white/5 transition-colors ${row.dim ? 'opacity-40' : ''}`}>
                                  <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                      <div className={`w-2 h-2 rounded-full ${row.dim ? 'bg-slate-500' : 'bg-green-500'}`}></div>
                                      <span className="text-[11px] text-white font-medium">{row.name}</span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-[10px] text-white/70">{row.dest}</td>
                                  <td className="px-4 py-3">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${row.status === 'VERIFICADO' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-white/10 text-white/40 border border-white/10'}`}>
                                      {row.status}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 text-[10px] text-white/50 text-right">{row.eta}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Pricing Section */}
            <section id="preços" className="py-24 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-black text-slate-900">Planos Adaptados ao seu Negócio</h2>
                  <p className="text-slate-600 mt-4 text-lg">Escolha a escala que melhor se adapta às suas necessidades logísticas.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { 
                      name: 'Starter', 
                      price: '499€', 
                      desc: 'Ideal para pequenas empresas em crescimento.',
                      features: ['Até 5 veículos', 'Gestão de 1 Armazém', 'Rastreio Básico', 'Suporte via Email']
                    },
                    { 
                      name: 'Professional', 
                      price: '1.499€', 
                      desc: 'A solução completa para operadores médios.',
                      features: ['Até 25 veículos', 'Gestão de 5 Armazéns', 'Blockchain Tracking', 'Suporte 24/7', 'API Access'],
                      popular: true
                    },
                    { 
                      name: 'Enterprise', 
                      price: 'Sob Consulta', 
                      desc: 'Para grandes corporações globais.',
                      features: ['Veículos Ilimitados', 'Armazéns Ilimitados', 'Custom Blockchain Node', 'Gestor de Conta Dedicado', 'SLA Garantido']
                    }
                  ].map((plan, i) => (
                    <div key={i} className={`relative bg-white rounded-3xl p-8 border ${plan.popular ? 'border-primary shadow-2xl scale-105 z-10' : 'border-slate-200 shadow-sm'} transition-all`}>
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                          Mais Popular
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                      <p className="text-sm text-slate-500 mb-6">{plan.desc}</p>
                      <div className="mb-8">
                        <span className="text-4xl font-black text-primary">{plan.price}</span>
                        {plan.price !== 'Sob Consulta' && <span className="text-slate-400 text-sm font-medium"> /mês</span>}
                      </div>
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3 text-sm text-slate-600">
                            <CheckCircle2 className="w-5 h-5 text-accent" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-primary text-white hover:bg-primary/90 shadow-lg' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                        Selecionar Plano
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 text-primary mb-6">
                <Anchor className="w-6 h-6" />
                <span className="text-lg font-bold">Logística Pro</span>
              </div>
              <p className="text-sm text-slate-500 mb-6">Liderando a transformação digital da logística global com segurança e inteligência.</p>
              <div className="flex gap-4">
                <Globe className="w-5 h-5 text-slate-400 hover:text-primary cursor-pointer" />
                <BarChart3 className="w-5 h-5 text-slate-400 hover:text-primary cursor-pointer" />
                <Anchor className="w-5 h-5 text-slate-400 hover:text-primary cursor-pointer" />
              </div>
            </div>
            
            {[
              { title: 'Empresa', links: ['Sobre Nós', 'Carreiras', 'Blog', 'Contactos'] },
              { title: 'Plataforma', links: ['Funcionalidades', 'API Docs', 'Preços', 'Suporte Técnico'] },
              { title: 'Legal', links: ['Privacidade', 'Termos de Uso', 'Cookies', 'Segurança'] }
            ].map((section, i) => (
              <div key={i}>
                <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-wider">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-600 hover:text-primary transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">© 2024 Logística Pro S.A. Todos os direitos reservados.</p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Globe className="w-4 h-4" />
              <span>Português (Portugal)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

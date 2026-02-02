
import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, Coins, Map as MapIcon, 
  ChevronLeft, CheckCircle2, 
  Trophy, Sparkles, Loader2, Send,
  Zap, User, Phone, ChevronDown, CheckSquare, Square,
  ClipboardList, Gift, AlertCircle, FileText, Info
} from 'lucide-react';
import { FormData, Vocation, Quest, PaymentMethod, ServiceLocation } from '../types';
import { submitToGoogleSheets } from '../services/sheetsService';

interface RegistrationFormProps {
  onBack: () => void;
}

interface ThemeConfig {
  name: string;
  color: string;
  glow: string;
}

const themes: Record<string, ThemeConfig> = {
  [Quest.ROTTEN_BLOOD]: {
    name: 'ROTTEN BLOOD',
    color: '#ff0000',
    glow: 'rgba(255, 0, 0, 0.4)',
  },
  [Quest.PRIMAL_ORDEAL]: {
    name: 'PRIMAL ORDEAL',
    color: '#fbbf24', 
    glow: 'rgba(251, 191, 36, 0.4)',
  },
  [Quest.SOUL_WAR]: {
    name: 'SOUL WAR',
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.4)',
  },
  [Quest.GRAVEBORN]: {
    name: 'GRAVEBORN',
    color: '#00f2ff',
    glow: 'rgba(0, 242, 255, 0.4)',
  },
  'DEFAULT': {
    name: 'ESCOLHA SUA JORNADA',
    color: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.1)',
  }
};

const questIcons: Record<string, string> = {
  [Quest.ROTTEN_BLOOD]: '🩸',
  [Quest.PRIMAL_ORDEAL]: '👾',
  [Quest.SOUL_WAR]: '👻',
  [Quest.GRAVEBORN]: '⚰️'
};

const vocationIcons: Record<string, string> = {
  [Vocation.EK]: '⚔️',
  [Vocation.ED]: '❄️',
  [Vocation.MS]: '🔥',
  [Vocation.EX_MONK]: '👊',
  [Vocation.RP]: '🏹'
};

const paymentIcons: Record<string, string> = {
  [PaymentMethod.COINS]: '🤑',
  [PaymentMethod.PERCENTAGE]: '💰',
  [PaymentMethod.CLOSED_PT]: '👥',
  [PaymentMethod.TO_DECIDE]: '❓',
  [PaymentMethod.FIXED_FEE]: '💵'
};

const locationIcons: Record<string, string> = {
  [ServiceLocation.KALIBRA]: '🌏',
  [ServiceLocation.OTHER]: '🪐'
};

// Dados detalhados para o Popup
const questInfo: Record<string, { requirements: string[], vocations: string[], rewards: string[], note?: string }> = {
  [Quest.ROTTEN_BLOOD]: {
    requirements: [
      '5kk para a entrada da Quest ou 2 Bloody Tears',
      '3kk por tentativa (Refill)'
    ],
    vocations: [
      '⚔️ EK 650+',
      '❄️ ED 450+',
      '🔥 MS 450+',
      '🏹 RP 550+',
      '👊 EM 500+'
    ],
    rewards: [
      '🥇 Sanguine Item bis (aleatório)',
      '1️⃣ Com pequena chance de Double Bag'
    ]
  },
  [Quest.PRIMAL_ORDEAL]: {
    requirements: [
      'Within The Tides Quest ( Requisito mínimo as missões: Of Feathers and Flowers/ -Star-Crossed Lovers)',
      '6kk para os 12 dias (Refill)'
    ],
    vocations: [
      '⚔️ EK 500+',
      '❄️ ED 400+',
      '🔥 MS 400+',
      '🏹 RP 400+',
      '👊 EM 450+'
    ],
    rewards: [
      '1️⃣ Primal Item bis (aleatório)'
    ]
  },
  [Quest.SOUL_WAR]: {
    requirements: [
      'Ter completado a Feaster of Souls Quest (Ter as 3 missões completas)',
      '5kk (Refill)'
    ],
    vocations: [
      '⚔️ EK 500+',
      '❄️ ED 300+',
      '🔥 MS 300+',
      '🏹 RP 300+',
      '👊 EM 450+'
    ],
    rewards: [
      '1️⃣ Soul Item bis (aleatório)'
    ],
    note: 'Tem interesse em você comandar o seu boneco na Soul War Quest? Lembre-se! Temos essa opção também!!!'
  },
  [Quest.GRAVEBORN]: {
    requirements: [
      '2kk (Refill)'
    ],
    vocations: [
      '⚔️ EK 700+',
      '❄️ ED 700+',
      '🔥 MS 700+',
      '🏹 RP 700+',
      '👊 EM 700+'
    ],
    rewards: [
      '1️⃣ Crypt Rune (aleatória) - (Fiery, Icy, Deathly, Ancient, Necromantic)'
    ],
    note: 'Observação: Necessária pra trocar por um dos itens Bis Crypt (lembrando que precisa de 5 Crypts Runes diferentes pra trocar por um item aleatório). Acesso a Draconia e as hunts: Outer Crypt, Inner Crypt e Unhallowed Crypt'
  }
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeThemeKey, setActiveThemeKey] = useState<string>('DEFAULT');
  const [isQuestMenuOpen, setIsQuestMenuOpen] = useState(false);
  const [isVocationMenuOpen, setIsVocationMenuOpen] = useState(false);
  const [isPaymentMenuOpen, setIsPaymentMenuOpen] = useState(false);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [hoveredQuest, setHoveredQuest] = useState<string | null>(null);
  
  const questDropdownRef = useRef<HTMLDivElement>(null);
  const vocationDropdownRef = useRef<HTMLDivElement>(null);
  const paymentDropdownRef = useRef<HTMLDivElement>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    quest: '',
    charName: '',
    charLevel: '',
    vocation: '',
    paymentMethod: '',
    serviceLocation: '',
    realLifeName: '',
    phone: ''
  });

  const currentTheme = themes[activeThemeKey] || themes['DEFAULT'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (questDropdownRef.current && !questDropdownRef.current.contains(event.target as Node)) {
        setIsQuestMenuOpen(false);
      }
      if (vocationDropdownRef.current && !vocationDropdownRef.current.contains(event.target as Node)) {
        setIsVocationMenuOpen(false);
      }
      if (paymentDropdownRef.current && !paymentDropdownRef.current.contains(event.target as Node)) {
        setIsPaymentMenuOpen(false);
      }
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        setIsLocationMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuestSelect = (q: string) => {
    setFormData(prev => ({ ...prev, quest: q }));
    setActiveThemeKey(q);
    setIsQuestMenuOpen(false);
  };

  const handleVocationSelect = (v: string) => {
    setFormData(prev => ({ ...prev, vocation: v }));
    setIsVocationMenuOpen(false);
  };

  const handlePaymentSelect = (p: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: p }));
    setIsPaymentMenuOpen(false);
  };

  const handleLocationSelect = (l: string) => {
    setFormData(prev => ({ ...prev, serviceLocation: l }));
    setIsLocationMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.quest) return;
    setIsSubmitting(true);
    const success = await submitToGoogleSheets(formData);
    setIsSubmitting(false);
    if (success) setIsSuccess(true);
  };

  const fieldColor = formData.quest ? currentTheme.color : undefined;

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 text-center py-20 animate-[fadeIn_0.5s_ease-out]">
        <div className="inline-block p-8 rounded-full mb-10 border-2 shadow-2xl transition-all duration-700"
          style={{ backgroundColor: `${currentTheme.color}22`, borderColor: `${currentTheme.color}88` }}>
          <CheckCircle2 className="w-20 h-20" style={{ color: currentTheme.color }} />
        </div>
        <h2 className="text-4xl font-gamer font-black text-white mb-8 uppercase tracking-tighter">MISSÃO <span style={{ color: currentTheme.color }}>CONFIRMADA!</span></h2>
        <button onClick={onBack} className="px-10 py-4 bg-white/5 border border-gray-700 text-white font-gamer rounded-xl mx-auto flex items-center gap-2 hover:border-white transition-all">
          <ChevronLeft className="w-5 h-5" /> Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-[90vh] transition-all duration-1000">
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-all duration-1000 ease-in-out opacity-30"
        style={{ 
          background: formData.quest 
            ? `radial-gradient(circle at 50% 50%, ${currentTheme.color}33 0%, transparent 70%)` 
            : 'none'
        }}
      ></div>

      <div className="max-w-5xl mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <button onClick={onBack} className="p-3 rounded-xl bg-black/40 border border-white/10 text-gray-400 hover:text-white transition-all">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-3xl font-gamer font-black text-white uppercase tracking-tighter">Request <span className="transition-colors duration-1000" style={{ color: currentTheme.color }}>Service</span></h2>
            <p className="text-[10px] font-gamer text-gray-500 uppercase tracking-widest mt-1">Status: {currentTheme.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. QUAL QUEST GOSTARIA DE FAZER? (B) */}
            <div className={`relative ${isQuestMenuOpen ? 'z-50' : 'z-20'}`} ref={questDropdownRef}>
              <CompactCard icon={<Trophy />} label="QUAL QUEST GOSTARIA DE FAZER? *" color={currentTheme.color}>
                <div 
                  onClick={() => setIsQuestMenuOpen(!isQuestMenuOpen)}
                  className="w-full flex items-center justify-between cursor-pointer py-1"
                >
                  <span className={`text-sm font-bold ${formData.quest ? 'text-white' : 'text-gray-500'}`}>
                    {formData.quest ? (
                      <span className="flex items-center gap-2">
                        <span>{questIcons[formData.quest]}</span> {formData.quest}
                      </span>
                    ) : 'Selecione a Quest'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isQuestMenuOpen ? 'rotate-180' : ''}`} />
                </div>
                {isQuestMenuOpen && (
                  <div className="absolute left-0 right-0 top-[110%] z-[60] bg-[#0a0a0c] border border-white/20 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-[fadeIn_0.2s_ease-out]">
                    {Object.values(Quest).map(q => {
                      const questTheme = themes[q];
                      return (
                        <div 
                          key={q} 
                          onMouseEnter={() => setHoveredQuest(q)}
                          onMouseLeave={() => setHoveredQuest(null)}
                          onClick={() => handleQuestSelect(q)}
                          className={`relative flex items-center gap-3 p-4 hover:bg-white/10 transition-all cursor-pointer border-b border-white/5 last:border-none last:rounded-b-xl first:rounded-t-xl ${formData.quest === q ? 'bg-white/10' : ''}`}
                        >
                           {formData.quest === q ? <CheckSquare className="w-5 h-5" style={{ color: currentTheme.color }} /> : <Square className="w-5 h-5 text-gray-700" />}
                           <span className="text-xl">{questIcons[q]}</span>
                           <span className={`text-sm font-bold ${formData.quest === q ? 'text-white' : 'text-gray-400'}`}>{q}</span>

                           {hoveredQuest === q && questInfo[q] && (
                             <div 
                               className="absolute left-[105%] top-0 w-[320px] bg-[#0d0d0f] border rounded-xl p-5 z-[100] animate-[fadeIn_0.2s_ease-out] hidden md:block backdrop-blur-xl"
                               style={{ 
                                 borderColor: `${questTheme.color}44`,
                                 boxShadow: `0 0 40px ${questTheme.color}15`
                               }}
                             >
                               <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                                 <span className="text-xl">{questIcons[q]}</span>
                                 <h4 className="font-gamer font-bold text-white text-xs uppercase tracking-tight">{q}</h4>
                               </div>
                               
                               <div className="space-y-4">
                                 <div>
                                   <div className="flex items-center gap-1.5 text-[9px] font-gamer text-gray-500 uppercase tracking-widest mb-2">
                                     <FileText className="w-3 h-3" /> Requerimentos:
                                   </div>
                                   <div className="space-y-1.5 pl-1">
                                     {questInfo[q].requirements.map((req, i) => (
                                       <div key={i} className="flex items-start gap-2 text-[11px] text-gray-300 font-medium leading-tight">
                                         <div 
                                           className="w-3.5 h-3.5 border rounded flex items-center justify-center flex-shrink-0"
                                           style={{ backgroundColor: `${questTheme.color}22`, borderColor: `${questTheme.color}44` }}
                                         >
                                            <CheckCircle2 className="w-2.5 h-2.5" style={{ color: questTheme.color }} />
                                         </div>
                                         {req}
                                       </div>
                                     ))}
                                   </div>
                                 </div>

                                 <div className="space-y-1 pl-1 border-y border-white/5 py-3">
                                   {questInfo[q].vocations.map((voc, i) => (
                                     <div key={i} className="text-[11px] text-gray-300 font-bold tracking-tight">
                                       {voc}
                                     </div>
                                   ))}
                                 </div>

                                 {questInfo[q].note && (
                                   <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
                                      <p className="text-[10px] text-gray-200 font-medium italic leading-relaxed">
                                        {questInfo[q].note}
                                      </p>
                                   </div>
                                 )}

                                 <div>
                                   <div className="flex items-center gap-1.5 text-[9px] font-gamer uppercase tracking-widest mb-2" style={{ color: '#FFD700' }}>
                                     <Trophy className="w-3 h-3" /> Recompensa
                                   </div>
                                   <div className="space-y-2 pl-1">
                                     {questInfo[q].rewards.map((rew, i) => (
                                       <div key={i} className="flex items-start gap-2 text-[11px] text-gray-200 font-medium leading-snug">
                                         {rew}
                                       </div>
                                     ))}
                                   </div>
                                 </div>
                               </div>

                               <div 
                                 className="absolute top-6 left-[-6px] w-3 h-3 bg-[#0d0d0f] border-l border-b rotate-45"
                                 style={{ borderColor: `${questTheme.color}44` }}
                               ></div>
                             </div>
                           )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CompactCard>
            </div>

            {/* 2. LEVEL DO SEU CHAR (C) */}
            <div className="z-10">
              <CompactCard icon={<Zap />} label="LEVEL DO SEU CHAR *" color={fieldColor || "#39ff14"}>
                <input 
                  required type="text" name="charLevel" placeholder="Ex: 800"
                  value={formData.charLevel} onChange={handleChange}
                  className="w-full bg-transparent text-white focus:outline-none text-sm font-bold placeholder:text-gray-700"
                />
              </CompactCard>
            </div>

            {/* 3. VOCAÇÃO DO SEU NOVO CHAR (D) */}
            <div className={`relative ${isVocationMenuOpen ? 'z-50' : 'z-20'}`} ref={vocationDropdownRef}>
              <CompactCard icon={<Shield />} label="VOCAÇÃO DO SEU NOVO CHAR *" color={fieldColor || "#fbbf24"}>
                <div 
                  onClick={() => setIsVocationMenuOpen(!isVocationMenuOpen)}
                  className="w-full flex items-center justify-between cursor-pointer py-1"
                >
                  <span className={`text-sm font-bold ${formData.vocation ? 'text-white' : 'text-gray-500'}`}>
                    {formData.vocation ? (
                      <span className="flex items-center gap-2">
                        <span>{vocationIcons[formData.vocation as Vocation]}</span> {formData.vocation}
                      </span>
                    ) : 'Selecione a Vocação'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isVocationMenuOpen ? 'rotate-180' : ''}`} />
                </div>
                {isVocationMenuOpen && (
                  <div className="absolute left-0 right-0 top-[110%] z-[60] bg-[#0a0a0c] border border-white/20 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-[fadeIn_0.2s_ease-out]">
                    {Object.values(Vocation).map(v => (
                      <div 
                        key={v} 
                        onClick={() => handleVocationSelect(v)}
                        className={`flex items-center gap-3 p-4 hover:bg-white/10 transition-all cursor-pointer border-b border-white/5 last:border-none ${formData.vocation === v ? 'bg-white/10' : ''}`}
                      >
                         {formData.vocation === v ? <CheckSquare className="w-5 h-5" style={{ color: fieldColor || '#fbbf24' }} /> : <Square className="w-5 h-5 text-gray-700" />}
                         <span className="text-xl">{vocationIcons[v]}</span>
                         <span className={`text-sm font-bold ${formData.vocation === v ? 'text-white' : 'text-gray-400'}`}>{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CompactCard>
            </div>

            {/* 4. FORMA DE PAGAMENTO (E) */}
            <div className={`relative ${isPaymentMenuOpen ? 'z-50' : 'z-20'}`} ref={paymentDropdownRef}>
              <CompactCard icon={<Coins />} label="FORMA DE PAGAMENTO *" color={fieldColor || "#00f2ff"}>
                <div 
                  onClick={() => setIsPaymentMenuOpen(!isPaymentMenuOpen)}
                  className="w-full flex items-center justify-between cursor-pointer py-1"
                >
                  <span className={`text-sm font-bold ${formData.paymentMethod ? 'text-white' : 'text-gray-500'}`}>
                    {formData.paymentMethod ? (
                      <span className="flex items-center gap-2">
                        <span>{paymentIcons[formData.paymentMethod as PaymentMethod]}</span> {formData.paymentMethod}
                      </span>
                    ) : 'Selecione o Pagamento'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isPaymentMenuOpen ? 'rotate-180' : ''}`} />
                </div>
                {isPaymentMenuOpen && (
                  <div className="absolute left-0 right-0 top-[110%] z-[60] bg-[#0a0a0c] border border-white/20 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-[fadeIn_0.2s_ease-out]">
                    {Object.values(PaymentMethod).map(p => (
                      <div 
                        key={p} 
                        onClick={() => handlePaymentSelect(p)}
                        className={`flex items-center gap-3 p-4 hover:bg-white/10 transition-all cursor-pointer border-b border-white/5 last:border-none ${formData.paymentMethod === p ? 'bg-white/10' : ''}`}
                      >
                         {formData.paymentMethod === p ? <CheckSquare className="w-5 h-5" style={{ color: fieldColor || '#00f2ff' }} /> : <Square className="w-5 h-5 text-gray-700" />}
                         <span className="text-xl">{paymentIcons[p]}</span>
                         <span className={`text-sm font-bold ${formData.paymentMethod === p ? 'text-white' : 'text-gray-400'}`}>{p}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CompactCard>
            </div>

            {/* 5. LOCAL DO SERVICE (F) */}
            <div className={`relative ${isLocationMenuOpen ? 'z-50' : 'z-20'}`} ref={locationDropdownRef}>
              <CompactCard icon={<MapIcon />} label="LOCAL DO SERVICE ?* *" color={fieldColor || "#bc13fe"}>
                <div 
                  onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
                  className="w-full flex items-center justify-between cursor-pointer py-1"
                >
                  <span className={`text-sm font-bold ${formData.serviceLocation ? 'text-white' : 'text-gray-500'}`}>
                    {formData.serviceLocation ? (
                      <span className="flex items-center gap-2">
                        <span>{locationIcons[formData.serviceLocation as ServiceLocation]}</span> {formData.serviceLocation}
                      </span>
                    ) : 'Selecione o Local'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isLocationMenuOpen ? 'rotate-180' : ''}`} />
                </div>
                {isLocationMenuOpen && (
                  <div className="absolute left-0 right-0 top-[110%] z-[60] bg-[#0a0a0c] border border-white/20 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-[fadeIn_0.2s_ease-out]">
                    {Object.values(ServiceLocation).map(l => (
                      <div 
                        key={l} 
                        onClick={() => handleLocationSelect(l)}
                        className={`flex items-center gap-3 p-4 hover:bg-white/10 transition-all cursor-pointer border-b border-white/5 last:border-none ${formData.serviceLocation === l ? 'bg-white/10' : ''}`}
                      >
                         {formData.serviceLocation === l ? <CheckSquare className="w-5 h-5" style={{ color: fieldColor || '#bc13fe' }} /> : <Square className="w-5 h-5 text-gray-700" />}
                         <span className="text-xl">{locationIcons[l]}</span>
                         <span className={`text-sm font-bold ${formData.serviceLocation === l ? 'text-white' : 'text-gray-400'}`}>{l}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CompactCard>
            </div>

            {/* 6. QUAL É O SEU NOME RL? (G) */}
            <div className="z-10">
              <CompactCard icon={<Sparkles />} label="QUAL É O SEU NOME RL ? *" color={fieldColor || "#39ff14"}>
                <input 
                  required type="text" name="realLifeName" placeholder="Seu nome real"
                  value={formData.realLifeName} onChange={handleChange}
                  className="w-full bg-transparent text-white focus:outline-none text-sm font-bold placeholder:text-gray-700"
                />
              </CompactCard>
            </div>

            {/* 7. TELEFONE DE CONTATO (H) */}
            <div className="z-10">
              <CompactCard icon={<Phone />} label="TELEFONE DE CONTATO ? *" color={fieldColor || "#ffffff"}>
                <input 
                  required type="tel" name="phone" placeholder="Ex: 551199999-9999"
                  value={formData.phone} onChange={handleChange}
                  className="w-full bg-transparent text-white focus:outline-none text-sm font-bold placeholder:text-gray-700"
                />
              </CompactCard>
            </div>

            {/* 8. NOME DO SEU CHAR (J) */}
            <div className="z-10">
              <CompactCard icon={<User />} label="NOME DO SEU CHAR *" color={fieldColor || "#bc13fe"}>
                <input 
                  required type="text" name="charName" placeholder="Ex: Ragha Wizard"
                  value={formData.charName} onChange={handleChange}
                  className="w-full bg-transparent text-white focus:outline-none text-sm font-bold placeholder:text-gray-700"
                />
              </CompactCard>
            </div>

          </div>

          <button 
            type="submit"
            disabled={isSubmitting || !formData.quest}
            className="w-full py-6 rounded-2xl transition-all duration-700 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-30 shadow-2xl mt-4 font-gamer text-black font-black tracking-[0.4em] uppercase text-xl relative overflow-hidden group"
            style={{ backgroundColor: currentTheme.color }}
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            {isSubmitting ? 'PROCESSANDO...' : 'ENVIAR REQUISIÇÃO'}
          </button>
        </form>
      </div>
    </div>
  );
};

interface CompactCardProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  color: string;
}

const CompactCard: React.FC<CompactCardProps> = ({ icon, label, children, color }) => {
  return (
    <div className="bg-[#0a0a0c]/80 backdrop-blur-md border border-white/5 p-5 rounded-2xl flex flex-col gap-4 group transition-all hover:border-white/10 shadow-lg h-full">
      <div className="flex items-center gap-4">
        <div 
          className="p-2.5 rounded-xl bg-black/40 border-2 transition-all duration-700 flex items-center justify-center flex-shrink-0"
          style={{ borderColor: `${color}66`, color: color }}
        >
          {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
        </div>
        <label className="text-sm font-gamer font-bold tracking-[0.05em] text-gray-400 uppercase leading-tight select-none">
          {label}
        </label>
      </div>
      
      <div className="relative bg-black/40 border border-white/5 rounded-xl p-4 focus-within:border-white/20 transition-all flex items-center min-h-[56px]">
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;


import React, { useState } from 'react';
import { 
  Swords, Shield, Coins, Map as MapIcon, 
  User, Phone, ChevronLeft, CheckCircle2, 
  Trophy, Sparkles, Loader2, Send, Wand2
} from 'lucide-react';
import { FormData, Vocation, Quest } from '../types';
import { submitToGoogleSheets } from '../services/sheetsService';

interface RegistrationFormProps {
  onBack: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await submitToGoogleSheets(formData);
    
    setIsSubmitting(false);
    if (success) {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 text-center py-20 animate-[fadeIn_0.5s_ease-out]">
        <div className="inline-block p-6 rounded-full bg-[#39ff14]/10 border-2 border-[#39ff14]/30 mb-8 animate-pulse shadow-[0_0_30px_rgba(57,255,20,0.2)]">
          <CheckCircle2 className="w-16 h-16 text-[#39ff14]" />
        </div>
        <h2 className="text-4xl font-gamer font-black text-white mb-6 tracking-tighter">
          REQUIZIÇÃO <br />
          <span className="text-[#39ff14] neon-glow-green">ENVIADA COM SUCESSO!</span>
        </h2>
        <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-md mx-auto">
          O Ragha Service entrará em contato em breve para prosseguir com sua jornada. Fique atento às suas notificações!
        </p>
        <button 
          onClick={onBack}
          className="px-10 py-4 bg-white/5 border border-gray-700 text-white font-gamer tracking-widest uppercase rounded-lg hover:border-[#00f2ff] hover:text-[#00f2ff] transition-all flex items-center gap-2 mx-auto"
        >
          <ChevronLeft className="w-5 h-5" /> Voltar ao Início
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-4 mb-10">
        <button 
          onClick={onBack}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-[#00f2ff] hover:border-[#00f2ff] transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-3xl font-gamer font-bold text-white tracking-tight">FORMULÁRIO DE <span className="text-[#bc13fe]">SERVICE</span></h2>
          <p className="text-gray-500 text-sm uppercase tracking-widest">Preencha os dados da sua quest</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: Quest Selection */}
          <FormCard icon={<Trophy className="text-[#00f2ff]" />} label="Qual quest gostaria de fazer?">
            <select 
              required
              name="quest"
              value={formData.quest}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00f2ff] transition-all"
            >
              <option value="" disabled>Selecione a Quest</option>
              {Object.values(Quest).map(q => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </FormCard>

          {/* Card: Character Name */}
          <FormCard icon={<User className="text-[#bc13fe]" />} label="Nome do Personagem">
            <input 
              required
              type="text"
              name="charName"
              placeholder="Ex: Ragha Wizard"
              value={formData.charName}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#bc13fe] transition-all"
            />
          </FormCard>

          {/* Card: Level */}
          <FormCard icon={<Sparkles className="text-[#39ff14]" />} label="Level do Personagem">
            <input 
              required
              type="number"
              name="charLevel"
              placeholder="Ex: 800"
              value={formData.charLevel}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#39ff14] transition-all"
            />
          </FormCard>

          {/* Card: Vocation */}
          <FormCard icon={<Shield className="text-[#facc15]" />} label="Vocação">
            <select 
              required
              name="vocation"
              value={formData.vocation}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#facc15] transition-all"
            >
              <option value="" disabled>Selecione a Vocação</option>
              {Object.values(Vocation).map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </FormCard>

          {/* Card: Payment */}
          <FormCard icon={<Coins className="text-[#00f2ff]" />} label="Forma de Pagamento">
            <input 
              required
              type="text"
              name="paymentMethod"
              placeholder="Ex: Tibia Coins ou PIX"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00f2ff] transition-all"
            />
          </FormCard>

          {/* Card: Location */}
          <FormCard icon={<MapIcon className="text-[#bc13fe]" />} label="Local do Service">
            <input 
              required
              type="text"
              name="serviceLocation"
              placeholder="Ex: Servidor de Origem"
              value={formData.serviceLocation}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#bc13fe] transition-all"
            />
          </FormCard>

          {/* Card: RL Name */}
          <FormCard icon={<Wand2 className="text-[#39ff14]" />} label="Nome RL">
            <input 
              required
              type="text"
              name="realLifeName"
              placeholder="Seu nome real"
              value={formData.realLifeName}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#39ff14] transition-all"
            />
          </FormCard>

          {/* Card: Phone */}
          <FormCard icon={<Phone className="text-white" />} label="Telefone de Contato">
            <input 
              required
              type="tel"
              name="phone"
              placeholder="Ex: (11) 99999-9999"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/50 transition-all"
            />
          </FormCard>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full group relative py-5 bg-gradient-to-r from-[#00f2ff] to-[#bc13fe] rounded-xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(0,242,255,0.2)]"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <span className="relative z-10 font-gamer text-black font-black tracking-[0.2em] uppercase flex items-center justify-center gap-3 text-lg">
            {isSubmitting ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" /> Processando Transação...
              </>
            ) : (
              <>
                <Send className="w-6 h-6" /> Enviar Requisição
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  );
};

interface FormCardProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

const FormCard: React.FC<FormCardProps> = ({ icon, label, children }) => {
  return (
    <div className="bg-[#0a0a0c] border border-white/5 p-5 rounded-2xl hover:border-white/20 transition-all shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
          {icon}
        </div>
        <label className="font-gamer text-xs tracking-widest uppercase text-gray-400">{label}</label>
      </div>
      {children}
    </div>
  );
};

export default RegistrationForm;

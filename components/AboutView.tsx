
import React from 'react';
import { ChevronLeft, Trophy, FileText, CheckCircle2, Shield, Swords, Sparkles } from 'lucide-react';

interface AboutViewProps {
  onBack: () => void;
}

const AboutView: React.FC<AboutViewProps> = ({ onBack }) => {
  const quests = [
    {
      icon: '🩸',
      name: 'Rotten Blood Quest',
      color: '#ff0000',
      requirements: [
        '5kk para a entrada da Quest ou 2 Bloody Tears',
        '3kk por tentativa (Refill)'
      ],
      vocations: [
        '⚔️ EK 650+',
        '❄️ ED 450+',
        '🔥 MS 450+',
        '🏹 RP 550+',
        '🥊 EM 500+'
      ],
      rewards: ['1️⃣ Sanguine Item bis (aleatório) Com pequena chance de Double Bag']
    },
    {
      icon: '👾',
      name: 'Primal Ordeal Quest',
      color: '#fbbf24',
      requirements: [
        'Within The Tides Quest (Requisito mínimo as missões: Of Feathers and Flowers / Star-Crossed Lovers)',
        '6kk para os 12 dias (Refill)'
      ],
      vocations: [
        '⚔️ EK 500+',
        '❄️ ED 400+',
        '🔥 MS 400+',
        '🏹 RP 400+',
        '🥊 EM 450+'
      ],
      rewards: ['1️⃣ Primal Item bis (aleatório)']
    },
    {
      icon: '👻',
      name: 'Soul War Quest',
      color: '#a855f7',
      requirements: [
        'Ter completado a Feaster of Souls Quest (Ter as 3 missões completas)',
        '5kk (Refill)'
      ],
      vocations: [
        '⚔️ EK 500+',
        '❄️ ED 300+',
        '🔥 MS 300+',
        '🏹 RP 300+',
        '🥊 EM 450+'
      ],
      note: 'Tem interesse em você comandar o seu boneco na Soul War Quest? Lembre-se! Temos essa opção também!!!',
      rewards: ['1️⃣ Soul Item bis (aleatório)']
    },
    {
      icon: '⚰️',
      name: 'The Roost of the Graveborn Quest',
      color: '#00f2ff',
      requirements: [
        '2kk (Refill)'
      ],
      vocations: [
        '⚔️ EK 700+',
        '❄️ ED 700+',
        '🔥 MS 700+',
        '🏹 RP 700+',
        '🥊 EM 700+'
      ],
      rewards: [
        '1️⃣ Crypt Rune (aleatória) - (Fiery, Icy, Deathly, Ancient, Necromantic)'
      ],
      footerNote: 'Observação: Necessária pra trocar por um dos itens Bis Crypt (lembrando que precisa de 5 Crypts Runes diferentes pra trocar por um item aleatório). Acesso a Draconia e as hunts: Outer Crypt, Inner Crypt e Unhallowed Crypt'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={onBack} className="p-3 rounded-xl bg-black/40 border border-white/10 text-gray-400 hover:text-white transition-all">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-3xl font-gamer font-black text-white uppercase tracking-tighter">ANOTA <span className="text-[#00f2ff]">AI!</span></h2>
          <p className="text-[10px] font-gamer text-gray-500 uppercase tracking-widest mt-1">Guia de Quests e Serviços</p>
        </div>
      </div>

      {/* Hero Service Box */}
      <div className="bg-gradient-to-r from-black/80 to-[#bc13fe]/10 border border-[#bc13fe]/30 p-8 rounded-3xl mb-16 shadow-[0_0_40px_rgba(188,19,254,0.1)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
           <Swords className="w-32 h-32 text-white" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#bc13fe]/20 border border-[#bc13fe]/40 rounded-full text-[#bc13fe] text-[10px] font-gamer uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" /> Proposta Especial
          </div>
          <h3 className="text-2xl md:text-3xl font-gamer font-bold text-white mb-4 leading-tight">
            Quer ver seu <span className="text-[#39ff14]">main char 1000+</span> na rotação de Soul War e Rotten Blood?
          </h3>
          <p className="text-lg md:text-xl text-gray-300 font-light mb-6">
            E ainda participar das bags que vierem em todos os main char nas quests? Fale direto com a gente que temos uma <span className="text-white font-bold">proposta boa pra você!!!</span>
          </p>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-gamer tracking-widest text-gray-400">
              #SOULWAR
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-gamer tracking-widest text-gray-400">
              #ROTTENBLOOD
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-gamer tracking-widest text-gray-400">
              #1000PLUS
            </div>
          </div>
        </div>
      </div>

      {/* Quests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {quests.map((quest, idx) => (
          <div 
            key={idx}
            className="bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-white/10 transition-all shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl">{quest.icon}</span>
              <h4 className="text-xl font-gamer font-bold text-white uppercase tracking-tight" style={{ color: quest.color }}>
                {quest.name}
              </h4>
            </div>

            <div className="space-y-8">
              {/* Requirements */}
              <div>
                <div className="flex items-center gap-2 text-[10px] font-gamer text-gray-500 uppercase tracking-[0.2em] mb-4">
                  <FileText className="w-3.5 h-3.5" /> Requerimentos
                </div>
                <div className="space-y-3">
                  {quest.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-300 font-medium">
                      <div className="mt-0.5 w-4 h-4 rounded border border-white/10 flex items-center justify-center bg-white/5">
                        <CheckCircle2 className="w-3 h-3" style={{ color: quest.color }} />
                      </div>
                      {req}
                    </div>
                  ))}
                </div>
              </div>

              {/* Vocations/Levels */}
              <div className="grid grid-cols-2 gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                {quest.vocations.map((voc, i) => (
                  <div key={i} className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                    {voc}
                  </div>
                ))}
              </div>

              {/* Note if exists */}
              {quest.note && (
                <div className="bg-[#39ff14]/5 border border-[#39ff14]/20 p-4 rounded-2xl italic text-xs text-gray-300 leading-relaxed">
                  {quest.note}
                </div>
              )}

              {/* Rewards */}
              <div>
                <div className="flex items-center gap-2 text-[10px] font-gamer uppercase tracking-[0.2em] mb-4" style={{ color: '#FFD700' }}>
                  <Trophy className="w-3.5 h-3.5" /> Recompensa
                </div>
                <div className="space-y-3">
                  {quest.rewards.map((reward, i) => (
                    <div key={i} className="text-sm text-gray-100 font-bold bg-white/5 p-4 rounded-2xl border border-white/10">
                      {reward}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Note */}
              {quest.footerNote && (
                <div className="pt-6 border-t border-white/5">
                   <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                      {quest.footerNote}
                   </p>
                </div>
              )}
            </div>

            {/* Background Glow */}
            <div 
              className="absolute -bottom-24 -right-24 w-64 h-64 blur-[120px] opacity-10 pointer-events-none"
              style={{ backgroundColor: quest.color }}
            ></div>
          </div>
        ))}
      </div>

      {/* Final Action Button */}
      <div className="mt-16 flex justify-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-gamer tracking-widest text-gray-400 hover:text-white hover:border-white transition-all"
        >
          Voltar ao Topo
        </button>
      </div>
    </div>
  );
};

export default AboutView;

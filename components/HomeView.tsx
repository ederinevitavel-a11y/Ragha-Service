
import React from 'react';
import { ArrowRight, Swords, Sparkles, Wand2, ShieldCheck } from 'lucide-react';

interface HomeViewProps {
  onStart: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onStart }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-12 py-10">
        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left space-y-8 animate-[fadeIn_0.8s_ease-out]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00f2ff] text-xs font-gamer tracking-widest uppercase">
            <Sparkles className="w-3 h-3" />
            Level Up Your Char
          </div>
          
          <h1 className="text-5xl md:text-7xl font-gamer font-black leading-tight">
            SEJA MUITO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#bc13fe] to-[#39ff14] neon-glow-blue">
              BEM-VINDO
            </span>
          </h1>

          <div className="bg-[#0a0a0c] border-l-4 border-[#00f2ff] p-6 rounded-r-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <Wand2 className="w-16 h-16 text-[#00f2ff]" />
            </div>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
              Realizamos as quests <span className="text-white font-bold">Soul War</span>, 
              <span className="text-white font-bold"> Rotten Blood</span> e 
              <span className="text-white font-bold"> Primal Ordeal Quest</span>.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-400 text-lg">
              Tem interesse? Só preencher nosso formulário de requisição. <br />
              <span className="text-[#39ff14] font-medium italic">Você é da MissClick e quer você mesmo comandar seu boneco na Soul War?</span>
            </p>
            <p className="text-xl flex items-center justify-center lg:justify-start gap-2">
              Fale direto comigo <span className="text-2xl">🧙‍♂️⚔️</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button 
              onClick={onStart}
              className="group relative px-8 py-4 bg-[#00f2ff] text-black font-gamer font-bold tracking-widest uppercase rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <span className="relative z-10 flex items-center gap-2">
                Iniciar Requisição <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="px-8 py-4 border border-gray-700 text-white font-gamer tracking-widest uppercase rounded-lg hover:border-[#bc13fe] hover:text-[#bc13fe] transition-all">
              Saiba Mais
            </button>
          </div>
        </div>

        {/* Wizard Image / Visual Section */}
        <div className="flex-1 relative flex justify-center lg:justify-end animate-[slideIn_1s_ease-out]">
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,242,255,0.2)] group">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00f2ff]/20 to-transparent z-10"></div>
            
            {/* The Image from user prompt description */}
            <img 
              src="https://picsum.photos/seed/ragha-wizard/800/800" 
              alt="Ragha Service Wizard" 
              className="w-full h-full object-cover grayscale-[0.2] group-hover:scale-110 transition-transform duration-700"
            />

            {/* Floating UI Elements */}
            <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md border border-[#00f2ff]/30 p-3 rounded-xl animate-bounce">
              <ShieldCheck className="w-8 h-8 text-[#00f2ff]" />
            </div>
            
            <div className="absolute bottom-4 right-4 z-20 bg-black/60 backdrop-blur-md border border-[#bc13fe]/30 p-4 rounded-xl text-right">
              <div className="text-[#bc13fe] text-xs font-gamer tracking-tighter">SERVER STATUS</div>
              <div className="text-white font-bold flex items-center gap-2">
                ONLINE <div className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse"></div>
              </div>
            </div>

            {/* Corner Details */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00f2ff]"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#bc13fe]"></div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-16">
        {[
          { label: 'Quests Concluídas', value: '1.2k+', color: 'text-[#00f2ff]' },
          { label: 'Satisfação', value: '100%', color: 'text-[#bc13fe]' },
          { label: 'Time de Service', value: '15+', color: 'text-[#39ff14]' },
          { label: 'Anos de Experiência', value: '4+', color: 'text-white' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.07] transition-colors">
            <div className={`text-3xl font-gamer font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-xs text-gray-400 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeView;

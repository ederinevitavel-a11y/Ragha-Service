
import React from 'react';
import { ArrowRight, Sparkles, Wand2, ShieldCheck, Snowflake } from 'lucide-react';

interface HomeViewProps {
  onStart: () => void;
  onAbout: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onStart, onAbout }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-12 py-10">
        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left space-y-8 animate-[fadeIn_0.8s_ease-out]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00f2ff] text-xs font-gamer tracking-widest uppercase">
            <Sparkles className="w-3 h-3" />
            Premium Services Quest
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
              Tem interesse? Só preencher nosso formulário de solicitação. <br />
              <span className="text-[#39ff14] font-medium italic">Você é da MissClick e quer você mesmo comandar seu boneco na Soul War?</span>
            </p>
            <p className="text-xl flex items-center justify-center lg:justify-start gap-2 text-white">
              Fale direto comigo <span className="text-2xl">🧙‍♂️✨</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button 
              onClick={onStart}
              className="group relative px-8 py-4 bg-[#00f2ff] text-black font-gamer font-bold tracking-widest uppercase rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,242,255,0.4)]"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <span className="relative z-10 flex items-center gap-2">
                START SERVICE <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button 
              onClick={onAbout}
              className="px-8 py-4 border border-gray-700 text-white font-gamer tracking-widest uppercase rounded-lg hover:border-[#bc13fe] hover:text-[#bc13fe] transition-all"
            >
              SAIBA MAIS
            </button>
          </div>
        </div>

        {/* Universe & Ice Text Section */}
        <div className="flex-1 relative flex justify-center lg:justify-end animate-[slideIn_1s_ease-out]">
          <div className="relative w-full max-w-lg aspect-square rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(0,242,255,0.2)] group bg-black border border-white/10">
            {/* Universe Background */}
            <img 
              src="https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=1200" 
              alt="Universe Background" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[10s] group-hover:scale-110"
            />
            
            {/* Frozen Overlays */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            <div className="absolute inset-0 z-10 bg-radial-gradient from-transparent to-[#00f2ff]/5"></div>

            {/* Ice Stylized Text */}
            <div className="relative z-20 w-full h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 animate-pulse">
                <Snowflake className="w-12 h-12 text-[#a5f3fc] drop-shadow-[0_0_10px_#fff]" />
              </div>
              <h2 className="ice-glow font-gamer text-5xl md:text-6xl font-black uppercase leading-none drop-shadow-2xl">
                RAGHA<br />
                <span className="text-4xl md:text-5xl">SERVICE</span>
              </h2>
              <div className="mt-6 flex gap-2">
                <div className="h-1 w-12 bg-white/20 rounded-full"></div>
                <div className="h-1 w-12 bg-[#00f2ff] rounded-full"></div>
                <div className="h-1 w-12 bg-white/20 rounded-full"></div>
              </div>
            </div>

            {/* Floating UI Elements */}
            <div className="absolute top-8 left-8 z-30 bg-white/5 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl animate-bounce">
              <ShieldCheck className="w-10 h-10 text-[#00f2ff] drop-shadow-[0_0_8px_#00f2ff]" />
            </div>

            <div className="absolute bottom-8 right-8 z-30 bg-black/80 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl text-right">
              <div className="text-white/40 text-[9px] font-gamer tracking-[0.2em] mb-1 uppercase">Thermal Protocol</div>
              <div className="text-[#a5f3fc] font-gamer font-black text-sm flex items-center justify-end gap-3">
                FROZEN <div className="w-2.5 h-2.5 rounded-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff] animate-pulse"></div>
              </div>
            </div>

            {/* Corner Decorative Borders (Icy Style) */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-white/40 rounded-tl-[3rem]"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-[#00f2ff] rounded-br-[3rem]"></div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-16">
        {[
          { label: 'Quests Concluídas', value: '1.2k+', color: 'text-[#00f2ff]' },
          { label: 'Satisfação', value: '100%', color: 'text-[#ffffff]' },
          { label: 'Time de Service', value: '15+', color: 'text-[#39ff14]' },
          { label: 'Anos de Experiência', value: '4+', color: 'text-[#a5f3fc]' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.07] transition-all hover:scale-105 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className={`text-3xl font-gamer font-bold ${stat.color} mb-1 relative z-10`}>{stat.value}</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] relative z-10 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeView;


import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Cpu, Wand2, Shield, Snowflake } from 'lucide-react';

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
          <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-[#0a0a0c]/80 border border-white/10 text-[#00f2ff] text-[10px] font-gamer tracking-[0.3em] uppercase shadow-[0_0_30px_rgba(0,242,255,0.1)] group transition-all hover:border-[#00f2ff]/40 hover:bg-black/90">
            <Cpu className="w-4 h-4 text-[#00f2ff] drop-shadow-[0_0_8px_rgba(0,242,255,0.6)] animate-pulse" />
            <span className="leading-none mt-0.5 font-bold">MYSTIC QUESTS SERVICE</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-gamer font-black leading-tight">
            SEJA MUITO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#a5f3fc] to-[#bc13fe] drop-shadow-[0_0_15px_rgba(0,242,255,0.3)] neon-glow-blue">
              BEM-VINDO
            </span>
          </h1>

          <div className="bg-[#0a0a0c] border-l-4 border-[#00f2ff] p-6 rounded-r-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-16 h-16 text-[#00f2ff]" />
            </div>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
              Realizamos as quests <span className="text-white font-bold">Soul War</span>, 
              <span className="text-white font-bold"> Rotten Blood</span>, 
              <span className="text-white font-bold"> Primal Ordeal Quest</span> e 
              <span className="text-white font-bold"> The Roost of the Graveborn Quest</span>.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-400 text-lg">
              Tem interesse? Só preencher nosso formulário de solicitação. <br />
              <span className="text-[#39ff14] font-medium italic">Nosso time está preparado para realizar the melhor service que o seu char poderia ter!</span>
            </p>
            <p className="text-xl flex items-center justify-center lg:justify-start gap-2 text-white font-gamer tracking-widest uppercase text-xs">
              Confiança e o nome de sempre! <span className="w-8 h-[1px] bg-[#00f2ff]"></span>
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
              className="px-8 py-4 border border-gray-700 text-white font-gamer tracking-widest uppercase rounded-lg hover:border-[#00f2ff] hover:text-[#00f2ff] transition-all"
            >
              SAIBA MAIS
            </button>
          </div>
        </div>

        {/* Brand Visualization (Frozen HUD Style) */}
        <div className="flex-1 relative flex justify-center lg:justify-end animate-[slideIn_1s_ease-out]">
          <div className="relative w-full max-w-lg aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(0,242,255,0.15)] group bg-[#050505] border border-white/10">
            
            {/* Ice Texture Background (Fundo de Frio) */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1516900448138-898700243b4d?q=80&w=1200&auto=format&fit=crop" 
                alt="Ice Texture" 
                className="w-full h-full object-cover opacity-40 brightness-50 grayscale-[0.2] transition-transform duration-[30s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] opacity-60"></div>
            </div>

            {/* Subtle Animated Grid Background */}
            <div className="absolute inset-0 bg-grid-dots opacity-20 z-10"></div>
            
            {/* Glowing Focal Point (Ice Reference) */}
            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#00f2ff] blur-[120px] opacity-10 animate-pulse z-10"></div>
            
            {/* HUD Overlay Elements */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40"></div>
            
            {/* HUD Centered Content */}
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 text-center">
              {/* Ice/Snowflake Icon */}
              <div className="mb-6 scale-125 relative">
                <Snowflake className="w-16 h-16 text-[#00f2ff] drop-shadow-[0_0_20px_#00f2ff] animate-spin-slow" />
                <div className="absolute inset-0 w-full h-full bg-[#00f2ff] blur-[20px] opacity-30 animate-pulse"></div>
              </div>
              
              <div className="flex flex-col items-center">
                <h2 className="ice-glow font-gamer text-5xl md:text-[4.5rem] font-black uppercase leading-[0.85] tracking-tighter drop-shadow-[0_8px_25px_rgba(0,0,0,1)]">
                  RAGHA
                </h2>
                <h2 className="font-gamer text-3xl md:text-[2.8rem] font-black uppercase leading-[1.1] tracking-[0.15em] text-[#00f2ff] drop-shadow-[0_4px_12px_rgba(0,242,255,0.4)]">
                  SERVICE
                </h2>
              </div>

              {/* HUD Progress bar dots */}
              <div className="mt-10 flex gap-4 opacity-80">
                <div className="h-1.5 w-10 bg-white/10 rounded-full"></div>
                <div className="h-1.5 w-16 bg-[#00f2ff] rounded-full shadow-[0_0_15px_#00f2ff]"></div>
                <div className="h-1.5 w-10 bg-white/10 rounded-full"></div>
              </div>
            </div>

            {/* Top Left Shield Icon */}
            <div className="absolute top-10 left-10 z-40 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-[0_0_20px_rgba(0,242,255,0.2)]">
              <ShieldCheck className="w-8 h-8 text-[#00f2ff] drop-shadow-[0_0_10px_#00f2ff]" />
            </div>

            {/* Decorative Corner Frames */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-white/5 rounded-tl-[3rem] z-40"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-[#00f2ff]/20 rounded-br-[3rem] z-40"></div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-16">
        {[
          { label: 'Quests Concluídas', value: '1.2k+', color: 'text-white', icon: <Sparkles className="w-3 h-3 mb-2 opacity-40" /> },
          { label: 'Satisfação', value: '100%', color: 'text-[#00f2ff]', icon: <Zap className="w-3 h-3 mb-2 opacity-40" /> },
          { label: 'Time de Service', value: '07+', color: 'text-[#39ff14]', icon: <Shield className="w-3 h-3 mb-2 opacity-40" /> },
          { label: 'Anos de Experiência', value: '06+', color: 'text-[#a5f3fc]', icon: <Wand2 className="w-3 h-3 mb-2 opacity-40" /> }
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#0a0a0c] border border-white/5 rounded-3xl p-8 text-center hover:border-white/20 transition-all hover:scale-105 group relative overflow-hidden bg-grid-dots">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <div className="flex flex-col items-center relative z-10">
              {stat.icon}
              <div className={`text-4xl md:text-5xl font-gamer font-black ${stat.color} mb-3 relative tracking-tighter`}>
                {stat.value}
              </div>
              <div className="text-[10px] text-gray-400 font-gamer uppercase tracking-[0.3em] font-medium opacity-80">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomeView;


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
            <span className="leading-none mt-0.5 font-bold">PREMIUM QUESTS SERVICE</span>
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
              <span className="text-[#39ff14] font-medium italic">Nosso time está preparado para realizar o melhor service que o seu char poderia ter!</span>
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

        {/* Brand Visualization (PROCESSED CHIP Style) */}
        <div className="flex-1 relative flex justify-center lg:justify-end animate-[slideIn_1s_ease-out] p-12">
          
          {/* THE CHIP COMPONENT */}
          <div className="relative group p-4">
            
            {/* CPU PINS (Conectores em volta do quadrado) */}
            <div className="absolute -inset-2 pointer-events-none">
              {/* Top Pins */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-4 -translate-y-full">
                {[...Array(6)].map((_, i) => (
                  <div key={`tp-${i}`} className="w-2.5 h-6 bg-gradient-to-t from-[#00f2ff]/60 to-transparent border-t border-[#00f2ff] rounded-t-sm shadow-[0_0_10px_rgba(0,242,255,0.4)] animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
                ))}
              </div>
              {/* Bottom Pins */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-4 translate-y-full">
                {[...Array(6)].map((_, i) => (
                  <div key={`bp-${i}`} className="w-2.5 h-6 bg-gradient-to-b from-[#00f2ff]/60 to-transparent border-b border-[#00f2ff] rounded-b-sm shadow-[0_0_10px_rgba(0,242,255,0.4)] animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
                ))}
              </div>
              {/* Left Pins */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 -translate-x-full">
                {[...Array(6)].map((_, i) => (
                  <div key={`lp-${i}`} className="h-2.5 w-6 bg-gradient-to-l from-[#00f2ff]/60 to-transparent border-l border-[#00f2ff] rounded-l-sm shadow-[0_0_10px_rgba(0,242,255,0.4)] animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
                ))}
              </div>
              {/* Right Pins */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 translate-x-full">
                {[...Array(6)].map((_, i) => (
                  <div key={`rp-${i}`} className="h-2.5 w-6 bg-gradient-to-r from-[#00f2ff]/60 to-transparent border-r border-[#00f2ff] rounded-r-sm shadow-[0_0_10px_rgba(0,242,255,0.4)] animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
                ))}
              </div>
            </div>

            {/* MAIN CHIP BODY (O Quadrado) */}
            <div className="relative w-[340px] md:w-[380px] aspect-square rounded-2xl overflow-hidden bg-[#050505] border-[10px] border-[#0a0a0c] ring-1 ring-[#00f2ff]/40 shadow-[0_0_60px_rgba(0,242,255,0.2)] z-10 group-hover:scale-105 transition-all duration-500">
              
              {/* Background Integrated Visuals */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1516900448138-898700243b4d?q=80&w=1200&auto=format&fit=crop" 
                  alt="" 
                  className="w-full h-full object-cover opacity-30 brightness-50 grayscale transition-transform duration-[20s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#0a0a0c]/80 to-[#050505]"></div>
              </div>

              {/* Digital Grid Overlay */}
              <div className="absolute inset-0 bg-grid-dots opacity-20 z-10 pointer-events-none"></div>
              
              {/* Core Glow Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00f2ff] blur-[100px] opacity-10 animate-pulse z-10 pointer-events-none"></div>
              
              {/* INTERIOR CONTENT (Text & Icon) */}
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 text-center">
                
                {/* Símbolo do Gelo (Snowflake) */}
                <div className="mb-6 relative">
                  <Snowflake className="w-16 h-16 text-[#00f2ff] drop-shadow-[0_0_20px_rgba(0,242,255,0.6)] animate-spin-slow" />
                  <div className="absolute inset-0 w-full h-full bg-[#00f2ff] blur-[25px] opacity-20 animate-pulse"></div>
                </div>
                
                {/* Ragha Service Text */}
                <div className="flex flex-col items-center">
                  <h2 className="ice-glow font-gamer text-[3.8rem] md:text-[4.5rem] font-black uppercase leading-[0.8] tracking-tighter drop-shadow-[0_8px_20px_rgba(0,0,0,1)]">
                    RAGHA
                  </h2>
                  <h2 className="font-gamer text-2xl md:text-[2.6rem] font-black uppercase leading-[1.2] tracking-[0.2em] text-[#00f2ff] drop-shadow-[0_4px_10px_rgba(0,242,255,0.4)] mt-1">
                    SERVICE
                  </h2>
                </div>

                {/* Processing Indicator */}
                <div className="mt-8 flex gap-3 opacity-60">
                  <div className="h-1.5 w-8 bg-white/10 rounded-full"></div>
                  <div className="h-1.5 w-14 bg-[#00f2ff] rounded-full shadow-[0_0_10px_#00f2ff]"></div>
                  <div className="h-1.5 w-8 bg-white/10 rounded-full"></div>
                </div>
              </div>

              {/* Secure Token Badge (Top Left Corner) */}
              <div className="absolute top-6 left-6 z-40 bg-black/80 backdrop-blur-md border border-white/10 p-2.5 rounded-xl shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                <ShieldCheck className="w-5 h-5 text-[#00f2ff] drop-shadow-[0_0_8px_#00f2ff]" />
              </div>
            </div>

            {/* Outer Ambient Reflection */}
            <div className="absolute -inset-8 bg-[#00f2ff] blur-[120px] opacity-[0.03] rounded-full pointer-events-none z-0 group-hover:opacity-[0.05] transition-opacity"></div>
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
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomeView;

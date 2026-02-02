
import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Snowflake, Zap, Cpu, Wand2, Shield } from 'lucide-react';

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
          {/* Updated Premium Service Badge - Singular 'SERVICE' */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#0d0d0f] border border-white/5 text-[#00f2ff] text-[11px] font-gamer tracking-[0.2em] uppercase shadow-[0_4px_20px_rgba(0,0,0,0.5)] group transition-all hover:border-[#00f2ff]/30">
            <Cpu className="w-4 h-4 text-[#00f2ff] drop-shadow-[0_0_5px_rgba(0,242,255,0.5)]" />
            <span className="leading-none mt-0.5">PREMIUM QUESTS SERVICE V4.0</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-gamer font-black leading-tight">
            SEJA MUITO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#bc13fe] to-[#39ff14] neon-glow-blue">
              BEM-VINDO
            </span>
          </h1>

          <div className="bg-[#0a0a0c] border-l-4 border-[#00f2ff] p-6 rounded-r-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-16 h-16 text-[#00f2ff]" />
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

        {/* Reference Image Visualization */}
        <div className="flex-1 relative flex justify-center lg:justify-end animate-[slideIn_1s_ease-out]">
          <div className="relative w-full max-w-lg aspect-square rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(0,242,255,0.3)] group bg-black border border-white/10">
            {/* Galaxy/Space Background */}
            <img 
              src="https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=1200" 
              alt="Space Galaxy Background" 
              className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-[25s] group-hover:scale-110 brightness-75"
            />
            
            {/* HUD Overlays */}
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]"></div>
            
            {/* Centered Snowflake Icon */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-3 opacity-70 scale-90">
                <Snowflake className="w-12 h-12 text-[#a5f3fc] drop-shadow-[0_0_12px_#00f2ff]" />
              </div>
              
              {/* RAGHA SERVICE Title Block (Reduced size) */}
              <div className="flex flex-col items-center">
                <h2 className="ice-glow font-gamer text-5xl md:text-[4.2rem] font-black uppercase leading-[0.85] tracking-tighter drop-shadow-[0_8px_25px_rgba(0,0,0,1)]">
                  RAGHA
                </h2>
                <h2 className="font-gamer text-3xl md:text-[2.6rem] font-black uppercase leading-[1.1] tracking-[0.15em] text-[#00f2ff] drop-shadow-[0_4px_12px_rgba(0,242,255,0.4)]">
                  SERVICE
                </h2>
              </div>

              <div className="mt-6 flex gap-3 opacity-60">
                <div className="h-1 w-8 bg-white/30 rounded-full"></div>
                <div className="h-1 w-14 bg-[#00f2ff] rounded-full shadow-[0_0_10px_#00f2ff]"></div>
                <div className="h-1 w-8 bg-white/30 rounded-full"></div>
              </div>
            </div>

            {/* Top Left Shield Icon */}
            <div className="absolute top-8 left-8 z-30 bg-black/40 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl shadow-[0_0_20px_rgba(0,242,255,0.15)]">
              <ShieldCheck className="w-8 h-8 text-[#00f2ff] drop-shadow-[0_0_10px_#00f2ff]" />
            </div>

            {/* Bottom Right Protocol Label */}
            <div className="absolute bottom-8 right-8 z-30 bg-black/90 backdrop-blur-2xl border border-white/10 p-5 rounded-[2rem] text-right min-w-[210px] shadow-2xl">
              <div className="text-white/40 text-[9px] font-gamer tracking-[0.25em] mb-1.5 uppercase">PREMIUM SERVICE</div>
              <div className="text-[#a5f3fc] font-gamer font-black text-lg flex items-center justify-end gap-3 tracking-widest">
                FROZEN <div className="w-3 h-3 rounded-full bg-[#00f2ff] shadow-[0_0_15px_#00f2ff] animate-pulse"></div>
              </div>
            </div>

            {/* Decorative Borders */}
            <div className="absolute top-0 left-0 w-28 h-28 border-t-2 border-l-2 border-white/10 rounded-tl-[3rem]"></div>
            <div className="absolute bottom-0 right-0 w-28 h-28 border-b-4 border-r-4 border-[#00f2ff]/40 rounded-br-[3rem]"></div>
          </div>
        </div>
      </div>

      {/* Updated Stats Section - Matching Reference Image */}
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
    </div>
  );
};

export default HomeView;

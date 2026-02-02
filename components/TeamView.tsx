
import React from 'react';
import { ChevronLeft, Star, Shield, Swords, Zap, Globe, Crown, Users, ExternalLink, Tv, User } from 'lucide-react';

interface TeamViewProps {
  onBack: () => void;
}

const TeamView: React.FC<TeamViewProps> = ({ onBack }) => {
  const team = [
    {
      name: "Ragha Healer",
      vocation: "Elder Druid",
      level: "2027",
      world: "Kalibra",
      guild: "Líder da MissClick",
      bio: "Ragha Healer é um dos jogadores de alto nível mais reconhecidos no Tibia, com forte presença em quests épicas como Soul War, Rotten Blood e Primal Ordeal. Possui mais de 50 títulos desbloqueados, incluindo Jack of all Taints.",
      specialties: ["Elder Druid", "Exalted Monk", "Master Sorcerer"],
      color: "#00f2ff",
      twitchUrl: "https://www.twitch.tv/ragha_healer",
      dynamicShape: "hexagon"
    },
    {
      name: "Donzs",
      vocation: "Elder Druid",
      level: "1785",
      world: "Kalibra",
      guild: "MissClick",
      bio: "Donzs é um jogador veterano e consolidado no Tibia, reconhecido como parte da elite. Fez parte do primeiro time de Kalibra a concluir a Rotten Blood Quest em 2023.",
      specialties: ["Elder Druid", "Master Sorcerer", "Elite Knight", "Royal Paladin"],
      color: "#bc13fe",
      twitchUrl: "https://www.twitch.tv/donnsz",
      dynamicShape: "particles"
    },
    {
      name: "Hezzorsz",
      vocation: "Royal Paladin",
      level: "1804",
      world: "Kalibra",
      guild: "MissClick",
      bio: "Hezzorsz se posiciona como um dos Royal Paladins mais fortes de Kalibra. Presença constante em conteúdos avançados como Soul War, Rotten Blood e hunts em áreas de alto risco.",
      specialties: ["Royal Paladin"],
      color: "#39ff14",
      twitchUrl: "https://www.twitch.tv/marcozs",
      dynamicShape: "circles"
    }
  ];

  const getSpecStyle = (spec: string) => {
    switch (spec) {
      case "Elder Druid":
        return { color: "#00f2ff", bg: "rgba(0, 242, 255, 0.1)", border: "rgba(0, 242, 255, 0.3)" };
      case "Exalted Monk":
        return { color: "#bc13fe", bg: "rgba(188, 19, 254, 0.1)", border: "rgba(188, 19, 254, 0.3)" };
      case "Master Sorcerer":
        return { color: "#ff4d4d", bg: "rgba(255, 77, 77, 0.1)", border: "rgba(255, 77, 77, 0.3)" };
      case "Elite Knight":
        return { color: "#94a3b8", bg: "rgba(148, 163, 184, 0.1)", border: "rgba(148, 163, 184, 0.3)" };
      case "Royal Paladin":
        return { color: "#fbbf24", bg: "rgba(251, 191, 36, 0.1)", border: "rgba(251, 191, 36, 0.3)" };
      default:
        return { color: "#94a3b8", bg: "rgba(255, 255, 255, 0.05)", border: "rgba(255, 255, 255, 0.1)" };
    }
  };

  const renderAvatar = (member: typeof team[0]) => {
    return (
      <div className="h-64 relative overflow-hidden bg-[#050505] flex items-center justify-center">
        {/* Background Dynamics */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40">
          {member.dynamicShape === 'circles' && (
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 rounded-full animate-pulse border-4 border-current" style={{ color: member.color, opacity: 0.3 }}></div>
              <div className="absolute inset-[-20px] rounded-full animate-ping border border-current" style={{ color: member.color, opacity: 0.1 }}></div>
              <div className="absolute inset-0 rounded-full shadow-[0_0_80px_currentColor]" style={{ color: member.color, opacity: 0.2 }}></div>
            </div>
          )}
          {member.dynamicShape === 'hexagon' && (
            <div className="relative w-40 h-40 flex items-center justify-center">
               <div className="w-full h-full rotate-45 border-4 border-current flex items-center justify-center animate-[spin_10s_linear_infinite]" style={{ color: member.color, clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', opacity: 0.4 }}></div>
               <div className="absolute inset-0 scale-75 border-2 border-current animate-[spin_15s_linear_infinite_reverse]" style={{ color: member.color, clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', opacity: 0.2 }}></div>
            </div>
          )}
          {member.dynamicShape === 'particles' && (
            <div className="relative w-48 h-48 grid grid-cols-4 gap-4 rotate-12 opacity-30">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: member.color, animationDelay: `${i * 0.1}s` }}></div>
              ))}
              <div className="absolute inset-0 bg-radial-gradient from-current to-transparent" style={{ color: member.color, opacity: 0.2 }}></div>
            </div>
          )}
        </div>

        {/* Silhouette */}
        <div className="relative z-10 mt-12 transition-transform duration-500 group-hover:scale-110">
           <User size={180} className="text-black/80 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" strokeWidth={1} />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent z-20"></div>
        
        {/* Name & World */}
        <div className="absolute bottom-4 left-6 z-30">
          <h3 className="text-2xl font-gamer font-black text-white uppercase tracking-tighter drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]" style={{ color: member.color }}>
            {member.name}
          </h3>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <Globe className="w-3 h-3" /> {member.world}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={onBack} className="p-3 rounded-xl bg-black/40 border border-white/10 text-gray-400 hover:text-white transition-all">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-3xl font-gamer font-black text-white uppercase tracking-tighter">NOSSO <span className="text-[#bc13fe]">TIME</span></h2>
          <p className="text-[10px] font-gamer text-gray-500 uppercase tracking-widest mt-1">Conheça os especialistas por trás do serviço</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {team.map((member, idx) => (
          <div 
            key={idx} 
            className="relative bg-[#0a0a0c] border border-white/5 rounded-[2rem] overflow-hidden group hover:scale-[1.02] transition-all duration-500 flex flex-col"
            style={{ boxShadow: `0 0 40px ${member.color}05` }}
          >
            {/* Custom Avatar Area */}
            {renderAvatar(member)}

            {/* Content Area */}
            <div className="p-8 pt-2 space-y-6 flex-grow">
              {/* Core Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center">
                  <div className="text-[10px] text-gray-500 font-gamer uppercase tracking-widest mb-1">Level</div>
                  <div className="text-xl font-gamer font-bold text-white">{member.level}</div>
                </div>
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center">
                  <div className="text-[10px] text-gray-500 font-gamer uppercase tracking-widest mb-1">Vocação</div>
                  <div className="text-xs font-gamer font-bold text-gray-300">{member.vocation}</div>
                </div>
              </div>

              {/* Guild / Status */}
              <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Crown className="w-5 h-5" style={{ color: member.color }} />
                  <div>
                    <div className="text-[8px] font-gamer text-gray-500 uppercase tracking-widest">GUILD</div>
                    <div className="text-xs font-bold text-white">{member.guild}</div>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: member.color }}></div>
              </div>

              {/* Bio */}
              <div className="relative">
                 <p className="text-sm text-gray-400 font-medium leading-relaxed italic">
                   "{member.bio}"
                 </p>
              </div>

              {/* Specialties */}
              <div>
                <div className="text-[9px] font-gamer text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Zap className="w-3 h-3" /> Especialidades
                </div>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((spec, i) => {
                    const style = getSpecStyle(spec);
                    return (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 rounded-lg text-[10px] font-gamer font-bold transition-all border hover:brightness-125"
                        style={{ 
                          color: style.color, 
                          backgroundColor: style.bg, 
                          borderColor: style.border 
                        }}
                      >
                        {spec}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Twitch Button */}
            <div className="px-8 pb-8 mt-auto">
              <a 
                href={member.twitchUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#6441a5] hover:bg-[#7d5bbe] text-white rounded-xl flex items-center justify-center gap-3 transition-all font-gamer text-[10px] tracking-widest uppercase group/twitch"
              >
                <Tv className="w-4 h-4 group-hover/twitch:scale-110 transition-transform" />
                Acompanhar Live
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            </div>

            {/* Corner Details */}
            <div className="absolute top-4 right-4 z-20">
               <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border flex items-center justify-center" style={{ borderColor: `${member.color}44` }}>
                  <Star className="w-5 h-5" style={{ color: member.color }} />
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global Team Stats */}
      <div className="mt-16 bg-gradient-to-br from-black/80 to-[#bc13fe]/5 border border-white/5 p-12 rounded-[3rem] text-center">
        <Users className="w-12 h-12 text-[#bc13fe] mx-auto mb-6" />
        <h4 className="text-3xl font-gamer font-black text-white uppercase tracking-tighter mb-4">Elite de Kalibra</h4>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Nosso time é composto por jogadores que definiram o meta do servidor Kalibra. Com recordes mundiais e primeiras conclusões de quests lendárias, garantimos a segurança e o sucesso absoluto do seu boneco.
        </p>
      </div>
    </div>
  );
};

export default TeamView;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  CloudRain, 
  ChevronRight,
  Waves,
  Home as HomeIcon,
  School,
  Store,
  Droplet,
  Layers,
  Settings2,
  RefreshCw,
  Wrench,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Preset {
  id: string;
  name: string;
  area: number;
  icon: React.ReactNode;
}

const ROOF_PRESETS: Preset[] = [
  { id: 'small', name: 'Tiny Home', area: 45, icon: <HomeIcon className="w-5 h-5" /> },
  { id: 'medium', name: 'Apartment', area: 120, icon: <Building2 className="w-5 h-5" /> },
  { id: 'large', name: 'Villa', area: 350, icon: <School className="w-5 h-5" /> },
  { id: 'custom', name: 'Custom', area: 200, icon: <Store className="w-5 h-5" /> },
];

const ROOF_TYPES = [
  { name: 'Concrete', coeff: 0.8, color: 'bg-stone-300' },
  { name: 'Metal Sheet', coeff: 0.95, color: 'bg-sky-400' },
  { name: 'Clay Tiles', coeff: 0.85, color: 'bg-orange-400' },
];

export default function Calculator({ onCalculate, initialRainfall }: { onCalculate: (data: any) => void, initialRainfall: number }) {
  const [activePreset, setActivePreset] = useState<string>('medium');
  const [roofArea, setRoofArea] = useState(120);
  const [rainfall, setRainfall] = useState(initialRainfall);
  const [tankCapacity, setTankCapacity] = useState(5000);
  const [roofTypeIndex, setRoofTypeIndex] = useState(1);
  const [isManualRain, setIsManualRain] = useState(false);
  
  useEffect(() => {
    if (!isManualRain) setRainfall(initialRainfall);
  }, [initialRainfall, isManualRain]);

  const handlePresetSelect = (preset: Preset) => {
    setActivePreset(preset.id);
    setRoofArea(preset.area);
  };

  // Refined Formula: Area (sqm) * Rainfall (mm) * Efficiency Factor = Liters
  const efficiency = ROOF_TYPES[roofTypeIndex].coeff;
  const calculatedTotal = Math.round(roofArea * rainfall * efficiency);
  const finalSaved = Math.min(calculatedTotal, tankCapacity);

  return (
    <div className="space-y-10 pb-10">
      <div className="space-y-3">
        <h2 className="text-4xl font-display font-bold text-stone-800 tracking-tight leading-tight">Yield <span className="text-sky-600 italic">Curator</span></h2>
        <p className="text-sky-800/40 text-sm font-medium italic leading-relaxed">"Every drop is a legacy for tomorrow's garden."</p>
      </div>

      <div className="space-y-12">
        {/* Step 1: Roof Configuration */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-sky-800/40">1. Catchment Profile</label>
            <div className="flex gap-1.5 p-1 bg-sky-50/50 rounded-xl border border-sky-100/20">
              {ROOF_TYPES.map((type, idx) => (
                <button 
                  key={type.name}
                  onClick={() => setRoofTypeIndex(idx)}
                  className={cn(
                    "text-[8px] font-bold uppercase px-3 py-1.5 rounded-lg transition-all",
                    roofTypeIndex === idx ? "bg-white text-sky-600 shadow-sm border border-sky-100/50" : "text-sky-300 hover:bg-sky-50/50"
                  )}
                >
                  {type.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {ROOF_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handlePresetSelect(p)}
                className={cn(
                  "glass-card p-6 flex items-center gap-4 border-none transition-all duration-500 relative overflow-hidden",
                  activePreset === p.id 
                    ? "bg-white/80 shadow-[0_20px_40px_-12px_rgba(12,165,233,0.2)] scale-[1.02] border border-sky-100" 
                    : "bg-white/20 hover:bg-white/40 border border-white/40 shadow-sm"
                )}
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl z-10 flex items-center justify-center transition-all duration-700",
                  activePreset === p.id ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30" : "bg-sky-50/50 text-sky-300"
                )}>
                  {p.icon}
                </div>
                <div className="text-left z-10">
                  <p className={cn("text-xs font-bold transition-colors mb-0.5", activePreset === p.id ? "text-stone-900" : "text-sky-800/40")}>{p.name}</p>
                  <p className="text-[10px] text-sky-400 font-bold uppercase tracking-tight opacity-60">{p.area} sqm</p>
                </div>
              </button>
            ))}
          </div>

          <div className="glass-card p-8 bg-white/60 backdrop-blur-md border border-white/80 shadow-2xl shadow-sky-900/5 relative overflow-hidden">
             <div className="flex justify-between items-center mb-8">
                <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.3em] flex items-center gap-2">
                  <Layers className="w-5 h-5 text-sky-300" />
                  Area Precision
                </span>
                <span className="text-2xl font-display font-bold text-stone-900 tracking-tighter">{roofArea} <span className="text-xs text-sky-400 italic font-medium lowercase">sqm</span></span>
              </div>
              <input 
                type="range" min={10} max={1000} value={roofArea}
                onChange={(e) => {
                  setRoofArea(parseInt(e.target.value));
                  setActivePreset('custom');
                }}
                className="w-full h-2 bg-sky-100 rounded-lg appearance-none cursor-pointer accent-sky-500 outline-none transition-all shadow-inner"
              />
          </div>
        </div>

        {/* Step 2: Rainfall Input */}
        <div className="space-y-6">
           <div className="flex justify-between items-center px-1">
             <div className="space-y-0.5">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-sky-800/40">2. Atmospheric Dynamics</label>
               <p className="text-[10px] text-sky-400/60 font-bold tracking-widest uppercase">Global Rain Hub Sync</p>
             </div>
             <button 
              onClick={() => setIsManualRain(!isManualRain)}
              className={cn("flex items-center gap-2 text-[9px] font-bold uppercase px-4 py-2 rounded-full border transition-all shadow-xl", 
                isManualRain ? "bg-white text-stone-600 border-stone-100 shadow-sky-900/5" : "bg-sky-500 text-white border-sky-400 shadow-sky-500/20")}
             >
               {isManualRain ? <Wrench className="w-3 h-3 text-sky-400" /> : <RefreshCw className="w-3 h-3 animate-spin duration-[3s]" />}
               {isManualRain ? 'Manual Adjustment' : 'Active sync'}
             </button>
           </div>
           
           <div className="glass-card p-10 bg-white/50 backdrop-blur-xl border border-white shadow-2xl shadow-sky-900/5 relative overflow-hidden group">
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-8">
                  <div className={cn(
                    "w-20 h-20 rounded-[2.5rem] flex items-center justify-center transition-all duration-1000 shadow-xl", 
                    isManualRain ? "bg-stone-50 text-stone-300 rotate-12" : "bg-sky-50 text-sky-500 rotate-0 ring-[12px] ring-sky-500/5"
                  )}>
                    <CloudRain className="w-10 h-10" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <motion.span 
                        key={rainfall}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl font-display font-bold text-stone-900 tracking-tighter"
                      >
                        {rainfall}
                      </motion.span>
                      <span className="text-xs text-sky-300 font-bold uppercase tracking-[0.3em] pl-1">mm / 24h</span>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                       <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className={cn("w-4 h-1.5 rounded-full transition-all duration-700", i <= Math.min(5, rainfall/10) ? "bg-sky-400" : "bg-sky-100")} />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-sky-300 uppercase tracking-widest pl-1">Saturation Grade</span>
                    </div>
                  </div>
                </div>
                {isManualRain ? (
                  <div className="flex flex-col gap-3">
                    <button onClick={() => setRainfall(rainfall + 5)} className="w-12 h-10 rounded-2xl bg-white border border-stone-100 flex items-center justify-center text-stone-800 hover:bg-sky-50 shadow-sm transition-all font-bold active:scale-90">+</button>
                    <button onClick={() => setRainfall(Math.max(1, rainfall - 5))} className="w-12 h-10 rounded-2xl bg-white border border-stone-100 flex items-center justify-center text-stone-800 hover:bg-sky-50 shadow-sm transition-all font-bold active:scale-90">-</button>
                  </div>
                ) : (
                  <div className="flex flex-col items-end">
                    <div className="px-5 py-2.5 bg-sky-500 text-white rounded-2xl flex items-center gap-2 border border-sky-400 shadow-xl shadow-sky-500/20">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] leading-none">Telemetry Live</span>
                    </div>
                  </div>
                )}
              </div>
           </div>
        </div>

        {/* Step 3: Tank Capacity */}
        <div className="space-y-6">
           <label className="text-[10px] font-bold uppercase tracking-[0.35em] text-sky-800/40 ml-2">3. Storage Vessel Setup</label>
           <div className="glass-card p-10 bg-white/40 backdrop-blur-xl border border-white shadow-2xl shadow-sky-900/5 flex gap-10 items-center">
              <div className="w-20 h-32 rounded-[2.5rem] bg-sky-900/90 relative overflow-hidden flex-shrink-0 shadow-2xl p-1.5 border border-white/20">
                <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: `${Math.min(100, (tankCapacity / 15000) * 100)}%` }}
                   transition={{ duration: 2, ease: "circOut" }}
                   className="absolute bottom-0 inset-x-0 bg-sky-400/30 backdrop-blur-md rounded-3xl"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center z-10">
                   <p className="text-sm font-display font-bold text-white tracking-tighter">{(tankCapacity / 1000).toFixed(0)}k</p>
                </div>
              </div>

              <div className="flex-1 space-y-8">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-sky-800/60 uppercase tracking-[0.25em]">Limit Precision</span>
                    <p className="text-[11px] text-stone-400 font-bold uppercase tracking-wider">Storage Boundary</p>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-display font-bold text-stone-900 tracking-tighter">{(tankCapacity / 1000).toLocaleString()}k</span>
                    <span className="text-sm font-bold text-sky-300 uppercase italic ml-1 tracking-widest">Ltr</span>
                  </div>
                </div>
                <input 
                  type="range" min={500} max={15000} step={500} value={tankCapacity}
                  onChange={(e) => setTankCapacity(parseInt(e.target.value))}
                  className="w-full h-2 bg-sky-100 rounded-full appearance-none cursor-pointer accent-sky-500 transition-all outline-none shadow-inner"
                />
              </div>
           </div>
        </div>

        {/* Final Result Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card bg-sky-900 p-6 sm:p-10 border-none relative overflow-hidden shadow-[0_32px_64px_-16px_rgba(12,165,233,0.4)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,114,182,0.35),transparent)] opacity-60" />
          <div className="relative z-10 text-center space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sky-200 mx-auto backdrop-blur-md">
               <Sparkles className="w-4 h-4 text-pink-400" />
               <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Harvesting Potential</span>
            </div>

            <div className="flex items-baseline justify-center gap-3">
              <motion.span 
                key={finalSaved}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl sm:text-8xl font-display font-bold text-white tracking-tighter"
              >
                {finalSaved.toLocaleString()}
              </motion.span>
              <div className="flex flex-col items-start -space-y-1">
                 <span className="text-3xl font-display font-bold text-sky-400/50 italic tracking-tighter">L</span>
                 <span className="text-[10px] font-bold text-sky-300/40 uppercase tracking-widest">Yield</span>
              </div>
            </div>
            
             <button 
              onClick={() => onCalculate({ roofArea, rainfall, tankCapacity, totalSaved: finalSaved })}
              className="w-full min-h-[76px] bg-gradient-to-r from-white to-sky-50 text-sky-900 rounded-[2.5rem] font-bold shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all text-xl group border border-white"
            >
              Commit to Archive
              <div className="w-10 h-10 rounded-full bg-sky-900 text-white flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ChevronRight className="w-6 h-6" />
              </div>
            </button>
          </div>
          
          <Waves className="absolute -bottom-12 -left-12 w-48 h-48 text-stone-800/30 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}

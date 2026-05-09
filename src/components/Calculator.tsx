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
  Sparkles,
  Leaf,
  Zap
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

  const efficiency = ROOF_TYPES[roofTypeIndex].coeff;
  const calculatedTotal = Math.round(roofArea * rainfall * efficiency);
  const finalSaved = Math.min(calculatedTotal, tankCapacity);

  // Advanced Feature: Scenario Discovery
  const upgradeScenarios = [
    { label: 'Pro Mesh', boost: 0.05, cost: '₹2.4k' },
    { label: 'Dual Inlet', boost: 0.12, cost: '₹5.8k' },
  ];

  return (
    <div className="space-y-10 pb-20">
      <div className="space-y-2">
        <h2 className="display-heading text-5xl">Yield <span className="text-emerald-500 italic">Analysis.</span></h2>
        <p className="subheading">Catchment & Storage Simulation</p>
      </div>

      <div className="space-y-10">
        {/* Step 1: Roof Configuration */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <label className="subheading">I. Catchment Profile</label>
            <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
              {ROOF_TYPES.map((type, idx) => (
                <button 
                  key={type.name}
                  onClick={() => setRoofTypeIndex(idx)}
                  className={cn(
                    "text-[9px] font-bold uppercase px-4 py-2 rounded-xl transition-all",
                    roofTypeIndex === idx ? "bg-emerald-600 text-white shadow-lg" : "text-slate-300 hover:text-white"
                  )}
                >
                  {type.name}
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
                  "p-4 sm:p-6 flex flex-col items-start gap-4 rounded-3xl transition-all duration-500 relative overflow-hidden group border",
                  activePreset === p.id 
                    ? "bg-emerald-600/10 border-emerald-500/30" 
                    : "bg-white/5 border-white/10 hover:border-white/20"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700",
                  activePreset === p.id ? "bg-emerald-500 text-white" : "bg-white/5 text-slate-400"
                )}>
                  {p.icon}
                </div>
                <div className="text-left">
                  <p className={cn("text-xs font-bold mb-1", activePreset === p.id ? "text-white" : "text-slate-400")}>{p.name}</p>
                  <p className="text-[10px] text-emerald-400 font-display font-medium uppercase tracking-widest">{p.area} sqm</p>
                </div>
              </button>
            ))}
          </div>

          <div className="glass-card">
             <div className="flex justify-between items-center mb-8">
                <span className="subheading flex items-center gap-3">
                  <Layers className="w-4 h-4" />
                  Area Precision
                </span>
                <div className="text-right">
                  <span className="text-4xl font-display font-bold text-white tracking-tighter transition-all">{roofArea}</span>
                  <span className="text-xs text-slate-400 uppercase ml-2">sqm</span>
                </div>
              </div>
              <input 
                type="range" min={10} max={1000} value={roofArea}
                onChange={(e) => {
                  setRoofArea(parseInt(e.target.value));
                  setActivePreset('custom');
                }}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500 outline-none"
              />
          </div>
        </div>

        {/* Step 2: Atmospheric Input */}
        <div className="space-y-6">
           <div className="flex justify-between items-center px-2">
             <label className="subheading">II. Atmospheric Input</label>
             <button 
              onClick={() => setIsManualRain(!isManualRain)}
              className={cn("flex items-center gap-2 text-[9px] font-bold uppercase px-4 py-1.5 rounded-full transition-all border", 
                isManualRain ? "bg-white text-black border-white" : "bg-emerald-600/10 text-emerald-400 border-emerald-500/20")}
             >
               {isManualRain ? 'Override' : 'Synced'}
             </button>
           </div>
           
           <div className="glass-card bg-[#0a111b] p-8">
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-6">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-1000", 
                    isManualRain ? "bg-white/5 text-slate-400" : "bg-emerald-600 text-white"
                  )}>
                    <CloudRain className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <motion.span className="text-5xl font-display font-bold text-white tracking-tighter">
                        {rainfall}
                      </motion.span>
                      <span className="text-[10px] text-emerald-400 font-display font-bold uppercase tracking-widest">mm/day</span>
                    </div>
                  </div>
                </div>
                {isManualRain && (
                  <div className="flex flex-col gap-2">
                    <button onClick={() => setRainfall(rainfall + 5)} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10">
                      <ChevronRight className="w-4 h-4 -rotate-90" />
                    </button>
                    <button onClick={() => setRainfall(Math.max(1, rainfall - 5))} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10">
                      <ChevronRight className="w-4 h-4 rotate-90" />
                    </button>
                  </div>
                )}
              </div>
           </div>
        </div>

        {/* Final Result Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass-card bg-emerald-600 border-none p-8"
        >
          <div className="space-y-8 text-center relative z-10">
            <div className="flex flex-col items-center gap-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-950/60">Calculated Yield</p>
              <div className="flex items-baseline justify-center gap-2">
                <motion.span 
                  key={finalSaved}
                  className="text-6xl xs:text-7xl sm:text-8xl font-display font-bold text-white tracking-tighter"
                >
                  {finalSaved.toLocaleString()}
                </motion.span>
                <span className="text-2xl font-display font-bold text-emerald-950 italic">L</span>
              </div>
            </div>
            
             <button 
              onClick={() => onCalculate({ roofArea, rainfall, tankCapacity, totalSaved: finalSaved })}
              className="w-full h-20 bg-white text-emerald-950 rounded-2xl font-black text-sm uppercase tracking-[0.3em] shadow-2xl flex items-center justify-center gap-4 hover:bg-emerald-50 active:scale-[0.98] transition-all"
            >
              <span>Initialize Harvest</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

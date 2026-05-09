import React from 'react';
import { motion } from 'motion/react';
import { 
  Droplet, 
  Droplets,
  Target,
  Brain,
  Globe,
  ArrowRight,
  Calculator,
  CloudRain,
  Bot,
  Zap,
  Info,
  Clock,
  Thermometer,
  Wind,
  Umbrella,
  Navigation
} from 'lucide-react';
import { HistoryEntry, LocationData, Screen } from '../types';
import { cn } from '../lib/utils';

const MONTHLY_DATA = [
  { month: 'Jan', rainfall: 250, harvested: 180 },
  { month: 'Feb', rainfall: 180, harvested: 140 },
  { month: 'Mar', rainfall: 120, harvested: 100 },
  { month: 'Apr', rainfall: 450, harvested: 390 },
  { month: 'May', rainfall: 620, harvested: 580 },
  { month: 'Jun', rainfall: 850, harvested: 780 },
];

interface DashboardProps {
  history: HistoryEntry[];
  location: LocationData;
  rainfall: number;
  cycleLocation: () => void;
  setScreen: (screen: Screen) => void;
}

export default function Dashboard({ history, location, rainfall, cycleLocation, setScreen }: DashboardProps) {
  const totalHistoricallySaved = history.reduce((sum, h) => sum + h.totalSaved, 0);
  const tankCapacity = 15000;
  const tankFill = Math.min(Math.round(((totalHistoricallySaved % tankCapacity) / tankCapacity) * 100) + 40, 95); 
  const currentLiters = (tankFill / 100) * tankCapacity;
  const dailyUsage = 150; 
  const daysRemaining = Math.floor(currentLiters / dailyUsage);

  const insights = [
    { 
      title: 'Monsoon Optimization', 
      desc: 'Groundwater recharge is active based on current atmospheric pressure.',
      icon: <Zap className="w-5 h-5" />,
      positive: true
    },
    { 
      title: 'Historical Grounding', 
      desc: 'Based on 10-year local averages for ' + location.city.split(',')[0] + '.',
      icon: <Info className="w-5 h-5" />,
      positive: true
    }
  ];

  const quickActions = [
    { id: 'calculator', label: 'Analyze', icon: <Calculator />, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { id: 'weather', label: 'Monitor', icon: <CloudRain />, color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    { id: 'assistant', label: 'Consult', icon: <Bot />, color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Primary Storage Node */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="glass-card bg-gradient-to-br from-[#0a111b] to-[#0f172a] border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <Droplets className="w-24 h-24 text-emerald-400" />
          </div>
          
          <div className="flex flex-col gap-8 relative z-10">
            <div className="flex justify-between items-start">
               <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">
                   Rainwater Harvesting
                 </p>
                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                   System Storage Node
                 </p>
                 <h2 className="display-heading text-4xl xs:text-5xl sm:text-6xl mt-4 text-white">
                   {currentLiters.toLocaleString()} <span className="text-xl font-display font-medium text-slate-400 uppercase ml-1">L</span>
                 </h2>
               </div>
               <div className="text-right">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-2 border border-emerald-500/20">
                    <Droplet className="w-6 h-6" />
                  </div>
                  <p className="text-2xl font-display font-bold text-emerald-400">{tankFill}%</p>
                  <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Efficiency</p>
               </div>
            </div>
            
            <div className="space-y-4">
               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${tankFill}%` }}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                   className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]" 
                 />
               </div>
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Reserve Autonomy</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{daysRemaining} Days Est.</span>
               </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Weather Hub - Replacing History Chart */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-4">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Atmospheric Status</p>
          <div className="flex items-center gap-2 text-slate-500">
            <Navigation className="w-3 h-3" />
            <span className="text-[9px] font-bold uppercase tracking-widest">{location.city.split(',')[0]}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card bg-[#0a111b] border-white/5 p-6 flex flex-col justify-between aspect-square relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <CloudRain className="w-24 h-24 text-blue-400" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/20">
               <Thermometer className="w-5 h-5" />
            </div>
            <div>
               <p className="text-4xl font-display font-bold text-white mb-1">{(28 + Math.random() * 5).toFixed(1)}°</p>
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Temp. Ambient</p>
            </div>
          </div>

          <div className="glass-card bg-[#0a111b] border-white/5 p-6 flex flex-col justify-between aspect-square relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Umbrella className="w-24 h-24 text-emerald-400" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/20">
               <Droplets className="w-5 h-5" />
            </div>
            <div>
               <p className="text-4xl font-display font-bold text-white mb-1">{location.avgRainfall.toFixed(1)}</p>
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Daily.Yield mm</p>
            </div>
          </div>
        </div>

        <div className="glass-card bg-white/5 border-white/5 p-5 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Wind className="w-5 h-5" />
             </div>
             <div>
                <p className="text-xs font-bold text-white uppercase tracking-widest">Velocity</p>
                <p className="text-[10px] text-slate-400 font-medium tracking-wide">{(12 + Math.random() * 8).toFixed(1)} km/h NW</p>
             </div>
           </div>
           <div className="h-8 w-px bg-white/10" />
           <div className="text-right">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Hydration</p>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">High (82%)</p>
           </div>
        </div>
      </section>

      {/* Quick Launchpad */}
      <section className="space-y-4">
        <p className="subheading ml-4 uppercase tracking-[0.4em] text-[8px] text-slate-500">Resource Control</p>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <motion.button
              key={action.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setScreen(action.id as Screen)}
              className={cn(
                "p-5 rounded-[2rem] border flex flex-col items-center gap-3 transition-all hover:bg-white/5 group",
                action.color
              )}
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-transform group-hover:rotate-6">
                {React.cloneElement(action.icon as React.ReactElement<any>, { className: 'w-5 h-5' })}
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest leading-none">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Strategic Insights */}
      <section className="space-y-4">
         <div className="flex items-center gap-3 ml-4">
            <Brain className="w-4 h-4 text-emerald-500" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 italic">AI Intelligence</p>
         </div>
         <div className="space-y-3">
            {insights.map((insight, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className={cn(
                   "glass-card p-5 border-l-4 transition-all hover:translate-x-1",
                   insight.positive ? "border-l-emerald-500" : "border-l-amber-500"
                 )}
               >
                  <p className="text-[15px] font-display font-bold text-white mb-1">{insight.title}</p>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">{insight.desc}</p>
               </motion.div>
            ))}
         </div>
         <button 
           onClick={() => setScreen('assistant')}
           className="w-full h-14 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center gap-3 hover:bg-emerald-600/20 transition-all uppercase tracking-widest shadow-lg shadow-emerald-900/20"
         >
           Query Intelligence <ArrowRight className="w-4 h-4" />
         </button>
      </section>

      {/* Geographic Switcher */}
      <section className="px-4">
        <button 
          onClick={cycleLocation}
          className="w-full glass-card p-4 flex items-center justify-between border-dashed border-white/10 hover:border-emerald-500/30 transition-all group"
        >
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Node: <span className="text-white ml-2">{location.region}</span></span>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
        </button>
      </section>
    </div>
  );
}

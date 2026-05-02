import React from 'react';
import { motion } from 'motion/react';
import { 
  Droplet, 
  Droplets,
  ShowerHead, 
  Leaf, 
  ArrowUpRight, 
  Info,
  Calendar,
  CloudLightning,
  CloudRain,
  TrendingUp
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { HistoryEntry, LocationData } from '../types';
import { cn } from '../lib/utils';

export default function Dashboard({ history, location, rainfall }: { history: HistoryEntry[], location: LocationData, rainfall: number }) {
  const todaySaved = history[0]?.totalSaved || 0;
  const tankFill = 68; 
  
  const weeklyData = [
    { day: 'Mon', liters: 400 },
    { day: 'Tue', liters: 800 },
    { day: 'Wed', liters: 600 },
    { day: 'Thu', liters: 1200 },
    { day: 'Fri', liters: 900 },
    { day: 'Sat', liters: 2100 },
    { day: 'Sun', liters: todaySaved },
  ];

  return (
    <div className="space-y-6 pb-4">
      {/* Dynamic Location Card */}
      <section className="glass-card bg-white/40 border-sky-100/40 shadow-[0_8px_32px_-8px_rgba(14,165,233,0.1)] backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
             <div className="p-2 rounded-xl bg-sky-100/60">
               <CloudRain className="w-5 h-5 text-sky-600" />
             </div>
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-800/50">Atmospheric Data</span>
          </div>
          <span className="text-[10px] font-bold text-sky-600 bg-sky-100/50 px-3 py-1.5 rounded-full border border-sky-200/30">{location.region}</span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-2xl font-display font-bold text-stone-800">{rainfall.toFixed(1)}mm</h3>
            <p className="text-xs text-stone-400 font-medium italic">Expected precipitation</p>
          </div>
          <div className="text-right">
             <p className="text-[9px] font-bold text-stone-300 uppercase tracking-tighter">Real-time Data</p>
             <p className="text-[10px] text-stone-400 font-semibold italic">Open-Meteo V3</p>
          </div>
        </div>
      </section>

      {/* Hero Card - Progress */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="glass-card p-0 overflow-hidden relative border-none bg-sky-900 shadow-[0_48px_80px_-24px_rgba(12,165,233,0.5)] transition-all hover:scale-[1.01]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,114,182,0.4),transparent)] opacity-60" />
          <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-sky-400/20 blur-[120px] rounded-full" />
          
          <div className="p-10 relative z-10">
            <div className="flex justify-between items-start mb-10">
              <div className="space-y-1">
                <p className="text-sky-300 text-[10px] font-bold uppercase tracking-[0.4em] leading-none mb-3 opacity-80">Atmospheric Yield</p>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-6xl sm:text-8xl font-display font-bold text-white tracking-tighter leading-none">
                    {(todaySaved / 1000).toFixed(1)}
                  </h2>
                  <div className="flex flex-col -space-y-1">
                    <span className="text-3xl sm:text-4xl font-display font-bold text-pink-300/60 italic tracking-tighter">K</span>
                    <span className="text-[10px] font-bold text-sky-300/40 uppercase tracking-[0.3em]">Ltrs</span>
                  </div>
                </div>
              </div>
              <div className="w-16 h-16 rounded-[2rem] bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-md text-pink-300 shadow-2xl transition-all hover:bg-white/20 active:scale-95 group">
                <ArrowUpRight className="w-8 h-8 transition-transform group-hover:rotate-12 group-hover:scale-110" />
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                 <span className="text-[10px] font-bold text-sky-300 flex items-center gap-3 uppercase tracking-widest leading-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-pulse shadow-[0_0_12px_rgba(244,114,182,1)]" />
                    Storage Velocity
                 </span>
                <span className="text-[11px] font-bold text-white bg-white/10 px-5 py-2.5 rounded-2xl border border-white/10 backdrop-blur-md font-mono tracking-widest">{tankFill}% OPTIMAL</span>
              </div>
              <div className="h-6 w-full bg-black/40 rounded-full p-1.5 overflow-hidden relative shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${tankFill}%` }}
                  transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-gradient-to-r from-sky-500 via-sky-300 to-pink-400 rounded-full shadow-[0_0_40px_rgba(244,114,182,0.8)]"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Weekly Performance & Forecast */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-800/40 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-sky-300" />
            Atmospheric Forecast
          </h3>
          <div className="flex items-center gap-1 text-sky-600 bg-sky-50 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm">
             7-Day Outlook
          </div>
        </div>
        
        <div className="glass-card bg-white/70 backdrop-blur-md p-7 shadow-xl shadow-sky-900/5 border-white/50">

          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorLiters" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#f472b6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(16px)', border: '1px solid rgba(14,165,233,0.1)', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', boxShadow: '0 25px 50px -12px rgba(14,165,233,0.15)' }}
                  itemStyle={{ color: '#0369a1' }}
                  cursor={{ stroke: '#e0f2fe', strokeWidth: 2, strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="liters" 
                  stroke="#0ea5e9" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorLiters)" 
                  animationDuration={3000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mt-6">
             {weeklyData.map((d, i) => (
               <div key={i} className="text-center space-y-1.5">
                  <p className="text-[8px] font-bold text-stone-400 uppercase tracking-widest">{d.day}</p>
                  <div className={cn("w-1.5 h-1.5 rounded-full mx-auto", d.liters > 1000 ? "bg-stone-400" : "bg-stone-200")} />
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Impact Indicators */}
      <section className="grid grid-cols-2 gap-4">
        <ImpactMetric 
          icon={<ShowerHead className="w-5 h-5" />}
          value="42"
          label="Showers Saved"
          color="blue"
        />
        <ImpactMetric 
          icon={<Leaf className="w-5 h-5" />}
          value="128"
          label="Plants Watered"
          color="green"
        />
      </section>

      {/* Goal Progress Section */}
      <section className="glass-card bg-white border-sky-100/50 shadow-xl shadow-sky-900/5 relative overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-800/40">Monthly Target</h4>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-display font-bold text-sky-900">12,400</span>
              <span className="text-[10px] font-bold text-sky-300 uppercase tracking-widest">/ 15,000L</span>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100/50 shadow-sm">
             <TrendingUp className="w-5 h-5 text-sky-600" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
             <span className="text-sky-300">Progress</span>
             <span className="text-sky-700">82%</span>
          </div>
          <div className="h-2.5 w-full bg-sky-50 rounded-full overflow-hidden p-0.5">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '82%' }}
              viewport={{ once: true }}
              className="h-full bg-sky-600 rounded-full shadow-[0_0_8px_rgba(14,165,233,0.3)]"
            />
          </div>
          <p className="text-[10px] text-sky-800/60 font-medium italic leading-relaxed">
            "Your ecosystem is thriving! Just 2,600L more to hit the sustainability peak."
          </p>
        </div>
      </section>

      {/* Rewards / Achievements Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Eco Tokens</h3>
          <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">View Badges</span>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar">
          {[
            { name: 'Sky Saver', count: '5k L', icon: <Droplet />, level: 4, color: 'sky' },
            { name: 'Rain Boss', count: '10k L', icon: <Droplets />, level: 2, color: 'blue' },
            { name: 'Eco Giant', count: '25k L', icon: <TrendingUp />, level: 0, color: 'oat' },
          ].map((m, idx) => (
            <div key={idx} className={cn(
              "flex-shrink-0 w-36 h-48 rounded-[2.5rem] p-5 flex flex-col items-center text-center justify-between relative overflow-hidden transition-all hover:-translate-y-2",
              m.level > 0 ? "bg-white border border-stone-100 shadow-sm" : "bg-stone-50 border-stone-200/50 opacity-60 grayscale"
            )}>
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-2 shadow-sm",
                m.color === 'sky' && "bg-sky-50 text-sky-500",
                m.color === 'blue' && "bg-blue-50 text-blue-600",
                m.color === 'oat' && "bg-stone-50 text-stone-300",
              )}>
                {React.cloneElement(m.icon as React.ReactElement, { className: 'w-7 h-7' })}
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-stone-800 leading-tight">{m.name}</p>
                <p className="text-[13px] font-display font-bold text-stone-400">{m.count}</p>
              </div>
              <div className="w-full space-y-2">
                <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                   <div className="h-full bg-stone-800 transition-all duration-1000" style={{ width: `${(m.level/5)*100}%` }} />
                </div>
                <p className="text-[8px] font-bold text-stone-300 uppercase tracking-widest">Lvl {m.level}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info Banner */}
      <section className="glass-card border-none bg-stone-900 text-white p-6 flex gap-6 items-center rounded-[2.5rem] group overflow-hidden relative shadow-2xl shadow-stone-200">
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform relative z-10">
          <Info className="text-white w-6 h-6" />
        </div>
        <div className="relative z-10">
          <p className="text-stone-300 text-[11px] leading-relaxed font-semibold italic">
             "Your storage system is performing 15% better than last month's average. Keep it up!"
          </p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      </section>
    </div>
  );
}

function ImpactMetric({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: 'blue' | 'green' }) {
  const colorStyles = {
    blue: "text-sky-600 bg-sky-50 border-sky-100 shadow-sky-900/5",
    green: "text-pink-500 bg-pink-50 border-pink-100 shadow-pink-900/5"
  };

  return (
    <div className="glass-card p-5 border-none bg-white/80 backdrop-blur-sm shadow-xl shadow-sky-900/5 flex flex-col gap-4">
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm", colorStyles[color])}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
      </div>
      <div>
        <p className="text-3xl font-display font-bold leading-none text-slate-800">{value}</p>
        <p className="text-[10px] text-stone-400 mt-2 uppercase font-bold tracking-[0.1em]">{label}</p>
      </div>
    </div>
  );
}



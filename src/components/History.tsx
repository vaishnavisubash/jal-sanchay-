import React from 'react';
import { format, parseISO } from 'date-fns';
import { motion } from 'motion/react';
import { 
  History as HistoryIcon,
  Filter,
  BarChart3,
  Calendar,
  ChevronRight,
  TrendingUp,
  Droplets
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { HistoryEntry } from '../types';
import { cn } from '../lib/utils';

export default function HistoryScreen({ history }: { history: HistoryEntry[] }) {
  const chartData = [...history].reverse().map(entry => ({
    date: format(parseISO(entry.date), 'MMM dd'),
    liters: entry.totalSaved
  }));

  const totalMonthly = history.reduce((acc, curr) => acc + curr.totalSaved, 0);
  const avgEfficiency = 92;

  return (
    <div className="space-y-10 pb-10">
      <div className="flex justify-between items-end px-1">
        <div className="space-y-2">
          <h2 className="text-4xl font-display font-bold text-stone-800 tracking-tight leading-tight">Archive <span className="text-pink-500 italic">Journal</span></h2>
          <p className="text-sky-800/40 text-sm font-medium italic">Retrospective analysis of your atmospheric harvest.</p>
        </div>
        <button className="w-12 h-12 rounded-2xl bg-white border border-sky-100 flex items-center justify-center text-sky-600 hover:bg-sky-50 shadow-xl shadow-sky-900/5 transition-all active:scale-95">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="glass-card p-6 bg-gradient-to-br from-sky-600 to-sky-500 border-none relative overflow-hidden transition-all hover:scale-[1.02] shadow-2xl shadow-sky-900/20 group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform" />
          <p className="text-sky-100 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 relative z-10 opacity-70">Total Yield</p>
          <div className="flex items-baseline gap-1 relative z-10 transition-all">
            <span className="text-4xl font-display font-bold text-white tracking-tighter">{(totalMonthly/1000).toFixed(1)}k</span>
            <span className="text-xs font-bold text-white/50 uppercase italic tracking-widest">Ltrs</span>
          </div>
        </div>
        <div className="glass-card p-6 bg-white border-pink-100 transition-all hover:scale-[1.02] shadow-xl shadow-pink-900/5 group">
          <p className="text-pink-300 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 group-hover:text-pink-400 transition-colors">Efficiency Score</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-display font-bold text-stone-800 tracking-tighter">{avgEfficiency}%</span>
            <span className="text-[10px] font-bold text-pink-200 uppercase italic">Avg</span>
          </div>
        </div>
      </div>

      <div className="glass-card p-0 overflow-hidden relative border-stone-100/30 bg-white shadow-sm">
        <div className="p-8 relative z-10">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
               <TrendingUp className="w-5 h-5 text-rose-300" />
               <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em]">Volume Dynamics</span>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-bold text-stone-300 bg-stone-50 px-2.5 py-1 rounded-full uppercase tracking-widest">
               Last 3 Entries
            </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#d1d5db', fontSize: 9, fontWeight: 700 }}
                  dy={15}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(168, 162, 158, 0.05)', radius: 16 }}
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)' }}
                  itemStyle={{ color: '#44403c' }}
                />
                <Bar 
                  dataKey="liters" 
                  radius={[12, 12, 12, 12]} 
                  barSize={40}
                  animationDuration={1500}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === chartData.length - 1 ? '#0ea5e9' : '#f0f9ff'} 
                      className="transition-all duration-700"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center px-2">
           <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Activity Timeline</h3>
           <button className="text-[10px] font-bold text-stone-300 uppercase tracking-widest hover:text-stone-800 transition-colors">Archive View</button>
        </div>
        <div className="space-y-4">
          {history.map((entry, idx) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              key={entry.id}
              className="glass-card p-6 flex items-center justify-between border-transparent bg-white shadow-[0_4px_20px_-4px_rgba(14,165,233,0.1)] hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center border border-sky-100 group-hover:bg-sky-900 transition-colors duration-500">
                  <Droplets className="w-7 h-7 text-sky-200 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-stone-800 font-bold text-[15px] tracking-tight">
                    {format(parseISO(entry.date), 'MMMM do')}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-3 h-3 text-stone-300" />
                    <p className="text-[10px] text-stone-300 font-bold uppercase tracking-widest">
                      {format(parseISO(entry.date), 'yyyy')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-stone-800 font-display font-bold text-xl leading-none">+{entry.totalSaved.toLocaleString()}</p>
                  <p className="text-[10px] text-stone-300 uppercase font-bold tracking-widest mt-1.5 italic">Liters</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                  <ChevronRight className="w-4 h-4 text-stone-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

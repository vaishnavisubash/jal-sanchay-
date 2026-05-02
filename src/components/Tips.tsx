import React from 'react';
import { motion } from 'motion/react';
import { 
  Droplet, 
  Trash2, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  Info
} from 'lucide-react';
import { Tip } from '../types';
import { cn } from '../lib/utils';

const WATER_TIPS: Tip[] = [
  {
    id: '1',
    title: 'Regular Rooftop Cleaning',
    description: 'Ensure your roof is free of dust and leaves before the rains. A clean roof improves water quality by 40%.',
    icon: 'trash'
  },
  {
    id: '2',
    title: 'Install Mesh Filters',
    description: 'Prevent debris and insects from entering your tank. This reduces maintenance and keeps water fresh.',
    icon: 'shield'
  },
  {
    id: '3',
    title: 'Expand Tank Capacity',
    description: 'Your current capacity overflows during heavy downpours. Adding a secondary tank could save 2000L more per month.',
    icon: 'trending'
  },
  {
    id: '4',
    title: 'First Flush Diverter',
    description: 'Bypass the first few minutes of rain to wash away surface pollutants. Essential for potable use.',
    icon: 'droplet'
  }
];

export default function TipsScreen() {
  return (
    <div className="space-y-12 pb-10">
      <div className="space-y-3">
        <h2 className="text-4xl font-display font-bold text-stone-800 tracking-tight leading-tight">Insight <span className="text-emerald-600 italic">Academy</span></h2>
        <p className="text-emerald-800/40 text-sm font-medium italic">Expert curation for high-yield sustainable living.</p>
      </div>

      {/* Featured Insight Card */}
      <div className="relative glass-card rounded-[3rem] p-10 bg-stone-900 border-none overflow-hidden group shadow-2xl shadow-stone-200">
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/10 text-emerald-400 shadow-sm transition-transform group-hover:scale-110">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em] leading-none">Curator Pick</span>
          </div>
          <h3 className="text-2xl font-display font-bold leading-tight text-white tracking-tight">System check required for peak monsoon.</h3>
          <p className="text-stone-400 text-[13px] leading-relaxed font-medium">
            We recommend auditing your mesh filters and first-flush diverters today to ensure the purest harvest during the initial heavy rains.
          </p>
          <button className="flex items-center gap-2 text-white text-[11px] font-bold mt-4 hover:translate-x-1 transition-transform group/btn uppercase tracking-widest">
            System Checklist <ArrowRight className="w-4 h-4 text-stone-500" />
          </button>
        </div>
        
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 blur-[60px] rounded-full -z-0" />
      </div>

      {/* Tips Grid */}
      <div className="space-y-8">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">Best Practices</h3>
          <div className="w-8 h-px bg-stone-100" />
        </div>
        <div className="grid grid-cols-1 gap-6">
          {WATER_TIPS.map((tip, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={tip.id} 
              className="glass-card rounded-[2.5rem] p-7 flex gap-7 border-none bg-white shadow-sm hover:shadow-xl transition-all duration-700 group"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-[1.75rem] bg-stone-50 border border-stone-100 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-all duration-700">
                {tip.icon === 'trash' && <Trash2 className="w-8 h-8 text-stone-300 group-hover:text-emerald-300 transition-colors" />}
                {tip.icon === 'shield' && <ShieldCheck className="w-8 h-8 text-stone-300 group-hover:text-emerald-300 transition-colors" />}
                {tip.icon === 'trending' && <TrendingUp className="w-8 h-8 text-stone-300 group-hover:text-emerald-300 transition-colors" />}
                {tip.icon === 'droplet' && <Droplet className="w-8 h-8 text-stone-300 group-hover:text-emerald-300 transition-colors" />}
              </div>
              <div className="space-y-2 pt-1.5 overflow-hidden">
                <h4 className="font-bold text-stone-800 text-[17px] tracking-tight">{tip.title}</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed font-normal italic">
                  {tip.description}
                </p>
                <div className="pt-2">
                   <div className="h-0.5 w-0 group-hover:w-12 bg-stone-800 transition-all duration-700" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Community / FAQ Section */}
      <div className="glass-card rounded-3xl p-8 flex items-center gap-6 bg-stone-50 border-stone-200/50 border-spacing-4 group overflow-hidden relative">
        <div className="absolute top-0 right-0 w-16 h-16 bg-stone-200/20 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="p-4 rounded-2xl bg-white shadow-sm relative z-10">
          <Info className="w-6 h-6 text-stone-400" />
        </div>
        <p className="text-[11px] text-stone-500 font-bold leading-relaxed relative z-10 max-w-[200px]">
          Need a personalized setup plan? <span className="text-stone-800 underline decoration-stone-200 underline-offset-4 cursor-pointer hover:decoration-stone-800 transition-all">Consult a curator</span>.
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Wrench, 
  ShieldCheck, 
  AlertCircle, 
  Plus, 
  Calendar,
  Layers,
  Droplet,
  Trash2,
  ChevronRight,
  ClipboardList
} from 'lucide-react';
import { cn } from '../lib/utils';

const EQUIPMENT_DATA = [
  { id: '1', name: 'Primary Silt Filter', status: 'Optimal', life: 85, lastService: '12 days ago' },
  { id: '2', name: 'Storage Tank A', status: 'Inspection Due', life: 40, lastService: '5 months ago' },
  { id: '3', name: 'First-Flush Diverter', status: 'Optimal', life: 92, lastService: '3 days ago' },
];

export default function Equipment() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'maintenance'>('inventory');

  return (
    <div className="space-y-10 pb-10">
      <div className="space-y-3">
        <h2 className="text-4xl font-display font-bold text-stone-800 tracking-tight leading-tight">System <span className="text-sky-600 italic">Core</span></h2>
        <p className="text-sky-800/40 text-sm font-medium italic">Hardware architecture and maintenance rituals.</p>
      </div>

      <div className="flex bg-white/60 p-1.5 rounded-[2.5rem] border border-sky-100/40 shadow-inner backdrop-blur-md">
        <button 
          onClick={() => setActiveTab('inventory')}
          className={cn(
            "flex-1 py-4 rounded-[2rem] text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300",
            activeTab === 'inventory' 
              ? "bg-sky-500 text-white shadow-xl shadow-sky-500/30" 
              : "text-sky-300 hover:text-sky-600"
          )}
        >
          Inventory
        </button>
        <button 
          onClick={() => setActiveTab('maintenance')}
          className={cn(
            "flex-1 py-4 rounded-[2rem] text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300",
            activeTab === 'maintenance' 
              ? "bg-pink-400 text-white shadow-xl shadow-pink-500/30" 
              : "text-sky-300 hover:text-sky-600"
          )}
        >
          Maintenance
        </button>
      </div>

      <div className="space-y-8">
        {activeTab === 'inventory' ? (
          <div className="space-y-6">
            <div className="space-y-5">
              {EQUIPMENT_DATA.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.id}
                  className="glass-card bg-white p-6 flex items-center justify-between group border-none shadow-sm hover:shadow-xl transition-all duration-700"
                >
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                      item.life > 50 ? "bg-sky-50 text-sky-400 group-hover:bg-sky-900 group-hover:text-white" : "bg-sky-100 text-sky-500"
                    )}>
                      {item.name.includes('Filter') ? <Layers className="w-7 h-7" /> : <Droplet className="w-7 h-7" />}
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-stone-800 tracking-tight">{item.name}</h4>
                      <p className="text-[10px] text-stone-300 font-bold uppercase tracking-widest mt-1">Serviced {item.lastService}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-3">
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className={cn("text-[9px] font-bold uppercase py-1 px-2.5 rounded-full", 
                        item.status === 'Optimal' ? "bg-sky-50 text-sky-600" : "bg-rose-50 text-rose-400")}>
                        {item.status}
                      </span>
                    </div>
                    <div className="w-20 h-1.5 bg-sky-50 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={cn("h-full transition-all duration-1000", item.life > 50 ? "bg-sky-600" : "bg-rose-400")}
                        style={{ width: `${item.life}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button className="w-full h-18 bg-sky-50/50 border-2 border-dashed border-sky-100 rounded-[2.5rem] flex items-center justify-center gap-3 text-sky-300 hover:border-sky-200 hover:text-sky-800 transition-all group">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Register New Unit</span>
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="glass-card bg-sky-900 p-8 border-none relative overflow-hidden shadow-2xl shadow-sky-900/20 rounded-[2.5rem]">
               <div className="relative z-10 flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                    <AlertCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white tracking-tight">Active Operation</h3>
                    <p className="text-sky-200/60 text-xs mt-2 leading-relaxed font-medium">Storage Tank A requires a professional deep flush and seal audit within <span className="text-white">14 days</span>.</p>
                  </div>
               </div>
               <Wrench className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 -rotate-12" />
            </div>

            <div className="space-y-8">
               <div className="flex items-center justify-between px-2">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-sky-400 font-mono">Service Timeline</h3>
                  <div className="w-8 h-px bg-sky-100" />
               </div>
               <div className="space-y-2">
                 {[1, 2].map((_, idx) => (
                   <div key={idx} className="flex gap-8 items-start relative pl-6 pb-10 last:pb-0">
                     <div className="absolute left-[3px] top-8 bottom-0 w-px bg-stone-100" />
                     <div className="absolute left-0 top-2.5 w-2 h-2 rounded-full bg-rose-400 ring-4 ring-rose-50" />
                     <div className="flex-1 glass-card bg-white p-6 shadow-[0_4px_20px_-4px_rgba(12,165,233,0.1)]">
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest font-mono">APR 24, 2026</span>
                          <span className="text-[9px] font-bold bg-stone-50 text-stone-400 px-2.5 py-1 rounded-full uppercase tracking-tighter transition-all hover:bg-stone-800 hover:text-white cursor-help">Verified</span>
                        </div>
                        <h4 className="text-[14px] font-bold text-stone-800 tracking-tight">Filter Replacement Case</h4>
                        <p className="text-[11px] text-stone-400 mt-2 italic font-medium leading-relaxed">Successfully audited and swapped the mesh in primary siltation filter.</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}
      </div>

      <section className="glass-card bg-rose-50 p-8 border-rose-100 border-spacing-4 rounded-[2.5rem] relative overflow-hidden group cursor-pointer hover:bg-rose-100/50 transition-colors duration-700">
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-xl shadow-sm">
               <ShieldCheck className="w-5 h-5 text-rose-400" />
            </div>
            <span className="text-[10px] font-bold text-rose-300 uppercase tracking-[0.2em] leading-none">Protection Plan</span>
          </div>
          <h3 className="text-xl font-display font-bold text-stone-800 pr-10 tracking-tight leading-tight">Curated Professional Maintenance</h3>
          <p className="text-rose-900/40 text-[11px] leading-relaxed font-normal italic">Unlock automated atmospheric sensor alerts and professional onsite audits monthly.</p>
          <div className="flex items-center gap-2 text-[10px] font-bold text-rose-500 mt-2 group-hover:translate-x-1 transition-all uppercase tracking-[0.2em]">
            Maintenance Details <ChevronRight className="w-4 h-4 text-rose-200" />
          </div>
        </div>
        <ClipboardList className="absolute -bottom-8 -right-8 w-40 h-40 text-rose-200/20 -rotate-12 transition-transform group-hover:scale-110" />
      </section>
    </div>
  );
}

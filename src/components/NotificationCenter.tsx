import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  X, 
  CloudRain, 
  AlertTriangle, 
  CheckCircle2, 
  Droplet 
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'rain';
  time: string;
}

const NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'Heavy Rain Alert', message: '70% chance of rain in the next 3 hours. Prepare your catchment area.', type: 'rain', time: '10m ago' },
  { id: '2', title: 'Maintenance Due', message: 'Tank A inspection is overdue by 2 days.', type: 'warning', time: '2h ago' },
  { id: '3', title: 'Goal Achieved', message: 'Congratulations! You reached 80% of your monthly goal.', type: 'success', time: 'Yesterday' },
];

export default function NotificationCenter({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[50]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-24 right-5 left-5 sm:left-auto sm:w-[380px] bg-[#0c1a2e] rounded-[2.5rem] shadow-[0_32px_64px_rgba(0,0,0,0.4)] z-[60] overflow-hidden border border-white/5"
          >
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">System Alerts</span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-all">
                <X className="w-5 h-5 text-slate-300" />
              </button>
            </div>
            
            <div className="max-h-[440px] overflow-y-auto p-4 space-y-2">
              {NOTIFICATIONS.map((n) => (
                <div key={n.id} className="p-5 rounded-[2rem] hover:bg-white/5 transition-all flex gap-5 group cursor-pointer border border-transparent hover:border-white/5">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border transition-all duration-500",
                    n.type === 'rain' && "bg-emerald-600/10 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-600 group-hover:text-white",
                    n.type === 'warning' && "bg-white/5 text-slate-400 border-white/10",
                    n.type === 'success' && "bg-emerald-600 text-white shadow-lg",
                    n.type === 'info' && "bg-white/5 text-slate-400 border-white/10",
                  )}>
                    {n.type === 'rain' && <CloudRain className="w-6 h-6" />}
                    {n.type === 'warning' && <AlertTriangle className="w-6 h-6" />}
                    {n.type === 'success' && <CheckCircle2 className="w-6 h-6" />}
                    {n.type === 'info' && <Droplet className="w-6 h-6" />}
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-[15px] font-serif font-bold text-white truncate">{n.title}</h4>
                      <span className="text-[9px] font-mono font-bold text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 font-medium">{n.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white/5 text-center">
               <button className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em] hover:text-white transition-colors">Clear All Intercepts</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

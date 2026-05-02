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
            className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-[50]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-24 right-5 left-5 sm:left-auto sm:w-[320px] bg-white rounded-3xl shadow-2xl z-[60] overflow-hidden border border-stone-100"
          >
            <div className="p-4 border-b border-stone-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-sky-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-800">Alerts</span>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-stone-50 rounded-lg transition-colors">
                <X className="w-4 h-4 text-stone-400" />
              </button>
            </div>
            
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
              {NOTIFICATIONS.map((n) => (
                <div key={n.id} className="p-3 rounded-2xl hover:bg-stone-50 transition-colors flex gap-3 group">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                    n.type === 'rain' && "bg-sky-50 text-sky-500",
                    n.type === 'warning' && "bg-amber-50 text-amber-500",
                    n.type === 'success' && "bg-rose-50 text-rose-400",
                    n.type === 'info' && "bg-slate-50 text-slate-500",
                  )}>
                    {n.type === 'rain' && <CloudRain className="w-5 h-5" />}
                    {n.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                    {n.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                    {n.type === 'info' && <Droplet className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <h4 className="text-[13px] font-bold text-slate-800 truncate">{n.title}</h4>
                      <span className="text-[9px] font-bold text-stone-300">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-normal line-clamp-2">{n.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-stone-50/50 text-center">
               <button className="text-[10px] font-bold text-sky-600 uppercase tracking-widest hover:underline">Mark all as read</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

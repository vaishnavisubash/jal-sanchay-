import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Info, HelpCircle } from 'lucide-react';

interface HelpOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  screen: string;
}

const HELP_CONTENT: Record<string, { title: string; desc: string; tips: string[] }> = {
  dashboard: {
    title: "Atmospheric Insights",
    desc: "This is your control center for real-time harvesting data.",
    tips: [
      "Check the 'Atmospheric Data' for current precipitation levels.",
      "Monitor your 'Storage Status' to prevent tank overflow.",
      "Track your monthly progress against your sustainability targets."
    ]
  },
  calculator: {
    title: "Yield Curator",
    desc: "Precision tools to plan and predict your harvesting output.",
    tips: [
      "Select your catchment type for accurate efficiency coefficients.",
      "Use 'Precision Area' to match your specific roof dimensions.",
      "Sync with satellite data or manually overwrite for local testing."
    ]
  },
  history: {
    title: "Archive Journal",
    desc: "A retrospective look at your environmental contribution.",
    tips: [
      "Analyze usage trends through the volume dynamics chart.",
      "Review historical rainfall data to predict seasonal yields.",
      "Keep a consistent log to improve your storage strategy."
    ]
  },
  tips: {
    title: "Insight Academy",
    desc: "Expert-curated guides for high-yield conservation.",
    tips: [
      "Read the 'Curator Pick' for timely seasonal advice.",
      "Follow 'Best Practices' to prolong your hardware lifespan.",
      "Consult a curator if you need a personalized infrastructure plan."
    ]
  },
  equipment: {
    title: "System Core",
    desc: "Monitor and manage your physical harvesting infrastructure.",
    tips: [
      "Track 'Inventory' health to predict maintenance needs.",
      "Follow 'Maintenance Rituals' for system integrity.",
      "Monitor 'Optimal' status to ensure peak performance."
    ]
  }
};

export default function HelpOverlay({ isOpen, onClose, screen }: HelpOverlayProps) {
  const content = HELP_CONTENT[screen] || HELP_CONTENT.dashboard;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-3xl"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 100 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-full max-w-lg bg-[#081221] rounded-t-[4rem] sm:rounded-[4rem] shadow-[0_64px_128px_rgba(0,0,0,0.5)] relative overflow-hidden border-t sm:border border-white/10"
          >
            <div className="p-12 sm:p-16">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-5">
                  <div className="p-4 rounded-2xl bg-emerald-600/20 text-emerald-500 border border-emerald-500/30">
                    <HelpCircle className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-serif font-black text-white tracking-tighter">
                    {content.title}.
                  </h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-3 rounded-full bg-white/5 text-slate-500 hover:bg-white/10 hover:text-white transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-10">
                <p className="text-slate-500 text-lg font-medium leading-relaxed italic border-l-2 border-emerald-500/30 pl-6">
                  "{content.desc}"
                </p>

                <div className="space-y-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-emerald-500/50">Tactical Protocols</p>
                  <ul className="space-y-6">
                    {content.tips.map((tip, i) => (
                      <motion.li 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="flex gap-5 items-start group"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 mt-2 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)] group-hover:scale-125 transition-transform" />
                        <span className="text-sm text-slate-400 font-medium leading-relaxed group-hover:text-white transition-colors">{tip}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={onClose}
                  className="w-full h-20 bg-emerald-600 text-white rounded-[2.5rem] font-black text-xs shadow-2xl active:scale-95 transition-all mt-6 uppercase tracking-[0.4em]"
                >
                  Dismiss Intel
                </button>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

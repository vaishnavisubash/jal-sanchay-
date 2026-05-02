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
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-sm bg-white rounded-t-[3rem] sm:rounded-[3rem] shadow-2xl relative overflow-hidden"
          >
            <div className="p-10 pt-12">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-50 text-sky-500">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-stone-800 tracking-tight">
                    {content.title}
                  </h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-stone-50 transition-colors text-stone-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-stone-500 text-sm font-medium leading-relaxed italic">
                  "{content.desc}"
                </p>

                <div className="space-y-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-300">Quick Guides</p>
                  <ul className="space-y-3">
                    {content.tips.map((tip, i) => (
                      <motion.li 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="flex gap-3 items-start"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                        <span className="text-xs text-stone-400 font-medium leading-relaxed">{tip}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={onClose}
                  className="w-full h-14 bg-sky-900 text-white rounded-[2rem] font-bold text-sm shadow-xl active:scale-95 transition-all mt-4"
                >
                  Understood
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

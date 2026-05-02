import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplets, 
  ArrowRight, 
  User, 
  MapPin, 
  Waves,
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';

interface AuthProps {
  onComplete: (user: { name: string; city: string }) => void;
}

export default function Auth({ onComplete }: AuthProps) {
  const [step, setStep] = useState<'welcome' | 'setup'>('welcome');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');

  const handleFinish = () => {
    if (name && city) {
      onComplete({ name, city });
    }
  };

  return (
    <div className="h-full w-full bg-sky-50 relative overflow-hidden flex flex-col">
      {/* Background Elements */}
      <div className="absolute top-[-10%] right-[-20%] w-[600px] h-[600px] bg-sky-200/50 blur-[130px] rounded-full -z-0 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-20%] w-[500px] h-[500px] bg-pink-100/40 blur-[110px] rounded-full -z-0" />
      <div className="absolute top-[40%] left-[10%] w-[300px] h-[300px] bg-white/60 blur-[90px] rounded-full -z-0" />
      
      <AnimatePresence mode="wait">
        {step === 'welcome' ? (
          <motion.div 
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col px-10 pt-28 z-10"
          >
            <motion.div 
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="w-28 h-28 bg-white/80 backdrop-blur-xl rounded-[3.5rem] shadow-[0_24px_48px_-12px_rgba(12,165,233,0.3)] flex items-center justify-center mb-16 border border-white/80"
            >
              <div className="relative">
                <Droplets className="w-14 h-14 text-sky-500" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -inset-4 bg-sky-400/20 rounded-full blur-xl -z-10"
                />
              </div>
            </motion.div>

            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-[0.5em] ml-1">Rainwater Intelligence</span>
                <h1 className="text-5xl sm:text-7xl font-display font-bold leading-[0.95] text-stone-900 tracking-tighter">
                  Jal-Sanchay <span className="block text-sky-600 italic mt-1 pb-1">Tracker.</span>
                </h1>
              </div>
              <p className="text-stone-500/80 text-xl font-medium leading-relaxed max-w-[320px] font-sans">
                The ultimate curator for harvesting, tracking, and precisely conserving rainwater.
              </p>
            </div>

            <div className="mt-auto pb-24 space-y-8">
              <button 
                onClick={() => setStep('setup')}
                className="group w-full h-20 bg-sky-600 text-white rounded-[2.5rem] font-bold flex items-center justify-between px-8 shadow-[0_20px_40px_-8px_rgba(12,165,233,0.5)] hover:bg-sky-500 active:scale-[0.98] transition-all text-xl"
              >
                <span>Start Harvesting</span>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </button>
              
              <div className="flex flex-col items-center gap-3">
                <div className="h-px w-24 bg-sky-200/50" />
                <p className="text-[10px] font-bold text-sky-400 uppercase tracking-[0.4em]">
                  Premium Harvest Edition
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col px-10 pt-20 z-10"
          >
            <button 
              onClick={() => setStep('welcome')}
              className="w-14 h-14 rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 flex items-center justify-center text-sky-600 mb-16 hover:bg-white transition-all shadow-xl shadow-sky-900/5 active:scale-90"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <div className="space-y-3 mb-16">
              <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.3em]">Identity Setup</span>
              <h2 className="text-5xl font-display font-bold text-stone-900 tracking-tight leading-tight">Curate Your <span className="text-sky-600 italic">Space</span></h2>
              <p className="text-stone-400 text-lg font-medium pr-10">Personalize your high-fidelity atmospheric dashboard.</p>
            </div>

            <div className="space-y-12">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-sky-800/40 ml-4">Full Identity</label>
                <div className="relative group">
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 text-sky-300 group-focus-within:text-sky-500 transition-colors">
                    <User className="w-7 h-7" />
                  </span>
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-20 bg-white/80 backdrop-blur-md rounded-[2.5rem] px-20 outline-none border border-white/80 focus:border-sky-200 shadow-xl shadow-sky-900/5 transition-all font-bold text-stone-800 placeholder:text-stone-300 text-xl"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-sky-800/40 ml-4">Geographic Hub</label>
                <div className="relative group">
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 text-sky-300 group-focus-within:text-sky-500 transition-colors">
                    <MapPin className="w-7 h-7" />
                  </span>
                  <input 
                    type="text" 
                    placeholder="E.g. London, UK"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-20 bg-white/80 backdrop-blur-md rounded-[2.5rem] px-20 outline-none border border-white/80 focus:border-sky-200 shadow-xl shadow-sky-900/5 transition-all font-bold text-stone-800 placeholder:text-stone-300 text-xl"
                  />
                </div>
              </div>
            </div>

            <div className="mt-auto pb-24">
              <button 
                onClick={handleFinish}
                disabled={!name || !city}
                className={cn(
                  "w-full h-20 rounded-[2.5rem] font-bold flex items-center justify-center gap-4 transition-all shadow-2xl",
                  (name && city) 
                    ? "bg-stone-900 text-white shadow-stone-900/40 translate-y-0 active:scale-[0.98]" 
                    : "bg-sky-100 text-sky-300 shadow-none cursor-not-allowed translate-y-2 opacity-50"
                )}
              >
                Launch Dashboard
                <Sparkles className="w-6 h-6 text-pink-300" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 -rotate-12 opacity-5 pointer-events-none">
        <Waves className="w-full h-full text-stone-400" />
      </div>
    </div>
  );
}

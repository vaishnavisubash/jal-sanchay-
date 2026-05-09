import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  TrendingUp, 
  Calculator, 
  History, 
  Lightbulb, 
  Wrench, 
  CheckCircle2 
} from 'lucide-react';
import { cn } from '../lib/utils';

interface OnboardingProps {
  onDone: () => void;
}

const STEPS = [
  {
    title: "Atmospheric Intelligence",
    desc: "We curate real-time satellite data to predict exactly how much high-fidelity rainwater you can harvest today.",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "bg-sky-500 text-white"
  },
  {
    title: "The Yield Curator",
    desc: "Analyze your architectural potential. We'll quantify the liters waiting in the clouds for your estate.",
    icon: <Calculator className="w-6 h-6" />,
    color: "bg-pink-400 text-white"
  },
  {
    title: "Sustainability Archive",
    desc: "Every drop salvaged is a metric of your commitment. Monitor your planetary impact with precision.",
    icon: <History className="w-6 h-6" />,
    color: "bg-sky-100 text-sky-600"
  },
  {
    title: "Conservation Insights",
    desc: "Access proprietary rituals on filter maintenance and purification. Water care is the ultimate self care.",
    icon: <Lightbulb className="w-6 h-6" />,
    color: "bg-stone-900 text-white"
  }
];

export default function Onboarding({ onDone }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onDone();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-3xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-[#081221] rounded-[4rem] shadow-[0_64px_128px_-32px_rgba(0,0,0,0.5)] overflow-hidden relative border border-white/10"
      >
        <button 
          onClick={onDone}
          className="absolute top-10 right-10 w-12 h-12 rounded-full bg-white/5 text-slate-500 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-16 pt-24 text-center">
          <div className="flex justify-center mb-16">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStep}
                initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.7, rotate: 20 }}
                className={cn(
                  "w-32 h-32 rounded-[3.5rem] flex items-center justify-center shadow-2xl transition-all duration-700 bg-emerald-600/20 border border-emerald-500/30 text-emerald-500"
                )}
              >
                {React.cloneElement(STEPS[currentStep].icon as React.ReactElement<any>, { className: "w-12 h-12" })}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="space-y-6 mb-20">
            <h2 className="text-4xl font-serif font-black text-white tracking-tighter">
              {STEPS[currentStep].title}.
            </h2>
            <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-sm mx-auto">
              {STEPS[currentStep].desc}
            </p>
          </div>

          <div className="space-y-12">
            <button 
              onClick={handleNext}
              className="w-full h-24 bg-emerald-600 text-white rounded-[3rem] font-black text-xl flex items-center justify-center gap-4 shadow-2xl shadow-emerald-600/20 active:scale-95 transition-all uppercase tracking-[0.4em]"
            >
              {currentStep === STEPS.length - 1 ? "Initialize" : "Next Node"}
              <CheckCircle2 className="w-8 h-8" />
            </button>

            <div className="flex justify-center gap-4">
              {STEPS.map((_, i) => (
                <div 
                  key={i}
                  className={cn(
                    "h-2 rounded-full transition-all duration-1000",
                    i === currentStep ? "w-16 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" : "w-4 bg-white/5"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

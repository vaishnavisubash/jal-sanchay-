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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-sky-900/40 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-sm bg-white rounded-[3.5rem] shadow-[0_48px_80px_-24px_rgba(0,0,0,0.3)] overflow-hidden relative border border-white"
      >
        <button 
          onClick={onDone}
          className="absolute top-8 right-8 w-10 h-10 rounded-full hover:bg-stone-50 transition-colors text-stone-200 flex items-center justify-center hover:text-stone-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-10 pt-16">
          <div className="flex justify-center mb-12">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStep}
                initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 15 }}
                className={cn("w-24 h-24 rounded-[3rem] flex items-center justify-center shadow-2xl transition-all duration-500", STEPS[currentStep].color)}
              >
                {STEPS[currentStep].icon}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="text-center space-y-4 mb-14 px-2">
            <h2 className="text-3xl font-display font-bold text-stone-900 tracking-tight">
              {STEPS[currentStep].title}
            </h2>
            <p className="text-stone-400 text-base font-medium leading-relaxed italic">
              "{STEPS[currentStep].desc}"
            </p>
          </div>

          <div className="space-y-8">
            <button 
              onClick={handleNext}
              className="w-full h-18 bg-sky-600 text-white rounded-[2.5rem] font-bold flex items-center justify-center gap-4 shadow-xl shadow-sky-200 active:scale-95 transition-all text-lg"
            >
              {currentStep === STEPS.length - 1 ? "Initialize Portal" : "Continue"}
              <CheckCircle2 className="w-6 h-6" />
            </button>

            <div className="flex justify-center gap-3">
              {STEPS.map((_, i) => (
                <div 
                  key={i}
                  className={cn(
                    "h-2 rounded-full transition-all duration-700",
                    i === currentStep ? "w-10 bg-sky-500" : "w-2 bg-stone-100"
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

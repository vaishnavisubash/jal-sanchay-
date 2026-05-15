import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Droplets,
  ArrowRight,
  User,
  ChevronLeft
} from 'lucide-react';
import { cn } from '../lib/utils';

interface AuthProps {
  onComplete: (user: { name: string; city: string }) => void;
}

export default function Auth({ onComplete }: AuthProps) {
  const [step, setStep] = useState<'welcome' | 'setup'>('welcome');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const COUNTRIES = ["India", "USA", "Canada", "Australia", "UK"];

  const STATE_CITIES: Record<string, string[]> = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
    "Karnataka": ["Bangalore", "Mysore", "Hubballi", "Belagavi"],
    "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane"],
    "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra"],
    "Meghalaya": ["Shillong", "Tura", "Jowai", "Baghmara"]
  };

  const INDIAN_STATES = Object.keys(STATE_CITIES);

  const handleCountryChange = (val: string) => {
    setCountry(val);
    setState('');
    setCity('');
  };

  const handleStateChange = (val: string) => {
    setState(val);
    setCity('');
  };

  const handleFinish = () => {
    if (name && city && state && country) {
      onComplete({
        name,
        city: `${city}, ${state}, ${country}`
      });
    }
  };

  return (
    <div className="h-full w-full bg-[#081221] relative overflow-hidden flex flex-col items-center justify-center">
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-emerald-500/10 blur-[180px] rounded-full"
        />
      </div>

      <div className="w-full max-w-[480px] h-full flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          {step === 'welcome' ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col px-10 pt-20"
            >
              <div className="mb-20">
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center shadow-[0_32px_64px_rgba(16,185,129,0.3)] border border-white/20"
                >
                  <Droplets className="w-10 h-10 text-white" />
                </motion.div>
              </div>

              <div className="space-y-10">
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.6em] leading-none">
                    Hydro-Collective Intelligence
                  </p>

                  <h1 className="text-5xl xs:text-6xl sm:text-8xl font-serif font-black text-white tracking-tighter leading-[0.85]">
                    Jal <br />
                    <span className="text-emerald-500 italic">
                      Sanchay.
                    </span>
                  </h1>
                </div>

                <p className="text-slate-400 text-xl font-medium leading-relaxed font-sans max-w-[320px]">
                  Advanced Intelligence for Atmospheric Water Harvesting &
                  Conservation.
                </p>
              </div>

              <div className="mt-32 pb-20">
                <button
                  onClick={() => setStep('setup')}
                  className="group w-full h-20 bg-emerald-600 text-white rounded-[2.5rem] font-bold flex items-center justify-between px-10 shadow-[0_24px_48px_rgba(16,185,129,0.4)] hover:bg-emerald-500 active:scale-95 transition-all text-xl"
                >
                  <span>Start Your Journey</span>

                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="setup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col px-10 pt-16"
            >
              <button
                onClick={() => setStep('welcome')}
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-16 hover:bg-white/10 transition-all shadow-2xl"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="space-y-4 mb-20">
                <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-[0.4em]">
                  Curator Registration
                </p>

                <h2 className="text-5xl font-serif font-bold text-white tracking-tight">
                  Identity Hub
                </h2>
              </div>

              <div className="space-y-10">
                <div className="space-y-3">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300 ml-2">
                    Full Identity
                  </label>

                  <div className="relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-emerald-400 transition-colors" />

                    <input
                      type="text"
                      placeholder="Node Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-18 bg-white/5 rounded-[2rem] px-16 outline-none border border-white/10 focus:border-emerald-500/50 transition-all font-bold text-white placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {/* Country */}
                  <div className="space-y-3">
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300 ml-2">
                      Country
                    </label>

                    <select
                      value={country}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className="w-full h-18 bg-white/5 rounded-[2rem] px-8 outline-none border border-white/10 focus:border-emerald-500/50 transition-all font-bold text-white appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#081221]">
                        Country
                      </option>

                      {COUNTRIES.map((c) => (
                        <option
                          key={c}
                          value={c}
                          className="bg-[#081221]"
                        >
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* State */}
                  <div className="space-y-3">
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300 ml-2">
                      State Node
                    </label>

                    <select
                      value={state}
                      onChange={(e) => handleStateChange(e.target.value)}
                      disabled={!country}
                      className={cn(
                        "w-full h-18 bg-white/5 rounded-[2rem] px-8 outline-none border border-white/10 focus:border-emerald-500/50 transition-all font-bold text-white appearance-none cursor-pointer",
                        !country && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <option value="" disabled className="bg-[#081221]">
                        State
                      </option>

                      {INDIAN_STATES.map((s) => (
                        <option
                          key={s}
                          value={s}
                          className="bg-[#081221]"
                        >
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City */}
                  <div className="space-y-3">
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300 ml-2">
                      City Port
                    </label>

                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      disabled={!state}
                      className={cn(
                        "w-full h-18 bg-white/5 rounded-[2rem] px-8 outline-none border border-white/10 focus:border-emerald-500/50 transition-all font-bold text-white appearance-none cursor-pointer",
                        !state && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <option value="" disabled className="bg-[#081221]">
                        City
                      </option>

                      {state &&
                        STATE_CITIES[state]?.map((c) => (
                          <option
                            key={c}
                            value={c}
                            className="bg-[#081221]"
                          >
                            {c}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-24 pb-20">
                <button
                  onClick={handleFinish}
                  disabled={!name || !country || !city || !state}
                  className={cn(
                    "w-full h-20 rounded-[2.5rem] font-bold flex items-center justify-center transition-all",
                    (name && country && city && state)
                      ? "bg-emerald-600 text-white shadow-[0_32px_64px_rgba(16,185,129,0.3)] hover:bg-emerald-500 active:scale-95"
                      : "bg-white/5 text-slate-400 cursor-not-allowed opacity-50"
                  )}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

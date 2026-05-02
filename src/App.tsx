/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplets, 
  Calculator as CalculatorIcon, 
  History as HistoryIcon, 
  Lightbulb, 
  MapPin,
  TrendingUp,
  Settings,
  Bell,
  Plus,
  RefreshCw,
  LogOut,
  Wrench,
  BellRing
} from 'lucide-react';
import { cn } from './lib/utils';
import { HistoryEntry, Screen, LocationData, RegionType } from './types';

// Components
import Dashboard from './components/Dashboard';
import CalculatorScreen from './components/Calculator';
import HistoryScreen from './components/History';
import TipsScreen from './components/Tips';
import EquipmentScreen from './components/Equipment';
import Auth from './components/Auth';
import NotificationCenter from './components/NotificationCenter';
import Onboarding from './components/Onboarding';
import HelpOverlay from './components/HelpOverlay';
import { HelpCircle } from 'lucide-react';

const REGIONS: LocationData[] = [
  { city: 'Bangalore, India', region: 'Moderate', avgRainfall: 15, lat: 12.9716, lon: 77.5946 },
  { city: 'Cherrapunji, India', region: 'Heavy Rain', avgRainfall: 120, lat: 25.2702, lon: 91.7323 },
  { city: 'Dubai, UAE', region: 'Arid', avgRainfall: 2, lat: 25.2048, lon: 55.2708 },
  { city: 'Jakarta, Indonesia', region: 'Tropical', avgRainfall: 45, lat: -6.2088, lon: 106.8456 },
];

const INITIAL_HISTORY: HistoryEntry[] = [
  { id: '1', date: '2026-04-25', roofArea: 120, rainfall: 45, tankCapacity: 5000, totalSaved: 4860 },
  { id: '2', date: '2026-04-28', roofArea: 120, rainfall: 12, tankCapacity: 5000, totalSaved: 1296 },
  { id: '3', date: '2026-05-01', roofArea: 120, rainfall: 30, tankCapacity: 5000, totalSaved: 3240 },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userProfile, setUserProfile] = useState<{ name: string; city: string } | null>(null);
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY);
  const [currentLocation, setCurrentLocation] = useState<LocationData>(REGIONS[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [weatherData, setWeatherData] = useState<{ rainfall: number, isLive: boolean }>({ rainfall: 15, isLive: false });

  // Handle Login Completion
  const handleAuthComplete = (profile: { name: string; city: string }) => {
    setUserProfile(profile);
    setIsAuthenticated(true);
    setShowOnboarding(true);
    // Sync location if city matches a known region roughly
    const matchedRegion = REGIONS.find(r => r.city.toLowerCase().includes(profile.city.toLowerCase()));
    if (matchedRegion) setCurrentLocation(matchedRegion);
  };

  // Real-time weather integration
  useEffect(() => {
    async function fetchWeather() {
      setIsSimulating(true);
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${currentLocation.lat}&longitude=${currentLocation.lon}&daily=precipitation_sum&timezone=auto`);
        const data = await response.json();
        if (data.daily && data.daily.precipitation_sum) {
          const rain = data.daily.precipitation_sum[0] || 0;
          setWeatherData({ rainfall: Math.max(rain, currentLocation.avgRainfall / 2), isLive: true });
        }
      } catch (err) {
        console.error("Weather fetch failed", err);
        setWeatherData({ rainfall: currentLocation.avgRainfall, isLive: false });
      } finally {
        setIsSimulating(false);
      }
    }
    fetchWeather();
  }, [currentLocation]);

  const addEntry = (entry: Omit<HistoryEntry, 'id' | 'date'>) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
    };
    setHistory([newEntry, ...history]);
    setActiveScreen('dashboard');
  };

  const cycleLocation = () => {
    const nextIndex = (REGIONS.indexOf(currentLocation) + 1) % REGIONS.length;
    setCurrentLocation(REGIONS[nextIndex]);
  };

  if (!isAuthenticated) {
    return <Auth onComplete={handleAuthComplete} />;
  }

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-0 sm:p-6 font-sans relative overflow-hidden">
      {/* Dynamic Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-sky-200/40 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-sky-300/20 blur-[130px] rounded-full" />
      <div className="absolute top-[30%] right-[10%] w-[500px] h-[500px] bg-pink-100/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-amber-50/20 blur-[100px] rounded-full" />

      <AnimatePresence>
        {showOnboarding && (
          <Onboarding onDone={() => setShowOnboarding(false)} />
        )}
      </AnimatePresence>
      <div className="mobile-container bg-white/90 sm:bg-white/40 backdrop-blur-[120px] sm:rounded-[4rem] shadow-[0_64px_160px_-40px_rgba(12,165,233,0.3)] relative border border-white/60 overflow-hidden">
        {/* User Info Bar */}
        <div className="px-8 pt-10 sm:pt-14 -mb-8 sm:-mb-10 flex items-center justify-between z-30 relative">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-white border border-stone-100 flex items-center justify-center shadow-sm overflow-hidden p-1">
                <div className="w-full h-full rounded-xl bg-stone-50 flex items-center justify-center text-stone-800 font-bold text-sm">
                  {userProfile?.name.charAt(0) || 'U'}
                </div>
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest leading-none">Curator</span>
               <span className="text-sm font-bold text-stone-800 tracking-tight">{userProfile?.name}</span>
             </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsHelpOpen(true)}
              className="w-11 h-11 rounded-2xl bg-white border border-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-800 hover:bg-stone-50 transition-all shadow-sm"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsNotifOpen(true)}
              className="w-11 h-11 rounded-2xl bg-white border border-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-800 hover:bg-stone-50 transition-all relative shadow-sm"
            >
              <BellRing className="w-5 h-5" />
              <div className="absolute top-3 right-3 w-2 h-2 bg-stone-900 rounded-full ring-4 ring-white" />
            </button>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="w-11 h-11 rounded-2xl bg-white border border-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-800 hover:bg-stone-50 transition-all shadow-sm"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
        <HelpOverlay 
          isOpen={isHelpOpen} 
          onClose={() => setIsHelpOpen(false)} 
          screen={activeScreen} 
        />

        {/* Header */}
        <header className="px-8 pt-20 pb-6 flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-14 h-14 rounded-[2rem] bg-white shadow-sm flex items-center justify-center border border-stone-100"
            >
              <Droplets className="text-sky-500 w-8 h-8" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-display font-bold leading-none tracking-tight text-stone-800">Jal-Sanchay</h1>
              <button 
                onClick={cycleLocation}
                className="flex items-center gap-2 text-stone-400 text-[11px] mt-2 font-bold tracking-[0.15em] hover:text-stone-800 transition-colors uppercase"
                disabled={isSimulating}
              >
                <MapPin className={cn("w-3.5 h-3.5 text-stone-300", isSimulating && "animate-pulse")} />
                {currentLocation.city}
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col items-end">
               <div className="flex items-center gap-2">
                <div className={cn("w-1.5 h-1.5 rounded-full", weatherData.isLive ? "bg-stone-800" : "bg-stone-200")} />
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest leading-none">{weatherData.isLive ? 'Satellite' : 'Offline'}</span>
               </div>
               <span className="text-[11px] font-bold text-stone-300 mt-1.5 tracking-widest">{weatherData.rainfall.toFixed(1)}mm</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto px-8 pb-32 scroll-smooth no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeScreen}-${currentLocation.city}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="py-6"
            >
              {activeScreen === 'dashboard' && <Dashboard history={history} location={currentLocation} rainfall={weatherData.rainfall} />}
              {activeScreen === 'calculator' && <CalculatorScreen onCalculate={addEntry} initialRainfall={weatherData.rainfall} />}
              {activeScreen === 'history' && <HistoryScreen history={history} />}
              {activeScreen === 'tips' && <TipsScreen />}
              {activeScreen === 'equipment' && <EquipmentScreen />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Navigation - Soft Floating Dock */}
        <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-8 right-6 sm:right-8 z-40">
          <nav className="h-20 sm:h-24 bg-sky-950/95 backdrop-blur-[100px] rounded-[2.5rem] sm:rounded-[3.5rem] flex items-center justify-around px-2 sm:px-4 shadow-[0_48px_80px_-24px_rgba(8,47,73,0.6)] border border-white/10">
            <NavButton 
              active={activeScreen === 'dashboard'} 
              onClick={() => setActiveScreen('dashboard')}
              icon={<TrendingUp />}
              label="Portal"
              activeColor="pink"
            />
            <NavButton 
              active={activeScreen === 'calculator'} 
              onClick={() => setActiveScreen('calculator')}
              icon={<CalculatorIcon />}
              label="Analyze"
              activeColor="pink"
            />
            <NavButton 
              active={activeScreen === 'history'} 
              onClick={() => setActiveScreen('history')}
              icon={<HistoryIcon />}
              label="Archive"
              activeColor="pink"
            />
            <NavButton 
              active={activeScreen === 'tips'} 
              onClick={() => setActiveScreen('tips')}
              icon={<Lightbulb />}
              label="Rituals"
              activeColor="pink"
            />
            <NavButton 
              active={activeScreen === 'equipment'} 
              onClick={() => setActiveScreen('equipment')}
              icon={<Wrench />}
              label="Core"
              activeColor="pink"
            />
          </nav>
        </div>

        {/* Decorative background blurs inside the container */}
        <div className="absolute top-[10%] right-[-20%] w-[400px] h-[400px] bg-sky-200/20 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-[20%] left-[-20%] w-[350px] h-[350px] bg-pink-100/30 blur-[100px] rounded-full -z-10" />
        <div className="absolute top-[50%] left-[10%] w-[200px] h-[200px] bg-amber-50/40 blur-[80px] rounded-full -z-10" />
      </div>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1.5 h-16 w-16 rounded-[1.8rem] transition-all duration-700 relative",
        active ? "text-white" : "text-sky-400 opacity-40 hover:opacity-80"
      )}
    >
      <div className={cn(
        "relative z-10 transition-all duration-500",
        active && "scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
      )}>
        {React.cloneElement(icon as React.ReactElement, { 
          className: 'w-6 h-6' 
        })}
      </div>
      <span className={cn("text-[8px] font-bold tracking-[0.2em] uppercase transition-all relative z-10", active ? "opacity-100" : "opacity-0 h-0 overflow-hidden")}>{label}</span>
      {active && (
        <motion.div 
          layoutId="nav-bg"
          className="absolute inset-0 bg-sky-500/20 backdrop-blur-3xl rounded-[1.8rem] border border-sky-400/30"
          initial={false}
        />
      )}
    </button>
  );
}

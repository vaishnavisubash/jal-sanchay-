/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplets, 
  Calculator as CalculatorIcon, 
  MapPin,
  TrendingUp,
  LogOut,
  BellRing,
  BarChart2,
  CloudRain,
  Bot
} from 'lucide-react';
import { cn } from './lib/utils';
import { HistoryEntry, Screen, LocationData } from './types';

// Components
import Dashboard from './components/Dashboard';
import CalculatorScreen from './components/Calculator';
import WeatherScreen from './components/Weather';
import AIAssistantScreen from './components/AIAssistant';
import Auth from './components/Auth';
import NotificationCenter from './components/NotificationCenter';
import HelpOverlay from './components/HelpOverlay';
import { HelpCircle } from 'lucide-react';

const REGIONS: LocationData[] = [
  { city: 'Bangalore, KA', region: 'Moderate', avgRainfall: 15, lat: 12.9716, lon: 77.5946 },
  { city: 'Mumbai, MH', region: 'Monsoon Range', avgRainfall: 85, lat: 19.0760, lon: 72.8777 },
  { city: 'Chennai, TN', region: 'Coastal Tropical', avgRainfall: 42, lat: 13.0827, lon: 80.2707 },
  { city: 'Delhi, NCR', region: 'Semi-Arid', avgRainfall: 12, lat: 28.6139, lon: 77.2090 },
  { city: 'Kolkata, WB', region: 'Humid Subtropical', avgRainfall: 68, lat: 22.5726, lon: 88.3639 },
  { city: 'Dubai, UAE', region: 'Arid', avgRainfall: 2, lat: 25.2048, lon: 55.2708 },
  { city: 'Singapore', region: 'Equatorial', avgRainfall: 55, lat: 1.3521, lon: 103.8198 },
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
  const [userProfile, setUserProfile] = useState<{ name: string; city: string } | null>(null);
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY);
  const [currentLocation, setCurrentLocation] = useState<LocationData>(REGIONS[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [weatherData, setWeatherData] = useState<{ rainfall: number, temp?: number, isLive: boolean }>({ rainfall: 15, isLive: false });

  // Handle Login Completion
  const handleAuthComplete = (profile: { name: string; city: string }) => {
    setUserProfile(profile);
    setIsAuthenticated(true);
    
    // Improved location synchronization
    const cityBase = profile.city.split(',')[0].trim().toLowerCase();
    const matchedRegion = REGIONS.find(r => {
      const regionCity = r.city.split(',')[0].trim().toLowerCase();
      return regionCity.includes(cityBase) || cityBase.includes(regionCity);
    });
    
    if (matchedRegion) {
      setCurrentLocation({ ...matchedRegion, city: profile.city }); // Keep the full display name
    } else {
      // Create a default location profile for unmatched cities
      setCurrentLocation({
        city: profile.city,
        region: 'Moderate',
        avgRainfall: 15, // Default average
        lat: 20.5937, // Center of India default
        lon: 78.9629
      });
    }
  };

  // Real-time weather integration
  useEffect(() => {
    async function fetchWeather() {
      setIsSimulating(true);
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${currentLocation.lat}&longitude=${currentLocation.lon}&current=temperature_2m&daily=precipitation_sum&timezone=auto`);
        const data = await response.json();
        if (data.daily && data.daily.precipitation_sum) {
          const rain = data.daily.precipitation_sum[0] || 0;
          const currentTemp = data.current?.temperature_2m;
          setWeatherData({ 
            rainfall: Math.max(rain, currentLocation.avgRainfall / 2), 
            temp: currentTemp,
            isLive: true 
          });
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
    <div className="min-h-screen bg-[#081221] flex items-center justify-center p-0 lg:p-12 font-sans relative overflow-x-hidden selection:bg-emerald-500/30">
      {/* Immersive Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-[20%] -left-[10%] w-[1200px] h-[1200px] bg-emerald-500/10 blur-[180px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-[10%] -right-[10%] w-[1000px] h-[1000px] bg-blue-500/10 blur-[200px] rounded-full" 
        />
      </div>

      {/* Main Container */}
      <motion.div 
        layout
        className="mobile-container relative overflow-hidden bg-white/[0.02] backdrop-blur-3xl border-x border-white/5"
      >
        {/* User Info Bar */}
        <div className="px-6 pt-10 sm:pt-14 -mb-6 sm:-mb-10 flex items-center justify-between z-30 relative md:px-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
             <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden p-1 group cursor-pointer hover:border-emerald-500/50 transition-colors">
                <div className="w-full h-full rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                  {userProfile?.name.charAt(0) || 'U'}
                </div>
             </div>
             <div className="flex flex-col">
               <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-[0.4em] leading-none mb-1">Estate Curator</span>
               <span className="text-sm font-bold text-white tracking-tight">{userProfile?.name}</span>
             </div>
          </motion.div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsHelpOpen(true)}
              className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-white/10 transition-all shadow-xl"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsNotifOpen(true)}
              className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-white/10 transition-all relative shadow-xl"
            >
              <BellRing className="w-4 h-4" />
              <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-emerald-500 rounded-full ring-4 ring-[#081221]" />
            </button>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-white/10 transition-all shadow-xl"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
        <HelpOverlay 
          isOpen={isHelpOpen} 
          onClose={() => setIsHelpOpen(false)} 
          screen={activeScreen} 
        />

        {/* Header - Advanced Atmospheric Display */}
        <header className="px-6 pt-16 sm:pt-20 pb-6 flex items-center justify-between z-20 md:px-8">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-xl bg-emerald-600 shadow-2xl flex items-center justify-center border border-white/20"
            >
              <Droplets className="text-white w-7 h-7" />
            </motion.div>
            <div>
              <h1 className="text-xl font-display font-bold leading-none tracking-tight text-white mb-2 uppercase">Core.Estate</h1>
              <div className="relative group/loc">
                <button 
                  onClick={cycleLocation}
                  className="flex items-center gap-1.5 text-emerald-400 text-[9px] font-bold tracking-[0.3em] hover:text-emerald-300 transition-colors uppercase"
                  disabled={isSimulating}
                >
                  <MapPin className={cn("w-3 h-3 text-emerald-300", isSimulating && "animate-pulse")} />
                  {currentLocation.city}
                </button>
              </div>
            </div>
          </div>
          <div className="text-right">
             <div className="flex items-center gap-3 justify-end mb-1">
                {weatherData.temp !== undefined && (
                   <span className="text-[10px] font-bold text-white uppercase tracking-wider font-display mr-2">{weatherData.temp.toFixed(0)}°C</span>
                )}
                <div className={cn("w-1.5 h-1.5 rounded-full", weatherData.isLive ? "bg-emerald-400 animate-pulse" : "bg-slate-500")} />
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] font-display">{weatherData.isLive ? 'Sat.Link' : 'Offline'}</span>
             </div>
             <span className="text-2xl font-display font-bold text-white tracking-tighter leading-none">{weatherData.rainfall.toFixed(1)}<span className="text-xs text-slate-400 ml-1">mm</span></span>
          </div>
        </header>

        {/* Content Area - Fluid scrolling */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-6 pb-40 scroll-smooth no-scrollbar touch-pan-y relative z-10 w-full md:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeScreen}-${currentLocation.city}`}
              initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="py-6"
            >
              {activeScreen === 'dashboard' && (
                <Dashboard 
                  history={history} 
                  location={currentLocation} 
                  rainfall={weatherData.rainfall} 
                  cycleLocation={cycleLocation}
                  setScreen={setActiveScreen}
                />
              )}
              {activeScreen === 'weather' && <WeatherScreen location={currentLocation} />}
              {activeScreen === 'assistant' && (
                <AIAssistantScreen 
                  userProfile={userProfile} 
                  location={currentLocation} 
                  weather={weatherData} 
                />
              )}
              {activeScreen === 'calculator' && <CalculatorScreen onCalculate={addEntry} initialRainfall={weatherData.rainfall} />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Navigation - Luxury Dock */}
        <div className="absolute bottom-8 left-4 right-4 z-50 md:bottom-10 md:left-8 md:right-8">
          <nav className="h-20 sm:h-24 bg-white/5 backdrop-blur-[40px] rounded-[2.5rem] sm:rounded-[3rem] flex items-center justify-around px-2 shadow-[0_64px_100px_rgba(0,0,0,0.6)] border border-white/5">
            <NavButton 
              active={activeScreen === 'dashboard'} 
              onClick={() => setActiveScreen('dashboard')}
              icon={<TrendingUp />}
              label="Overview"
            />
            <NavButton 
              active={activeScreen === 'calculator'} 
              onClick={() => setActiveScreen('calculator')}
              icon={<CalculatorIcon />}
              label="Fidelity"
            />
            <NavButton 
              active={activeScreen === 'weather'} 
              onClick={() => setActiveScreen('weather')}
              icon={<CloudRain />}
              label="Weather"
            />
            <NavButton 
              active={activeScreen === 'assistant'} 
              onClick={() => setActiveScreen('assistant')}
              icon={<Bot />}
              label="AI assistant"
            />
          </nav>
        </div>

        {/* Decorative background blurs inside the container */}
        <div className="absolute top-[10%] right-[-20%] w-[400px] h-[400px] bg-sky-200/20 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-[20%] left-[-20%] w-[350px] h-[350px] bg-pink-100/30 blur-[100px] rounded-full -z-10" />
        <div className="absolute top-[50%] left-[10%] w-[200px] h-[200px] bg-amber-50/40 blur-[80px] rounded-full -z-10" />
      </motion.div>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1.5 h-16 w-16 rounded-3xl transition-all duration-500 relative",
        active ? "text-white" : "text-slate-400 hover:text-slate-200"
      )}
    >
      <div className={cn(
        "relative z-10 transition-transform duration-500",
        active && "scale-110"
      )}>
        {React.cloneElement(icon as React.ReactElement<any>, { 
          className: 'w-6 h-6' 
        })}
      </div>
      <span className={cn("text-[7px] font-bold tracking-[0.3em] uppercase transition-all relative z-10", active ? "opacity-100" : "opacity-0 h-0 overflow-hidden")}>{label}</span>
      {active && (
        <motion.div 
          layoutId="nav-pill"
          className="absolute inset-0 bg-emerald-600/20 backdrop-blur-xl rounded-3xl border border-emerald-500/30"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  );
}

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  CloudRain, 
  Thermometer, 
  Wind, 
  Droplet, 
  Navigation, 
  Calendar,
  AlertCircle,
  CheckCircle2,
  CloudLightning,
  Sun,
  Cloudy,
  Info
} from 'lucide-react';
import { cn } from '../lib/utils';
import { LocationData } from '../types';

interface WeatherProps {
  location: LocationData;
}

interface WeatherData {
  currentTemp: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  precipProb: number;
  dailyForecast: {
    date: string;
    rain: number;
    prob: number;
  }[];
}

const WEATHER_CODES: Record<number, { label: string; icon: React.ReactNode }> = {
  0: { label: 'Clear Sky', icon: <Sun className="w-8 h-8 text-amber-400" /> },
  1: { label: 'Mainly Clear', icon: <Sun className="w-8 h-8 text-amber-300" /> },
  2: { label: 'Partly Cloudy', icon: <Cloudy className="w-8 h-8 text-slate-300" /> },
  3: { label: 'Overcast', icon: <Cloudy className="w-8 h-8 text-slate-400" /> },
  45: { label: 'Foggy', icon: <Info className="w-8 h-8 text-slate-500" /> },
  51: { label: 'Light Drizzle', icon: <CloudRain className="w-8 h-8 text-sky-400" /> },
  61: { label: 'Slight Rain', icon: <CloudRain className="w-8 h-8 text-blue-400" /> },
  63: { label: 'Moderate Rain', icon: <CloudRain className="w-8 h-8 text-blue-500" /> },
  65: { label: 'Heavy Rain', icon: <CloudRain className="w-8 h-8 text-indigo-500" /> },
  80: { label: 'Light Showers', icon: <CloudRain className="w-8 h-8 text-sky-500" /> },
  95: { label: 'Thunderstorms', icon: <CloudLightning className="w-8 h-8 text-emerald-400" /> },
};

export default function Weather({ location }: WeatherProps) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=precipitation_sum,precipitation_probability_max&timezone=auto`;
        const res = await fetch(url);
        const json = await res.json();

        const forecast = json.daily.time.map((date: string, i: number) => ({
          date,
          rain: json.daily.precipitation_sum[i],
          prob: json.daily.precipitation_probability_max[i]
        }));

        setData({
          currentTemp: json.current.temperature_2m,
          humidity: json.current.relative_humidity_2m,
          windSpeed: json.current.wind_speed_10m,
          weatherCode: json.current.weather_code,
          precipProb: json.daily.precipitation_probability_max[0],
          dailyForecast: forecast
        });
      } catch (err) {
        console.error("Failed to fetch weather", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, [location]);

  if (loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-4">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full"
        />
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Calibrating Sensors...</p>
      </div>
    );
  }

  const weatherInfo = WEATHER_CODES[data.weatherCode] || { label: 'Atmospheric Change', icon: <Cloudy className="w-8 h-8" /> };
  
  // Harvesting Recommendations
  const getRecommendation = () => {
    if (data.precipProb > 70) return { 
      title: 'High Collection Potential', 
      desc: 'Significant rainfall imminent. Ensure all filters are cleared for maximum capture.',
      icon: <AlertCircle className="w-6 h-6 text-emerald-400" />
    };
    if (data.precipProb > 30) return { 
      title: 'Optimal Conditions', 
      desc: 'Light showers expected. Good time for standard harvesting.',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />
    };
    return { 
      title: 'Maintenance Phase', 
      desc: 'Skies are clear. Perform routine inspection of tanks and seals.',
      icon: <Navigation className="w-6 h-6 text-slate-400" />
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="space-y-6">
      {/* Current Weather Card */}
      <div className="glass-card flex flex-col relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-20 scale-150 transform group-hover:scale-175 transition-transform duration-1000">
           {weatherInfo.icon}
        </div>
        
        <div className="flex justify-between items-start mb-10">
          <div>
            <p className="subheading mb-2">Real-time Metrics</p>
            <h2 className="text-4xl display-heading tracking-tighter">{data.currentTemp.toFixed(1)}°</h2>
            <p className="text-sm font-bold text-emerald-400 mt-1 uppercase tracking-widest">{weatherInfo.label}</p>
          </div>
          <div className="text-right">
             <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Precipitation Prob.</p>
             <p className="text-2xl font-display font-bold text-white">{data.precipProb}%</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
               <Droplet className="w-5 h-5" />
             </div>
             <div>
               <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Humidity</p>
               <p className="text-sm font-bold text-white">{data.humidity}%</p>
             </div>
           </div>
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
               <Wind className="w-5 h-5" />
             </div>
             <div>
               <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Wind Speed</p>
               <p className="text-sm font-bold text-white">{data.windSpeed} km/h</p>
             </div>
           </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="glass-card border-emerald-500/10 bg-emerald-500/[0.02]">
        <div className="flex gap-6">
           <div className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
             {recommendation.icon}
           </div>
           <div>
             <h4 className="font-display font-bold text-white text-lg mb-1">{recommendation.title}</h4>
             <p className="text-xs text-slate-400 leading-relaxed font-medium">
               {recommendation.desc}
             </p>
           </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="space-y-4">
        <p className="subheading ml-4">7-Day Atmospheric Insight</p>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6 md:-mx-8 md:px-8">
           {data.dailyForecast.map((day, i) => (
             <motion.div 
               key={day.date}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.05 }}
               className="glass-card p-5 min-w-[120px] flex flex-col items-center text-center gap-4 shrink-0"
             >
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                  {i === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-emerald-400">
                  <CloudRain className={cn("w-5 h-5", day.rain > 5 ? "animate-bounce" : "")} />
                </div>
                <div>
                   <p className="text-lg font-display font-bold text-white">{day.rain.toFixed(1)}</p>
                   <p className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">mm Yield</p>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-emerald-500/50" 
                     style={{ width: `${Math.min(100, day.prob)}%` }} 
                   />
                </div>
                <p className="text-[8px] font-bold text-emerald-500/60 uppercase">{day.prob}% Prob</p>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
}

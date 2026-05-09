import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Droplets, 
  ChevronRight,
  MessageSquare,
  HelpCircle,
  Cpu
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { LocationData } from '../types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  userProfile: { name: string; city: string } | null;
  location: LocationData;
  weather: { rainfall: number; temp?: number; isLive: boolean };
}

const SUGGESTED_PROMPTS = [
  "How much can I harvest today?",
  "Optimize my storage strategy",
  "Is my location good for water saving?",
  "How to maintain my tank?",
  "What is Jal Sanchay?"
];

const getSystemPrompt = (profile: any, loc: LocationData, weather: any) => `
You are "Eco-Pulse", the advanced AI advisor for the Jal-Sanchay water harvesting ecosystem.
Your personality: Premium, highly intelligent, scientific yet concise, and deeply committed to sustainability.

CONTEXT DATA:
- Current User: ${profile?.name || 'Curator'}
- User Primary City: ${profile?.city || 'Unknown'}
- Active Node Location: ${loc.city}, ${loc.region} region
- Atmospheric Data: ${weather.rainfall.toFixed(1)}mm current precipitation
- Environmental Temperature: ${weather.temp?.toFixed(1) || 'N/A'}°C
- Data Source: ${weather.isLive ? 'Live Satellite Link' : 'Regional Averages'}

GUIDELINES:
1. Accuracy First: Use the provided Context Data to ground your answers. If the user asks about their yield, refer to the ${weather.rainfall.toFixed(1)}mm rainfall.
2. Structured Form: Use Markdown (bullet points, bold text, headers) to make answers scannable and professional. 
3. Specialized Knowledge: You are an expert in rainwater harvesting, hydrology, and environmental engineering. 
4. Scope: ONLY answer questions related to water conservation, rainwater harvesting, weather impacts on water, and app functionality.
5. Tone: "Curator, the current atmospheric pressure suggests..." or "Based on your semi-arid region in ${loc.city}, I recommend..."
6. Units: Strictly use Liters (L), Millimeters (mm), and Square Meters (sqm).
7. Goal: Help the user save as much water as possible.

Do not provide generic AI introductions labels like "As an AI...". Be the system itself.
`;

export default function AIAssistant({ userProfile, location, weather }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'assistant', 
      content: `Greetings, ${userProfile?.name?.split(' ')[0] || 'Curator'}. I am Eco-Pulse. I've analyzed your current atmospheric node in **${location.city}**. How shall we optimize your water equity today?` 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const systemProp = getSystemPrompt(userProfile, location, weather);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: systemProp
        },
        history: messages.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }))
      });

      const response = await chat.sendMessage({ message: text });
      
      const assistantMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: response.text || '' 
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error("AI Error:", err);
      setMessages(prev => [...prev, { 
        id: 'error', 
        role: 'assistant', 
        content: "I'm currently experiencing a sync delay with the atmospheric grid. Please try again shortly." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-320px)] min-h-[400px] max-h-[650px]">
      {/* Header Info */}
      <div className="flex items-center gap-4 mb-6 px-2">
         <div className="w-12 h-12 rounded-2xl bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center justify-center text-white border border-emerald-500/20">
           <Cpu className="w-6 h-6" />
         </div>
         <div>
           <div className="flex items-center gap-2">
             <h3 className="text-lg font-display font-bold text-white tracking-tight">Eco-Pulse</h3>
             <span className="text-[7px] font-black bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20 uppercase tracking-widest">v3.1 Core</span>
           </div>
           <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Neural Sync Active</p>
           </div>
         </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar space-y-4 pb-4 px-2"
      >
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
              "flex w-full",
              m.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div className={cn(
              "max-w-[90%] p-4 rounded-2xl text-xs font-medium leading-relaxed",
              m.role === 'user' 
                ? "bg-emerald-600 text-white rounded-tr-none shadow-lg shadow-emerald-900/10" 
                : "bg-white/5 border border-white/5 text-slate-200 rounded-tl-none backdrop-blur-3xl"
            )}>
               {m.role === 'assistant' ? (
                 <div className="markdown-body">
                   <ReactMarkdown>{m.content}</ReactMarkdown>
                 </div>
               ) : (
                 m.content
               )}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none">
                <div className="flex gap-1">
                   <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                   <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                   <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
             </div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="mt-4 space-y-4">
        {/* Suggestions */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
           {SUGGESTED_PROMPTS.map((p) => (
             <button
               key={p}
               onClick={() => handleSend(p)}
               className="shrink-0 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:bg-emerald-600/10 hover:text-emerald-400 hover:border-emerald-500/20 transition-all active:scale-95"
             >
               {p}
             </button>
           ))}
        </div>

        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative group"
        >
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Consult the intelligence..."
            className="w-full h-16 bg-white/[0.03] backdrop-blur-2xl rounded-3xl border border-white/5 px-6 pr-16 outline-none focus:border-emerald-500/30 focus:bg-white/[0.05] transition-all text-white font-medium text-sm placeholder:text-slate-600"
          />
          <button 
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-500 active:scale-90 transition-all disabled:opacity-50 disabled:bg-slate-700 shadow-lg shadow-emerald-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

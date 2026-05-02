export type RegionType = 'Tropical' | 'Arid' | 'Moderate' | 'Heavy Rain';

export interface LocationData {
  city: string;
  region: RegionType;
  avgRainfall: number;
  lat: number;
  lon: number;
}

export interface HistoryEntry {
  id: string;
  date: string;
  roofArea: number;
  rainfall: number;
  tankCapacity: number;
  totalSaved: number;
}

export interface Tip {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export type Screen = 'dashboard' | 'calculator' | 'history' | 'tips' | 'equipment';

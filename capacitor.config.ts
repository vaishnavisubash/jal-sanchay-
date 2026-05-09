import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jalsanchay.tracker',
  appName: 'Jal-Sanchay Tracker',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

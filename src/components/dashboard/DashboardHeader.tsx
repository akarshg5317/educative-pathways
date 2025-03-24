
import React from 'react';
import { SideDrawerTrigger } from '../layout/SideDrawer';
import { Bell, Search, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { Toggle } from '@/components/ui/toggle';

export const DashboardHeader = () => {
  // Get current time to determine greeting
  const currentHour = new Date().getHours();
  let greeting = 'Good Evening';
  
  if (currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour < 18) {
    greeting = 'Good Afternoon';
  }
  
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SideDrawerTrigger />
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-foreground"
          >
            TeacherHub
          </motion.h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Toggle 
            pressed={theme === 'dark'} 
            onPressedChange={(pressed) => setTheme(pressed ? 'dark' : 'light')}
            className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          </Toggle>
          
          <button className="p-2 rounded-full hover:bg-secondary/80 transition-colors relative">
            <Bell size={22} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>
          
          <button className="p-2 rounded-full hover:bg-secondary/80 transition-colors">
            <Search size={22} />
          </button>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-1"
      >
        <h2 className="text-3xl font-bold text-foreground">{greeting}, Sarah</h2>
        <p className="text-muted-foreground">Monday, 17 June 2024</p>
      </motion.div>
    </div>
  );
};

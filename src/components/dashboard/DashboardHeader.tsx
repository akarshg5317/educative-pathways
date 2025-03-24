
import React from 'react';
import { SideDrawerTrigger } from '../layout/SideDrawer';
import { Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export const DashboardHeader = () => {
  // Get current time to determine greeting
  const currentHour = new Date().getHours();
  let greeting = 'Good Evening';
  
  if (currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour < 18) {
    greeting = 'Good Afternoon';
  }
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SideDrawerTrigger />
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold"
          >
            TeacherHub
          </motion.h1>
        </div>
        
        <div className="flex items-center gap-2">
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
        <h2 className="text-3xl font-bold">{greeting}, Sarah</h2>
        <p className="text-muted-foreground">Monday, 17 June 2024</p>
      </motion.div>
    </div>
  );
};

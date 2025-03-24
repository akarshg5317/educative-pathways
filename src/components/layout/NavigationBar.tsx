
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  MessageSquare, 
  BarChart2, 
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/classes', label: 'Classes', icon: BookOpen },
  { path: '/chat', label: 'Chat', icon: MessageSquare },
  { path: '/analytics', label: 'Analytics', icon: BarChart2 },
  { path: '/profile', label: 'Profile', icon: User },
];

export const NavigationBar = () => {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-16 px-3 neo-blur dark:glass-morphism">
      <div className="flex h-full items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center w-16 h-full relative',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="navigation-indicator"
                  className="absolute top-0 w-10 h-1 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              
              <item.icon size={22} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

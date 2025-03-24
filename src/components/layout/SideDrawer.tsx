
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Calendar, 
  FileText, 
  BarChart2, 
  Send, 
  FolderOpen, 
  GraduationCap, 
  Lock, 
  HelpCircle, 
  Menu, 
  X, 
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { 
    label: 'Notifications & Alerts', 
    icon: Bell, 
    description: 'View all notifications and alerts'
  },
  { 
    label: 'Timetable & Events', 
    icon: Calendar, 
    description: 'Manage your schedule and events'
  },
  { 
    label: 'Assignment Creator', 
    icon: FileText, 
    description: 'Create and manage assignments'
  },
  { 
    label: 'Performance Reports', 
    icon: BarChart2, 
    description: 'View student performance insights'
  },
  { 
    label: 'Announcements', 
    icon: Send, 
    description: 'Send messages to students & parents'
  },
  { 
    label: 'Resource Library', 
    icon: FolderOpen, 
    description: 'Manage study materials and resources'
  },
  { 
    label: 'Career Guidance', 
    icon: GraduationCap, 
    description: 'Access career guidance tools'
  },
  { 
    label: 'Privacy & Security', 
    icon: Lock, 
    description: 'Manage privacy settings'
  },
  { 
    label: 'Help & Support', 
    icon: HelpCircle, 
    description: 'Get help and support'
  },
];

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-80 glass-morphism dark:neo-blur overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 p-4">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <motion.button
                      key={item.label}
                      whileHover={{ x: 5 }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors text-left"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                        <item.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{item.description}</div>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </motion.button>
                  ))}
                </nav>
              </div>
              
              <div className="p-4 border-t border-border mt-auto">
                <div className="text-xs text-muted-foreground">
                  TeacherHub Dashboard v1.0
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const SideDrawerTrigger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
      >
        <Menu size={24} />
      </button>
      
      <SideDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

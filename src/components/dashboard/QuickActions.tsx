
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { FileText, Send, Calendar, CheckCircle } from 'lucide-react';

const actions = [
  {
    id: 1,
    label: 'Create Assignment',
    description: 'Upload new assignment',
    icon: FileText,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  },
  {
    id: 2,
    label: 'Send Announcement',
    description: 'Notify students & parents',
    icon: Send,
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  },
  {
    id: 3,
    label: 'Schedule Meeting',
    description: 'Set up a new meeting',
    icon: Calendar,
    color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  },
  {
    id: 4,
    label: 'Grade Submissions',
    description: '12 pending reviews',
    icon: CheckCircle,
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};

export const QuickActions = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-3"
        >
          {actions.map((action) => (
            <motion.button
              key={action.id}
              variants={item}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="flex flex-col items-start p-4 rounded-xl border border-border hover:border-primary/30 transition-all bg-card hover:shadow-md"
            >
              <div className={`p-2 rounded-lg ${action.color} mb-3`}>
                <action.icon size={20} />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-sm">{action.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {action.description}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

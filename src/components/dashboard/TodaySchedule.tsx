
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Clock, Users } from 'lucide-react';

// Mock data for today's schedule
const scheduleData = [
  {
    id: 1,
    subject: 'Mathematics',
    time: '08:30 - 09:30',
    class: 'Grade 10-A',
    room: 'Room 203',
    status: 'upcoming',
  },
  {
    id: 2,
    subject: 'Physics',
    time: '10:00 - 11:00',
    class: 'Grade 11-B',
    room: 'Lab 101',
    status: 'upcoming',
  },
  {
    id: 3,
    subject: 'Chemistry',
    time: '12:30 - 13:30',
    class: 'Grade 11-A',
    room: 'Lab 102',
    status: 'upcoming',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const TodaySchedule = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Clock size={18} className="text-primary" />
          Today's Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          {scheduleData.map((schedule) => (
            <motion.div
              key={schedule.id}
              variants={item}
              className="flex items-center p-3 rounded-lg hover:bg-secondary/50 transition-all cursor-pointer"
            >
              <div className="flex-1">
                <h3 className="font-medium">{schedule.subject}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{schedule.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={12} />
                    <span>{schedule.class}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent">
                <span className="text-xs">{schedule.room.split(' ')[1]}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <button className="w-full text-center text-sm text-primary mt-4 py-2 hover:underline">
          View Full Schedule
        </button>
      </CardContent>
    </Card>
  );
};

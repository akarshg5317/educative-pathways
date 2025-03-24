
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/Card';
import { Users, FileText, Clock } from 'lucide-react';

// Mock data for classes
const classesData = [
  {
    id: 1,
    name: 'Mathematics 101',
    grade: 'Grade 10-A',
    students: 28,
    assignments: 4,
    nextClass: 'Today, 08:30 AM',
    color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800/40',
  },
  {
    id: 2,
    name: 'Physics Advanced',
    grade: 'Grade 11-B',
    students: 24,
    assignments: 2,
    nextClass: 'Today, 10:00 AM',
    color: 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800/40',
  },
  {
    id: 3,
    name: 'Chemistry Lab',
    grade: 'Grade 11-A',
    students: 22,
    assignments: 3,
    nextClass: 'Today, 12:30 PM',
    color: 'bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800/40',
  },
  {
    id: 4,
    name: 'Biology 101',
    grade: 'Grade 10-B',
    students: 26,
    assignments: 1,
    nextClass: 'Tomorrow, 09:00 AM',
    color: 'bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800/40',
  },
  {
    id: 5,
    name: 'Computer Science',
    grade: 'Grade 12-A',
    students: 20,
    assignments: 5,
    nextClass: 'Tomorrow, 11:00 AM',
    color: 'bg-cyan-100 dark:bg-cyan-900/30 border-cyan-200 dark:border-cyan-800/40',
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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const ClassList = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {classesData.map((classItem) => (
        <motion.div
          key={classItem.id}
          variants={item}
          whileHover={{ scale: 1.02, translateY: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Card className={`overflow-hidden border-l-4 ${classItem.color}`}>
            <CardContent className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{classItem.name}</h3>
                  <p className="text-sm text-muted-foreground">{classItem.grade}</p>
                </div>
                <div className="bg-secondary/80 py-1 px-3 rounded-full text-xs font-medium">
                  <Clock size={12} className="inline mr-1" />
                  {classItem.nextClass}
                </div>
              </div>
              
              <div className="mt-4 flex gap-6">
                <div className="flex items-center gap-1.5">
                  <Users size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium">{classItem.students} Students</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium">{classItem.assignments} Assignments</span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end gap-2">
                <button className="px-3 py-1 rounded-md border border-border bg-secondary/50 text-xs font-medium hover:bg-secondary transition-colors">
                  Assignments
                </button>
                <button className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
                  View Class
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

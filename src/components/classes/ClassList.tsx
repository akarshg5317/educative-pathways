
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Users, FileText, Clock, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ClassItem } from '@/pages/Classes';
import { AddAssignmentModal } from './AddAssignmentModal';

// Animation variants
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

interface ClassListProps {
  classes: ClassItem[];
  searchQuery?: string;
  onDeleteClass: (id: number) => void;
  onAddAssignment: (classId: number, assignment: {
    title: string;
    description: string;
    dueDate: string;
  }) => void;
}

export const ClassList: React.FC<ClassListProps> = ({ 
  classes = [], 
  searchQuery = '',
  onDeleteClass,
  onAddAssignment
}) => {
  const { toast } = useToast();
  const [activeClassForAssignment, setActiveClassForAssignment] = useState<ClassItem | null>(null);
  
  const filteredClasses = classes.filter(
    classItem => 
      classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      classItem.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAssignment = (classItem: ClassItem) => {
    setActiveClassForAssignment(classItem);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {filteredClasses.length === 0 ? (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <h3 className="text-xl font-medium text-muted-foreground mb-2">No Classes Yet</h3>
          <p className="text-muted-foreground mb-4">Add your first class to get started</p>
          <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-secondary/30 rounded-full">
            <Users size={32} className="text-muted-foreground" />
          </div>
        </div>
      ) : (
        filteredClasses.map((classItem) => (
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
                  <button 
                    className="px-3 py-1 rounded-md border border-border bg-secondary/50 text-xs font-medium hover:bg-secondary transition-colors"
                    onClick={() => handleAddAssignment(classItem)}
                  >
                    Add Assignment
                  </button>
                  <button className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
                    View Class
                  </button>
                  <button 
                    className="px-3 py-1 rounded-md border border-border bg-destructive/10 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors"
                    onClick={() => onDeleteClass(classItem.id)}
                  >
                    <Trash2 size={12} className="inline mr-1" />
                    Delete
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))
      )}

      {activeClassForAssignment && (
        <AddAssignmentModal
          isOpen={!!activeClassForAssignment}
          onClose={() => setActiveClassForAssignment(null)}
          classId={activeClassForAssignment.id}
          className={activeClassForAssignment.name}
          onAddAssignment={onAddAssignment}
        />
      )}
    </motion.div>
  );
};

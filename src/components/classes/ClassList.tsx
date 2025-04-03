
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Users, FileText, Clock, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ClassItem } from '@/pages/Classes';

// Initial mock data for classes
const initialClassesData = [
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
  additionalClasses?: ClassItem[];
  searchQuery?: string;
}

export const ClassList: React.FC<ClassListProps> = ({ 
  additionalClasses = [], 
  searchQuery = '' 
}) => {
  const { toast } = useToast();
  const [allClasses, setAllClasses] = useState<ClassItem[]>([]);
  
  // Initialize with both initial classes and additional classes
  useEffect(() => {
    // Create a map to store unique classes by ID
    const uniqueClassesMap = new Map<number, ClassItem>();
    
    // Add initial classes to map
    initialClassesData.forEach(classItem => {
      uniqueClassesMap.set(classItem.id, classItem);
    });
    
    // Add additional classes to map, overwriting any with the same ID
    additionalClasses.forEach(classItem => {
      uniqueClassesMap.set(classItem.id, classItem);
    });
    
    // Convert map values back to array
    setAllClasses(Array.from(uniqueClassesMap.values()));
  }, [additionalClasses]);
  
  const filteredClasses = allClasses.filter(
    classItem => 
      classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      classItem.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAssignment = (classId: number) => {
    setAllClasses(prevClasses => 
      prevClasses.map(classItem => 
        classItem.id === classId 
          ? { ...classItem, assignments: classItem.assignments + 1 } 
          : classItem
      )
    );
    
    toast({
      title: "Assignment Added",
      description: "A new assignment has been added to the class.",
    });
  };

  const handleDeleteClass = (classId: number) => {
    setAllClasses(prevClasses => prevClasses.filter(c => c.id !== classId));
    
    toast({
      title: "Class Removed",
      description: "The class has been removed successfully.",
    });
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {filteredClasses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No classes found. Add a new class to get started.</p>
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
                    onClick={() => handleAddAssignment(classItem.id)}
                  >
                    Add Assignment
                  </button>
                  <button className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
                    View Class
                  </button>
                  <button 
                    className="px-3 py-1 rounded-md border border-border bg-destructive/10 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors"
                    onClick={() => handleDeleteClass(classItem.id)}
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
    </motion.div>
  );
};

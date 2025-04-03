
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClass: (newClass: {
    name: string;
    grade: string;
    students: number;
    assignments: number;
    nextClass: string;
    color: string;
  }) => void;
}

const colorOptions = [
  'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800/40',
  'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800/40',
  'bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800/40',
  'bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800/40',
  'bg-cyan-100 dark:bg-cyan-900/30 border-cyan-200 dark:border-cyan-800/40',
  'bg-pink-100 dark:bg-pink-900/30 border-pink-200 dark:border-pink-800/40',
];

export const AddClassModal: React.FC<AddClassModalProps> = ({ isOpen, onClose, onAddClass }) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [students, setStudents] = useState('');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  const handleSubmit = () => {
    if (!name.trim() || !grade.trim() || !students.trim()) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const newClass = {
      name,
      grade,
      students: parseInt(students),
      assignments: 0,
      nextClass: 'Tomorrow, 09:00 AM',
      color: selectedColor,
    };

    onAddClass(newClass);
    toast({
      title: "Success",
      description: `Class "${name}" has been created`,
    });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName('');
    setGrade('');
    setStudents('');
    setSelectedColor(colorOptions[0]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Class Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="Mathematics 101"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="grade" className="text-right">
              Grade/Section
            </Label>
            <Input
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="col-span-3"
              placeholder="Grade 10-A"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="students" className="text-right">
              Students
            </Label>
            <Input
              id="students"
              type="number"
              value={students}
              onChange={(e) => setStudents(e.target.value)}
              className="col-span-3"
              placeholder="25"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Color</Label>
            <div className="flex flex-wrap gap-2 col-span-3">
              {colorOptions.map((color, index) => (
                <div
                  key={index}
                  className={`h-8 w-8 rounded-full cursor-pointer border-2 ${color} ${
                    selectedColor === color ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Class</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

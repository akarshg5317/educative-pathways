
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

interface AddAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  classId: number;
  className: string;
  onAddAssignment: (classId: number, assignment: {
    title: string;
    description: string;
    dueDate: string;
  }) => void;
}

export const AddAssignmentModal: React.FC<AddAssignmentModalProps> = ({ 
  isOpen, 
  onClose, 
  classId,
  className,
  onAddAssignment 
}) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDay, setDueDay] = useState('Monday');
  const [dueTime, setDueTime] = useState('23:59');
  
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const hours = Array.from({ length: 24 }, (_, i) => 
    Array.from({ length: 4 }, (_, j) => `${i.toString().padStart(2, '0')}:${(j * 15).toString().padStart(2, '0')}`)
  ).flat();

  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Assignment title is required",
        variant: "destructive",
      });
      return;
    }

    onAddAssignment(classId, {
      title,
      description,
      dueDate: `${dueDay}, ${dueTime}`,
    });

    toast({
      title: "Success",
      description: `Assignment "${title}" has been added to ${className}`,
    });
    
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDay('Monday');
    setDueTime('23:59');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Assignment to {className}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              placeholder="Homework #1"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3 min-h-[100px]"
              placeholder="Assignment description and instructions..."
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Due Date</Label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
              <Select value={dueDay} onValueChange={setDueDay}>
                <SelectTrigger>
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={dueTime} onValueChange={setDueTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  {hours.map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Assignment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

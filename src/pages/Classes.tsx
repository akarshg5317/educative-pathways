
import React, { useState } from 'react';
import { SideDrawerTrigger } from '@/components/layout/SideDrawer';
import { Bell, Search, Filter, Plus } from 'lucide-react';
import { ClassList } from '@/components/classes/ClassList';
import { AddClassModal } from '@/components/classes/AddClassModal';
import { useIsMobile } from '@/hooks/use-mobile';

const Classes = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const [classes, setClasses] = useState<any[]>([]);
  
  const handleAddClass = (newClass: any) => {
    setClasses([...classes, newClass]);
  };

  return (
    <div className="flex flex-col pb-20">
      <div className="container px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SideDrawerTrigger />
            <h1 className="text-2xl font-bold">Classes</h1>
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
        
        {isMobile ? (
          <div className="mt-6 space-y-4">
            <div className="relative">
              <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                <Search size={16} className="mr-2 text-muted-foreground" />
                <input
                  placeholder="Search classes..."
                  className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-between gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-input hover:bg-accent transition-colors">
                <Filter size={16} />
                <span>Filter</span>
              </button>
              
              <button 
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                onClick={() => setIsAddClassModalOpen(true)}
              >
                <Plus size={16} />
                <span>Add Class</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between mt-6 mb-4">
            <div className="relative">
              <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                <Search size={16} className="mr-2 text-muted-foreground" />
                <input
                  placeholder="Search classes..."
                  className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-input hover:bg-accent transition-colors">
                <Filter size={16} />
                <span>Filter</span>
              </button>
              
              <button 
                className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                onClick={() => setIsAddClassModalOpen(true)}
              >
                <Plus size={16} />
                <span>Add Class</span>
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <ClassList />
        </div>
      </div>

      <AddClassModal 
        isOpen={isAddClassModalOpen}
        onClose={() => setIsAddClassModalOpen(false)}
        onAddClass={handleAddClass}
      />
    </div>
  );
};

export default Classes;

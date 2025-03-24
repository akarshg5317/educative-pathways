
import React from 'react';
import { SideDrawerTrigger } from '@/components/layout/SideDrawer';
import { Search, Edit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

// Mock data for chats
const chatsData = [
  {
    id: 1,
    name: 'Mathematics 10-A',
    type: 'group',
    lastMessage: 'Don't forget about tomorrow's test!',
    time: '10:30 AM',
    unread: 3,
    avatar: '10A',
    avatarColor: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  },
  {
    id: 2,
    name: 'Emily Parker',
    type: 'parent',
    lastMessage: 'Thank you for the update about James.',
    time: 'Yesterday',
    unread: 0,
    avatar: 'EP',
    avatarColor: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  },
  {
    id: 3,
    name: 'Michael Thompson',
    type: 'student',
    lastMessage: 'I've completed the assignment, Ms. Sarah.',
    time: 'Yesterday',
    unread: 1,
    avatar: 'MT',
    avatarColor: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  },
  {
    id: 4,
    name: 'Physics 11-B',
    type: 'group',
    lastMessage: 'When will we get our lab results?',
    time: 'Tuesday',
    unread: 0,
    avatar: '11B',
    avatarColor: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  },
  {
    id: 5,
    name: 'School Announcements',
    type: 'announcement',
    lastMessage: 'Staff meeting scheduled for Friday 3 PM',
    time: 'Monday',
    unread: 0,
    avatar: 'SA',
    avatarColor: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  },
];

const Chat = () => {
  return (
    <div className="flex flex-col pb-20">
      <div className="container px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SideDrawerTrigger />
            <h1 className="text-2xl font-bold">Messages</h1>
          </div>
          
          <button className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <Edit size={20} />
          </button>
        </div>
        
        <div className="relative mt-6">
          <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
            <Search size={16} className="mr-2 text-muted-foreground" />
            <input
              placeholder="Search messages..."
              className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
        
        <div className="mt-6 space-y-2">
          {chatsData.map((chat) => (
            <Card key={chat.id} className="cursor-pointer hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full ${chat.avatarColor} flex items-center justify-center font-medium`}>
                    {chat.avatar}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{chat.name}</h3>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <span className="ml-2 flex-shrink-0 h-5 min-w-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;

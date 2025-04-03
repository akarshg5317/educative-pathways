
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SideDrawerTrigger } from '@/components/layout/SideDrawer';
import { ArrowLeft, Send, Paperclip } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ChatDetail = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  
  // This would come from a real API in a production app
  const chatData = {
    id: parseInt(chatId || '1'),
    name: chatId === '1' ? 'Mathematics 10-A' : 
          chatId === '2' ? 'Emily Parker' : 
          chatId === '3' ? 'Michael Thompson' : 
          chatId === '4' ? 'Physics 11-B' : 'School Announcements',
    avatar: chatId === '1' ? '10A' : 
            chatId === '2' ? 'EP' : 
            chatId === '3' ? 'MT' : 
            chatId === '4' ? '11B' : 'SA',
    avatarColor: chatId === '1' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 
                 chatId === '2' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 
                 chatId === '3' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : 
                 chatId === '4' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' : 
                 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    type: chatId === '1' || chatId === '4' ? 'group' : 
          chatId === '2' ? 'parent' : 
          chatId === '3' ? 'student' : 'announcement',
    messages: [
      {
        id: 1,
        sender: 'other',
        text: chatId === '1' ? "Don't forget about tomorrow's test!" : 
              chatId === '2' ? "Thank you for the update about James." : 
              chatId === '3' ? "I've completed the assignment, Ms. Sarah." : 
              chatId === '4' ? "When will we get our lab results?" : 
              "Staff meeting scheduled for Friday 3 PM",
        time: '10:30 AM',
      },
      {
        id: 2,
        sender: 'me',
        text: 'Thanks for the reminder!',
        time: '10:45 AM',
      },
    ],
  };

  const [messages, setMessages] = useState(chatData.messages);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate a response in 1 second
    setTimeout(() => {
      const responseMessage = {
        id: messages.length + 2,
        sender: 'other',
        text: `This is an automated response to "${message}"`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleAttachment = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Attachment upload will be available in the next update.",
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      <div className="container px-4 py-4 flex-none">
        <div className="flex items-center gap-3">
          <button 
            className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
            onClick={() => navigate('/chat')}
          >
            <ArrowLeft size={22} />
          </button>
          
          <div className={`flex-shrink-0 w-10 h-10 rounded-full ${chatData.avatarColor} flex items-center justify-center font-medium`}>
            {chatData.avatar}
          </div>
          
          <div>
            <h1 className="text-lg font-bold">{chatData.name}</h1>
            <p className="text-xs text-muted-foreground capitalize">{chatData.type}</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[75%] rounded-lg px-4 py-2 ${
                msg.sender === 'me' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary'
              }`}
            >
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === 'me' 
                  ? 'text-primary-foreground/70' 
                  : 'text-muted-foreground'
              }`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-4 py-4 flex-none">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full"
            onClick={handleAttachment}
          >
            <Paperclip size={20} />
          </Button>
          
          <div className="flex-1 flex h-12 rounded-full border border-input bg-background px-4 py-2 text-sm ring-offset-background">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none"
            />
          </div>
          
          <Button 
            size="icon" 
            className="rounded-full"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;


import React from 'react';
import { SideDrawerTrigger } from '@/components/layout/SideDrawer';
import { User, Moon, Bell, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

const profileSections = [
  {
    title: 'App Settings',
    items: [
      { icon: Moon, label: 'Dark Mode', value: 'On', showToggle: true },
      { icon: Bell, label: 'Notifications', value: 'All Enabled', showToggle: false },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Personal Information', value: '', showToggle: false },
      { icon: Shield, label: 'Privacy & Security', value: '', showToggle: false },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: HelpCircle, label: 'Help & Support', value: '', showToggle: false },
      { icon: LogOut, label: 'Log Out', value: '', showToggle: false, danger: true },
    ],
  },
];

const Profile = () => {
  return (
    <div className="flex flex-col pb-20">
      <div className="container px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SideDrawerTrigger />
            <h1 className="text-2xl font-bold">Profile</h1>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <User size={40} className="text-primary" />
          </div>
          <h2 className="mt-4 text-xl font-bold">Sarah Johnson</h2>
          <p className="text-muted-foreground">Science Department</p>
          <button className="mt-4 px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
            Edit Profile
          </button>
        </div>
        
        <div className="mt-8 space-y-6">
          {profileSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2">
                {section.title}
              </h3>
              <Card>
                {section.items.map((item, index) => (
                  <React.Fragment key={item.label}>
                    <CardContent className={`p-0 ${index > 0 ? 'border-t border-border' : ''}`}>
                      <button className={`w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors ${item.danger ? 'text-destructive' : ''}`}>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                            <item.icon size={18} />
                          </div>
                          <span>{item.label}</span>
                        </div>
                        <div className="flex items-center">
                          {item.value && (
                            <span className="text-sm text-muted-foreground mr-2">{item.value}</span>
                          )}
                          {item.showToggle ? (
                            <div className="w-10 h-5 bg-primary rounded-full relative">
                              <div className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white" />
                            </div>
                          ) : (
                            <ChevronRight size={18} className="text-muted-foreground" />
                          )}
                        </div>
                      </button>
                    </CardContent>
                  </React.Fragment>
                ))}
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center text-xs text-muted-foreground">
          <p>TeacherHub v1.0.0</p>
          <p className="mt-1">© 2024 Educational Technologies Inc.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

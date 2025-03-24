
import React from 'react';
import { SideDrawerTrigger } from '@/components/layout/SideDrawer';
import { Bell, ChevronDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Mock data for analytics
const attendanceData = [
  { name: 'Mon', attendance: 95 },
  { name: 'Tue', attendance: 98 },
  { name: 'Wed', attendance: 92 },
  { name: 'Thu', attendance: 90 },
  { name: 'Fri', attendance: 85 },
];

const performanceData = [
  { name: 'Class 10-A', score: 78, previous: 72 },
  { name: 'Class 11-B', score: 82, previous: 76 },
  { name: 'Class 11-A', score: 74, previous: 70 },
  { name: 'Class 10-B', score: 85, previous: 78 },
  { name: 'Class 12-A', score: 88, previous: 80 },
];

const analyticsCards = [
  {
    title: 'Average Attendance',
    value: '92%',
    change: '+2.5%',
    trend: 'up',
    color: 'text-green-500',
  },
  {
    title: 'Assignments Submitted',
    value: '87%',
    change: '-1.8%',
    trend: 'down',
    color: 'text-red-500',
  },
  {
    title: 'Average Grade',
    value: 'B+',
    change: '+5.2%',
    trend: 'up',
    color: 'text-green-500',
  },
  {
    title: 'Active Engagement',
    value: '78%',
    change: '+3.4%',
    trend: 'up',
    color: 'text-green-500',
  },
];

const Analytics = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col pb-20">
      <div className="container px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SideDrawerTrigger />
            <h1 className="text-2xl font-bold">Analytics</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-secondary/80 transition-colors relative">
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-input hover:bg-accent transition-colors text-sm">
              <span>This Week</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-4'} mt-6`}>
          {analyticsCards.map((card, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h3 className="text-sm text-muted-foreground">{card.title}</h3>
                <div className="flex items-end justify-between mt-2">
                  <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>{card.value}</span>
                  <div className={`flex items-center text-xs font-medium ${card.color}`}>
                    {card.trend === 'up' ? (
                      <ArrowUpRight size={14} className="mr-1" />
                    ) : (
                      <ArrowDownRight size={14} className="mr-1" />
                    )}
                    {card.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 gap-6 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Attendance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`h-${isMobile ? '48' : '64'}`}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={attendanceData}
                    margin={{
                      top: 20,
                      right: isMobile ? 10 : 30,
                      left: isMobile ? -20 : 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend wrapperStyle={isMobile ? { fontSize: '10px' } : undefined} />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      name="Attendance (%)"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: isMobile ? 3 : 4 }}
                      activeDot={{ r: isMobile ? 5 : 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Class Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`h-${isMobile ? '48' : '64'}`}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={performanceData}
                    margin={{
                      top: 20,
                      right: isMobile ? 10 : 30,
                      left: isMobile ? -20 : 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="name" tick={isMobile ? { fontSize: 10 } : undefined} />
                    <YAxis />
                    <Tooltip />
                    <Legend wrapperStyle={isMobile ? { fontSize: '10px' } : undefined} />
                    <Bar dataKey="previous" name="Previous Term" fill="#94a3b8" />
                    <Bar dataKey="score" name="Current Term" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

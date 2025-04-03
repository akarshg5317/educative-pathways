
import React, { useState } from 'react';
import { SideDrawerTrigger } from '@/components/layout/SideDrawer';
import { Bell, ChevronDown, ArrowUpRight, ArrowDownRight, PieChart as PieChartIcon, BarChart2, LineChart as LineChartIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Button } from '@/components/ui/button';

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

const monthlyData = [
  { name: 'Jan', attendance: 88, assignments: 75, engagement: 70 },
  { name: 'Feb', attendance: 90, assignments: 79, engagement: 72 },
  { name: 'Mar', attendance: 92, assignments: 80, engagement: 76 },
  { name: 'Apr', attendance: 89, assignments: 78, engagement: 78 },
  { name: 'May', attendance: 94, assignments: 85, engagement: 81 },
  { name: 'Jun', attendance: 91, assignments: 83, engagement: 80 },
];

const subjectPerformance = [
  { name: 'Math', value: 82, color: '#3b82f6' },
  { name: 'Science', value: 78, color: '#10b981' },
  { name: 'English', value: 74, color: '#f59e0b' },
  { name: 'History', value: 68, color: '#ef4444' },
  { name: 'Arts', value: 86, color: '#8b5cf6' },
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

const timeOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

const Analytics = () => {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = useState('Weekly');
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  
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
            
            <div className="relative">
              <button 
                className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-input hover:bg-accent transition-colors text-sm"
                onClick={() => setShowTimeOptions(!showTimeOptions)}
              >
                <span>{timeRange}</span>
                <ChevronDown size={16} />
              </button>
              
              {showTimeOptions && (
                <div className="absolute right-0 mt-1 w-32 z-10 bg-background border border-border rounded-md shadow-md overflow-hidden">
                  {timeOptions.map((option) => (
                    <button
                      key={option}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors"
                      onClick={() => {
                        setTimeRange(option);
                        setShowTimeOptions(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
        
        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-4">
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
          </TabsContent>
          
          <TabsContent value="trends" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Monthly Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`h-${isMobile ? '64' : '80'}`}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={monthlyData}
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
                      <Area 
                        type="monotone" 
                        dataKey="attendance" 
                        name="Attendance" 
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        fillOpacity={0.3} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="assignments" 
                        name="Assignments" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.3} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="engagement" 
                        name="Engagement" 
                        stroke="#8b5cf6" 
                        fill="#8b5cf6" 
                        fillOpacity={0.3} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="subjects" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Subject Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`h-${isMobile ? '64' : '80'}`}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={subjectPerformance}
                        cx="50%"
                        cy="50%"
                        outerRadius={isMobile ? 70 : 100}
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {subjectPerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;

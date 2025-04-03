
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Menu } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

// Performance data for the chart
const performanceData = [
  { subject: 'Math', score: 85, average: 72 },
  { subject: 'Science', score: 78, average: 70 },
  { subject: 'English', score: 92, average: 75 },
  { subject: 'History', score: 88, average: 78 },
  { subject: 'Art', score: 95, average: 82 },
];

interface ChartTypeOption {
  value: 'bar' | 'line';
  label: string;
}

const chartTypeOptions: ChartTypeOption[] = [
  { value: 'bar', label: 'Bar Chart' },
  { value: 'line', label: 'Line Chart' },
];

export const PerformanceOverview = () => {
  const isMobile = useIsMobile();
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  
  const renderChart = () => {
    if (chartType === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
          <BarChart
            data={performanceData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderRadius: '6px', border: 'none' }}
              itemStyle={{ color: '#ffffff' }}
              formatter={(value) => [`${value}%`]}
            />
            <Bar dataKey="score" fill="#8884d8" radius={[4, 4, 0, 0]} name="Your Score" />
            <Bar dataKey="average" fill="#82ca9d" radius={[4, 4, 0, 0]} name="Class Average" />
          </BarChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
          <LineChart
            data={performanceData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderRadius: '6px', border: 'none' }}
              itemStyle={{ color: '#ffffff' }}
              formatter={(value) => [`${value}%`]}
            />
            <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} name="Your Score" />
            <Line type="monotone" dataKey="average" stroke="#82ca9d" strokeWidth={2} name="Class Average" />
          </LineChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Performance Overview</h2>
          <div className="flex items-center gap-2">
            <div className="flex bg-secondary rounded-md">
              {chartTypeOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={chartType === option.value ? "default" : "ghost"}
                  size="sm"
                  className={`text-xs py-1 h-8 ${
                    chartType === option.value ? 'bg-primary text-primary-foreground' : ''
                  }`}
                  onClick={() => setChartType(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {renderChart()}
        
        <div className="flex justify-center mt-4 gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#8884d8]"></div>
            <span className="text-sm">Your Score</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#82ca9d]"></div>
            <span className="text-sm">Class Average</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

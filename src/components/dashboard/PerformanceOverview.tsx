
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { BarChart2, PieChart as PieChartIcon, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '../ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

// Mock data for the performance chart
const pieData = [
  { name: 'Excellent', value: 12, color: '#3b82f6' },
  { name: 'Good', value: 8, color: '#10b981' },
  { name: 'Average', value: 5, color: '#f59e0b' },
  { name: 'Needs Help', value: 3, color: '#ef4444' },
];

const barData = [
  { name: 'Week 1', score: 65 },
  { name: 'Week 2', score: 72 },
  { name: 'Week 3', score: 78 },
  { name: 'Week 4', score: 75 },
  { name: 'Week 5', score: 82 },
];

export const PerformanceOverview = () => {
  const isMobile = useIsMobile();
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <BarChart2 size={18} className="text-primary" />
            Class Performance
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button 
              variant={chartType === 'pie' ? 'default' : 'outline'} 
              size="sm" 
              className="h-8 px-2"
              onClick={() => setChartType('pie')}
            >
              <PieChartIcon size={16} />
            </Button>
            <Button 
              variant={chartType === 'bar' ? 'default' : 'outline'} 
              size="sm" 
              className="h-8 px-2"
              onClick={() => setChartType('bar')}
            >
              <BarChart2 size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          key={chartType}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="pt-2"
        >
          {chartType === 'pie' ? (
            <ResponsiveContainer width="100%" height={isMobile ? 180 : 220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 30 : 40}
                  outerRadius={isMobile ? 55 : 70}
                  paddingAngle={4}
                  dataKey="value"
                  label={isMobile ? undefined : ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={!isMobile}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border border-border rounded-md p-2 shadow-md">
                          <p className="font-medium">{payload[0].name}</p>
                          <p className="text-sm">{`Students: ${payload[0].value}`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend 
                  layout={isMobile ? "horizontal" : "horizontal"} 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={isMobile ? { fontSize: '10px' } : undefined}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={isMobile ? 180 : 220}>
              <BarChart
                data={barData}
                margin={{
                  top: 20,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fontSize: isMobile ? 10 : 12 }} />
                <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border border-border rounded-md p-2 shadow-md">
                          <p className="font-medium">{label}</p>
                          <p className="text-sm">{`Score: ${payload[0].value}`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
          
          <div className="mt-4 text-center flex justify-center">
            <button className="flex items-center gap-1 text-center text-sm text-primary py-2 hover:underline">
              View Detailed Analytics
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

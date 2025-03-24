
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { BarChart2 } from 'lucide-react';

// Mock data for the performance chart
const data = [
  { name: 'Excellent', value: 12, color: '#3b82f6' },
  { name: 'Good', value: 8, color: '#10b981' },
  { name: 'Average', value: 5, color: '#f59e0b' },
  { name: 'Needs Help', value: 3, color: '#ef4444' },
];

export const PerformanceOverview = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <BarChart2 size={18} className="text-primary" />
          Class Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="pt-2"
        >
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="mt-2 text-center">
            <button className="text-center text-sm text-primary py-2 hover:underline">
              View Detailed Analytics
            </button>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

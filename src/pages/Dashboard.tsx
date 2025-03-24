
import React from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { TodaySchedule } from '@/components/dashboard/TodaySchedule';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { PerformanceOverview } from '@/components/dashboard/PerformanceOverview';

const Dashboard = () => {
  return (
    <div className="flex flex-col pb-20">
      <div className="container px-4 py-4">
        <DashboardHeader />
        
        <div className="mt-8 space-y-6">
          <TodaySchedule />
          <QuickActions />
          <PerformanceOverview />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

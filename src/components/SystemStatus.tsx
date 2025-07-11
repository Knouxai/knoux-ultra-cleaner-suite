
import React from 'react';
import { Activity, HardDrive, MemoryStick, Cpu, Battery, Wifi } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SystemStatus: React.FC = () => {
  const systemStats = [
    { label: 'المعالج', value: 45, icon: Cpu, color: 'text-green-500' },
    { label: 'الذاكرة', value: 68, icon: MemoryStick, color: 'text-yellow-500' },
    { label: 'التخزين', value: 78, icon: HardDrive, color: 'text-red-500' },
    { label: 'البطارية', value: 92, icon: Battery, color: 'text-green-500' },
    { label: 'الشبكة', value: 35, icon: Wifi, color: 'text-blue-500' },
    { label: 'النشاط', value: 56, icon: Activity, color: 'text-purple-500' },
  ];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-primary" />
          <span>حالة النظام الحية</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {systemStats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-sm font-medium">{stat.label}</span>
                </div>
                <span className="text-sm text-muted-foreground">{stat.value}%</span>
              </div>
              <Progress 
                value={stat.value} 
                className="h-2 bg-muted/20"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatus;

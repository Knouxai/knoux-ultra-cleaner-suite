
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SectionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  services: string[];
  color: string;
  onClick?: () => void;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  description,
  icon: Icon,
  services,
  color,
  onClick
}) => {
  return (
    <Card className="glass-card hover:glass-button transition-all duration-300 group cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color} group-hover:pulse-glow`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground">
              {services.length} خدمات
            </span>
          </div>
        </div>
        <CardTitle className="text-xl font-bold group-hover:neon-glow transition-all">
          {title}
        </CardTitle>
        <CardDescription className="text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2 mb-4">
          {services.slice(0, 3).map((service, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">{service}</span>
            </div>
          ))}
          {services.length > 3 && (
            <div className="text-xs text-muted-foreground">
              +{services.length - 3} خدمات إضافية...
            </div>
          )}
        </div>
        
        <Button className="w-full glass-button rounded-lg hover:neon-border">
          فتح القسم
        </Button>
      </CardContent>
    </Card>
  );
};

export default SectionCard;

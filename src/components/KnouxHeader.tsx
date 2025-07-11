
import React from 'react';
import { Moon, Sun, Shield, Cpu, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KnouxHeaderProps {
  darkMode: boolean;
  onThemeToggle: () => void;
  onBlackDiamondAccess: () => void;
}

const KnouxHeader: React.FC<KnouxHeaderProps> = ({ 
  darkMode, 
  onThemeToggle, 
  onBlackDiamondAccess 
}) => {
  return (
    <header className="glass-card rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center pulse-glow">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold neon-glow">
              Knoux CleanMaster Ultra™
            </h1>
            <p className="text-muted-foreground">
              النظام الذكي المتقدم لتنظيف وتحسين الأداء
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onThemeToggle}
            className="glass-button rounded-full"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
          
          <Button
            onClick={onBlackDiamondAccess}
            className="glass-button px-6 py-2 rounded-full hover:neon-border"
          >
            <Shield className="w-4 h-4 mr-2" />
            BlackDiamond™
          </Button>
          
          <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-full">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">النظام نظيف 98%</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default KnouxHeader;

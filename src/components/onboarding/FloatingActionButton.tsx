import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Play, HelpCircle } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
  isVisible?: boolean;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ 
  onClick, 
  isVisible = true 
}) => {
  if (!isVisible) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onClick}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200 z-50"
            size="icon"
          >
            <div className="relative">
              <Play className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-gray-900 text-white">
          <p>MOVEX Tour starten</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FloatingActionButton;
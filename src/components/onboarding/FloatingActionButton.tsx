import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Play, HelpCircle, Sparkles } from 'lucide-react';

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
            className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-movex-blue hover:bg-movex-teal shadow-xl hover:shadow-2xl transition-all duration-300 z-50 group border-2 border-white/20"
            size="icon"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
              <Sparkles className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-200" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-movex-blue rounded-full animate-pulse"></div>
              </div>
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-white text-movex-teal border border-movex-blue/20 shadow-lg">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            <p className="font-medium">MOVEX Tour starten</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FloatingActionButton;
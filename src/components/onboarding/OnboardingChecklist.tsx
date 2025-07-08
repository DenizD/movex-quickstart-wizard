import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check, Circle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  action?: () => void;
}

interface OnboardingChecklistProps {
  items: ChecklistItem[];
  onStartTour: () => void;
  className?: string;
}

const OnboardingChecklist: React.FC<OnboardingChecklistProps> = ({ 
  items, 
  onStartTour, 
  className = "" 
}) => {
  const completedCount = items.filter(item => item.completed).length;
  const progressPercentage = (completedCount / items.length) * 100;

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Onboarding Fortschritt</CardTitle>
          <Button variant="outline" size="sm" onClick={onStartTour}>
            <Play className="w-4 h-4 mr-2" />
            Tour starten
          </Button>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Abgeschlossen: {completedCount} von {items.length}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {items.map((item) => (
            <div 
              key={item.id}
              className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                item.completed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {item.completed ? (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium text-sm ${item.completed ? 'text-green-800' : 'text-gray-900'}`}>
                  {item.title}
                </h4>
                <p className={`text-xs mt-1 ${item.completed ? 'text-green-600' : 'text-gray-600'}`}>
                  {item.description}
                </p>
                {item.action && !item.completed && (
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="p-0 h-auto text-xs text-primary mt-1"
                    onClick={item.action}
                  >
                    Jetzt erledigen →
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {completedCount === items.length && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Check className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-medium text-green-800">Glückwunsch!</h4>
            <p className="text-sm text-green-600 mt-1">
              Sie haben das Onboarding erfolgreich abgeschlossen. Jetzt können Sie loslegen!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OnboardingChecklist;
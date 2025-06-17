
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  Calendar, 
  Play, 
  CreditCard, 
  CheckCircle2, 
  Clock,
  ArrowRight 
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  completed: boolean;
  progress?: number;
  action: string;
  onClick: () => void;
}

interface OnboardingTilesProps {
  steps: OnboardingStep[];
}

const OnboardingTiles: React.FC<OnboardingTilesProps> = ({ steps }) => {
  const completedSteps = steps.filter(step => step.completed).length;
  const totalSteps = steps.length;
  const overallProgress = (completedSteps / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Erste Schritte</h2>
          <p className="text-gray-600">Vervollständigen Sie Ihr Setup für optimale Ergebnisse</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Fortschritt</div>
          <div className="font-semibold text-[#0066CC]">{completedSteps} von {totalSteps}</div>
          <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
            <div 
              className="bg-[#0066CC] h-2 rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step) => {
          const IconComponent = step.icon;
          return (
            <Card 
              key={step.id} 
              className={`relative overflow-hidden transition-all hover:shadow-lg ${
                step.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-[#0066CC]'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    step.completed ? 'bg-green-500' : 'bg-[#E6F3FF]'
                  }`}>
                    {step.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <IconComponent className={`w-6 h-6 ${step.completed ? 'text-white' : 'text-[#0066CC]'}`} />
                    )}
                  </div>
                  {!step.completed && (
                    <Clock className="w-4 h-4 text-gray-400" />
                  )}
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{step.description}</p>

                {step.progress !== undefined && step.progress > 0 && !step.completed && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Fortschritt</span>
                      <span>{step.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#0066CC] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${step.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <Button
                  onClick={step.onClick}
                  variant={step.completed ? "outline" : "default"}
                  size="sm"
                  className={`w-full ${
                    step.completed 
                      ? 'border-green-200 text-green-700 hover:bg-green-100' 
                      : 'bg-[#0066CC] hover:bg-[#0052A3] text-white'
                  }`}
                >
                  {step.completed ? (
                    'Abgeschlossen'
                  ) : (
                    <>
                      {step.action}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>

              {step.completed && (
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-green-500">
                  <CheckCircle2 className="w-3 h-3 text-white absolute -top-4 -right-2" />
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {completedSteps === totalSteps && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-900">Glückwunsch! Setup abgeschlossen</h3>
              <p className="text-sm text-green-700">
                Sie haben alle Onboarding-Schritte erfolgreich abgeschlossen. Ihr MOVEX Account ist jetzt vollständig eingerichtet!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingTiles;

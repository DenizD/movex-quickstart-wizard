
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, X, Minimize2, Maximize2 } from 'lucide-react';

interface HighlightBoxProps {
  targetSelector: string;
  isActive: boolean;
}

const HighlightBox: React.FC<HighlightBoxProps> = ({ targetSelector, isActive }) => {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (isActive && targetSelector) {
      const element = document.querySelector(targetSelector);
      if (element) {
        const domRect = element.getBoundingClientRect();
        setRect(domRect);
        
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [targetSelector, isActive]);

  if (!isActive || !rect) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" />
      <div 
        className="fixed z-50 pointer-events-none border-2 border-blue-500 rounded-lg"
        style={{
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8,
          boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
        }}
      />
    </>
  );
};

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  targetSelector?: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: 'Willkommen bei MOVEX',
    description: 'Entdecken Sie die Möglichkeiten von Live Shopping mit MOVEX',
    targetSelector: '[data-onboarding="overview-header"]'
  },
  {
    id: 2,
    title: 'Dashboard Übersicht',
    description: 'Hier sehen Sie alle wichtigen Kennzahlen auf einen Blick',
    targetSelector: '[data-onboarding="analytics-chart"]'
  },
  {
    id: 3,
    title: 'Content Management',
    description: 'Erstellen und verwalten Sie Ihre Live Shopping Inhalte',
    targetSelector: '[data-onboarding="content-creation"]'
  },
  {
    id: 4,
    title: 'Live Shows',
    description: 'Starten Sie interaktive Live Shopping Events',
    targetSelector: '[data-onboarding="shows"]'
  },
  {
    id: 5,
    title: 'Video Clips',
    description: 'Erstellen Sie kurze, wiederverwendbare Shopping Videos',
    targetSelector: '[data-onboarding="clips"]'
  },
  {
    id: 6,
    title: 'Media Library',
    description: 'Organisieren Sie Ihre Medien in übersichtlichen Bibliotheken',
    targetSelector: '[data-onboarding="media-library"]'
  },
  {
    id: 7,
    title: 'Team Verwaltung',
    description: 'Verwalten Sie Teammitglieder und deren Berechtigungen',
    targetSelector: '[data-onboarding="users"]'
  },
  {
    id: 8,
    title: 'Analytics',
    description: 'Analysieren Sie die Performance Ihrer Live Shopping Events',
    targetSelector: '[data-onboarding="analytics"]'
  }
];

interface OnboardingWizardProps {
  onComplete: () => void;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('movex_onboarding_completed', 'true');
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;
  const currentStepData = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  if (!isVisible) return null;

  return (
    <>
      <HighlightBox 
        targetSelector={currentStepData.targetSelector || ''} 
        isActive={!isMinimized && !!currentStepData.targetSelector}
      />

      {isMinimized && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-3 flex items-center gap-2 border">
            <div className="text-sm font-medium">MOVEX Tour</div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleMinimize}
              className="h-6 w-6 p-0"
            >
              <Maximize2 size={12} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleSkip}
              className="h-6 w-6 p-0"
            >
              <X size={12} />
            </Button>
          </div>
        </div>
      )}

      {!isMinimized && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">MOVEX Tour</h3>
                <p className="text-sm text-gray-500">Schritt {currentStep + 1} von {onboardingSteps.length}</p>
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleMinimize}
                  className="h-8 w-8 p-0"
                >
                  <Minimize2 size={16} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleSkip}
                  className="h-8 w-8 p-0"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            {/* Progress */}
            <div className="p-4 pb-2">
              <Progress value={progress} className="h-2" />
            </div>

            {/* Content */}
            <div className="p-4">
              <h4 className="text-xl font-semibold mb-2">{currentStepData.title}</h4>
              <p className="text-gray-600 mb-6">{currentStepData.description}</p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 border-t bg-gray-50">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft size={16} />
                Zurück
              </Button>

              <div className="flex gap-1">
                {onboardingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep
                        ? 'bg-blue-500'
                        : index < currentStep
                        ? 'bg-blue-300'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                {isLastStep ? 'Fertig' : 'Weiter'}
                {!isLastStep && <ChevronRight size={16} />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OnboardingWizard;

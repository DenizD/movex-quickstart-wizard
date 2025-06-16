
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
      <div className="fixed inset-0 bg-black/40 z-40" />
      <div 
        className="fixed z-50 pointer-events-none border-2 border-teal-500 rounded-lg shadow-lg"
        style={{
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8,
          boxShadow: '0 0 0 4px rgba(20, 184, 166, 0.2)'
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
    title: 'Willkommen bei MOVEX Live Shopping',
    description: 'Entdecken Sie die Möglichkeiten von Live Shopping mit MOVEX. Wir führen Sie durch die wichtigsten Funktionen.',
    targetSelector: '[data-onboarding="overview-header"]'
  },
  {
    id: 2,
    title: 'Dashboard Übersicht',
    description: 'Hier sehen Sie alle wichtigen Kennzahlen und Analytics auf einen Blick. Verfolgen Sie Ihre Performance in Echtzeit.',
    targetSelector: '[data-onboarding="analytics-chart"]'
  },
  {
    id: 3,
    title: 'Content erstellen',
    description: 'Erstellen Sie Shows, Clips und Media Libraries für Ihre Live Shopping Events.',
    targetSelector: '[data-onboarding="content-creation"]'
  },
  {
    id: 4,
    title: 'Live Shows verwalten',
    description: 'Planen und verwalten Sie Ihre Live Shopping Events mit unserem Show-Management.',
    targetSelector: '[data-onboarding="shows"]'
  },
  {
    id: 5,
    title: 'Video Clips erstellen',
    description: 'Erstellen Sie kurze, shoppable Videos die jederzeit verfügbar sind.',
    targetSelector: '[data-onboarding="clips"]'
  },
  {
    id: 6,
    title: 'Media Library organisieren',
    description: 'Organisieren Sie Ihre Inhalte in übersichtlichen Media Libraries und Playlists.',
    targetSelector: '[data-onboarding="media-library"]'
  },
  {
    id: 7,
    title: 'Team Verwaltung',
    description: 'Verwalten Sie Teammitglieder und deren Berechtigungen für Ihr Live Shopping.',
    targetSelector: '[data-onboarding="users"]'
  },
  {
    id: 8,
    title: 'Detaillierte Analytics',
    description: 'Analysieren Sie die Performance Ihrer Shows mit detaillierten Metriken und Insights.',
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
          <div className="bg-white rounded-lg shadow-xl p-4 flex items-center gap-3 border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">MOVEX Tour läuft</span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleMinimize}
              className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
            >
              <Maximize2 size={12} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleSkip}
              className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
            >
              <X size={12} />
            </Button>
          </div>
        </div>
      )}

      {!isMinimized && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">MOVEX Tour</h3>
                  <p className="text-sm text-gray-500">Schritt {currentStep + 1} von {onboardingSteps.length}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleMinimize}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                >
                  <Minimize2 size={16} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleSkip}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            {/* Progress */}
            <div className="px-6 pt-4">
              <Progress value={progress} className="h-2 bg-gray-100">
                <div 
                  className="h-full bg-teal-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </Progress>
            </div>

            {/* Content */}
            <div className="p-6">
              <h4 className="text-xl font-semibold mb-3 text-gray-900">{currentStepData.title}</h4>
              <p className="text-gray-600 leading-relaxed">{currentStepData.description}</p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2 border-gray-300"
              >
                <ChevronLeft size={16} />
                Zurück
              </Button>

              <div className="flex gap-2">
                {onboardingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep
                        ? 'bg-teal-500'
                        : index < currentStep
                        ? 'bg-teal-300'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700"
              >
                {isLastStep ? 'Tour beenden' : 'Weiter'}
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

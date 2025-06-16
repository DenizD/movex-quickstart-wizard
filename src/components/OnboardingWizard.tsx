
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, X, Minimize2, Maximize2, ArrowRight } from 'lucide-react';

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
        
        // Scroll element into view if needed
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [targetSelector, isActive]);

  if (!isActive || !rect) return null;

  return (
    <>
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/50 z-40 pointer-events-none" />
      {/* Highlight box */}
      <div 
        className="fixed z-50 pointer-events-none"
        style={{
          top: rect.top - 8,
          left: rect.left - 8,
          width: rect.width + 16,
          height: rect.height + 16,
          border: '3px solid #3B82F6',
          borderRadius: '12px',
          boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.3)',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(1px)'
        }}
      />
    </>
  );
};

interface OnboardingStep {
  id: number;
  emoji: string;
  title: string;
  content: string;
  tip?: string;
  highlight?: string;
  targetSelector?: string;
  links?: Array<{
    text: string;
    action: string;
    type: 'primary' | 'secondary';
  }>;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    emoji: '🎉',
    title: 'Willkommen bei MOVEX',
    content: 'Willkommen auf deiner interaktiven Live Shopping Plattform! Mit MOVEX kannst du Live-Formate erstellen, einbetten und auswerten.',
    highlight: 'Bereit für deine Live Shopping Journey?',
    targetSelector: 'header',
    links: [
      { text: 'Los gehts!', action: 'next', type: 'primary' }
    ]
  },
  {
    id: 2,
    emoji: '📺',
    title: 'Shows erstellen',
    content: 'Hier siehst du den "Erste Show erstellen" Button. Klicke darauf, um dein erstes Live Shopping Event zu planen.',
    tip: 'Shows sind das Herzstück deines Live Shopping-Erlebnisses',
    targetSelector: '[data-onboarding="create-show"]',
    links: [
      { text: 'Button gefunden!', action: 'next', type: 'primary' }
    ]
  },
  {
    id: 3,
    emoji: '🎬',
    title: 'Clips & Media Library',
    content: 'In der Schnellstart-Sektion findest du auch Buttons für Clips und die Media Library. Diese helfen dir beim Organisieren deiner Inhalte.',
    tip: 'Clips sind kurze, shoppable Videos für dauerhaften Content',
    targetSelector: '[data-onboarding="quick-actions"]',
    links: [
      { text: 'Verstanden!', action: 'next', type: 'primary' }
    ]
  },
  {
    id: 4,
    emoji: '🎯',
    title: 'Funktions-Übersicht',
    content: 'Hier siehst du alle verfügbaren Features: Shows, Clips, Media Library, Team-Verwaltung, Analytics und Einstellungen.',
    tip: 'Jede Karte führt dich zu einem anderen Bereich der Plattform',
    targetSelector: '[data-onboarding="features-grid"]',
    links: [
      { text: 'Alles klar!', action: 'next', type: 'primary' }
    ]
  },
  {
    id: 5,
    emoji: '🚀',
    title: 'Erste Schritte Guide',
    content: 'Unten findest du eine Schritt-für-Schritt Anleitung für deine ersten Aktionen auf der Plattform.',
    tip: 'Folge diesen Schritten für den optimalen Start',
    targetSelector: '[data-onboarding="getting-started"]',
    links: [
      { text: 'Perfect!', action: 'next', type: 'primary' }
    ]
  },
  {
    id: 6,
    emoji: '🎓',
    title: 'Education Hub',
    content: 'Über den "Education Hub" Button oben rechts findest du Tutorials, Best Practices und Hilfestellungen.',
    tip: 'Hier lernst du alles über erfolgreiches Live Shopping',
    targetSelector: '[data-onboarding="education-hub"]',
    links: [
      { text: 'Gut zu wissen!', action: 'next', type: 'primary' }
    ]
  },
  {
    id: 7,
    emoji: '✨',
    title: 'Du bist bereit!',
    content: 'Perfekt! Du kennst jetzt alle wichtigen Bereiche. Starte mit deiner ersten Show oder erkunde die Plattform weiter.',
    highlight: 'Viel Erfolg beim Live Shopping!',
    links: [
      { text: 'Jetzt loslegen!', action: 'complete', type: 'primary' }
    ]
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

  const handleAction = (action: string) => {
    switch (action) {
      case 'next':
        handleNext();
        break;
      case 'complete':
        handleComplete();
        break;
      default:
        break;
    }
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
      {/* Highlight overlay */}
      <HighlightBox 
        targetSelector={currentStepData.targetSelector || ''} 
        isActive={!isMinimized && !!currentStepData.targetSelector}
      />

      {/* Minimized view */}
      {isMinimized && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 flex items-center gap-3 cursor-pointer hover:shadow-xl transition-all max-w-xs">
            <div className="text-2xl">{currentStepData.emoji}</div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 text-sm">MOVEX Tour</h4>
              <p className="text-xs text-gray-500">Schritt {currentStep + 1} von {onboardingSteps.length}</p>
            </div>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleMinimize}
                className="h-7 w-7 p-0 hover:bg-gray-100"
              >
                <Maximize2 size={12} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSkip}
                className="h-7 w-7 p-0 hover:bg-gray-100"
              >
                <X size={12} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Full wizard */}
      {!isMinimized && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="relative px-6 py-4 border-b border-gray-100">
              <div className="absolute top-3 right-3 flex gap-1">
                <button
                  onClick={handleMinimize}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Minimize2 size={14} className="text-gray-500" />
                </button>
                <button
                  onClick={handleSkip}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={14} className="text-gray-500" />
                </button>
              </div>
              <div className="pr-16">
                <h2 className="text-lg font-semibold text-gray-900">MOVEX Tour</h2>
                <p className="text-xs text-gray-500 mt-1">Schritt {currentStep + 1} von {onboardingSteps.length}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="px-6 py-3 bg-gray-50">
              <Progress value={progress} className="h-1.5" />
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">
                  {currentStepData.emoji}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {currentStepData.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {currentStepData.content}
                </p>
                
                {currentStepData.tip && (
                  <div className="text-xs text-blue-700 bg-blue-50 px-3 py-2 rounded-lg mb-3">
                    <span className="font-medium">💡 Tipp:</span> {currentStepData.tip}
                  </div>
                )}
                
                {currentStepData.highlight && (
                  <div className="text-blue-600 font-medium bg-blue-50 px-3 py-2 rounded-lg text-xs">
                    ✨ {currentStepData.highlight}
                  </div>
                )}
              </div>

              {/* Action Links */}
              {currentStepData.links && (
                <div className="space-y-2 mb-4">
                  {currentStepData.links.map((link, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAction(link.action)}
                      variant={link.type === 'primary' ? 'default' : 'outline'}
                      className={`w-full justify-between text-sm ${
                        link.type === 'primary' 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <span>{link.text}</span>
                      <ArrowRight size={14} />
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-gray-50">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2 text-xs px-3 py-1.5 h-auto"
              >
                <ChevronLeft size={14} />
                Zurück
              </Button>

              <div className="flex gap-1.5">
                {onboardingSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      index === currentStep
                        ? 'bg-blue-600 w-4'
                        : index < currentStep
                        ? 'bg-blue-300'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={isLastStep}
                className="flex items-center gap-2 text-xs px-3 py-1.5 h-auto bg-blue-600 hover:bg-blue-700"
              >
                {!isLastStep && 'Weiter'}
                {!isLastStep && <ChevronRight size={14} />}
                {isLastStep && <span className="text-sm">🎉</span>}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OnboardingWizard;

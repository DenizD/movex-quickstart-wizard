
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
        
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [targetSelector, isActive]);

  if (!isActive || !rect) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 pointer-events-none" />
      <div 
        className="fixed z-50 pointer-events-none"
        style={{
          top: rect.top - 8,
          left: rect.left - 8,
          width: rect.width + 16,
          height: rect.height + 16,
          border: '3px solid #002A60',
          borderRadius: '12px',
          boxShadow: '0 0 0 4px rgba(0, 42, 96, 0.2), 0 0 20px rgba(0, 42, 96, 0.3)',
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
    content: 'Willkommen auf deiner Live Shopping Plattform! MOVEX ermöglicht es dir, interaktive Live-Events zu erstellen und nahtlos in deine Website zu integrieren.',
    highlight: 'Bereit für deine Live Shopping Journey?',
    targetSelector: '[data-onboarding="overview-header"]',
    links: [
      { text: 'Los gehts!', action: 'next', type: 'primary' }
    ]
  },
  {
    id: 2,
    emoji: '📊',
    title: 'Analytics Dashboard',
    content: 'Hier siehst du deine wichtigsten Kennzahlen auf einen Blick: Viewer, Chat-Nachrichten, Likes und Produkt-Klicks.',
    tip: 'Die Analytics helfen dir dabei, den Erfolg deiner Shows zu messen',
    targetSelector: '[data-onboarding="analytics-chart"]',
    links: [
      { text: 'Verstanden!', action: 'next', type: 'primary' }
    ]
  },
  {
    id: 3,
    emoji: '🎬',
    title: 'Content erstellen',
    content: 'In diesem Bereich kannst du neue Shows, Clips und Media Libraries erstellen. Jeder Content-Typ hat seinen eigenen Zweck.',
    tip: 'Shows sind live, Clips sind kurz und immer verfügbar, Media Libraries organisieren deine Inhalte',
    targetSelector: '[data-onboarding="content-creation"]',
    links: [
      { text: 'Alles klar!', action: 'next', type: 'primary' }
    ]
  },
  {
    id: 4,
    emoji: '📺',
    title: 'Shows verwalten',
    content: 'Im Shows-Bereich findest du alle deine Live Shopping Events. Du kannst sie filtern, bearbeiten und neue erstellen.',
    tip: 'Nutze die Tabs um zwischen Live, Upcoming und Ended Shows zu wechseln',
    targetSelector: '[data-onboarding="shows"]',
    links: [
      { text: 'Shows ansehen', action: 'navigate', type: 'primary' }
    ]
  },
  {
    id: 5,
    emoji: '✂️',
    title: 'Clips für Evergreen Content',
    content: 'Clips sind kurze shoppable Videos, die dauerhaft auf deiner Website verfügbar sind und hohe Conversion-Raten erzielen.',
    tip: 'Clips eignen sich perfekt für Produktpräsentationen und können überall eingebettet werden',
    targetSelector: '[data-onboarding="clips"]',
    links: [
      { text: 'Clips entdecken', action: 'navigate', type: 'primary' }
    ]
  },
  {
    id: 6,
    emoji: '📚',
    title: 'Media Library Organisation',
    content: 'Die Media Library organisiert all deine Inhalte in strukturierten Playlists mit erweiterten Filter- und Suchfunktionen.',
    tip: 'Erstelle thematische Playlists für bessere Organisation',
    targetSelector: '[data-onboarding="media-library"]',
    links: [
      { text: 'Library erkunden', action: 'navigate', type: 'primary' }
    ]
  },
  {
    id: 7,
    emoji: '👥',
    title: 'Team-Verwaltung',
    content: 'Hier kannst du Teammitglieder einladen und Rollen wie Admin, Host oder Moderator vergeben.',
    tip: 'Eine gute Team-Organisation ist der Schlüssel für erfolgreiche Live Shopping Events',
    targetSelector: '[data-onboarding="users"]',
    links: [
      { text: 'Team verwalten', action: 'navigate', type: 'primary' }
    ]
  },
  {
    id: 8,
    emoji: '📊',
    title: 'Detaillierte Analytics',
    content: 'Im Analytics-Bereich erhältst du tiefe Einblicke in Performance-Metriken, Conversion-Funnels und Viewer-Verhalten.',
    tip: 'Nutze die Daten für datenbasierte Optimierungen deiner Shows',
    targetSelector: '[data-onboarding="analytics"]',
    links: [
      { text: 'Analytics öffnen', action: 'navigate', type: 'primary' }
    ]
  },
  {
    id: 9,
    emoji: '🚀',
    title: 'Bereit zum Start!',
    content: 'Perfekt! Du kennst jetzt alle wichtigen Bereiche der MOVEX Plattform. Starte mit deiner ersten Show oder erkunde die Features weiter.',
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

  const handleNavigate = () => {
    const routes = {
      4: '/shows',
      5: '/clips', 
      6: '/media-library',
      7: '/users',
      8: '/analytics'
    };
    
    const route = routes[currentStep as keyof typeof routes];
    if (route) {
      window.location.href = route;
    }
    handleNext();
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'next':
        handleNext();
        break;
      case 'navigate':
        handleNavigate();
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
      <HighlightBox 
        targetSelector={currentStepData.targetSelector || ''} 
        isActive={!isMinimized && !!currentStepData.targetSelector}
      />

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
                <h2 className="text-lg font-semibold text-gray-900">MOVEX Platform Tour</h2>
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
                  <div className="text-xs text-movex-blue bg-movex-light px-3 py-2 rounded-lg mb-3">
                    <span className="font-medium">💡 Tipp:</span> {currentStepData.tip}
                  </div>
                )}
                
                {currentStepData.highlight && (
                  <div className="text-movex-blue font-medium bg-movex-light px-3 py-2 rounded-lg text-xs">
                    ✨ {currentStepData.highlight}
                  </div>
                )}
              </div>

              {currentStepData.links && (
                <div className="space-y-2 mb-4">
                  {currentStepData.links.map((link, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAction(link.action)}
                      variant={link.type === 'primary' ? 'default' : 'outline'}
                      className={`w-full justify-between text-sm ${
                        link.type === 'primary' 
                          ? 'bg-movex-blue hover:bg-blue-700' 
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
                        ? 'bg-movex-blue w-4'
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
                className="flex items-center gap-2 text-xs px-3 py-1.5 h-auto bg-movex-blue hover:bg-blue-700"
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

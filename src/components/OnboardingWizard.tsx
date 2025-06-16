
import React, { useState, useEffect } from 'react';
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
      <div className="fixed inset-0 bg-black/60 z-40 pointer-events-none" />
      <div 
        className="fixed z-50 pointer-events-none"
        style={{
          top: rect.top - 8,
          left: rect.left - 8,
          width: rect.width + 16,
          height: rect.height + 16,
          border: '3px solid #002A60',
          borderRadius: '12px',
          boxShadow: '0 0 0 4px rgba(0, 42, 96, 0.3), 0 0 30px rgba(0, 42, 96, 0.4)',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(2px)'
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
    title: 'Willkommen bei MOVEX Live Shopping',
    content: 'Herzlich willkommen auf Ihrer Live Shopping Plattform! MOVEX ermöglicht es Ihnen, interaktive Live-Events zu erstellen und nahtlos in Ihre Website zu integrieren.',
    highlight: 'Bereit für Ihre Live Shopping Journey?',
    targetSelector: '[data-onboarding="overview-header"]',
    links: [
      { text: 'Tour starten', action: 'next', type: 'primary' }
    ]
  },
  {
    id: 2,
    emoji: '📊',
    title: 'Analytics Dashboard',
    content: 'Hier sehen Sie Ihre wichtigsten Kennzahlen auf einen Blick: Viewer, Chat-Nachrichten, Likes und Produkt-Klicks in Echtzeit.',
    tip: 'Die Analytics helfen Ihnen dabei, den Erfolg Ihrer Shows zu messen und zu optimieren',
    targetSelector: '[data-onboarding="analytics-chart"]',
    links: [
      { text: 'Verstanden!', action: 'next', type: 'primary' }
    ]
  },
  {
    id: 3,
    emoji: '🎬',
    title: 'Content erstellen',
    content: 'In diesem Bereich können Sie neue Shows, Clips und Media Libraries erstellen. Jeder Content-Typ hat seinen eigenen Zweck und Einsatzbereich.',
    tip: 'Shows sind live, Clips sind kurz und immer verfügbar, Media Libraries organisieren Ihre Inhalte',
    targetSelector: '[data-onboarding="content-creation"]',
    links: [
      { text: 'Weiter erkunden', action: 'next', type: 'primary' }
    ]
  },
  {
    id: 4,
    emoji: '📺',
    title: 'Live Shows verwalten',
    content: 'Shows sind Ihre Live Shopping Events. Hier können Sie sie erstellen, planen und verwalten. Perfekt für Produktlaunches und interaktive Verkaufsevents.',
    tip: 'Live Shows erzielen die höchsten Engagement-Raten und Conversion-Rates',
    targetSelector: '[data-onboarding="shows"]',
    links: [
      { text: 'Show erstellen', action: 'navigate', type: 'primary' }
    ]
  },
  {
    id: 5,
    emoji: '✂️',
    title: 'Clips für Evergreen Content',
    content: 'Clips sind kurze shoppable Videos, die dauerhaft auf Ihrer Website verfügbar sind. Sie eignen sich perfekt für Produktpräsentationen und erzielen hohe Conversion-Raten.',
    tip: 'Clips können überall eingebettet werden und arbeiten 24/7 für Sie',
    targetSelector: '[data-onboarding="clips"]',
    links: [
      { text: 'Clip erstellen', action: 'navigate', type: 'primary' }
    ]
  },
  {
    id: 6,
    emoji: '📚',
    title: 'Media Library Organisation',
    content: 'Die Media Library organisiert all Ihre Inhalte in strukturierten Playlists. Mit erweiterten Filter- und Suchfunktionen behalten Sie immer den Überblick.',
    tip: 'Erstellen Sie thematische Playlists für bessere Organisation und einfacheres Auffinden',
    targetSelector: '[data-onboarding="media-library"]',
    links: [
      { text: 'Library erkunden', action: 'navigate', type: 'primary' }
    ]
  },
  {
    id: 7,
    emoji: '👥',
    title: 'Team-Verwaltung',
    content: 'Hier können Sie Teammitglieder einladen und Rollen wie Admin, Host oder Moderator vergeben. Perfekte Zusammenarbeit für erfolgreiche Live Shopping Events.',
    tip: 'Eine gute Team-Organisation ist der Schlüssel für erfolgreiche Live Shopping Events',
    targetSelector: '[data-onboarding="users"]',
    links: [
      { text: 'Team verwalten', action: 'navigate', type: 'primary' }
    ]
  },
  {
    id: 8,
    emoji: '📈',
    title: 'Detaillierte Analytics',
    content: 'Im Analytics-Bereich erhalten Sie tiefe Einblicke in Performance-Metriken, Conversion-Funnels und Viewer-Verhalten für datenbasierte Optimierungen.',
    tip: 'Nutzen Sie die Daten für kontinuierliche Verbesserungen Ihrer Shows und Clips',
    targetSelector: '[data-onboarding="analytics"]',
    links: [
      { text: 'Analytics öffnen', action: 'navigate', type: 'primary' }
    ]
  },
  {
    id: 9,
    emoji: '🚀',
    title: 'Bereit für Live Shopping!',
    content: 'Perfekt! Sie kennen jetzt alle wichtigen Bereiche der MOVEX Plattform. Starten Sie mit Ihrer ersten Show oder erkunden Sie die Features weiter.',
    highlight: 'Viel Erfolg beim Live Shopping!',
    links: [
      { text: 'Plattform nutzen', action: 'complete', type: 'primary' }
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
          <div className="bg-white border-2 border-movex-blue rounded-xl shadow-xl p-4 flex items-center gap-3 cursor-pointer hover:shadow-2xl transition-all max-w-xs">
            <div className="text-2xl">{currentStepData.emoji}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-movex-blue text-sm">MOVEX Platform Tour</h4>
              <p className="text-xs text-gray-600">Schritt {currentStep + 1} von {onboardingSteps.length}</p>
            </div>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleMinimize}
                className="h-7 w-7 p-0 hover:bg-movex-light"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-hidden border-2 border-gray-100">
            {/* Header mit MOVEX Styling */}
            <div className="relative px-6 py-5 bg-gradient-to-r from-movex-blue to-blue-700 text-white">
              <div className="absolute top-3 right-3 flex gap-1">
                <button
                  onClick={handleMinimize}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Minimize2 size={14} className="text-white" />
                </button>
                <button
                  onClick={handleSkip}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={14} className="text-white" />
                </button>
              </div>
              <div className="pr-16">
                <h2 className="text-xl font-bold">MOVEX Platform Tour</h2>
                <p className="text-sm text-blue-100 mt-1">Schritt {currentStep + 1} von {onboardingSteps.length}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4 bg-gray-50">
              <Progress value={progress} className="h-2" />
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">
                  {currentStepData.emoji}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {currentStepData.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {currentStepData.content}
                </p>
                
                {currentStepData.tip && (
                  <div className="text-sm text-movex-blue bg-movex-light px-4 py-3 rounded-lg mb-4 border border-blue-200">
                    <span className="font-semibold">💡 Tipp:</span> {currentStepData.tip}
                  </div>
                )}
                
                {currentStepData.highlight && (
                  <div className="text-movex-blue font-semibold bg-gradient-to-r from-movex-light to-blue-50 px-4 py-3 rounded-lg text-sm border border-blue-200">
                    ✨ {currentStepData.highlight}
                  </div>
                )}
              </div>

              {currentStepData.links && (
                <div className="space-y-3 mb-4">
                  {currentStepData.links.map((link, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAction(link.action)}
                      variant={link.type === 'primary' ? 'default' : 'outline'}
                      className={`w-full justify-between ${
                        link.type === 'primary' 
                          ? 'bg-movex-blue hover:bg-blue-700 text-white' 
                          : 'border-movex-blue text-movex-blue hover:bg-movex-light'
                      }`}
                    >
                      <span className="font-medium">{link.text}</span>
                      <ArrowRight size={16} />
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-gray-50">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2 text-sm px-4 py-2"
              >
                <ChevronLeft size={16} />
                Zurück
              </Button>

              <div className="flex gap-2">
                {onboardingSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentStep
                        ? 'bg-movex-blue w-6'
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
                className="flex items-center gap-2 text-sm px-4 py-2 bg-movex-blue hover:bg-blue-700"
              >
                {!isLastStep && 'Weiter'}
                {!isLastStep && <ChevronRight size={16} />}
                {isLastStep && <span className="text-lg">🎉</span>}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OnboardingWizard;


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface OnboardingStep {
  id: number;
  emoji: string;
  title: string;
  content: string;
  highlight?: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    emoji: '🎉',
    title: 'Willkommen bei MOVEX | Live Shopping!',
    content: 'Wir zeigen dir die wichtigsten Funktionen in 60 Sekunden.',
    highlight: 'Bereit für deine Live Shopping Journey?'
  },
  {
    id: 2,
    emoji: '📺',
    title: 'Erste Show erstellen',
    content: 'Klicke links auf „Shows" > „Create Show"',
    highlight: 'Erstelle Titel, Datum, Cover & Produkte.'
  },
  {
    id: 3,
    emoji: '🔗',
    title: 'Show einbetten',
    content: 'Kopiere den Embed-Code aus dem Show-Detailbereich.',
    highlight: 'Füge ihn in deine Website ein (HTML-Snippet oder CMS).'
  },
  {
    id: 4,
    emoji: '🎬',
    title: 'Clips erstellen',
    content: 'Im Menüpunkt „Clips" kannst du kurze, shoppable Videos hochladen.',
    highlight: 'Lade ein Video hoch, füge ein Produkt & Coverbild hinzu.'
  },
  {
    id: 5,
    emoji: '📚',
    title: 'Media Library erstellen',
    content: 'Erstelle eine Mediathek mit Playlists für vergangene und zukünftige Shows.',
    highlight: 'Sortiere nach Tags, Status & Reihenfolge.'
  },
  {
    id: 6,
    emoji: '👥',
    title: 'Nutzer verwalten',
    content: 'Unter „Users" kannst du neue Teammitglieder einladen.',
    highlight: 'Rollen: Admin, Host, Moderator, Analytics etc.'
  },
  {
    id: 7,
    emoji: '📊',
    title: 'Analytics verstehen',
    content: 'Sieh dir unter „Analytics" alle KPIs deiner Shows an.',
    highlight: 'Metriken wie Zuschauer, Chat, Produktklicks und mehr.'
  },
  {
    id: 8,
    emoji: '🚀',
    title: 'Los geht\'s!',
    content: 'Du bist bereit! Viel Erfolg mit deinem ersten Live Shopping Event!',
    highlight: 'Zeit, deine erste Show zu starten!'
  }
];

interface OnboardingWizardProps {
  onComplete: () => void;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

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

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;
  const currentStepData = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-slide-in">
        {/* Header */}
        <div className="relative p-6 pb-4 bg-gradient-to-r from-movex-blue to-blue-600 text-white rounded-t-2xl">
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">MOVEX | Live Shopping</h2>
            <p className="text-blue-100 text-sm">Quick Setup Wizard</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-3 bg-movex-light">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-movex-blue font-medium">
              Schritt {currentStep + 1} von {onboardingSteps.length}
            </span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4 animate-bounce">
              {currentStepData.emoji}
            </div>
            <h3 className="text-2xl font-bold text-movex-blue mb-3">
              {currentStepData.title}
            </h3>
            <p className="text-gray-700 text-lg mb-4 leading-relaxed">
              {currentStepData.content}
            </p>
            {currentStepData.highlight && (
              <p className="text-movex-blue font-semibold bg-movex-light px-4 py-2 rounded-lg">
                {currentStepData.highlight}
              </p>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center p-6 pt-0">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
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
                    ? 'bg-movex-blue'
                    : index < currentStep
                    ? 'bg-blue-300'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            className="flex items-center gap-2 bg-movex-blue hover:bg-blue-700"
          >
            {isLastStep ? 'Fertig' : 'Weiter'}
            {!isLastStep && <ChevronRight size={16} />}
            {isLastStep && <span className="text-lg">🎉</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;

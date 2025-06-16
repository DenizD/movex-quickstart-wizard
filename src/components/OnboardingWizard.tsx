
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface OnboardingStep {
  id: number;
  emoji: string;
  title: string;
  content: string;
  tip?: string;
  highlight?: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    emoji: '🎉',
    title: 'Willkommen bei MOVEX',
    content: 'Willkommen auf deiner interaktiven Live Shopping Plattform! Mit MOVEX kannst du Live-Formate erstellen, einbetten und auswerten – inklusive Clips, Media Library, Moderation & Analytics.',
    highlight: 'Bereit für deine Live Shopping Journey?'
  },
  {
    id: 2,
    emoji: '📺',
    title: 'Show erstellen – der zentrale Content-Typ',
    content: 'Klicke auf "Shows" in der linken Navigation und wähle "Create Show". Gib Titel, Beschreibung, Datum & Uhrzeit ein. Lade ein Cover hoch, füge Produkte & Tags hinzu.',
    tip: 'Funktionen: Pre-Live Modus, CTA-Button, FAB-Modus, Miniplayer aktivieren',
    highlight: 'Eine Show ist das Herzstück deines Live Shopping-Erlebnisses – sie bündelt Inhalte, Video, Produkte & Nutzerinteraktion.'
  },
  {
    id: 3,
    emoji: '🔗',
    title: 'Show einbetten – so geht Integration',
    content: 'Gehe in die Detailansicht der Show und kopiere den Einbettungscode. Du kannst MOVEX auf jeder Seite per iFrame einbinden oder direkt per JavaScript Snippet.',
    tip: 'Optional: FAB oder Miniplayer aktivieren, PDP-Einbindung möglich.',
    highlight: 'MOVEX ist vollständig Headless-fähig – ideal für CMS, Shopsysteme & mobile Views.'
  },
  {
    id: 4,
    emoji: '🎬',
    title: 'Clips erstellen – Evergreen Content für deinen Shop',
    content: 'Clips sind kurze, shoppable Videos (z. B. 15–90 Sekunden). Lade Video + Cover hoch, verknüpfe ein Produkt, schreibe eine kurze Beschreibung.',
    tip: 'Clips können auf Startseiten, PDPs oder in Playlists genutzt werden.',
    highlight: 'Clips funktionieren unabhängig von Zeit & Live-Status – ideal für Conversion im On-Demand-Umfeld.'
  },
  {
    id: 5,
    emoji: '📚',
    title: 'Media Library – Struktur für Content',
    content: 'Erstelle Playlists, um Shows & Clips zu gruppieren (z. B. "Kampagne Mai", "Sneaker Woche"). Ordne Playlists per Drag & Drop, setze Tags & Status (Live, Upcoming, Ended).',
    tip: 'Nutze die Mediathek als dauerhaftes Live Shopping Archiv.',
    highlight: 'Die Library ist ein wachsender Content-Hub mit Filter- und Suchfunktionen für deine Nutzer:innen.'
  },
  {
    id: 6,
    emoji: '👥',
    title: 'User Management – Teamarbeit leicht gemacht',
    content: 'Navigiere zu "Users" und lade per E-Mail weitere Personen ein.',
    tip: 'Rollen: Admin (alles), Host (Shows & Clips), Moderator (Chat & Live Tools), Analytics (nur Leserechte)',
    highlight: 'MOVEX unterstützt kollaboratives Arbeiten mit klarer Rollentrennung und Rechteverwaltung.'
  },
  {
    id: 7,
    emoji: '📊',
    title: 'Analytics – Erfolg sichtbar machen',
    content: 'Nach jeder Show findest du in "Analytics" KPIs wie: Zuschauer live & on demand, Watchtime, Produktklicks & Engagement, Conversion Funnels.',
    tip: 'Nutze die KPIs zur Optimierung von Format, Laufzeit & Produktinszenierung.',
    highlight: 'Datenbasierte Entscheidungen für bessere Live Shopping Performance.'
  },
  {
    id: 8,
    emoji: '🚀',
    title: 'Let\'s go!',
    content: 'Du bist bereit! Starte deine erste Show oder lege deine Clips & Playlists an. Dein MOVEX Setup steht.',
    highlight: 'Viel Erfolg beim Live Shopping!'
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
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 animate-slide-in max-h-[90vh] overflow-y-auto">
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
            <h3 className="text-2xl font-bold text-movex-blue mb-4">
              {currentStepData.title}
            </h3>
            <p className="text-gray-700 text-base mb-4 leading-relaxed text-left">
              {currentStepData.content}
            </p>
            {currentStepData.tip && (
              <div className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg mb-4 text-left">
                <strong>Tipp:</strong> {currentStepData.tip}
              </div>
            )}
            {currentStepData.highlight && (
              <p className="text-movex-blue font-semibold bg-movex-light px-4 py-3 rounded-lg text-sm">
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
            {isLastStep ? 'Jetzt loslegen' : 'Weiter'}
            {!isLastStep && <ChevronRight size={16} />}
            {isLastStep && <span className="text-lg">🚀</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;

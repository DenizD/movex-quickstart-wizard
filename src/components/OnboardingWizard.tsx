
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, X, Minimize2, Maximize2, ExternalLink, Play, ArrowRight } from 'lucide-react';

interface OnboardingStep {
  id: number;
  emoji: string;
  title: string;
  content: string;
  tip?: string;
  highlight?: string;
  links?: Array<{
    text: string;
    url: string;
    type: 'primary' | 'secondary';
  }>;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    emoji: '🎉',
    title: 'Willkommen bei MOVEX',
    content: 'Willkommen auf deiner interaktiven Live Shopping Plattform! Mit MOVEX kannst du Live-Formate erstellen, einbetten und auswerten – inklusive Clips, Media Library, Moderation & Analytics.',
    highlight: 'Bereit für deine Live Shopping Journey?',
    links: [
      { text: 'Platform Demo ansehen', url: '#demo', type: 'primary' },
      { text: 'Getting Started Guide', url: '#guide', type: 'secondary' }
    ]
  },
  {
    id: 2,
    emoji: '📺',
    title: 'Show erstellen – der zentrale Content-Typ',
    content: 'Klicke auf "Shows" in der linken Navigation und wähle "Create Show". Gib Titel, Beschreibung, Datum & Uhrzeit ein. Lade ein Cover hoch, füge Produkte & Tags hinzu.',
    tip: 'Funktionen: Pre-Live Modus, CTA-Button, FAB-Modus, Miniplayer aktivieren',
    highlight: 'Eine Show ist das Herzstück deines Live Shopping-Erlebnisses',
    links: [
      { text: 'Show Creator öffnen', url: '#shows/create', type: 'primary' },
      { text: 'Show Setup Tutorial', url: '#tutorial-shows', type: 'secondary' }
    ]
  },
  {
    id: 3,
    emoji: '🔗',
    title: 'Show einbetten – so geht Integration',
    content: 'Gehe in die Detailansicht der Show und kopiere den Einbettungscode. Du kannst MOVEX auf jeder Seite per iFrame einbinden oder direkt per JavaScript Snippet.',
    tip: 'Optional: FAB oder Miniplayer aktivieren, PDP-Einbindung möglich.',
    highlight: 'MOVEX ist vollständig Headless-fähig – ideal für CMS, Shopsysteme & mobile Views.',
    links: [
      { text: 'Embed Code Generator', url: '#embed', type: 'primary' },
      { text: 'Integration Docs', url: '#docs/embed', type: 'secondary' }
    ]
  },
  {
    id: 4,
    emoji: '🎬',
    title: 'Clips erstellen – Evergreen Content für deinen Shop',
    content: 'Clips sind kurze, shoppable Videos (z. B. 15–90 Sekunden). Lade Video + Cover hoch, verknüpfe ein Produkt, schreibe eine kurze Beschreibung.',
    tip: 'Clips können auf Startseiten, PDPs oder in Playlists genutzt werden.',
    highlight: 'Clips funktionieren unabhängig von Zeit & Live-Status – ideal für Conversion im On-Demand-Umfeld.',
    links: [
      { text: 'Clip Creator öffnen', url: '#clips/create', type: 'primary' },
      { text: 'Clip Best Practices', url: '#guide/clips', type: 'secondary' }
    ]
  },
  {
    id: 5,
    emoji: '📚',
    title: 'Media Library – Struktur für Content',
    content: 'Erstelle Playlists, um Shows & Clips zu gruppieren (z. B. "Kampagne Mai", "Sneaker Woche"). Ordne Playlists per Drag & Drop, setze Tags & Status (Live, Upcoming, Ended).',
    tip: 'Nutze die Mediathek als dauerhaftes Live Shopping Archiv.',
    highlight: 'Die Library ist ein wachsender Content-Hub mit Filter- und Suchfunktionen für deine Nutzer:innen.',
    links: [
      { text: 'Media Library öffnen', url: '#library', type: 'primary' },
      { text: 'Playlist Management Guide', url: '#guide/playlists', type: 'secondary' }
    ]
  },
  {
    id: 6,
    emoji: '👥',
    title: 'User Management – Teamarbeit leicht gemacht',
    content: 'Navigiere zu "Users" und lade per E-Mail weitere Personen ein.',
    tip: 'Rollen: Admin (alles), Host (Shows & Clips), Moderator (Chat & Live Tools), Analytics (nur Leserechte)',
    highlight: 'MOVEX unterstützt kollaboratives Arbeiten mit klarer Rollentrennung und Rechteverwaltung.',
    links: [
      { text: 'Team Management öffnen', url: '#users', type: 'primary' },
      { text: 'Rollen & Rechte erklärt', url: '#docs/roles', type: 'secondary' }
    ]
  },
  {
    id: 7,
    emoji: '📊',
    title: 'Analytics – Erfolg sichtbar machen',
    content: 'Nach jeder Show findest du in "Analytics" KPIs wie: Zuschauer live & on demand, Watchtime, Produktklicks & Engagement, Conversion Funnels.',
    tip: 'Nutze die KPIs zur Optimierung von Format, Laufzeit & Produktinszenierung.',
    highlight: 'Datenbasierte Entscheidungen für bessere Live Shopping Performance.',
    links: [
      { text: 'Analytics Dashboard', url: '#analytics', type: 'primary' },
      { text: 'KPI Interpretation Guide', url: '#guide/analytics', type: 'secondary' }
    ]
  },
  {
    id: 8,
    emoji: '🚀',
    title: 'Let\'s go!',
    content: 'Du bist bereit! Starte deine erste Show oder lege deine Clips & Playlists an. Dein MOVEX Setup steht.',
    highlight: 'Viel Erfolg beim Live Shopping!',
    links: [
      { text: 'Erste Show erstellen', url: '#shows/create', type: 'primary' },
      { text: 'Education Hub öffnen', url: '#education', type: 'secondary' }
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

  // Minimized view - cleaner floating indicator
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 flex items-center gap-3 cursor-pointer hover:shadow-xl transition-all max-w-xs">
          <div className="text-2xl">{currentStepData.emoji}</div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 text-sm">MOVEX Setup</h4>
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
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header - minimal and clean */}
        <div className="relative px-8 py-6 border-b border-gray-100">
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleMinimize}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Minimize2 size={16} className="text-gray-500" />
            </button>
            <button
              onClick={handleSkip}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          <div className="pr-20">
            <h2 className="text-xl font-semibold text-gray-900">MOVEX Setup</h2>
            <p className="text-sm text-gray-500 mt-1">Schritt {currentStep + 1} von {onboardingSteps.length}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-8 py-4 bg-gray-50">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">
              {currentStepData.emoji}
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentStepData.title}
            </h3>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {currentStepData.content}
            </p>
            
            {currentStepData.tip && (
              <div className="text-sm text-gray-600 bg-blue-50 px-4 py-3 rounded-lg mb-4">
                <span className="font-medium">💡 Tipp:</span> {currentStepData.tip}
              </div>
            )}
            
            {currentStepData.highlight && (
              <div className="text-movex-blue font-medium bg-movex-light px-4 py-3 rounded-lg text-sm">
                ✨ {currentStepData.highlight}
              </div>
            )}
          </div>

          {/* Action Links */}
          {currentStepData.links && (
            <div className="space-y-3 mb-8">
              {currentStepData.links.map((link, index) => (
                <Button
                  key={index}
                  variant={link.type === 'primary' ? 'default' : 'outline'}
                  className={`w-full justify-between ${
                    link.type === 'primary' 
                      ? 'bg-movex-blue hover:bg-movex-blue/90' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span>{link.text}</span>
                  <ArrowRight size={16} />
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center px-8 py-6 border-t border-gray-100 bg-gray-50">
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
            className="flex items-center gap-2 bg-movex-blue hover:bg-movex-blue/90"
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

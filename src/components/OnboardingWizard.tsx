
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, X, Minimize2, Maximize2, ExternalLink, Play } from 'lucide-react';

interface OnboardingStep {
  id: number;
  emoji: string;
  title: string;
  content: string;
  tip?: string;
  highlight?: string;
  gif?: string;
  links?: Array<{
    text: string;
    url: string;
    type: 'demo' | 'docs' | 'video' | 'feature';
  }>;
  interactiveDemo?: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    emoji: '🎉',
    title: 'Willkommen bei MOVEX',
    content: 'Willkommen auf deiner interaktiven Live Shopping Plattform! Mit MOVEX kannst du Live-Formate erstellen, einbetten und auswerten – inklusive Clips, Media Library, Moderation & Analytics.',
    highlight: 'Bereit für deine Live Shopping Journey?',
    gif: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=200&fit=crop',
    links: [
      { text: 'Platform Demo ansehen', url: '#demo', type: 'demo' },
      { text: 'Getting Started Guide', url: '#guide', type: 'docs' }
    ]
  },
  {
    id: 2,
    emoji: '📺',
    title: 'Show erstellen – der zentrale Content-Typ',
    content: 'Klicke auf "Shows" in der linken Navigation und wähle "Create Show". Gib Titel, Beschreibung, Datum & Uhrzeit ein. Lade ein Cover hoch, füge Produkte & Tags hinzu.',
    tip: 'Funktionen: Pre-Live Modus, CTA-Button, FAB-Modus, Miniplayer aktivieren',
    highlight: 'Eine Show ist das Herzstück deines Live Shopping-Erlebnisses – sie bündelt Inhalte, Video, Produkte & Nutzerinteraktion.',
    gif: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop',
    links: [
      { text: '▶ Show Creator öffnen', url: '#shows/create', type: 'feature' },
      { text: 'Show Setup Tutorial', url: '#tutorial-shows', type: 'video' }
    ],
    interactiveDemo: 'Klicke hier um eine Demo-Show zu erstellen'
  },
  {
    id: 3,
    emoji: '🔗',
    title: 'Show einbetten – so geht Integration',
    content: 'Gehe in die Detailansicht der Show und kopiere den Einbettungscode. Du kannst MOVEX auf jeder Seite per iFrame einbinden oder direkt per JavaScript Snippet.',
    tip: 'Optional: FAB oder Miniplayer aktivieren, PDP-Einbindung möglich.',
    highlight: 'MOVEX ist vollständig Headless-fähig – ideal für CMS, Shopsysteme & mobile Views.',
    gif: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop',
    links: [
      { text: 'Embed Code Generator', url: '#embed', type: 'feature' },
      { text: 'Integration Docs', url: '#docs/embed', type: 'docs' }
    ]
  },
  {
    id: 4,
    emoji: '🎬',
    title: 'Clips erstellen – Evergreen Content für deinen Shop',
    content: 'Clips sind kurze, shoppable Videos (z. B. 15–90 Sekunden). Lade Video + Cover hoch, verknüpfe ein Produkt, schreibe eine kurze Beschreibung.',
    tip: 'Clips können auf Startseiten, PDPs oder in Playlists genutzt werden.',
    highlight: 'Clips funktionieren unabhängig von Zeit & Live-Status – ideal für Conversion im On-Demand-Umfeld.',
    gif: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop',
    links: [
      { text: '🎬 Clip Creator öffnen', url: '#clips/create', type: 'feature' },
      { text: 'Clip Best Practices', url: '#guide/clips', type: 'docs' }
    ]
  },
  {
    id: 5,
    emoji: '📚',
    title: 'Media Library – Struktur für Content',
    content: 'Erstelle Playlists, um Shows & Clips zu gruppieren (z. B. "Kampagne Mai", "Sneaker Woche"). Ordne Playlists per Drag & Drop, setze Tags & Status (Live, Upcoming, Ended).',
    tip: 'Nutze die Mediathek als dauerhaftes Live Shopping Archiv.',
    highlight: 'Die Library ist ein wachsender Content-Hub mit Filter- und Suchfunktionen für deine Nutzer:innen.',
    gif: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop',
    links: [
      { text: '📚 Media Library öffnen', url: '#library', type: 'feature' },
      { text: 'Playlist Management Guide', url: '#guide/playlists', type: 'docs' }
    ]
  },
  {
    id: 6,
    emoji: '👥',
    title: 'User Management – Teamarbeit leicht gemacht',
    content: 'Navigiere zu "Users" und lade per E-Mail weitere Personen ein.',
    tip: 'Rollen: Admin (alles), Host (Shows & Clips), Moderator (Chat & Live Tools), Analytics (nur Leserechte)',
    highlight: 'MOVEX unterstützt kollaboratives Arbeiten mit klarer Rollentrennung und Rechteverwaltung.',
    gif: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop',
    links: [
      { text: '👥 Team Management öffnen', url: '#users', type: 'feature' },
      { text: 'Rollen & Rechte erklärt', url: '#docs/roles', type: 'docs' }
    ]
  },
  {
    id: 7,
    emoji: '📊',
    title: 'Analytics – Erfolg sichtbar machen',
    content: 'Nach jeder Show findest du in "Analytics" KPIs wie: Zuschauer live & on demand, Watchtime, Produktklicks & Engagement, Conversion Funnels.',
    tip: 'Nutze die KPIs zur Optimierung von Format, Laufzeit & Produktinszenierung.',
    highlight: 'Datenbasierte Entscheidungen für bessere Live Shopping Performance.',
    gif: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=200&fit=crop',
    links: [
      { text: '📊 Analytics Dashboard', url: '#analytics', type: 'feature' },
      { text: 'KPI Interpretation Guide', url: '#guide/analytics', type: 'docs' }
    ]
  },
  {
    id: 8,
    emoji: '🚀',
    title: 'Let\'s go!',
    content: 'Du bist bereit! Starte deine erste Show oder lege deine Clips & Playlists an. Dein MOVEX Setup steht.',
    highlight: 'Viel Erfolg beim Live Shopping!',
    gif: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=200&fit=crop',
    links: [
      { text: '🎬 Erste Show erstellen', url: '#shows/create', type: 'feature' },
      { text: '📚 Education Hub öffnen', url: '#education', type: 'docs' }
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

  // Minimized view
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
        <div className="bg-gradient-to-r from-movex-blue to-blue-600 text-white rounded-lg shadow-lg p-4 flex items-center gap-3 cursor-pointer hover:shadow-xl transition-shadow max-w-sm">
          <div className="text-2xl">{currentStepData.emoji}</div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">MOVEX Setup</h4>
            <p className="text-xs text-blue-100">Schritt {currentStep + 1} von {onboardingSteps.length}</p>
          </div>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleMinimize}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <Maximize2 size={14} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleSkip}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X size={14} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 animate-slide-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 pb-4 bg-gradient-to-r from-movex-blue to-blue-600 text-white rounded-t-2xl">
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleMinimize}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <Minimize2 size={20} />
            </button>
            <button
              onClick={handleSkip}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Content */}
            <div>
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
                    <strong>💡 Tipp:</strong> {currentStepData.tip}
                  </div>
                )}
                {currentStepData.highlight && (
                  <p className="text-movex-blue font-semibold bg-movex-light px-4 py-3 rounded-lg text-sm">
                    ✨ {currentStepData.highlight}
                  </p>
                )}
              </div>

              {/* Interactive Demo */}
              {currentStepData.interactiveDemo && (
                <div className="mb-6">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-dashed border-movex-blue text-movex-blue hover:bg-movex-blue hover:text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {currentStepData.interactiveDemo}
                  </Button>
                </div>
              )}

              {/* Quick Links */}
              {currentStepData.links && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 text-sm mb-3">🔗 Schnellzugriff:</h4>
                  {currentStepData.links.map((link, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start text-left hover:bg-gray-50 ${
                        link.type === 'feature' ? 'text-movex-blue hover:bg-movex-light' : 'text-gray-600'
                      }`}
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      {link.text}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Right side - Visual */}
            <div className="flex flex-col justify-center">
              {currentStepData.gif && (
                <div className="mb-4">
                  <img
                    src={currentStepData.gif}
                    alt={`${currentStepData.title} Demo`}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
              
              {/* Feature Preview Box */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border-2 border-dashed border-gray-200">
                <div className="text-center text-gray-500">
                  <div className="text-3xl mb-2">{currentStepData.emoji}</div>
                  <p className="text-sm font-medium">Feature Preview</p>
                  <p className="text-xs mt-1">Hier siehst du später eine<br />Live-Vorschau der Funktion</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center p-6 pt-0 border-t">
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
                className={`w-3 h-3 rounded-full transition-colors hover:scale-110 ${
                  index === currentStep
                    ? 'bg-movex-blue'
                    : index < currentStep
                    ? 'bg-blue-300 hover:bg-blue-400'
                    : 'bg-gray-200 hover:bg-gray-300'
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

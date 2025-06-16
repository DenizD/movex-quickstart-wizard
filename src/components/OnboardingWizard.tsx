
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
        className="fixed z-50 pointer-events-none border-2 border-[#0066CC] rounded-lg shadow-lg"
        style={{
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8,
          boxShadow: '0 0 0 4px rgba(0, 102, 204, 0.2)'
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

// Page-specific onboarding steps
const getOnboardingSteps = (currentPage: string): OnboardingStep[] => {
  switch (currentPage) {
    case 'overview':
      return [
        {
          id: 1,
          title: 'Willkommen bei MOVEX',
          description: 'Ihre Live Shopping Plattform für interaktive Verkaufserlebnisse. Hier bekommen Sie einen Überblick über alle wichtigen Metriken.',
          targetSelector: '[data-onboarding="overview-header"]'
        },
        {
          id: 2,
          title: 'Performance Dashboard',
          description: 'Verfolgen Sie Ihre wichtigsten KPIs wie Zuschauer, Conversion Rate und Engagement in Echtzeit.',
          targetSelector: '[data-onboarding="stats-cards"]'
        },
        {
          id: 3,
          title: 'Analytics Übersicht',
          description: 'Detaillierte Diagramme zeigen Ihnen die Performance Ihrer Shows über verschiedene Zeiträume.',
          targetSelector: '[data-onboarding="analytics-chart"]'
        },
        {
          id: 4,
          title: 'Schnellaktionen',
          description: 'Erstellen Sie neue Shows, Clips oder Media Libraries direkt von hier aus.',
          targetSelector: '[data-onboarding="quick-actions"]'
        }
      ];

    case 'shows':
      return [
        {
          id: 1,
          title: 'Show Management',
          description: 'Verwalten Sie alle Ihre Live Shopping Shows an einem Ort. Planen, starten und analysieren Sie Ihre Events.',
          targetSelector: '[data-onboarding="shows-header"]'
        },
        {
          id: 2,
          title: 'Show erstellen',
          description: 'Klicken Sie hier, um eine neue Live Shopping Show zu erstellen und zu planen.',
          targetSelector: '[data-onboarding="create-show-button"]'
        },
        {
          id: 3,
          title: 'Show Status',
          description: 'Hier sehen Sie den aktuellen Status Ihrer Shows - Live, Geplant oder Beendet.',
          targetSelector: '[data-onboarding="shows-tabs"]'
        },
        {
          id: 4,
          title: 'Show Verwaltung',
          description: 'Jede Show kann bearbeitet, dupliziert oder gelöscht werden über das Menü.',
          targetSelector: '[data-onboarding="shows-grid"]'
        }
      ];

    case 'create-show':
      return [
        {
          id: 1,
          title: 'Show erstellen',
          description: 'Hier erstellen Sie eine neue Live Shopping Show. Füllen Sie alle notwendigen Informationen aus.',
          targetSelector: '[data-onboarding="create-show-header"]'
        },
        {
          id: 2,
          title: 'Grundinformationen',
          description: 'Geben Sie den Namen und die Beschreibung Ihrer Show ein.',
          targetSelector: '[data-onboarding="show-basic-info"]'
        },
        {
          id: 3,
          title: 'Zeitplanung',
          description: 'Planen Sie Datum, Uhrzeit und Dauer Ihrer Live Show.',
          targetSelector: '[data-onboarding="show-schedule"]'
        },
        {
          id: 4,
          title: 'Show-Einstellungen',
          description: 'Konfigurieren Sie Chat, Warteraum und Aufzeichnungsoptionen.',
          targetSelector: '[data-onboarding="show-settings"]'
        },
        {
          id: 5,
          title: 'Vorschau & Aktionen',
          description: 'Sehen Sie eine Vorschau Ihrer Show und erstellen Sie sie final.',
          targetSelector: '[data-onboarding="show-preview"]'
        }
      ];

    case 'clips':
      return [
        {
          id: 1,
          title: 'Video Clips',
          description: 'Erstellen und verwalten Sie kurze, shoppable Videos für Ihre Produkte.',
          targetSelector: '[data-onboarding="clips-header"]'
        },
        {
          id: 2,
          title: 'Clip erstellen',
          description: 'Erstellen Sie neue Video Clips mit integrierten Shopping-Funktionen.',
          targetSelector: '[data-onboarding="create-clip-button"]'
        },
        {
          id: 3,
          title: 'Clip Status',
          description: 'Verfolgen Sie den Bearbeitungsstatus Ihrer Clips - Entwurf, Bereit oder Fehler.',
          targetSelector: '[data-onboarding="clips-tabs"]'
        },
        {
          id: 4,
          title: 'Clip Bibliothek',
          description: 'Alle Ihre Clips werden hier übersichtlich dargestellt mit Vorschau und Status.',
          targetSelector: '[data-onboarding="clips-grid"]'
        }
      ];

    case 'create-clip':
      return [
        {
          id: 1,
          title: 'Clip erstellen',
          description: 'Erstellen Sie einen neuen shoppable Video Clip. Laden Sie Ihr Video hoch und konfigurieren Sie es.',
          targetSelector: '[data-onboarding="create-clip-header"]'
        },
        {
          id: 2,
          title: 'Video hochladen',
          description: 'Laden Sie Ihr Video hoch oder ziehen Sie es in den Upload-Bereich.',
          targetSelector: '[data-onboarding="clip-upload"]'
        },
        {
          id: 3,
          title: 'Clip-Informationen',
          description: 'Geben Sie Name, Beschreibung und Tags für Ihren Clip ein.',
          targetSelector: '[data-onboarding="clip-basic-info"]'
        },
        {
          id: 4,
          title: 'Thumbnail auswählen',
          description: 'Wählen Sie ein ansprechendes Thumbnail für Ihren Clip.',
          targetSelector: '[data-onboarding="clip-thumbnail"]'
        },
        {
          id: 5,
          title: 'Clip-Einstellungen',
          description: 'Konfigurieren Sie Shopping-Features und Veröffentlichungsoptionen.',
          targetSelector: '[data-onboarding="clip-settings"]'
        }
      ];

    case 'media-library':
      return [
        {
          id: 1,
          title: 'Media Library',
          description: 'Organisieren Sie Ihre Inhalte in strukturierten Bibliotheken für bessere Übersicht.',
          targetSelector: '[data-onboarding="media-header"]'
        },
        {
          id: 2,
          title: 'Bibliothek erstellen',
          description: 'Erstellen Sie neue Media Libraries um Ihre Inhalte zu kategorisieren.',
          targetSelector: '[data-onboarding="create-library-button"]'
        },
        {
          id: 3,
          title: 'Content Organisation',
          description: 'Jede Bibliothek zeigt die Anzahl der enthaltenen Videos und kann einzeln verwaltet werden.',
          targetSelector: '[data-onboarding="library-table"]'
        }
      ];

    case 'create-media-library':
      return [
        {
          id: 1,
          title: 'Media Library erstellen',
          description: 'Erstellen Sie eine neue Bibliothek zur Organisation Ihrer Video-Inhalte.',
          targetSelector: '[data-onboarding="create-library-header"]'
        },
        {
          id: 2,
          title: 'Grundinformationen',
          description: 'Geben Sie Name, Beschreibung und Kategorie für Ihre Bibliothek ein.',
          targetSelector: '[data-onboarding="library-basic-info"]'
        },
        {
          id: 3,
          title: 'Datenschutz & Zugriff',
          description: 'Bestimmen Sie, wer Zugriff auf diese Bibliothek haben soll.',
          targetSelector: '[data-onboarding="library-privacy"]'
        },
        {
          id: 4,
          title: 'Organisations-Einstellungen',
          description: 'Konfigurieren Sie, wie Inhalte automatisch organisiert werden sollen.',
          targetSelector: '[data-onboarding="library-organization"]'
        }
      ];

    case 'users':
      return [
        {
          id: 1,
          title: 'Team Verwaltung',
          description: 'Verwalten Sie Teammitglieder und deren Berechtigungen für Ihre MOVEX Plattform.',
          targetSelector: '[data-onboarding="users-header"]'
        },
        {
          id: 2,
          title: 'Benutzer einladen',
          description: 'Laden Sie neue Teammitglieder ein und weisen Sie ihnen Rollen zu.',
          targetSelector: '[data-onboarding="invite-user-button"]'
        },
        {
          id: 3,
          title: 'Team Übersicht',
          description: 'Hier sehen Sie alle Teammitglieder mit ihren Rollen und Berechtigungen.',
          targetSelector: '[data-onboarding="users-list"]'
        }
      ];

    case 'analytics':
      return [
        {
          id: 1,
          title: 'Detaillierte Analytics',
          description: 'Analysieren Sie die Performance Ihrer Shows mit umfassenden Metriken und Insights.',
          targetSelector: '[data-onboarding="analytics-header"]'
        },
        {
          id: 2,
          title: 'Performance Metriken',
          description: 'Verfolgen Sie wichtige KPIs wie Zuschauerzahlen, Engagement und Conversion Rates.',
          targetSelector: '[data-onboarding="analytics-cards"]'
        },
        {
          id: 3,
          title: 'Zeitraum Analyse',
          description: 'Analysieren Sie Trends über verschiedene Zeiträume - täglich, wöchentlich oder monatlich.',
          targetSelector: '[data-onboarding="analytics-charts"]'
        }
      ];

    case 'customisation':
      return [
        {
          id: 1,
          title: 'Plattform Anpassung',
          description: 'Personalisieren Sie Ihre MOVEX Plattform nach Ihren Bedürfnissen und Ihrem Branding.',
          targetSelector: '[data-onboarding="customisation-header"]'
        },
        {
          id: 2,
          title: 'Design Einstellungen',
          description: 'Passen Sie Farben, Logos und das Layout Ihrer Live Shopping Erfahrung an.',
          targetSelector: '[data-onboarding="design-settings"]'
        },
        {
          id: 3,
          title: 'Funktionen konfigurieren',
          description: 'Aktivieren oder deaktivieren Sie spezifische Features je nach Ihren Anforderungen.',
          targetSelector: '[data-onboarding="feature-settings"]'
        }
      ];

    default:
      return [
        {
          id: 1,
          title: 'Willkommen bei MOVEX',
          description: 'Entdecken Sie die Möglichkeiten der Live Shopping Plattform.',
        }
      ];
  }
};

interface OnboardingWizardProps {
  onComplete: () => void;
  currentPage: string;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete, currentPage }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  const onboardingSteps = getOnboardingSteps(currentPage);

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
              <div className="w-2 h-2 bg-[#0066CC] rounded-full animate-pulse"></div>
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0066CC] rounded-xl flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded-sm"></div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">MOVEX Tour</h3>
                  <p className="text-sm text-gray-500">Schritt {currentStep + 1} von {onboardingSteps.length}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleMinimize}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                >
                  <Minimize2 size={16} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleSkip}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            {/* Progress */}
            <div className="px-6 pt-4">
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-[#0066CC] h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h4 className="text-xl font-bold mb-4 text-gray-900">{currentStepData.title}</h4>
              <p className="text-gray-600 leading-relaxed text-base">{currentStepData.description}</p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-50 bg-white rounded-b-2xl">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2 border-gray-200 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft size={16} />
                Zurück
              </Button>

              <div className="flex gap-2">
                {onboardingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? 'bg-[#0066CC] scale-125'
                        : index < currentStep
                        ? 'bg-[#0066CC] opacity-60'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                className="flex items-center gap-2 bg-[#0066CC] hover:bg-[#0052A3] text-white px-6"
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

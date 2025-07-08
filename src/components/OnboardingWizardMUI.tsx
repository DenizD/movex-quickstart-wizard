
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  LinearProgress,
  IconButton,
  Paper,
  Backdrop
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Close,
  Minimize,
  Maximize
} from '@mui/icons-material';
import { useLanguage } from '@/hooks/useLanguage';

// Constants for consistent styling
const THEME_COLORS = {
  primary: '#0066CC',
  primaryHover: '#0052A3',
  primaryLight: 'rgba(0, 102, 204, 0.2)',
  primaryMedium: 'rgba(0, 102, 204, 0.6)',
  backdrop: 'rgba(0, 0, 0, 0.4)'
} as const;

interface HighlightBoxProps {
  targetSelector?: string;
  isActive: boolean;
}

const HighlightBox: React.FC<HighlightBoxProps> = ({ targetSelector, isActive }) => {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (isActive && targetSelector) {
      try {
        const element = document.querySelector(targetSelector);
        if (element) {
          const domRect = element.getBoundingClientRect();
          setRect(domRect);
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          console.warn(`OnboardingWizard: Element with selector "${targetSelector}" not found`);
          setRect(null);
        }
      } catch (error) {
        console.error(`OnboardingWizard: Error selecting element "${targetSelector}":`, error);
        setRect(null);
      }
    } else {
      setRect(null);
    }
  }, [targetSelector, isActive]);

  if (!isActive || !rect) return null;

  return (
    <>
      <Backdrop
        open={true}
        sx={{ 
          bgcolor: THEME_COLORS.backdrop,
          zIndex: 1299
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8,
          border: `2px solid ${THEME_COLORS.primary}`,
          borderRadius: 1,
          boxShadow: `0 0 0 4px ${THEME_COLORS.primaryLight}`,
          pointerEvents: 'none',
          zIndex: 1300
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

// Complete MOVEX Live Shopping onboarding steps with knowledge base content
const getOnboardingSteps = (currentPage: string, t: (key: string) => string): OnboardingStep[] => {
  // Complete onboarding flow for all pages
  const completeOnboardingSteps = [
    {
      id: 1,
      title: 'Willkommen bei MOVEX Live Shopping!',
      description: 'Willkommen auf Ihrer neuen Plattform für Live Shopping, shoppable Clips und interaktiven Videokommerz. In wenigen Schritten richten Sie Ihr erstes Event ein und entdecken alle Funktionen.',
      targetSelector: '[data-onboarding="welcome"]'
    },
    {
      id: 2,
      title: 'Ihr Profil & Unternehmen',
      description: 'Hinterlegen Sie Ihren Namen und Ihre Firmeninformationen. Laden Sie Ihr Logo und Branding-Elemente hoch, damit Ihre Shows im eigenen Look erscheinen. Diese Einstellungen können Sie jederzeit im Bereich "Company Settings" anpassen.',
      targetSelector: '[data-onboarding="company-settings"]'
    },
    {
      id: 3,
      title: 'Ihre erste Show erstellen',
      description: 'Klicken Sie auf "Neue Show erstellen". Geben Sie Titel, Beschreibung und Startzeit an. Fügen Sie ein Coverbild hinzu, um Ihre Show hervorzuheben. Shows ermöglichen Live-Streaming mit interaktiven Produktpräsentationen.',
      targetSelector: '[data-onboarding="create-show"]'
    },
    {
      id: 4,
      title: 'Produkte für Ihre Show',
      description: 'Fügen Sie Produkte über deren PDP-URLs hinzu. Die Produktdetails (Thumbnail, Name, Brand) werden automatisch geladen. Sie können bis zu 3 Produkte gleichzeitig während einer Live-Show hervorheben.',
      targetSelector: '[data-onboarding="products"]'
    },
    {
      id: 5,
      title: 'Clips & Media Library',
      description: 'Erstellen Sie kurze, shoppable Clips mit Drag & Drop Video-Upload. Die Media Library organisiert Shows und Clips in Playlists. Clips können nur über Media Libraries integriert werden.',
      targetSelector: '[data-onboarding="media-library"]'
    },
    {
      id: 6,
      title: 'Ihr Team onboarden',
      description: 'Laden Sie Kolleg:innen per E-Mail ein und weisen Sie Rollen zu: Admin (volle Kontrolle), Session Manager (Shows verwalten), Host (streamen), Analytics (Berichte ansehen). Rollen können jederzeit angepasst werden.',
      targetSelector: '[data-onboarding="users"]'
    },
    {
      id: 7,
      title: 'Streaming & Multistreaming',
      description: 'Sie können direkt über die MOVEX App streamen oder externe Tools wie OBS nutzen. Multistreaming ermöglicht gleichzeitiges Streamen zu bis zu 3 Plattformen (YouTube, Facebook, Instagram). Shows müssen mindestens 15 Minuten im Voraus geplant werden.',
      targetSelector: '[data-onboarding="streaming"]'
    },
    {
      id: 8,
      title: 'Analytics & Erfolg messen',
      description: 'Analysieren Sie wichtige KPIs: Zuschauerzahlen, qualifizierte Viewer (>10s), durchschnittliche Sehzeit, Chat-Interaktionen und Produkt-Klicks. Verfolgen Sie Live- und VoD-Performance getrennt.',
      targetSelector: '[data-onboarding="analytics"]'
    },
    {
      id: 9,
      title: 'Hilfe & Support verfügbar',
      description: 'Der umfassende User Guide, FAQs und Video-Tutorials sind jederzeit über das Hilfemenü erreichbar. Bei Fragen steht Ihnen unser Support-Team per Chat oder Ticket zur Verfügung. Nutzen Sie die 2-Faktor-Authentifizierung für zusätzliche Sicherheit.',
      targetSelector: '[data-onboarding="support"]'
    }
  ];

  switch (currentPage) {
    case 'overview':
      return completeOnboardingSteps.slice(0, 4); // Show first 4 steps on overview
    case 'shows':
      return [
        completeOnboardingSteps[0], // Welcome
        completeOnboardingSteps[2], // Create show 
        completeOnboardingSteps[3], // Products
        completeOnboardingSteps[6]  // Streaming
      ]; // Show creation focused
    case 'clips':
      return [completeOnboardingSteps[4]]; // Clips focused
    case 'media-library':
      return [completeOnboardingSteps[4]]; // Media library focused
    case 'users':
      return [completeOnboardingSteps[5]]; // Users focused
    case 'analytics':
      return [completeOnboardingSteps[7]]; // Analytics focused
    case 'customisation':
      return [completeOnboardingSteps[1]]; // Company settings focused
    default:
      return completeOnboardingSteps; // Complete flow for general onboarding
  }
};

interface OnboardingWizardMUIProps {
  onComplete: () => void;
  currentPage: string;
}

const OnboardingWizardMUI: React.FC<OnboardingWizardMUIProps> = ({ onComplete, currentPage }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const { t } = useLanguage();

  const onboardingSteps = getOnboardingSteps(currentPage, t);

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

  const dialogId = 'onboarding-wizard-dialog';
  const titleId = 'onboarding-wizard-title';
  const descriptionId = 'onboarding-wizard-description';

  return (
    <>
      <HighlightBox 
        targetSelector={currentStepData?.targetSelector} 
        isActive={!isMinimized && !!currentStepData?.targetSelector}
      />

      {isMinimized && (
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1400,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            borderRadius: 2
          }}
          role="dialog"
          aria-labelledby="minimized-tour-label"
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                bgcolor: THEME_COLORS.primary,
                borderRadius: '50%',
                '@keyframes pulse': {
                  '0%': { opacity: 1, transform: 'scale(1)' },
                  '50%': { opacity: 0.5, transform: 'scale(1.1)' },
                  '100%': { opacity: 1, transform: 'scale(1)' }
                },
                animation: 'pulse 2s infinite'
              }}
            />
            <Typography 
              variant="body2" 
              fontWeight={500}
              id="minimized-tour-label"
            >
              MOVEX Tour running
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={handleMinimize}
            sx={{ color: 'text.secondary' }}
            aria-label="Tour maximieren"
          >
            <Maximize />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleSkip}
            sx={{ color: 'text.secondary' }}
            aria-label="Tour beenden"
          >
            <Close />
          </IconButton>
        </Paper>
      )}

      {!isMinimized && (
        <Dialog
          open={true}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              boxShadow: 24
            }
          }}
          sx={{ zIndex: 1400 }}
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          id={dialogId}
        >
          {/* Header */}
          <DialogTitle sx={{ p: 3, pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: THEME_COLORS.primary,
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  aria-hidden="true"
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      bgcolor: 'white',
                      borderRadius: 0.5
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold" id={titleId}>
                    MOVEX Tour
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Schritt {currentStep + 1} von {onboardingSteps.length}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton
                  size="small"
                  onClick={handleMinimize}
                  sx={{ color: 'text.secondary' }}
                  aria-label="Tour minimieren"
                >
                  <Minimize />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleSkip}
                  sx={{ color: 'text.secondary' }}
                  aria-label="Tour beenden"
                >
                  <Close />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>

          {/* Progress */}
          <Box sx={{ px: 3 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'grey.100',
                '& .MuiLinearProgress-bar': {
                  bgcolor: THEME_COLORS.primary,
                  borderRadius: 4
                }
              }}
              aria-label={`Fortschritt: ${Math.round(progress)}%`}
            />
          </Box>

          {/* Content */}
          <DialogContent sx={{ p: 3 }}>
            <Typography variant="h5" component="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
              {currentStepData?.title}
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ lineHeight: 1.6 }}
              id={descriptionId}
            >
              {currentStepData?.description}
            </Typography>
          </DialogContent>

          {/* Footer */}
          <DialogActions sx={{ p: 3, bgcolor: 'grey.50', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              startIcon={<ChevronLeft />}
              sx={{ borderColor: 'grey.300' }}
              aria-label="Vorheriger Schritt"
            >
              {t('action.back')}
            </Button>

            <Box sx={{ display: 'flex', gap: 0.5 }} role="progressbar" aria-label="Schritt-Indikator">
              {onboardingSteps.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: index === currentStep 
                      ? THEME_COLORS.primary 
                      : index < currentStep 
                      ? THEME_COLORS.primaryMedium 
                      : 'grey.300',
                    transform: index === currentStep ? 'scale(1.25)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}
                  aria-label={`Schritt ${index + 1}${index === currentStep ? ' (aktuell)' : index < currentStep ? ' (abgeschlossen)' : ''}`}
                />
              ))}
            </Box>

            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={!isLastStep && <ChevronRight />}
              sx={{
                bgcolor: THEME_COLORS.primary,
                '&:hover': { bgcolor: THEME_COLORS.primaryHover },
                px: 3
              }}
              aria-label={isLastStep ? "Tour abschließen" : "Nächster Schritt"}
            >
              {isLastStep ? t('action.finish') : t('action.next')}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default OnboardingWizardMUI;

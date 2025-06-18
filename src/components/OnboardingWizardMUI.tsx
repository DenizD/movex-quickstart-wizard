
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
      <Backdrop
        open={true}
        sx={{ 
          bgcolor: 'rgba(0, 0, 0, 0.4)',
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
          border: '2px solid #0066CC',
          borderRadius: 1,
          boxShadow: '0 0 0 4px rgba(0, 102, 204, 0.2)',
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

// Page-specific onboarding steps with translation support
const getOnboardingSteps = (currentPage: string, t: (key: string) => string): OnboardingStep[] => {
  switch (currentPage) {
    case 'overview':
      return [
        {
          id: 1,
          title: t('wizard.welcome.title'),
          description: t('wizard.welcome.description'),
          targetSelector: '[data-onboarding="overview-header"]'
        },
        {
          id: 2,
          title: t('wizard.performance.title'),
          description: t('wizard.performance.description'),
          targetSelector: '[data-onboarding="stats-cards"]'
        },
        {
          id: 3,
          title: t('wizard.analytics.title'),
          description: t('wizard.analytics.description'),
          targetSelector: '[data-onboarding="analytics-chart"]'
        },
        {
          id: 4,
          title: t('wizard.quickActions.title'),
          description: t('wizard.quickActions.description'),
          targetSelector: '[data-onboarding="quick-actions"]'
        }
      ];

    default:
      return [
        {
          id: 1,
          title: t('wizard.welcome.title'),
          description: t('wizard.welcome.description'),
        }
      ];
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

  return (
    <>
      <HighlightBox 
        targetSelector={currentStepData.targetSelector || ''} 
        isActive={!isMinimized && !!currentStepData.targetSelector}
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
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                bgcolor: '#0066CC',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}
            />
            <Typography variant="body2" fontWeight={500}>
              MOVEX Tour running
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={handleMinimize}
            sx={{ color: 'text.secondary' }}
          >
            <Maximize />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleSkip}
            sx={{ color: 'text.secondary' }}
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
        >
          {/* Header */}
          <DialogTitle sx={{ p: 3, pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: '#0066CC',
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
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
                  <Typography variant="h6" fontWeight="bold">
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
                >
                  <Minimize />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleSkip}
                  sx={{ color: 'text.secondary' }}
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
                  bgcolor: '#0066CC',
                  borderRadius: 4
                }
              }}
            />
          </Box>

          {/* Content */}
          <DialogContent sx={{ p: 3 }}>
            <Typography variant="h5" component="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
              {currentStepData.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {currentStepData.description}
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
            >
              {t('action.back')}
            </Button>

            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {onboardingSteps.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: index === currentStep 
                      ? '#0066CC' 
                      : index < currentStep 
                      ? 'rgba(0, 102, 204, 0.6)' 
                      : 'grey.300',
                    transform: index === currentStep ? 'scale(1.25)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Box>

            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={!isLastStep && <ChevronRight />}
              sx={{
                bgcolor: '#0066CC',
                '&:hover': { bgcolor: '#0052A3' },
                px: 3
              }}
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

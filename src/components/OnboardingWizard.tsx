
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, X, Minimize2, Maximize2 } from 'lucide-react';
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

    case 'shows':
      return [
        {
          id: 1,
          title: 'Show Management',
          description: 'Manage all your Live Shopping shows in one place. Plan, start and analyze your events.',
          targetSelector: '[data-onboarding="shows-header"]'
        },
        {
          id: 2,
          title: 'Create Show',
          description: 'Click here to create and schedule a new Live Shopping show.',
          targetSelector: '[data-onboarding="create-show-button"]'
        },
        {
          id: 3,
          title: 'Show Status',
          description: 'Here you can see the current status of your shows - Live, Scheduled or Ended.',
          targetSelector: '[data-onboarding="shows-tabs"]'
        },
        {
          id: 4,
          title: 'Show Management',
          description: 'Each show can be edited, duplicated or deleted via the menu.',
          targetSelector: '[data-onboarding="shows-grid"]'
        }
      ];

    case 'create-show':
      return [
        {
          id: 1,
          title: 'Create Show',
          description: 'Here you create a new Live Shopping show. Fill in all necessary information.',
          targetSelector: '[data-onboarding="create-show-header"]'
        },
        {
          id: 2,
          title: 'Basic Information',
          description: 'Enter the name and description of your show.',
          targetSelector: '[data-onboarding="show-basic-info"]'
        },
        {
          id: 3,
          title: 'Scheduling',
          description: 'Plan the date, time and duration of your live show.',
          targetSelector: '[data-onboarding="show-schedule"]'
        },
        {
          id: 4,
          title: 'Show Settings',
          description: 'Configure chat, waiting room and recording options.',
          targetSelector: '[data-onboarding="show-settings"]'
        },
        {
          id: 5,
          title: 'Preview & Actions',
          description: 'See a preview of your show and create it.',
          targetSelector: '[data-onboarding="show-preview"]'
        }
      ];

    case 'clips':
      return [
        {
          id: 1,
          title: 'Video Clips',
          description: 'Create and manage short, shoppable videos for your products.',
          targetSelector: '[data-onboarding="clips-header"]'
        },
        {
          id: 2,
          title: 'Create Clip',
          description: 'Create new video clips with integrated shopping features.',
          targetSelector: '[data-onboarding="create-clip-button"]'
        },
        {
          id: 3,
          title: 'Clip Status',
          description: 'Track the editing status of your clips - Draft, Ready or Error.',
          targetSelector: '[data-onboarding="clips-tabs"]'
        },
        {
          id: 4,
          title: 'Clip Library',
          description: 'All your clips are displayed here clearly with preview and status.',
          targetSelector: '[data-onboarding="clips-grid"]'
        }
      ];

    case 'create-clip':
      return [
        {
          id: 1,
          title: 'Create Clip',
          description: 'Create a new shoppable video clip. Upload your video and configure it.',
          targetSelector: '[data-onboarding="create-clip-header"]'
        },
        {
          id: 2,
          title: 'Upload Video',
          description: 'Upload your video or drag it into the upload area.',
          targetSelector: '[data-onboarding="clip-upload"]'
        },
        {
          id: 3,
          title: 'Clip Information',
          description: 'Enter name, description and tags for your clip.',
          targetSelector: '[data-onboarding="clip-basic-info"]'
        },
        {
          id: 4,
          title: 'Select Thumbnail',
          description: 'Choose an appealing thumbnail for your clip.',
          targetSelector: '[data-onboarding="clip-thumbnail"]'
        },
        {
          id: 5,
          title: 'Clip Settings',
          description: 'Configure shopping features and publishing options.',
          targetSelector: '[data-onboarding="clip-settings"]'
        }
      ];

    case 'media-library':
      return [
        {
          id: 1,
          title: 'Media Library',
          description: 'Organize your content in structured libraries for better overview.',
          targetSelector: '[data-onboarding="media-header"]'
        },
        {
          id: 2,
          title: 'Create Library',
          description: 'Create new Media Libraries to categorize your content.',
          targetSelector: '[data-onboarding="create-library-button"]'
        },
        {
          id: 3,
          title: 'Content Organization',
          description: 'Each library shows the number of contained videos and can be managed individually.',
          targetSelector: '[data-onboarding="library-table"]'
        }
      ];

    case 'create-media-library':
      return [
        {
          id: 1,
          title: 'Create Media Library',
          description: 'Create a new library to organize your video content.',
          targetSelector: '[data-onboarding="create-library-header"]'
        },
        {
          id: 2,
          title: 'Basic Information',
          description: 'Enter name, description and category for your library.',
          targetSelector: '[data-onboarding="library-basic-info"]'
        },
        {
          id: 3,
          title: 'Privacy & Access',
          description: 'Determine who should have access to this library.',
          targetSelector: '[data-onboarding="library-privacy"]'
        },
        {
          id: 4,
          title: 'Organization Settings',
          description: 'Configure how content should be automatically organized.',
          targetSelector: '[data-onboarding="library-organization"]'
        }
      ];

    case 'users':
      return [
        {
          id: 1,
          title: 'Team Management',
          description: 'Manage team members and their permissions for your MOVEX platform.',
          targetSelector: '[data-onboarding="users-header"]'
        },
        {
          id: 2,
          title: 'Invite Users',
          description: 'Invite new team members and assign roles to them.',
          targetSelector: '[data-onboarding="invite-user-button"]'
        },
        {
          id: 3,
          title: 'Team Overview',
          description: 'Here you see all team members with their roles and permissions.',
          targetSelector: '[data-onboarding="users-list"]'
        }
      ];

    case 'analytics':
      return [
        {
          id: 1,
          title: 'Detailed Analytics',
          description: 'Analyze the performance of your shows with comprehensive metrics and insights.',
          targetSelector: '[data-onboarding="analytics-header"]'
        },
        {
          id: 2,
          title: 'Performance Metrics',
          description: 'Track important KPIs like viewer numbers, engagement and conversion rates.',
          targetSelector: '[data-onboarding="analytics-cards"]'
        },
        {
          id: 3,
          title: 'Time Period Analysis',
          description: 'Analyze trends over different time periods - daily, weekly or monthly.',
          targetSelector: '[data-onboarding="analytics-charts"]'
        }
      ];

    case 'customisation':
      return [
        {
          id: 1,
          title: 'Platform Customization',
          description: 'Personalize your MOVEX platform according to your needs and branding.',
          targetSelector: '[data-onboarding="customisation-header"]'
        },
        {
          id: 2,
          title: 'Design Settings',
          description: 'Customize colors, logos and the layout of your Live Shopping experience.',
          targetSelector: '[data-onboarding="design-settings"]'
        },
        {
          id: 3,
          title: 'Configure Features',
          description: 'Enable or disable specific features according to your requirements.',
          targetSelector: '[data-onboarding="feature-settings"]'
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

interface OnboardingWizardProps {
  onComplete: () => void;
  currentPage: string;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete, currentPage }) => {
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
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-4 flex items-center gap-3 border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#0066CC] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-900">MOVEX Tour running</span>
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
                  <p className="text-sm text-gray-500">Step {currentStep + 1} of {onboardingSteps.length}</p>
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
                {t('action.back')}
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
                {isLastStep ? t('action.finish') : t('action.next')}
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

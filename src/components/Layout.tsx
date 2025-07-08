
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useLanguage } from '@/hooks/useLanguage';
import Sidebar from './Sidebar';
import OnboardingWizardMUI from './OnboardingWizardMUI';
import LanguageSelector from './LanguageSelector';
import CompleteOnboarding from './CompleteOnboarding';
import WelcomeModal from './onboarding/WelcomeModal';
import FloatingActionButton from './onboarding/FloatingActionButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { shouldShowOnboarding, completeOnboarding, currentPage } = useOnboarding();
  const { t } = useLanguage();
  const [showWizard, setShowWizard] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  // Show welcome modal for first-time users
  useEffect(() => {
    if (shouldShowOnboarding && !hasSeenWelcome) {
      const hasSeenWelcomeBefore = localStorage.getItem('movex_welcome_seen');
      if (!hasSeenWelcomeBefore) {
        setShowWelcomeModal(true);
      } else {
        setHasSeenWelcome(true);
      }
    }
  }, [shouldShowOnboarding, hasSeenWelcome]);

  const handleStartTour = () => {
    setShowWizard(true);
  };

  const handleCompleteTour = () => {
    setShowWizard(false);
    if (shouldShowOnboarding) {
      completeOnboarding();
    }
  };

  const handleWelcomeClose = () => {
    setShowWelcomeModal(false);
    setHasSeenWelcome(true);
    localStorage.setItem('movex_welcome_seen', 'true');
  };

  const handleStartOnboardingFromWelcome = () => {
    setShowWelcomeModal(false);
    setHasSeenWelcome(true);
    setShowWizard(true);
    localStorage.setItem('movex_welcome_seen', 'true');
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          {/* Header with Tour Button and Language Selector */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <div></div>
              <div className="flex items-center gap-4">
                <LanguageSelector />
                <Button
                  onClick={handleStartTour}
                  variant="outline"
                  size="sm"
                  className="text-[#0066CC] border-[#0066CC] hover:bg-[#0066CC] hover:text-white transition-colors"
                >
                  {t('action.startTour')}
                </Button>
              </div>
            </div>
          </div>
          
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Welcome Modal for new users */}
      <WelcomeModal 
        isOpen={showWelcomeModal}
        onClose={handleWelcomeClose}
        onStartOnboarding={handleStartOnboardingFromWelcome}
      />

      {/* Show wizard if it should be shown initially or manually triggered */}
      {showWizard && (
        <OnboardingWizardMUI onComplete={handleCompleteTour} currentPage={currentPage} />
      )}

      {/* Floating Action Button - Always visible except during onboarding wizard */}
      <FloatingActionButton 
        onClick={handleStartTour}
        isVisible={!showWizard && !showWelcomeModal}
      />

      {/* Global Onboarding Component */}
      <CompleteOnboarding />
    </>
  );
};

export default Layout;

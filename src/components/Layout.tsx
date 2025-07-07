
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useLanguage } from '@/hooks/useLanguage';
import Sidebar from './Sidebar';
import OnboardingWizardMUI from './OnboardingWizardMUI';
import LanguageSelector from './LanguageSelector';
import CompleteOnboarding from './CompleteOnboarding';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { shouldShowOnboarding, completeOnboarding, currentPage } = useOnboarding();
  const { t } = useLanguage();
  const [showWizard, setShowWizard] = useState(false);

  const handleStartTour = () => {
    setShowWizard(true);
  };

  const handleCompleteTour = () => {
    setShowWizard(false);
    if (shouldShowOnboarding) {
      completeOnboarding();
    }
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

      {/* Show wizard if it should be shown initially or manually triggered */}
      {(shouldShowOnboarding || showWizard) && (
        <OnboardingWizardMUI onComplete={handleCompleteTour} currentPage={currentPage} />
      )}

      {/* Global Onboarding Component */}
      <CompleteOnboarding />
    </>
  );
};

export default Layout;

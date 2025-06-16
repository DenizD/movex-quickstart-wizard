
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/hooks/useOnboarding';
import Sidebar from './Sidebar';
import OnboardingWizard from './OnboardingWizard';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { shouldShowOnboarding, completeOnboarding, currentPage } = useOnboarding();
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
          {/* Header with Tour Button */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex justify-end">
              <Button
                onClick={handleStartTour}
                variant="outline"
                size="sm"
                className="text-[#0066CC] border-[#0066CC] hover:bg-[#0066CC] hover:text-white transition-colors"
              >
                Tour starten
              </Button>
            </div>
          </div>
          
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Show wizard if it should be shown initially or manually triggered */}
      {(shouldShowOnboarding || showWizard) && (
        <OnboardingWizard onComplete={handleCompleteTour} currentPage={currentPage} />
      )}
    </>
  );
};

export default Layout;

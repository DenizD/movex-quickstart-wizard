
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/hooks/useOnboarding';
import Sidebar from './Sidebar';
import OnboardingWizard from './OnboardingWizard';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { shouldShowOnboarding, completeOnboarding, resetOnboarding } = useOnboarding();
  const [showWizard, setShowWizard] = useState(false);

  const handleStartTour = () => {
    setShowWizard(true);
  };

  const handleCompleteTour = () => {
    setShowWizard(false);
    completeOnboarding();
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
                className="text-teal-600 border-teal-600 hover:bg-teal-50"
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
        <OnboardingWizard onComplete={handleCompleteTour} />
      )}
    </>
  );
};

export default Layout;

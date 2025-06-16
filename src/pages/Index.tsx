
import React from 'react';
import { useOnboarding } from '@/hooks/useOnboarding';
import OnboardingWizard from '@/components/OnboardingWizard';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const { shouldShowOnboarding, isLoading, completeOnboarding, resetOnboarding } = useOnboarding();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-movex-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">MOVEX | Live Shopping wird geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Dashboard onResetOnboarding={resetOnboarding} />
      {shouldShowOnboarding && (
        <OnboardingWizard onComplete={completeOnboarding} />
      )}
    </>
  );
};

export default Index;

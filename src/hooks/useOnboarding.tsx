
import { useState, useEffect } from 'react';

export const useOnboarding = () => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if onboarding has been completed
    const onboardingCompleted = localStorage.getItem('movex_onboarding_completed');
    
    // Simulate checking if this is the user's first login
    // In a real app, this would come from your authentication system
    const isFirstLogin = !onboardingCompleted;
    
    setShouldShowOnboarding(isFirstLogin);
    setIsLoading(false);
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem('movex_onboarding_completed', 'true');
    setShouldShowOnboarding(false);
  };

  const resetOnboarding = () => {
    localStorage.removeItem('movex_onboarding_completed');
    setShouldShowOnboarding(true);
  };

  return {
    shouldShowOnboarding,
    isLoading,
    completeOnboarding,
    resetOnboarding
  };
};

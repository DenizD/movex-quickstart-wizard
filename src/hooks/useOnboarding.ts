
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useOnboarding = () => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

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

  const getCurrentPageName = () => {
    const path = location.pathname;
    switch (path) {
      case '/': return 'overview';
      case '/shows': return 'shows';
      case '/clips': return 'clips';
      case '/media-library': return 'media-library';
      case '/users': return 'users';
      case '/analytics': return 'analytics';
      case '/customisation': return 'customisation';
      default: return 'overview';
    }
  };

  return {
    shouldShowOnboarding,
    isLoading,
    completeOnboarding,
    resetOnboarding,
    currentPage: getCurrentPageName()
  };
};

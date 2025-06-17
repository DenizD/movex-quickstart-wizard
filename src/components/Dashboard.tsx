
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus,
  BookOpen
} from 'lucide-react';
import EducationHub from './EducationHub';
import WelcomeModal from './onboarding/WelcomeModal';
import OnboardingTiles from './onboarding/OnboardingTiles';
import ContextualHelp from './help/ContextualHelp';
import { useLanguage } from '@/hooks/useLanguage';

const Dashboard = () => {
  const [isEducationHubOpen, setIsEducationHubOpen] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [userOnboardingState, setUserOnboardingState] = useState({
    videoUploaded: false,
    planSubscribed: false,
    showCreated: false,
    minutesTested: false,
    selectedFocus: ''
  });
  const { t } = useLanguage();

  // Check for first login
  useEffect(() => {
    const isFirstLogin = localStorage.getItem('movex_first_login_completed') !== 'true';
    if (isFirstLogin) {
      setShowWelcomeModal(true);
    }

    // Load onboarding status
    const savedState = localStorage.getItem('movex_onboarding_state');
    if (savedState) {
      setUserOnboardingState(JSON.parse(savedState));
    }
  }, []);

  const handleWelcomeComplete = (focus: string) => {
    localStorage.setItem('movex_first_login_completed', 'true');
    setUserOnboardingState(prev => ({ ...prev, selectedFocus: focus }));
    setShowWelcomeModal(false);
  };

  const handleOnboardingAction = (actionType: string) => {
    const newState = { ...userOnboardingState };
    
    switch (actionType) {
      case 'upload':
        newState.videoUploaded = true;
        break;
      case 'subscribe':
        newState.planSubscribed = true;
        break;
      case 'show':
        newState.showCreated = true;
        break;
      case 'test-minutes':
        newState.minutesTested = true;
        break;
    }
    
    setUserOnboardingState(newState);
    localStorage.setItem('movex_onboarding_state', JSON.stringify(newState));
  };

  const onboardingSteps = [
    {
      id: 'upload',
      title: 'Video hochladen',
      description: 'Laden Sie Ihr erstes Video hoch und erstellen Sie shoppable Content',
      icon: Plus,
      completed: userOnboardingState.videoUploaded,
      action: 'Jetzt hochladen',
      onClick: () => handleOnboardingAction('upload')
    },
    {
      id: 'subscribe',
      title: 'Plan abonnieren',
      description: 'Wählen Sie einen Plan und erhalten Sie mehr Minuten für Live Shopping',
      icon: Plus,
      completed: userOnboardingState.planSubscribed,
      action: 'Plan wählen',
      onClick: () => handleOnboardingAction('subscribe')
    },
    {
      id: 'show',
      title: 'Show erstellen',
      description: 'Planen Sie Ihre erste Live Shopping Show mit Produktintegration',
      icon: Plus,
      completed: userOnboardingState.showCreated,
      action: 'Show planen',
      onClick: () => handleOnboardingAction('show')
    },
    {
      id: 'test',
      title: 'Minuten testen',
      description: 'Nutzen Sie Ihre kostenlosen Test-Minuten und probieren Sie alle Features aus',
      icon: Plus,
      completed: userOnboardingState.minutesTested,
      action: 'Jetzt testen',
      onClick: () => handleOnboardingAction('test-minutes')
    }
  ];

  const completedSteps = onboardingSteps.filter(step => step.completed).length;
  const showOnboardingTiles = completedSteps < onboardingSteps.length;

  return (
    <>
      <div className="bg-white min-h-screen">
        {/* No Plan Warning Bar */}
        <div className="bg-yellow-100 border-b border-yellow-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <span className="text-sm text-gray-900">You have no plan activated. Please activate a plan to access the features.</span>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2">
              Buy a Plan
            </Button>
          </div>
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome back, Deniz (OSP)</h1>
            {userOnboardingState.selectedFocus && (
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700">
                  🎯 Fokus: {userOnboardingState.selectedFocus}
                </span>
              </div>
            )}
          </div>

          {/* Start creating content section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Start creating content</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* New show */}
              <Card className="border border-gray-200 hover:border-gray-300 transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-medium text-gray-900 mb-2">New show</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Plan your next show and connect them directly to your product pages.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    Unlock the Shows Module
                  </Button>
                </CardContent>
              </Card>

              {/* New Clip */}
              <Card className="border border-gray-200 hover:border-gray-300 transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-medium text-gray-900 mb-2">New Clip</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Advertise your products with short and direct videos that are easily integrable.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    Unlock the Clips Module
                  </Button>
                </CardContent>
              </Card>

              {/* New Media Library */}
              <Card className="border border-gray-200 hover:border-gray-300 transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-medium text-gray-900 mb-2">New Media Library</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Display your videos on your website and generate more leads.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    Unlock the Media Library Module
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Onboarding Tiles - only show if not completed */}
          {showOnboardingTiles && (
            <OnboardingTiles steps={onboardingSteps} />
          )}

          {/* Recent Shows */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Shows</h2>
            <div className="text-center py-12 text-gray-500">
              <p>No shows yet. Create your first show to get started!</p>
            </div>
          </div>

          {/* Recent Clips */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Clips</h2>
            <div className="text-center py-12 text-gray-500">
              <p>No clips yet. Create your first clip to get started!</p>
            </div>
          </div>

          {/* Top Performing Videos */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Top Performing Videos</h2>
              <span className="text-sm text-gray-500">Last 30 days</span>
            </div>
            <div className="text-center py-12 text-gray-500">
              <p>No performance data available yet.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <WelcomeModal 
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        userName="Deniz"
        onFocusSelect={handleWelcomeComplete}
      />

      <EducationHub 
        isOpen={isEducationHubOpen} 
        onClose={() => setIsEducationHubOpen(false)} 
      />

      <ContextualHelp context="dashboard" />
    </>
  );
};

export default Dashboard;

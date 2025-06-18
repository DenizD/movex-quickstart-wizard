

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  AlertTitle,
  Chip,
  Grid
} from '@mui/material';
import {
  Add as AddIcon,
  Warning as WarningIcon,
  MenuBook as MenuBookIcon
} from '@mui/icons-material';
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
      icon: AddIcon,
      completed: userOnboardingState.videoUploaded,
      action: 'Jetzt hochladen',
      onClick: () => handleOnboardingAction('upload')
    },
    {
      id: 'subscribe',
      title: 'Plan abonnieren',
      description: 'Wählen Sie einen Plan und erhalten Sie mehr Minuten für Live Shopping',
      icon: AddIcon,
      completed: userOnboardingState.planSubscribed,
      action: 'Plan wählen',
      onClick: () => handleOnboardingAction('subscribe')
    },
    {
      id: 'show',
      title: 'Show erstellen',
      description: 'Planen Sie Ihre erste Live Shopping Show mit Produktintegration',
      icon: AddIcon,
      completed: userOnboardingState.showCreated,
      action: 'Show planen',
      onClick: () => handleOnboardingAction('show')
    },
    {
      id: 'test',
      title: 'Minuten testen',
      description: 'Nutzen Sie Ihre kostenlosen Test-Minuten und probieren Sie alle Features aus',
      icon: AddIcon,
      completed: userOnboardingState.minutesTested,
      action: 'Jetzt testen',
      onClick: () => handleOnboardingAction('test-minutes')
    }
  ];

  const completedSteps = onboardingSteps.filter(step => step.completed).length;
  const showOnboardingTiles = completedSteps < onboardingSteps.length;

  return (
    <>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* No Plan Warning Bar */}
        <Alert 
          severity="warning" 
          icon={<WarningIcon />}
          sx={{ 
            borderRadius: 0,
            justifyContent: 'space-between',
            '& .MuiAlert-message': { flex: 1 },
            '& .MuiAlert-action': { 
              alignItems: 'center',
              paddingLeft: 0 
            }
          }}
          action={
            <Button 
              variant="contained" 
              color="primary"
              size="small"
            >
              Buy a Plan
            </Button>
          }
        >
          You have no plan activated. Please activate a plan to access the features.
        </Alert>

        <Container maxWidth="xl" sx={{ py: 3 }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 600 }}>
              Welcome back, Deniz (OSP)
            </Typography>
            {userOnboardingState.selectedFocus && (
              <Box sx={{ mt: 1 }}>
                <Chip 
                  label={`🎯 Fokus: ${userOnboardingState.selectedFocus}`}
                  variant="outlined"
                  color="primary"
                />
              </Box>
            )}
          </Box>

          {/* Start creating content section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 500 }}>
              Start creating content
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {/* New show */}
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', '&:hover': { boxShadow: 3 } }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 500 }}>
                      New show
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Plan your next show and connect them directly to your product pages.
                    </Typography>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      fullWidth
                    >
                      Unlock the Shows Module
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              {/* New Clip */}
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', '&:hover': { boxShadow: 3 } }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 500 }}>
                      New Clip
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Advertise your products with short and direct videos that are easily integrable.
                    </Typography>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      fullWidth
                    >
                      Unlock the Clips Module
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              {/* New Media Library */}
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', '&:hover': { boxShadow: 3 } }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 500 }}>
                      New Media Library
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Display your videos on your website and generate more leads.
                    </Typography>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      fullWidth
                    >
                      Unlock the Media Library Module
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Onboarding Tiles - only show if not completed */}
          {showOnboardingTiles && (
            <OnboardingTiles steps={onboardingSteps} />
          )}

          {/* Recent Shows */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 500 }}>
              Recent Shows
            </Typography>
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="body1" color="text.secondary">
                No shows yet. Create your first show to get started!
              </Typography>
            </Box>
          </Box>

          {/* Recent Clips */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 500 }}>
              Recent Clips
            </Typography>
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="body1" color="text.secondary">
                No clips yet. Create your first clip to get started!
              </Typography>
            </Box>
          </Box>

          {/* Top Performing Videos */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 500 }}>
                Top Performing Videos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last 30 days
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="body1" color="text.secondary">
                No performance data available yet.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

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


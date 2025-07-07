import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  LinearProgress,
  Chip,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Avatar,
  Paper,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fab,
  Tooltip,
  Badge,
  Alert,
  AlertTitle
} from '@mui/material';
import {
  CheckCircle,
  RadioButtonUnchecked,
  PlayArrow,
  Help,
  Close,
  Menu,
  Settings,
  Support,
  AccountCircle,
  Business,
  VideoLibrary,
  Analytics,
  Payment,
  School,
  Chat,
  ExpandMore,
  Refresh,
  Star,
  TrendingUp,
  People,
  Dashboard
} from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faCircle,
  faPlay,
  faQuestion,
  faTimes,
  faBars,
  faCog,
  faHeadset,
  faUser,
  faBuilding,
  faVideo,
  faChartLine,
  faCreditCard,
  faGraduationCap,
  faComments,
  faChevronDown,
  faRedo,
  faStar,
  faUsers,
  faTachometerAlt
} from '@fortawesome/free-solid-svg-icons';

// Typen
interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  action: string;
  icon: string;
  route?: string;
  priority: 'high' | 'medium' | 'low';
}

interface UserProgress {
  completedSteps: string[];
  currentStep: string;
  overallProgress: number;
  userName: string;
  companyName?: string;
  planType: string;
  usageStats: {
    streamingHours: number;
    totalUsers: number;
    videosCreated: number;
  };
}

interface CompleteOnboardingProps {
  userName?: string;
  companyName?: string;
  onStepComplete?: (stepId: string) => void;
  onSupport?: () => void;
}

const CompleteOnboarding: React.FC<CompleteOnboardingProps> = ({
  userName = 'Deniz',
  companyName = 'OSP',
  onStepComplete,
  onSupport
}) => {
  // States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [currentTourStep, setCurrentTourStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // User Progress State
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedSteps: [],
    currentStep: 'upload-video',
    overallProgress: 0,
    userName,
    companyName,
    planType: 'Starter',
    usageStats: {
      streamingHours: 5.2,
      totalUsers: 3,
      videosCreated: 0
    }
  });

  // Onboarding Schritte
  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'upload-video',
      title: 'Erstes Video hochladen',
      description: 'Laden Sie Ihr erstes Video hoch und erstellen Sie shoppable Content',
      completed: false,
      action: 'Video hochladen',
      icon: 'faVideo',
      route: '/clips/create',
      priority: 'high'
    },
    {
      id: 'create-show',
      title: 'Live Show erstellen',
      description: 'Planen Sie Ihre erste Live Shopping Show',
      completed: false,
      action: 'Show erstellen',
      icon: 'faTachometerAlt',
      route: '/shows/create',
      priority: 'high'
    },
    {
      id: 'setup-profile',
      title: 'Profil vervollständigen',
      description: 'Ergänzen Sie Ihre Firmeninformationen und Branding',
      completed: false,
      action: 'Profil bearbeiten',
      icon: 'faBuilding',
      route: '/company-settings',
      priority: 'medium'
    },
    {
      id: 'choose-plan',
      title: 'Plan auswählen',
      description: 'Wählen Sie einen passenden Plan für Ihre Bedürfnisse',
      completed: false,
      action: 'Plan wählen',
      icon: 'faCreditCard',
      route: '/payment',
      priority: 'medium'
    },
    {
      id: 'test-features',
      title: 'Features testen',
      description: 'Nutzen Sie Ihre kostenlosen Test-Minuten',
      completed: false,
      action: 'Jetzt testen',
      icon: 'faPlay',
      priority: 'low'
    }
  ];

  // Tour Schritte
  const tourSteps = [
    {
      title: 'Willkommen bei MOVEX',
      description: 'Hier ist Ihr Dashboard mit allen wichtigen Informationen',
      target: '[data-tour="dashboard"]'
    },
    {
      title: 'Navigation',
      description: 'Über das Seitenmenü erreichen Sie alle Funktionen',
      target: '[data-tour="sidebar"]'
    },
    {
      title: 'Erste Schritte',
      description: 'Diese Checkliste hilft Ihnen beim Einstieg',
      target: '[data-tour="onboarding"]'
    },
    {
      title: 'Support',
      description: 'Bei Fragen steht Ihnen unser Support zur Verfügung',
      target: '[data-tour="support"]'
    }
  ];

  // Effekte
  useEffect(() => {
    // Lade gespeicherten Fortschritt
    const savedProgress = localStorage.getItem('movex_onboarding_progress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    // Speichere Fortschritt
    localStorage.setItem('movex_onboarding_progress', JSON.stringify(userProgress));
    
    // Berechne Gesamtfortschritt
    const completed = userProgress.completedSteps.length;
    const total = onboardingSteps.length;
    const progress = (completed / total) * 100;
    
    setUserProgress(prev => ({ ...prev, overallProgress: progress }));
  }, [userProgress.completedSteps]);

  // Handlers
  const handleStepComplete = (stepId: string) => {
    setUserProgress(prev => ({
      ...prev,
      completedSteps: [...prev.completedSteps, stepId]
    }));
    
    onStepComplete?.(stepId);
  };

  const handleStepClick = (step: OnboardingStep) => {
    if (step.route) {
      window.location.href = step.route;
    }
  };

  const startTour = () => {
    setIsTourActive(true);
    setCurrentTourStep(0);
  };

  const nextTourStep = () => {
    if (currentTourStep < tourSteps.length - 1) {
      setCurrentTourStep(currentTourStep + 1);
    } else {
      setIsTourActive(false);
      setCurrentTourStep(0);
    }
  };

  const getStepIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      faVideo,
      faTachometerAlt,
      faBuilding,
      faCreditCard,
      faPlay
    };
    return iconMap[iconName] || faCircle;
  };

  // Render Hauptkomponente
  return (
    <>
      {/* Floating Action Button */}
      <Tooltip title="Onboarding öffnen">
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
            fontFamily: 'Inter, sans-serif'
          }}
          onClick={() => setIsDrawerOpen(true)}
          data-tour="onboarding"
        >
          <Badge badgeContent={onboardingSteps.length - userProgress.completedSteps.length} color="error">
            <FontAwesomeIcon icon={faGraduationCap} />
          </Badge>
        </Fab>
      </Tooltip>

      {/* Hauptdrawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 400 },
            fontFamily: 'Inter, sans-serif'
          }
        }}
      >
        {/* Header */}
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
              <FontAwesomeIcon icon={faGraduationCap} size="lg" />
              <Typography variant="h6" sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Onboarding
              </Typography>
            </Box>
            <IconButton color="inherit" onClick={() => setIsDrawerOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Box sx={{ p: 2, height: '100%', overflow: 'auto' }}>
          {/* Begrüßung */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <FontAwesomeIcon icon={faUser} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    Willkommen, {userName}!
                  </Typography>
                  {companyName && (
                    <Typography variant="body2" color="text.secondary">
                      {companyName}
                    </Typography>
                  )}
                </Box>
              </Box>
              
              {/* Fortschrittsanzeige */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontFamily: 'Inter, sans-serif' }}>
                    Onboarding Fortschritt
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    {Math.round(userProgress.overallProgress)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={userProgress.overallProgress}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              {/* Aktionen */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<FontAwesomeIcon icon={faPlay} />}
                  onClick={startTour}
                  sx={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Tour starten
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<FontAwesomeIcon icon={faQuestion} />}
                  onClick={() => setIsResourcesOpen(true)}
                  sx={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Hilfe
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Checkliste */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Erste Schritte
              </Typography>
              
              <List>
                {onboardingSteps.map((step) => {
                  const isCompleted = userProgress.completedSteps.includes(step.id);
                  
                  return (
                    <ListItem key={step.id} disablePadding>
                      <ListItemButton
                        onClick={() => handleStepClick(step)}
                        sx={{ borderRadius: 1, mb: 1 }}
                      >
                        <ListItemIcon>
                          <Checkbox
                            checked={isCompleted}
                            onChange={() => !isCompleted && handleStepComplete(step.id)}
                            icon={<FontAwesomeIcon icon={faCircle} />}
                            checkedIcon={<FontAwesomeIcon icon={faCheckCircle} color="success" />}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <FontAwesomeIcon icon={getStepIcon(step.icon)} />
                              <Typography sx={{ fontFamily: 'Inter, sans-serif', fontWeight: isCompleted ? 400 : 600 }}>
                                {step.title}
                              </Typography>
                              <Chip
                                label={step.priority}
                                size="small"
                                color={step.priority === 'high' ? 'error' : step.priority === 'medium' ? 'warning' : 'default'}
                              />
                            </Box>
                          }
                          secondary={step.description}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Drawer>

      {/* Tour Dialog */}
      <Dialog
        open={isTourActive}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { fontFamily: 'Inter, sans-serif' }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FontAwesomeIcon icon={faPlay} />
            <Typography variant="h6" sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Produkt-Tour
            </Typography>
            <Chip label={`${currentTourStep + 1}/${tourSteps.length}`} size="small" />
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            {tourSteps[currentTourStep]?.title}
          </Typography>
          <Typography sx={{ fontFamily: 'Inter, sans-serif' }}>
            {tourSteps[currentTourStep]?.description}
          </Typography>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setIsTourActive(false)} sx={{ fontFamily: 'Inter, sans-serif' }}>
            Überspringen
          </Button>
          <Button variant="contained" onClick={nextTourStep} sx={{ fontFamily: 'Inter, sans-serif' }}>
            {currentTourStep < tourSteps.length - 1 ? 'Weiter' : 'Fertig'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Ressourcen Dialog */}
      <Dialog
        open={isResourcesOpen}
        onClose={() => setIsResourcesOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { fontFamily: 'Inter, sans-serif' }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FontAwesomeIcon icon={faGraduationCap} />
            <Typography variant="h6" sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Hilfe & Ressourcen
            </Typography>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
            <Tab label="User Guide" sx={{ fontFamily: 'Inter, sans-serif' }} />
            <Tab label="FAQ" sx={{ fontFamily: 'Inter, sans-serif' }} />
            <Tab label="Videos" sx={{ fontFamily: 'Inter, sans-serif' }} />
          </Tabs>
          
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              placeholder="Suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <FontAwesomeIcon icon={faQuestion} style={{ marginRight: 8 }} />
              }}
            />
            
            {activeTab === 0 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Inter, sans-serif' }}>User Guide</Typography>
                <Accordion>
                  <AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />}>
                    <Typography sx={{ fontFamily: 'Inter, sans-serif' }}>Erste Schritte</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ fontFamily: 'Inter, sans-serif' }}>
                      Hier finden Sie eine Schritt-für-Schritt Anleitung für den Einstieg...
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setIsResourcesOpen(false)} sx={{ fontFamily: 'Inter, sans-serif' }}>
            Schließen
          </Button>
        </DialogActions>
      </Dialog>

      {/* Support Fab */}
      <Tooltip title="Support kontaktieren">
        <Fab
          color="secondary"
          size="small"
          sx={{
            position: 'fixed',
            bottom: 100,
            right: 24,
            zIndex: 1000,
            fontFamily: 'Inter, sans-serif'
          }}
          onClick={() => setIsSupportOpen(true)}
          data-tour="support"
        >
          <FontAwesomeIcon icon={faHeadset} />
        </Fab>
      </Tooltip>

      {/* Support Dialog */}
      <Dialog
        open={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { fontFamily: 'Inter, sans-serif' }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FontAwesomeIcon icon={faHeadset} />
            <Typography variant="h6" sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Support kontaktieren
            </Typography>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            <AlertTitle>Aktueller Onboarding-Status</AlertTitle>
            Schritt {userProgress.completedSteps.length} von {onboardingSteps.length} abgeschlossen
          </Alert>
          
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Beschreiben Sie Ihr Anliegen..."
            sx={{ mb: 2 }}
          />
          
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>
            Wir antworten in der Regel innerhalb von 2-4 Stunden.
          </Typography>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setIsSupportOpen(false)} sx={{ fontFamily: 'Inter, sans-serif' }}>
            Abbrechen
          </Button>
          <Button variant="contained" sx={{ fontFamily: 'Inter, sans-serif' }}>
            Nachricht senden
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CompleteOnboarding;
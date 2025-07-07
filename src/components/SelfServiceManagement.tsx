import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  LinearProgress,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Alert,
  AlertTitle
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreditCard,
  faUser,
  faBuilding,
  faChartLine,
  faUsers,
  faVideo,
  faClock,
  faArrowUp,
  faCog,
  faEye
} from '@fortawesome/free-solid-svg-icons';

interface PlanDetails {
  name: string;
  price: number;
  features: string[];
  streamingHours: number;
  maxUsers: number;
  videosIncluded: number;
}

interface UsageStats {
  streamingHours: {
    used: number;
    total: number;
  };
  users: {
    current: number;
    max: number;
  };
  videos: {
    created: number;
    limit: number;
  };
}

interface SelfServiceManagementProps {
  currentPlan: PlanDetails;
  usageStats: UsageStats;
  onPlanUpgrade?: (planName: string) => void;
}

const SelfServiceManagement: React.FC<SelfServiceManagementProps> = ({
  currentPlan = {
    name: 'Starter',
    price: 29,
    features: ['5 Stunden Streaming', '3 Nutzer', 'Basis Support'],
    streamingHours: 5,
    maxUsers: 3,
    videosIncluded: 10
  },
  usageStats = {
    streamingHours: { used: 3.2, total: 5 },
    users: { current: 2, max: 3 },
    videos: { created: 4, limit: 10 }
  },
  onPlanUpgrade
}) => {
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const availablePlans: PlanDetails[] = [
    {
      name: 'Professional',
      price: 79,
      features: ['20 Stunden Streaming', '10 Nutzer', 'Premium Support', 'Analytics'],
      streamingHours: 20,
      maxUsers: 10,
      videosIncluded: 50
    },
    {
      name: 'Enterprise',
      price: 199,
      features: ['Unlimited Streaming', 'Unlimited Nutzer', '24/7 Support', 'Custom Features'],
      streamingHours: -1, // Unlimited
      maxUsers: -1, // Unlimited
      videosIncluded: -1 // Unlimited
    }
  ];

  const handleUpgrade = () => {
    if (selectedPlan && onPlanUpgrade) {
      onPlanUpgrade(selectedPlan);
      setIsUpgradeDialogOpen(false);
    }
  };

  const getUsagePercentage = (used: number, total: number) => {
    if (total === -1) return 0; // Unlimited
    return (used / total) * 100;
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'error';
    if (percentage >= 70) return 'warning';
    return 'primary';
  };

  return (
    <>
      <Box sx={{ p: 3, fontFamily: 'Inter, sans-serif' }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Account Verwaltung
        </Typography>

        <Grid container spacing={3}>
          {/* Aktueller Plan */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <FontAwesomeIcon icon={faCreditCard} size="lg" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Aktueller Plan
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {currentPlan.name}
                    </Typography>
                    <Chip 
                      label={`€${currentPlan.price}/Monat`} 
                      color="primary" 
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  <List dense>
                    {currentPlan.features.map((feature, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <FontAwesomeIcon icon={faEye} size="sm" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<FontAwesomeIcon icon={faArrowUp} />}
                  onClick={() => setIsUpgradeDialogOpen(true)}
                  sx={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Plan upgraden
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Verbrauchsübersicht */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <FontAwesomeIcon icon={faChartLine} size="lg" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Verbrauch
                  </Typography>
                </Box>

                {/* Streaming Stunden */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FontAwesomeIcon icon={faClock} size="sm" />
                      Streaming Stunden
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {usageStats.streamingHours.used}h / {usageStats.streamingHours.total === -1 ? '∞' : `${usageStats.streamingHours.total}h`}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={getUsagePercentage(usageStats.streamingHours.used, usageStats.streamingHours.total)}
                    color={getUsageColor(getUsagePercentage(usageStats.streamingHours.used, usageStats.streamingHours.total))}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                {/* Nutzer */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FontAwesomeIcon icon={faUsers} size="sm" />
                      Aktive Nutzer
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {usageStats.users.current} / {usageStats.users.max === -1 ? '∞' : usageStats.users.max}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={getUsagePercentage(usageStats.users.current, usageStats.users.max)}
                    color={getUsageColor(getUsagePercentage(usageStats.users.current, usageStats.users.max))}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                {/* Videos */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FontAwesomeIcon icon={faVideo} size="sm" />
                      Videos erstellt
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {usageStats.videos.created} / {usageStats.videos.limit === -1 ? '∞' : usageStats.videos.limit}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={getUsagePercentage(usageStats.videos.created, usageStats.videos.limit)}
                    color={getUsageColor(getUsagePercentage(usageStats.videos.created, usageStats.videos.limit))}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Firma & Branding */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <FontAwesomeIcon icon={faBuilding} size="lg" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Firmeninformationen
                  </Typography>
                </Box>

                <List>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary="Firmenname"
                      secondary="OSP GmbH"
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary="Branding"
                      secondary="Standard Theme aktiv"
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary="Domain"
                      secondary="osp.movex.app"
                    />
                  </ListItem>
                </List>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<FontAwesomeIcon icon={faCog} />}
                  sx={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Einstellungen bearbeiten
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Account Details */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <FontAwesomeIcon icon={faUser} size="lg" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Account Details
                  </Typography>
                </Box>

                <List>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary="Name"
                      secondary="Deniz Mustermann"
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary="E-Mail"
                      secondary="deniz@osp.de"
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary="Rolle"
                      secondary="Administrator"
                    />
                  </ListItem>
                </List>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<FontAwesomeIcon icon={faCog} />}
                  sx={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Profil bearbeiten
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Upgrade Dialog */}
      <Dialog
        open={isUpgradeDialogOpen}
        onClose={() => setIsUpgradeDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { fontFamily: 'Inter, sans-serif' }
        }}
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Plan upgraden
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Alert severity="info" sx={{ mb: 3 }}>
            <AlertTitle>Aktueller Plan: {currentPlan.name}</AlertTitle>
            Wählen Sie einen höherwertigen Plan für mehr Features und Kapazität.
          </Alert>

          <Grid container spacing={2}>
            {availablePlans.map((plan) => (
              <Grid size={{ xs: 12, md: 6 }} key={plan.name}>
                <Paper
                  sx={{
                    p: 2,
                    border: selectedPlan === plan.name ? '2px solid' : '1px solid',
                    borderColor: selectedPlan === plan.name ? 'primary.main' : 'divider',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedPlan(plan.name)}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {plan.name}
                    </Typography>
                    <Chip 
                      label={`€${plan.price}/Monat`} 
                      color="primary" 
                      variant={selectedPlan === plan.name ? 'filled' : 'outlined'}
                    />
                  </Box>

                  <List dense>
                    {plan.features.map((feature, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <FontAwesomeIcon icon={faEye} size="sm" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature} 
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setIsUpgradeDialogOpen(false)}>
            Abbrechen
          </Button>
          <Button
            variant="contained"
            onClick={handleUpgrade}
            disabled={!selectedPlan}
            sx={{ fontFamily: 'Inter, sans-serif' }}
          >
            Plan upgraden
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SelfServiceManagement;
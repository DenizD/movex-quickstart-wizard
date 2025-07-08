import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Play, Video } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';
import OnboardingTiles from '@/components/onboarding/OnboardingTiles';
import OnboardingChecklist from '@/components/onboarding/OnboardingChecklist';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { shouldShowOnboarding } = useOnboarding();
  const navigate = useNavigate();

  const stats = [
    { title: 'Live Shows', value: '12', change: '+2 this week', icon: Play, color: 'text-blue-600' },
    { title: 'Total Views', value: '8,547', change: '+12% from last month', icon: TrendingUp, color: 'text-green-600' },
    { title: 'Active Users', value: '1,234', change: '+4 new today', icon: Users, color: 'text-purple-600' },
    { title: 'Video Clips', value: '45', change: '+8 this week', icon: Video, color: 'text-orange-600' },
  ];

  const chartData = [
    { name: 'Mon', views: 400 },
    { name: 'Tue', views: 300 },
    { name: 'Wed', views: 600 },
    { name: 'Thu', views: 800 },
    { name: 'Fri', views: 500 },
    { name: 'Sat', views: 700 },
    { name: 'Sun', views: 900 },
  ];

  const checklistItems = [
    {
      id: 'account-created',
      title: 'Account erstellt',
      description: 'Ihr MOVEX-Account wurde erfolgreich eingerichtet',
      completed: true
    },
    {
      id: 'profile-setup',
      title: 'Profil & Unternehmen eingerichtet',
      description: 'Firmeninformationen und Branding konfiguriert',
      completed: false,
      action: () => navigate('/customisation')
    },
    {
      id: 'first-show',
      title: 'Erste Show erstellt',
      description: 'Ihre erste Live-Show wurde angelegt',
      completed: false,
      action: () => navigate('/shows/create')
    },
    {
      id: 'product-added',
      title: 'Produkt zu Show hinzugefügt',
      description: 'Mindestens ein Produkt wurde einer Show zugeordnet',
      completed: false
    },
    {
      id: 'clip-created',
      title: 'Clip erstellt',
      description: 'Ihr erster shoppable Clip wurde hochgeladen',
      completed: false,
      action: () => navigate('/clips/create')
    },
    {
      id: 'media-uploaded',
      title: 'Media Library angelegt',
      description: 'Media Library und Playlists eingerichtet',
      completed: false,
      action: () => navigate('/media-library/create')
    },
    {
      id: 'team-invited',
      title: 'Team-Mitglied eingeladen',
      description: 'Kollegen wurden zur Plattform eingeladen',
      completed: false,
      action: () => navigate('/users')
    },
    {
      id: 'streaming-tested',
      title: 'Streaming getestet',
      description: 'Streaming-Setup wurde erfolgreich getestet',
      completed: false
    },
    {
      id: 'analytics-viewed',
      title: 'Analytics angesehen',
      description: 'Analytics Dashboard wurde besucht',
      completed: false,
      action: () => navigate('/analytics')
    }
  ];

  const handleStartTour = () => {
    // This will be handled by the Layout component's FAB
    console.log('Start onboarding tour');
  };

  return (
    <div className="p-6 space-y-6" data-onboarding="welcome">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          {shouldShowOnboarding 
            ? 'Willkommen bei MOVEX! Lassen Sie uns gemeinsam Ihre erste Live-Shopping Experience einrichten.' 
            : 'Willkommen zurück! Hier ist Ihre Live-Shopping Plattform Übersicht.'
          }
        </p>
      </div>

      {/* Onboarding Section - Only show if user is new */}
      {shouldShowOnboarding && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Erste Schritte</h2>
              <OnboardingTiles />
            </div>
            <div>
              <OnboardingChecklist 
                items={checklistItems} 
                onStartTour={handleStartTour}
              />
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <IconComponent className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chart */}
      <Card data-onboarding="analytics">
        <CardHeader>
          <CardTitle>Weekly Views</CardTitle>
          <CardDescription>Your live show performance over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#0066CC" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card data-onboarding="create-show">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button 
              onClick={() => navigate('/shows/create')}
              className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <div className="font-medium text-blue-900">Create New Show</div>
              <div className="text-sm text-blue-600">Start a new live shopping event</div>
            </button>
            <button 
              onClick={() => navigate('/clips/create')}
              className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <div className="font-medium text-purple-900">Upload Clip</div>
              <div className="text-sm text-purple-600">Add a new video clip to your library</div>
            </button>
            <button 
              onClick={() => navigate('/analytics')}
              className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <div className="font-medium text-green-900">View Analytics</div>
              <div className="text-sm text-green-600">Check your performance metrics</div>
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium">Live show "Winter Collection" ended</div>
                <div className="text-xs text-gray-500">2 hours ago</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Video className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium">New clip uploaded: "Product Demo"</div>
                <div className="text-xs text-gray-500">1 day ago</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="text-sm font-medium">Team member Sarah joined</div>
                <div className="text-xs text-gray-500">3 days ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

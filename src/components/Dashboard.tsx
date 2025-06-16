
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Video, 
  Users, 
  BarChart3, 
  Scissors, 
  Library, 
  Settings,
  Plus,
  Play,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import EducationHub from './EducationHub';

interface DashboardProps {
  onResetOnboarding: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onResetOnboarding }) => {
  const [isEducationHubOpen, setIsEducationHubOpen] = useState(false);

  const features = [
    {
      icon: Video,
      title: 'Shows',
      description: 'Erstelle und verwalte deine Live Shopping Events',
      count: '0 aktive Shows'
    },
    {
      icon: Scissors,
      title: 'Clips',
      description: 'Kurze, shoppable Videos für deine Produkte',
      count: '0 Clips erstellt'
    },
    {
      icon: Library,
      title: 'Media Library',
      description: 'Organisiere alle deine Inhalte in Playlists',
      count: '0 Medien'
    },
    {
      icon: Users,
      title: 'Team',
      description: 'Verwalte Teammitglieder und deren Rollen',
      count: '1 Nutzer'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Detaillierte Einblicke in deine Performance',
      count: 'Keine Daten'
    },
    {
      icon: Settings,
      title: 'Einstellungen',
      description: 'Konfiguriere deine Plattform-Einstellungen',
      count: 'Konfiguration'
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-movex-blue rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-movex-blue">
                  MOVEX | Live Shopping
                </h1>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setIsEducationHubOpen(true)}
                  variant="outline"
                  className="text-movex-blue border-movex-blue hover:bg-movex-blue hover:text-white flex items-center gap-2"
                  data-onboarding="education-hub"
                >
                  <BookOpen className="w-4 h-4" />
                  Education Hub
                </Button>
                <Button
                  onClick={onResetOnboarding}
                  variant="outline"
                  className="text-movex-blue border-movex-blue hover:bg-movex-blue hover:text-white"
                >
                  Onboarding wiederholen
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Willkommen in deiner Live Shopping Zentrale! 🎉
            </h2>
            <p className="text-gray-600 text-lg">
              Starte jetzt mit deinem ersten Live Shopping Event und begeistere deine Kunden.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-8 bg-gradient-to-r from-movex-blue to-blue-600 rounded-xl p-6 text-white" data-onboarding="quick-actions">
            <h3 className="text-xl font-semibold mb-4">Schnellstart</h3>
            <div className="flex gap-4 flex-wrap">
              <Button className="bg-white text-movex-blue hover:bg-gray-100" data-onboarding="create-show">
                <Plus className="w-4 h-4 mr-2" />
                Erste Show erstellen
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-movex-blue">
                <Video className="w-4 h-4 mr-2" />
                Demo ansehen
              </Button>
              <Button 
                onClick={() => setIsEducationHubOpen(true)}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-movex-blue"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Lernen & Entdecken
              </Button>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-onboarding="features-grid">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-movex-light rounded-lg">
                      <feature.icon className="w-5 h-5 text-movex-blue" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        {feature.count}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Getting Started Tips */}
          <div className="mt-12 bg-white rounded-xl p-6 border" data-onboarding="getting-started">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              🚀 Erste Schritte
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-movex-blue text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Show erstellen</h4>
                  <p className="text-gray-600 text-sm">Plane dein erstes Live Shopping Event</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-movex-blue text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Embed Code</h4>
                  <p className="text-gray-600 text-sm">Integriere die Show in deine Website</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-movex-blue text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Team einladen</h4>
                  <p className="text-gray-600 text-sm">Lade deine Kollegen zur Zusammenarbeit ein</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-movex-blue text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Live gehen</h4>
                  <p className="text-gray-600 text-sm">Starte dein erstes Live Shopping Event</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <EducationHub 
        isOpen={isEducationHubOpen} 
        onClose={() => setIsEducationHubOpen(false)} 
      />
    </>
  );
};

export default Dashboard;


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
  GraduationCap,
  Eye,
  MessageCircle,
  Heart,
  MousePointer
} from 'lucide-react';
import EducationHub from './EducationHub';

interface DashboardProps {
  onResetOnboarding: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onResetOnboarding }) => {
  const [isEducationHubOpen, setIsEducationHubOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header mit MOVEX Branding */}
        <header className="bg-white shadow-sm border-b" data-onboarding="overview-header">
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
                >
                  <BookOpen className="w-4 h-4" />
                  Education Hub
                </Button>
                <Button
                  onClick={onResetOnboarding}
                  variant="outline"
                  className="text-movex-blue border-movex-blue hover:bg-movex-blue hover:text-white"
                >
                  Tour wiederholen
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Analytics Chart Section */}
          <div className="mb-8" data-onboarding="analytics-chart">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Analytics Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-500">Viewer</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-500">Chat Messages</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-pink-100 rounded-lg mx-auto mb-2">
                    <Heart className="w-6 h-6 text-pink-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-500">Likes</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-2">
                    <MousePointer className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-500">Product Clicks</div>
                </div>
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Analytics Chart wird hier angezeigt</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Creation Section */}
          <div className="mb-8" data-onboarding="content-creation">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Content erstellen</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" data-onboarding="shows">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <Video className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Shows</CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        Live Shopping Events
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4">Erstelle interaktive Live Shopping Events</p>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Show erstellen
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" data-onboarding="clips">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Scissors className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Clips</CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        Kurze shoppable Videos
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4">Erstelle kurze, immer verfügbare Videos</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Clip erstellen
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" data-onboarding="media-library">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Library className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Media Library</CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        Inhalte organisieren
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4">Organisiere Inhalte in Playlists</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Library erstellen
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Team & Analytics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" data-onboarding="users">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Team Management</CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      1 Teammitglied
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 mb-4">Verwalte Teammitglieder und Rollen</p>
                <Button variant="outline" className="w-full">
                  Team verwalten
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" data-onboarding="analytics">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Detaillierte Analytics</CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      Performance Insights
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 mb-4">Tiefe Einblicke in deine Performance</p>
                <Button variant="outline" className="w-full">
                  Analytics öffnen
                </Button>
              </CardContent>
            </Card>
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

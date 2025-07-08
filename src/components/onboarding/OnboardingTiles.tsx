import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Video, 
  Library, 
  Users, 
  BarChart3, 
  Settings,
  Plus,
  Upload
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OnboardingTilesProps {
  className?: string;
}

const OnboardingTiles: React.FC<OnboardingTilesProps> = ({ className = "" }) => {
  const navigate = useNavigate();

  const tiles = [
    {
      icon: Play,
      title: "Erste Show erstellen",
      description: "Starten Sie mit Ihrer ersten Live-Show und erreichen Sie Ihre Kunden interaktiv.",
      action: "Show erstellen",
      color: "bg-blue-500",
      onClick: () => navigate('/shows/create'),
      completed: false
    },
    {
      icon: Video,
      title: "Shoppable Clip hochladen",
      description: "Laden Sie Ihr erstes Video hoch und machen Sie es shoppable.",
      action: "Clip erstellen",
      color: "bg-purple-500",
      onClick: () => navigate('/clips/create'),
      completed: false
    },
    {
      icon: Library,
      title: "Media Library einrichten",
      description: "Organisieren Sie Ihre Inhalte in Playlists für einfache Verwaltung.",
      action: "Library erstellen",
      color: "bg-green-500",
      onClick: () => navigate('/media-library/create'),
      completed: false
    },
    {
      icon: Users,
      title: "Team einladen",
      description: "Laden Sie Kollegen ein und vergeben Sie passende Rollen.",
      action: "Team einladen",
      color: "bg-orange-500",
      onClick: () => navigate('/users'),
      completed: false
    },
    {
      icon: BarChart3,
      title: "Analytics entdecken",
      description: "Verfolgen Sie Ihren Erfolg mit detaillierten Analysen.",
      action: "Analytics ansehen",
      color: "bg-red-500",
      onClick: () => navigate('/analytics'),
      completed: false
    },
    {
      icon: Settings,
      title: "Branding anpassen",
      description: "Personalisieren Sie Player-Farben und Corporate Design.",
      action: "Einstellungen",
      color: "bg-gray-500",
      onClick: () => navigate('/customisation'),
      completed: false
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {tiles.map((tile, index) => {
        const IconComponent = tile.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${tile.color} rounded-lg flex items-center justify-center`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">{tile.title}</CardTitle>
                </div>
              </div>
              <CardDescription className="text-sm">
                {tile.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Button 
                onClick={tile.onClick}
                className="w-full bg-primary hover:bg-primary/90"
                variant={tile.completed ? "outline" : "default"}
              >
                {tile.completed ? (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Erneut öffnen
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    {tile.action}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default OnboardingTiles;
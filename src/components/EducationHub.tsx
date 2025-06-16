
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { X, BookOpen, Video, Users, BarChart3, Settings, Scissors, Library, Webcam } from 'lucide-react';

interface EducationModule {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  content: {
    overview: string;
    features: string[];
    tips: string[];
    advanced?: string;
  };
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const educationModules: EducationModule[] = [
  {
    id: 'shows',
    title: 'Shows',
    icon: Video,
    description: 'Advanced Setup, FAB, Pre-recorded, Miniplayer, Story-UI',
    difficulty: 'Beginner',
    content: {
      overview: 'Shows sind das Herzstück von MOVEX. Hier erstellst du Live Shopping Events, die deine Kunden begeistern und zum Kauf animieren.',
      features: [
        'Live & Pre-recorded Shows',
        'FAB (Floating Action Button) Modus',
        'Miniplayer für nahtlose Integration',
        'Story-UI für mobile Optimierung',
        'Produktintegration & CTA-Buttons'
      ],
      tips: [
        'Plane Shows 24-48h im Voraus für bessere Teilnehmerzahlen',
        'Nutze FAB für diskrete Integration in bestehende Seiten',
        'Pre-recorded Shows eignen sich für Zeitzonenübergreifende Zielgruppen',
        'Story-UI maximiert Engagement auf mobilen Geräten'
      ],
      advanced: 'Kombiniere Live- und Pre-recorded-Inhalte für hybride Events. Nutze A/B-Tests für verschiedene CTA-Platzierungen.'
    }
  },
  {
    id: 'clips',
    title: 'Clips',
    icon: Scissors,
    description: 'Evergreen-Funktion, Cross-Plattform-Einsatz, Conversion-Ziele',
    difficulty: 'Beginner',
    content: {
      overview: 'Clips sind kurze, shoppable Videos (15-90 Sekunden), die dauerhaft verfügbar sind und hohe Conversion-Raten erzielen.',
      features: [
        'Upload von kurzen Video-Clips',
        'Produktverknüpfung pro Clip',
        'Cover-Bild Customization',
        'Cross-Plattform Einbettung',
        'On-Demand Verfügbarkeit'
      ],
      tips: [
        'Halte Clips unter 60 Sekunden für maximale Aufmerksamkeit',
        'Zeige Produkte in Aktion, nicht nur statisch',
        'Nutze aussagekräftige Cover-Bilder',
        'Platziere Clips strategisch auf Produktseiten'
      ],
      advanced: 'Erstelle Clip-Serien für Produktlinien. Nutze Clips als Teaser für kommende Live-Shows.'
    }
  },
  {
    id: 'library',
    title: 'Media Library',
    icon: Library,
    description: 'Content-Hub, Filterung, PDP-Playlist-Logik',
    difficulty: 'Intermediate',
    content: {
      overview: 'Die Media Library organisiert all deine Inhalte in strukturierten Playlists und bietet erweiterte Filter- und Suchfunktionen.',
      features: [
        'Playlist-Erstellung und -Verwaltung',
        'Drag & Drop Sortierung',
        'Tag-basierte Organisation',
        'Status-Filterung (Live, Upcoming, Ended)',
        'PDP-Integration für Produktseiten'
      ],
      tips: [
        'Erstelle thematische Playlists (z.B. "Sommer Kollektion")',
        'Nutze Tags konsistent für bessere Auffindbarkeit',
        'Aktualisiere Status regelmäßig',
        'Verknüpfe verwandte Shows und Clips'
      ],
      advanced: 'Implementiere automatische Playlist-Generierung basierend auf Produktkategorien und Performance-Metriken.'
    }
  },
  {
    id: 'streaming',
    title: 'Streaming',
    icon: Webcam,
    description: 'OBS vs. App, Kamera-Setup, RTMP & Moderation',
    difficulty: 'Advanced',
    content: {
      overview: 'Professionelle Streaming-Setups für qualitativ hochwertige Live Shopping Events mit verschiedenen technischen Ansätzen.',
      features: [
        'OBS Studio Integration',
        'Mobile App Streaming',
        'RTMP Server Configuration',
        'Multi-Camera Setups',
        'Audio-Optimierung'
      ],
      tips: [
        'Teste dein Setup vor jeder Live-Show',
        'Nutze externe Mikrofone für bessere Audioqualität',
        'Sorge für stabile Internetverbindung (Upload > 5 Mbps)',
        'Plane Backup-Streaming-Optionen'
      ],
      advanced: 'Implementiere automatische Failover-Systeme und nutze Edge-Server für globale Streaming-Optimierung.'
    }
  },
  {
    id: 'moderation',
    title: 'Moderation',
    icon: Users,
    description: 'Chat-Funktionen, AI-Antworten, Cleanup Tools',
    difficulty: 'Intermediate',
    content: {
      overview: 'Effektive Chat-Moderation und Community-Management für engagierte und sichere Live Shopping Erlebnisse.',
      features: [
        'Real-time Chat Management',
        'AI-unterstützte Antworten',
        'Automatische Content-Filterung',
        'Moderator-Tools',
        'User-Verwaltung und Bans'
      ],
      tips: [
        'Definiere klare Chat-Regeln vor dem Stream',
        'Nutze AI-Antworten für häufige Fragen',
        'Reagiere schnell auf Spam und unangemessene Inhalte',
        'Belohne aktive und positive Community-Teilnehmer'
      ],
      advanced: 'Implementiere Sentiment-Analyse für proaktive Moderation und personalisierte Chat-Erlebnisse.'
    }
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: BarChart3,
    description: 'Filterbare Metriken, Interpretation, Funnel-Denken',
    difficulty: 'Intermediate',
    content: {
      overview: 'Umfassende Analytics für datenbasierte Optimierung deiner Live Shopping Performance und ROI-Maximierung.',
      features: [
        'Real-time Viewer Metriken',
        'Conversion Funnel Analyse',
        'Engagement Tracking',
        'Produktperformance',
        'Custom Dashboard Creation'
      ],
      tips: [
        'Fokussiere auf Conversion-Rate, nicht nur Viewer-Zahlen',
        'Analysiere Drop-off Punkte in deinen Shows',
        'Nutze A/B-Tests für verschiedene Show-Formate',
        'Vergleiche Performance verschiedener Produktkategorien'
      ],
      advanced: 'Implementiere Predictive Analytics für Viewer-Verhalten und automatisierte Performance-Optimierung.'
    }
  },
  {
    id: 'users',
    title: 'Nutzerverwaltung',
    icon: Users,
    description: 'Rollenlogik, Security, Auditing',
    difficulty: 'Advanced',
    content: {
      overview: 'Sichere und skalierbare Nutzerverwaltung mit granularen Rollen und Berechtigungen für Teamarbeit.',
      features: [
        'Rollenbasierte Zugriffskontrolle',
        'Multi-Factor Authentication',
        'Audit Logs',
        'Team-Collaboration Tools',
        'API-Key Management'
      ],
      tips: [
        'Vergebe minimale notwendige Rechte (Principle of Least Privilege)',
        'Überprüfe Benutzerrechte regelmäßig',
        'Dokumentiere Rollenzuweisungen',
        'Nutze SSO für größere Teams'
      ],
      advanced: 'Implementiere Just-in-Time Access und automatisierte Compliance-Checks für Enterprise-Umgebungen.'
    }
  },
  {
    id: 'integration',
    title: 'Integration',
    icon: Settings,
    description: 'API, iFrame, JS Snippets, PDP-Einbettung',
    difficulty: 'Advanced',
    content: {
      overview: 'Flexible Integrationsmöglichkeiten für nahtlose Einbindung in bestehende E-Commerce und CMS-Systeme.',
      features: [
        'REST API Integration',
        'iFrame Embedding',
        'JavaScript SDK',
        'Webhook Support',
        'CMS Plugin Support'
      ],
      tips: [
        'Teste Integrationen in Staging-Umgebung',
        'Nutze Webhooks für Real-time Updates',
        'Implementiere Error Handling und Fallbacks',
        'Dokumentiere API-Calls für dein Team'
      ],
      advanced: 'Entwickle Custom Middleware für komplexe E-Commerce-Integrationen und Multi-Channel-Strategien.'
    }
  }
];

interface EducationHubProps {
  isOpen: boolean;
  onClose: () => void;
}

const EducationHub: React.FC<EducationHubProps> = ({ isOpen, onClose }) => {
  const [selectedModule, setSelectedModule] = useState<string>('shows');
  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    const saved = localStorage.getItem('movex_education_progress');
    return saved ? JSON.parse(saved) : [];
  });

  const markAsCompleted = (moduleId: string) => {
    const updated = [...completedModules, moduleId];
    setCompletedModules(updated);
    localStorage.setItem('movex_education_progress', JSON.stringify(updated));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen) return null;

  const selectedModuleData = educationModules.find(m => m.id === selectedModule);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl mx-4 h-[90vh] animate-slide-in">
        {/* Header */}
        <div className="relative p-6 pb-4 bg-gradient-to-r from-movex-blue to-blue-600 text-white rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <BookOpen size={24} />
            <div>
              <h2 className="text-xl font-bold">MOVEX Education Hub</h2>
              <p className="text-blue-100 text-sm">
                Vertiefe dein Wissen • {completedModules.length}/{educationModules.length} Module abgeschlossen
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100%-120px)]">
          {/* Sidebar */}
          <div className="w-1/3 border-r bg-gray-50 p-4 overflow-y-auto">
            <h3 className="font-semibold text-gray-900 mb-4">Module</h3>
            <div className="space-y-2">
              {educationModules.map((module) => {
                const Icon = module.icon;
                const isCompleted = completedModules.includes(module.id);
                const isSelected = selectedModule === module.id;
                
                return (
                  <Card
                    key={module.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      isSelected ? 'ring-2 ring-movex-blue bg-movex-light' : 'hover:bg-white'
                    }`}
                    onClick={() => setSelectedModule(module.id)}
                  >
                    <CardHeader className="p-3">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-movex-blue text-white' : 'bg-gray-100'}`}>
                          <Icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-sm">{module.title}</CardTitle>
                            {isCompleted && <span className="text-green-500 text-xs">✓</span>}
                          </div>
                          <CardDescription className="text-xs">
                            {module.description}
                          </CardDescription>
                          <Badge className={`mt-2 text-xs ${getDifficultyColor(module.difficulty)}`}>
                            {module.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {selectedModuleData && (
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <selectedModuleData.icon size={32} className="text-movex-blue" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedModuleData.title}</h2>
                    <p className="text-gray-600">{selectedModuleData.description}</p>
                  </div>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Übersicht</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="tips">Tipps</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Was ist {selectedModuleData.title}?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">
                          {selectedModuleData.content.overview}
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="features" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Key Features</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {selectedModuleData.content.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="text-movex-blue font-bold">•</span>
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="tips" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Best Practices & Tipps</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedModuleData.content.tips.map((tip, index) => (
                            <div key={index} className="bg-movex-light p-4 rounded-lg">
                              <p className="text-gray-800">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="advanced" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Advanced Konzepte</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedModuleData.content.advanced ? (
                          <p className="text-gray-700 leading-relaxed">
                            {selectedModuleData.content.advanced}
                          </p>
                        ) : (
                          <p className="text-gray-500 italic">
                            Erweiterte Inhalte für dieses Modul werden bald hinzugefügt.
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <div className="mt-8 flex justify-between items-center">
                  <Badge className={getDifficultyColor(selectedModuleData.difficulty)}>
                    {selectedModuleData.difficulty}
                  </Badge>
                  {!completedModules.includes(selectedModuleData.id) && (
                    <Button
                      onClick={() => markAsCompleted(selectedModuleData.id)}
                      className="bg-movex-blue hover:bg-blue-700"
                    >
                      Als abgeschlossen markieren
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationHub;

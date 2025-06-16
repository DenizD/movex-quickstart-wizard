
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus,
  BookOpen,
  TrendingUp,
  Users,
  Play,
  Calendar,
  Clock,
  Star
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';
import EducationHub from './EducationHub';

const chartData = [
  { month: 'Jan', viewers: 1200, engagement: 65 },
  { month: 'Feb', viewers: 1800, engagement: 72 },
  { month: 'Mar', viewers: 2400, engagement: 68 },
  { month: 'Apr', viewers: 3200, engagement: 75 },
  { month: 'May', viewers: 2800, engagement: 70 },
  { month: 'Jun', viewers: 3600, engagement: 78 }
];

const Dashboard = () => {
  const [isEducationHubOpen, setIsEducationHubOpen] = useState(false);

  return (
    <>
      <div className="p-6">
        {/* Welcome Header */}
        <div className="mb-8" data-onboarding="overview-header">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Willkommen zurück, Deniz</h1>
              <p className="text-gray-600">Hier ist Ihre Live Shopping Übersicht für heute</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setIsEducationHubOpen(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Education Hub
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-onboarding="stats-cards">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#E6F3FF] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#0066CC]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Gesamte Zuschauer</p>
                <p className="text-2xl font-bold">12.5K</p>
                <p className="text-xs text-green-600">+12% vs. letzter Monat</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#E6F3FF] rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-[#0066CC]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Aktive Shows</p>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-green-600">+3 diese Woche</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#E6F3FF] rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-[#0066CC]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Clips erstellt</p>
                <p className="text-2xl font-bold">148</p>
                <p className="text-xs text-gray-500">Letzte 30 Tage</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#E6F3FF] rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-[#0066CC]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold">3.2%</p>
                <p className="text-xs text-green-600">+0.5% vs. letzter Monat</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Analytics Chart */}
        <Card className="p-6 mb-8" data-onboarding="analytics-chart">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Performance Übersicht</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">7 Tage</Button>
              <Button variant="outline" size="sm" className="bg-[#E6F3FF] text-[#0066CC] border-[#0066CC]">30 Tage</Button>
              <Button variant="outline" size="sm">90 Tage</Button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Area 
                  type="monotone" 
                  dataKey="viewers" 
                  stroke="#0066CC" 
                  fill="#0066CC" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mb-8" data-onboarding="quick-actions">
          <h2 className="text-xl font-semibold mb-6">Schnellaktionen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-[#E6F3FF] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-[#0066CC]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Neue Show erstellen</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Planen Sie Ihre nächste Live Shopping Show mit Produktintegration.
              </p>
              <Button className="bg-[#0066CC] hover:bg-[#0052A3] text-white w-full">
                <Plus className="w-4 h-4 mr-2" />
                Show erstellen
              </Button>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-[#E6F3FF] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-[#0066CC]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Neuen Clip erstellen</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Erstellen Sie kurze, ansprechende Videos für Ihre Produkte.
              </p>
              <Button className="bg-[#0066CC] hover:bg-[#0052A3] text-white w-full">
                <Plus className="w-4 h-4 mr-2" />
                Clip erstellen
              </Button>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-[#E6F3FF] rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-[#0066CC]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Media Library</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Organisieren Sie Ihre Inhalte in übersichtlichen Bibliotheken.
              </p>
              <Button className="bg-[#0066CC] hover:bg-[#0052A3] text-white w-full">
                <Plus className="w-4 h-4 mr-2" />
                Bibliothek erstellen
              </Button>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Letzte Shows</h3>
            <div className="space-y-4">
              {[
                { title: "Summer Fashion Show 2024", date: "Heute, 14:00", status: "Live", viewers: "1.2K" },
                { title: "Tech Gadgets Special", date: "Gestern, 16:30", status: "Beendet", viewers: "892" },
                { title: "Beauty Essentials", date: "2 Tage", status: "Beendet", viewers: "1.5K" }
              ].map((show, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{show.title}</p>
                    <p className="text-xs text-gray-500">{show.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      show.status === 'Live' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {show.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{show.viewers} Zuschauer</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Performing Videos</h3>
            <div className="space-y-4">
              {[
                { title: "iPhone 15 Unboxing & Review", views: "12.5K", engagement: "85%" },
                { title: "Sommermode Trends 2024", views: "9.8K", engagement: "78%" },
                { title: "Küchen-Gadgets im Test", views: "7.2K", engagement: "72%" }
              ].map((video, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-8 bg-[#0066CC] rounded flex items-center justify-center">
                      <Play className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{video.title}</p>
                      <p className="text-xs text-gray-500">{video.views} Aufrufe</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">{video.engagement}</p>
                    <p className="text-xs text-gray-500">Engagement</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <EducationHub 
        isOpen={isEducationHubOpen} 
        onClose={() => setIsEducationHubOpen(false)} 
      />
    </>
  );
};

export default Dashboard;

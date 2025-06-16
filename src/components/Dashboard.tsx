
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3,
  Plus,
  BookOpen,
  MessageCircle,
  Heart,
  Eye,
  MousePointer
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import EducationHub from './EducationHub';

interface DashboardProps {
  onResetOnboarding: () => void;
}

const chartData = [
  { month: 'Mar 2023', users: 80 },
  { month: 'Apr 2023', users: 90 },
  { month: 'May 2023', users: 70 },
  { month: 'Jun 2023', users: 400 },
  { month: 'Jul 2023', users: 90 },
  { month: 'Aug 2023', users: 150 },
  { month: 'Sep 2023', users: 120 },
  { month: 'Oct 2023', users: 80 },
  { month: 'Nov 2023', users: 60 },
  { month: 'Dec 2023', users: 40 },
  { month: 'Jan 2024', users: 30 },
  { month: 'Feb 2024', users: 25 }
];

const Dashboard: React.FC<DashboardProps> = ({ onResetOnboarding }) => {
  const [isEducationHubOpen, setIsEducationHubOpen] = useState(false);

  return (
    <>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8" data-onboarding="overview-header">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Deniz</h1>
          <div className="flex gap-3">
            <Button
              onClick={() => setIsEducationHubOpen(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Education Hub
            </Button>
            <Button
              onClick={onResetOnboarding}
              variant="outline"
            >
              Tour wiederholen
            </Button>
          </div>
        </div>

        {/* Analytics Chart Section */}
        <div className="mb-8">
          <Card className="p-6" data-onboarding="analytics-chart">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-6">Analytics Overview</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Line 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="ml-8 space-y-4">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Total Viewers</div>
                  <div className="text-2xl font-bold">1.182</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Total Chat Messages</div>
                  <div className="text-2xl font-bold">1.341</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Total Likes</div>
                  <div className="text-2xl font-bold">342</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Total Product Clicks</div>
                  <div className="text-2xl font-bold">193</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Start creating content */}
        <div className="mb-8" data-onboarding="content-creation">
          <h2 className="text-lg font-semibold mb-6">Start creating content</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6" data-onboarding="shows">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">New show</h3>
                <p className="text-gray-600 mb-4">
                  Plan your next show and connect them directly to your product pages.
                </p>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Create
                </Button>
              </div>
            </Card>

            <Card className="p-6" data-onboarding="clips">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">New Clip</h3>
                <p className="text-gray-600 mb-4">
                  Advertise your products with short and direct videos that are easily integrable.
                </p>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Create
                </Button>
              </div>
            </Card>

            <Card className="p-6" data-onboarding="media-library">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">New Media Library</h3>
                <p className="text-gray-600 mb-4">
                  Display your videos on your website and generate more leads.
                </p>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Create
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Shows */}
        <div>
          <h2 className="text-lg font-semibold mb-6">Recent Shows</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-teal-500 rounded-lg aspect-[4/5] flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="w-8 h-8 bg-white/20 rounded mx-auto mb-2"></div>
                  <div className="text-xs">Show {i}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Videos */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-6">Top Performing Videos</h2>
          <div className="space-y-4">
            {[
              { name: "Deniz Dogan - Ein Blick hinter die Kulissen von MOVEX | Live Shopping", date: "20.6.2023" },
              { name: "Jörg Heinemann von OTTO Insights & Learnings aus dem Live Shopping bei OTTO", date: "20.6.2023" },
              { name: "iSHOP User Group", date: "14.9.2023" }
            ].map((video, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-8 bg-teal-500 rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded"></div>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{video.name}</div>
                  <div className="text-xs text-gray-500">{video.date}</div>
                </div>
                <Button size="sm" variant="outline" className="text-teal-600 border-teal-600">
                  Show
                </Button>
              </div>
            ))}
          </div>
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

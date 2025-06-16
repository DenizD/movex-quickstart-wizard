
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Play } from 'lucide-react';

const Overview = () => {
  // Sample data for the chart
  const data = [
    { name: 'Mar 2023', value: 100 },
    { name: 'Apr 2023', value: 120 },
    { name: 'May 2023', value: 80 },
    { name: 'Jun 2023', value: 400 },
    { name: 'Jul 2023', value: 100 },
    { name: 'Aug 2023', value: 150 },
    { name: 'Sep 2023', value: 120 },
    { name: 'Oct 2023', value: 80 },
    { name: 'Nov 2023', value: 60 },
    { name: 'Dec 2023', value: 40 },
    { name: 'Jan 2024', value: 30 },
    { name: 'Feb 2024', value: 25 }
  ];

  const stats = [
    { label: 'Total Viewers', value: '1.182', key: 'viewers' },
    { label: 'Total Chat Messages', value: '1.341', key: 'messages' },
    { label: 'Total Likes', value: '342', key: 'likes' },
    { label: 'Total Product Clicks', value: '193', key: 'clicks' }
  ];

  const contentCards = [
    {
      title: 'New show',
      description: 'Plan your next show and connect them directly to your product pages.',
      buttonText: 'Create',
      id: 'new-show'
    },
    {
      title: 'New Clip',
      description: 'Advertise your products with short and direct videos that are easily integrable.',
      buttonText: 'Create',
      id: 'new-clip'
    },
    {
      title: 'New Media Library',
      description: 'Display your videos on your website and generate more leads.',
      buttonText: 'Create',
      id: 'new-media-library'
    }
  ];

  const recentShows = [
    { id: 1, title: 'Live Show', date: '08.03.2023', color: 'bg-teal-500' },
    { id: 2, title: 'Live Show', date: '08.03.2023', color: 'bg-teal-500' },
    { id: 3, title: 'Product Demo', date: '15.03.2023', color: 'bg-blue-500' },
    { id: 4, title: 'Fashion Show', date: '22.03.2023', color: 'bg-purple-500' },
    { id: 5, title: 'Tech Review', date: '29.03.2023', color: 'bg-gray-500' },
    { id: 6, title: 'Cooking Demo', date: '05.04.2023', color: 'bg-green-500' }
  ];

  const topVideos = [
    {
      id: 1,
      title: 'Deniz Dogan - Ein Blick hinter die Kulissen von MOVEX | Live Shopping',
      date: '20.6.2023',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Jörg Heinemann von OTTO - Insights & Learnings aus dem Live Shopping bei OTTO',
      date: '20.6.2023',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'iSHOP User Group',
      date: '14.9.2023',
      thumbnail: '/placeholder.svg'
    }
  ];

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="mb-8" data-onboarding="overview-header">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Deniz</h1>
      </div>

      {/* Analytics Chart and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart */}
        <div className="lg:col-span-2">
          <Card data-onboarding="analytics-chart">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                <span className="text-sm text-gray-600">Total viewers</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#F59E0B" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-gray-500 text-center mt-2">Months</div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="space-y-4" data-onboarding="stats-cards">
          {stats.map((stat) => (
            <Card key={stat.key}>
              <CardContent className="p-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Content Creation */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Start creating content</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-onboarding="content-creation">
          {contentCards.map((card) => (
            <Card key={card.id} data-onboarding={card.id}>
              <CardHeader>
                <CardTitle className="text-lg">{card.title}</CardTitle>
                <CardDescription className="text-sm">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="outline" className="text-movex-blue border-movex-blue hover:bg-movex-blue hover:text-white">
                  {card.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Shows and Top Videos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Shows */}
        <div data-onboarding="recent-shows">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Shows</h3>
          <div className="grid grid-cols-2 gap-4">
            {recentShows.map((show) => (
              <Card key={show.id} className="overflow-hidden">
                <div className={`h-32 ${show.color} flex items-center justify-center text-white`}>
                  <Play size={24} />
                </div>
                <CardContent className="p-3">
                  <p className="font-medium text-sm">{show.title}</p>
                  <p className="text-xs text-gray-500">{show.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Top Performing Videos */}
        <div data-onboarding="top-videos">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Videos</h3>
          <div className="space-y-3">
            {topVideos.map((video) => (
              <Card key={video.id} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-500 rounded flex items-center justify-center text-white text-xs font-bold">
                    {video.title.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm leading-tight">{video.title}</h4>
                    <p className="text-xs text-gray-500">{video.date}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Play size={12} className="mr-1" />
                    Show
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

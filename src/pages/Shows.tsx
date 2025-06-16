
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Plus, MoreVertical, Filter } from 'lucide-react';

const Shows = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Live', 'Upcoming', 'Ended'];

  const shows = [
    {
      id: 1,
      title: 'Test 1',
      date: '27.6.2025 | 09:33',
      status: 'Upcoming',
      color: 'bg-teal-500',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Test1',
      date: '27.6.2025 | 09:33',
      status: 'Upcoming',
      color: 'bg-teal-500',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'las',
      date: '25.6.2025 | 11:15',
      status: 'Cancelled',
      color: 'bg-teal-500',
      image: '/placeholder.svg'
    },
    {
      id: 4,
      title: 'Lascana Test Show',
      date: '11.6.2025 | 17:00',
      status: 'Ended',
      color: 'bg-purple-500',
      image: '/placeholder.svg'
    },
    // Add more shows...
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-red-100 text-red-800';
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      case 'Ended': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Shows</h1>
        <p className="text-gray-600">Customize your shows.</p>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Newest to Oldest</option>
            <option>Oldest to Newest</option>
          </select>
          <Button 
            className="bg-movex-blue hover:bg-blue-700"
            data-onboarding="create-show-button"
          >
            Create Show
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6" data-onboarding="show-tabs">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-movex-blue text-movex-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="flex justify-end py-2">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" className="rounded" />
            Hide test shows
          </label>
        </div>
      </div>

      {/* Shows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-onboarding="shows-grid">
        {shows.map((show) => (
          <Card key={show.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${show.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                    {show.title.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-sm">{show.title}</CardTitle>
                    <CardDescription className="text-xs">{show.date}</CardDescription>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={16} />
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Badge className={`text-xs ${getStatusColor(show.status)}`}>
                {show.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline">Load more (24) +</Button>
      </div>
    </div>
  );
};

export default Shows;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Plus, MoreVertical } from 'lucide-react';

const Shows = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Live', 'Upcoming', 'Ended'];

  const shows = [
    { id: 1, title: 'Test 1', date: '27.6.2025 | 09:33', status: 'Upcoming', color: 'bg-teal-500' },
    { id: 2, title: 'Test1', date: '27.6.2025 | 09:33', status: 'Upcoming', color: 'bg-teal-500' },
    { id: 3, title: 'las', date: '25.6.2025 | 11:15', status: 'Cancelled', color: 'bg-teal-500' },
    { id: 4, title: 'Lascana Test Show', date: '11.6.2025 | 17:00', status: 'Ended', color: 'bg-purple-500' },
    { id: 5, title: 'Test', date: '11.6.2025 | 15:55', status: 'Cancelled', color: 'bg-teal-500' },
    { id: 6, title: 'JUGARD+KÜNSTNER GmbH', date: '19.5.2025 | 19:00', status: 'Cancelled', color: 'bg-gray-800' },
    { id: 7, title: 'Mehr als Werkzeug - Handwerk', date: '10.4.2025 | 19:00', status: 'Cancelled', color: 'bg-orange-500' },
    { id: 8, title: 'MAGIC FINISH Produktlinie', date: '17.3.2025 | 14:14', status: 'Cancelled', color: 'bg-gray-700' }
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
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Shows</h1>
        <p className="text-gray-600">Customize your shows.</p>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
        <div className="flex items-center gap-3">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Newest to Oldest</option>
            <option>Oldest to Newest</option>
          </select>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            Create Show
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex justify-between">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
          <label className="flex items-center gap-2 text-sm text-gray-600 py-2">
            <input type="checkbox" className="rounded" />
            Hide test shows
          </label>
        </div>
      </div>

      {/* Shows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {shows.map((show) => (
          <Card key={show.id} className="relative">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${show.color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                    {show.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{show.title}</h3>
                    <p className="text-xs text-gray-500">{show.date}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={16} />
                </button>
              </div>
              <Badge className={`text-xs ${getStatusColor(show.status)}`}>
                {show.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">Load more (24) +</Button>
      </div>
    </div>
  );
};

export default Shows;

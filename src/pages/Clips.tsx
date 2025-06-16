
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, MoreVertical, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Clips = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Draft', 'Error', 'Ready', 'Cancelled'];

  const clips = [
    { id: 1, title: 'Roomtour one.O India', date: '27.5.2025', status: 'Ready', image: '/api/placeholder/80/80' },
    { id: 2, title: 'one.O Interview - David', date: '26.5.2025', status: 'Ready', image: '/api/placeholder/80/80' },
    { id: 3, title: 'one.O Interview - Pawan', date: '26.5.2025', status: 'Ready', image: '/api/placeholder/80/80' },
    { id: 4, title: 'Way to work - Hyderabad', date: '26.5.2025', status: 'Ready', image: '/api/placeholder/80/80' },
    { id: 5, title: 'one.O India', date: '26.5.2025', status: 'Ready', image: '/api/placeholder/80/80' },
    { id: 6, title: 'one.O Interview - Bryan', date: '15.5.2025', status: 'Ready', image: '/api/placeholder/80/80' },
    { id: 7, title: 'Willkommen in der one.O Medi...', date: '15.5.2025', status: 'Ready', image: '/api/placeholder/80/80' },
    { id: 8, title: 'MAGIC FINISH Make-up Mouss...', date: '03.3.2025', status: 'Ready', image: '/api/placeholder/80/80' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-orange-100 text-orange-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Error': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6" data-onboarding="clips-header">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Clips</h1>
        <p className="text-gray-600">Erstellen und verwalten Sie Ihre Video Clips.</p>
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
          <Button 
            className="bg-[#0066CC] hover:bg-[#0052A3] text-white" 
            data-onboarding="create-clip-button"
            onClick={() => navigate('/clips/create')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create clips
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6" data-onboarding="clips-tabs">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-[#0066CC] text-[#0066CC]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Clips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" data-onboarding="clips-grid">
        {clips.map((clip) => (
          <Card key={clip.id} className="relative">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{clip.title}</h3>
                    <p className="text-xs text-gray-500">{clip.date}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={16} />
                </button>
              </div>
              <Badge className={`text-xs ${getStatusColor(clip.status)}`}>
                {clip.status}
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

export default Clips;

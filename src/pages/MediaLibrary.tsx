
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MoreVertical } from 'lucide-react';

const MediaLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mediaLibraries = [
    { name: 'Clips', videos: 26 },
    { name: 'one.O Media Library', videos: 8 },
    { name: 'Unsere Shows', videos: 34 }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Media Library</h1>
        <p className="text-gray-600">Customise media libraries for live, upcoming and ended shows.</p>
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
            <option>Sort A-Z</option>
            <option>Sort Z-A</option>
          </select>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            Create media library
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border">
        <div className="grid grid-cols-3 gap-4 p-4 border-b font-medium text-sm text-gray-700">
          <div>Media Libraries</div>
          <div className="text-center">Number of Videos</div>
          <div className="text-right">Actions</div>
        </div>
        
        {mediaLibraries.map((library, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 p-4 border-b last:border-b-0 hover:bg-gray-50">
            <div className="font-medium">{library.name}</div>
            <div className="text-center">{library.videos}</div>
            <div className="text-right">
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaLibrary;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MoreVertical, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const MediaLibrary = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const mediaLibraries = [
    { name: 'Clips', videos: 26 },
    { name: 'one.O Media Library', videos: 8 },
    { name: 'Unsere Shows', videos: 34 }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6" data-onboarding="media-header">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('page.mediaLibrary.title')}</h1>
        <p className="text-gray-600">{t('page.mediaLibrary.subtitle')}</p>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder={t('action.search')}
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
          <Button 
            className="bg-[#0066CC] hover:bg-[#0052A3] text-white" 
            data-onboarding="create-library-button"
            onClick={() => navigate('/media-library/create')}
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('action.create')} media library
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border" data-onboarding="library-table">
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

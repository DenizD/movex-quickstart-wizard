
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Library } from 'lucide-react';

const MediaLibrary = () => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Media Library</h1>
        <p className="text-gray-600">Organize your content in playlists.</p>
      </div>

      <div className="flex justify-end mb-6">
        <Button className="bg-movex-blue hover:bg-blue-700" data-onboarding="create-library-button">
          <Plus size={16} className="mr-2" />
          Create Media Library
        </Button>
      </div>

      {/* Empty state */}
      <Card className="text-center py-16" data-onboarding="media-library-empty-state">
        <CardContent>
          <Library size={48} className="mx-auto text-gray-400 mb-4" />
          <CardTitle className="mb-2">No media libraries yet</CardTitle>
          <p className="text-gray-600 mb-6">Create playlists to organize your shows and clips</p>
          <Button className="bg-movex-blue hover:bg-blue-700">
            <Plus size={16} className="mr-2" />
            Create First Library
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaLibrary;

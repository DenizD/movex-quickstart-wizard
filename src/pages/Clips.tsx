
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Upload } from 'lucide-react';

const Clips = () => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Clips</h1>
        <p className="text-gray-600">Create short, shoppable video clips.</p>
      </div>

      <div className="flex justify-end mb-6">
        <Button className="bg-movex-blue hover:bg-blue-700" data-onboarding="create-clip-button">
          <Plus size={16} className="mr-2" />
          Create Clip
        </Button>
      </div>

      {/* Empty state */}
      <Card className="text-center py-16" data-onboarding="clips-empty-state">
        <CardContent>
          <Upload size={48} className="mx-auto text-gray-400 mb-4" />
          <CardTitle className="mb-2">No clips yet</CardTitle>
          <p className="text-gray-600 mb-6">Start creating your first shoppable video clip</p>
          <Button className="bg-movex-blue hover:bg-blue-700">
            <Plus size={16} className="mr-2" />
            Create First Clip
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Clips;

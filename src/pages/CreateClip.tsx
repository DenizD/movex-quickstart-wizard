
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Upload, Video, Image, Settings, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateClip = () => {
  const navigate = useNavigate();
  const [clipName, setClipName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6" data-onboarding="create-clip-header">
        <Button variant="ghost" onClick={() => navigate('/clips')} className="p-2">
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Clip</h1>
          <p className="text-gray-600">Erstellen Sie einen neuen shoppable Video Clip</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Upload */}
          <Card data-onboarding="clip-upload">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload size={20} />
                Video Upload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <Video size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Video hochladen</h3>
                  <p className="text-gray-600 mb-4">
                    Ziehen Sie Ihr Video hierher oder klicken Sie zum Auswählen
                  </p>
                  <Button variant="outline">
                    Video auswählen
                  </Button>
                </label>
                {selectedFile && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-green-800 font-medium">{selectedFile.name}</p>
                    <p className="text-green-600 text-sm">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card data-onboarding="clip-basic-info">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag size={20} />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clip Name *
                </label>
                <Input
                  value={clipName}
                  onChange={(e) => setClipName(e.target.value)}
                  placeholder="Enter clip name"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md resize-none"
                  rows={3}
                  placeholder="Describe your clip..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <Input
                  placeholder="Add tags separated by commas"
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Thumbnail */}
          <Card data-onboarding="clip-thumbnail">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image size={20} />
                Thumbnail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                  <Image size={24} className="text-gray-400" />
                </div>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                  <Image size={24} className="text-gray-400" />
                </div>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                  <Upload size={24} className="text-gray-400" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Wählen Sie ein Thumbnail aus dem Video oder laden Sie ein eigenes hoch
              </p>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card data-onboarding="clip-settings">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings size={20} />
                Clip Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto-publish</h4>
                  <p className="text-sm text-gray-600">Clip automatisch nach Verarbeitung veröffentlichen</p>
                </div>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Shopping aktivieren</h4>
                  <p className="text-sm text-gray-600">Produkte im Clip verknüpfen</p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Kommentare erlauben</h4>
                  <p className="text-sm text-gray-600">Zuschauer können kommentieren</p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview */}
          <Card data-onboarding="clip-preview">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <Video size={48} className="text-gray-400" />
              </div>
              <h3 className="font-medium mb-2">{clipName || 'Clip Name'}</h3>
              <Badge className="bg-gray-100 text-gray-800">
                Draft
              </Badge>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card data-onboarding="clip-actions">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button className="w-full bg-[#0066CC] hover:bg-[#0052A3] text-white">
                  Clip erstellen
                </Button>
                <Button variant="outline" className="w-full">
                  Als Entwurf speichern
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => navigate('/clips')}>
                  Abbrechen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateClip;

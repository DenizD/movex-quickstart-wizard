
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Folder, Settings, Lock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateMediaLibrary = () => {
  const navigate = useNavigate();
  const [libraryName, setLibraryName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6" data-onboarding="create-library-header">
        <Button variant="ghost" onClick={() => navigate('/media-library')} className="p-2">
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Media Library</h1>
          <p className="text-gray-600">Erstellen Sie eine neue Media Library zur Organisation Ihrer Inhalte</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="space-y-6">
          {/* Basic Information */}
          <Card data-onboarding="library-basic-info">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Folder size={20} />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Library Name *
                </label>
                <Input
                  value={libraryName}
                  onChange={(e) => setLibraryName(e.target.value)}
                  placeholder="Enter library name"
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
                  placeholder="Describe the purpose of this library..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-md">
                  <option value="">Select category</option>
                  <option value="product-videos">Product Videos</option>
                  <option value="tutorials">Tutorials</option>
                  <option value="testimonials">Testimonials</option>
                  <option value="behind-scenes">Behind the Scenes</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card data-onboarding="library-privacy">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock size={20} />
                Privacy & Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Private Library</h4>
                  <p className="text-sm text-gray-600">Nur Sie können diese Library sehen und bearbeiten</p>
                </div>
                <input 
                  type="checkbox" 
                  className="toggle" 
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
              </div>
              {!isPrivate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Access
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-md">
                    <option value="view">View Only</option>
                    <option value="edit">Can Edit</option>
                    <option value="admin">Admin Access</option>
                  </select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Organization Settings */}
          <Card data-onboarding="library-organization">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings size={20} />
                Organization Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto-organize by date</h4>
                  <p className="text-sm text-gray-600">Videos automatisch nach Upload-Datum sortieren</p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Enable tags</h4>
                  <p className="text-sm text-gray-600">Tags für bessere Organisation verwenden</p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Version control</h4>
                  <p className="text-sm text-gray-600">Verschiedene Versionen von Videos verwalten</p>
                </div>
                <input type="checkbox" className="toggle" />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card data-onboarding="library-actions">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Button className="flex-1 bg-[#0066CC] hover:bg-[#0052A3] text-white">
                  Library erstellen
                </Button>
                <Button variant="outline" className="flex-1">
                  Als Entwurf speichern
                </Button>
                <Button variant="ghost" onClick={() => navigate('/media-library')}>
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

export default CreateMediaLibrary;

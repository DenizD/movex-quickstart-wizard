
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, X } from 'lucide-react';

const Customisation = () => {
  const [activeTab, setActiveTab] = useState('Profile Details');
  const [showPreview, setShowPreview] = useState(true);

  const tabs = ['Profile Details', 'Colors', 'Typography'];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customisation</h1>
          <p className="text-gray-600">Personalize your videos to fit your brands style.</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline">Delete profile</Button>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">Edit</Button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Left Panel */}
        <div className="flex-1 max-w-2xl">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
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
          </div>

          {/* Profile Details Content */}
          {activeTab === 'Profile Details' && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="profileName">Profile Name</Label>
                <Input id="profileName" defaultValue="Default style" className="mt-1" />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Header</h3>
                
                <div className="mb-4">
                  <Label>Logo</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-green-50">
                    <div className="text-green-600 mb-2">✓</div>
                    <div className="text-sm text-green-600">Upload successful</div>
                  </div>
                </div>

                <div className="mb-4">
                  <Label htmlFor="logoSize">Logo Size</Label>
                  <select id="logoSize" className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2">
                    <option>100 %</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="headerLabel">Header Label</Label>
                    <Input id="headerLabel" placeholder="Assign a label" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="headerUrl">Header Label URL</Label>
                    <div className="relative mt-1">
                      <Input id="headerUrl" placeholder="https://..." />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Preview */}
        {showPreview && (
          <div className="w-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Desktop</h3>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>Live</option>
              </select>
            </div>
            
            {/* Desktop Preview */}
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-orange-400 to-pink-400 rounded-t-lg h-64 relative overflow-hidden">
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-xs">LIVE</div>
                  <div className="absolute top-4 right-4">
                    <button className="text-white"><X size={16} /></button>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
                    MOVEX
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white rounded-lg p-2 text-xs w-32">
                    <div className="font-semibold text-purple-600 mb-1">HIGHLIGHTS</div>
                    <div className="space-y-1">
                      <div className="bg-gray-100 rounded p-1">Soft cotton T-shirt</div>
                      <div className="bg-gray-100 rounded p-1">Maxi shirt with a smocked upper...</div>
                    </div>
                    <div className="font-semibold text-purple-600 mt-2 mb-1">PRODUCTS</div>
                    <div className="space-y-1">
                      <div className="bg-gray-100 rounded p-1">Soft cotton T-shirt</div>
                      <div className="bg-gray-100 rounded p-1">Premium cotton sweatshirt</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Preview */}
            <div className="mb-4">
              <h3 className="font-semibold">Mobile</h3>
            </div>
            <Card className="w-48 mx-auto">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-orange-400 to-pink-400 rounded-t-lg h-80 relative overflow-hidden">
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-xs">LIVE</div>
                  <div className="absolute top-4 right-4">
                    <button className="text-white"><X size={16} /></button>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold">
                    MOVEX
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customisation;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Palette, Upload, Settings, Monitor, Mic, Camera } from 'lucide-react';

const Customisation = () => {
  const [brandColor, setBrandColor] = useState('#0066CC');
  const [autoRecord, setAutoRecord] = useState(true);
  const [chatModeration, setChatModeration] = useState(true);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6" data-onboarding="customisation-header">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Platform Settings</h1>
        <p className="text-gray-600">Configure your MOVEX live shopping platform</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Settings */}
        <div className="space-y-6" data-onboarding="design-settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Brand Customization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="brand-color">Primary Brand Color</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Input
                    id="brand-color"
                    type="color"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="logo-upload">Company Logo</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Upload your logo for live shows</p>
                  <Button variant="outline" className="mt-2">
                    Choose File
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="company-name">Store Name</Label>
                <Input
                  id="company-name"
                  placeholder="Enter your store name"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="welcome-message">Welcome Message</Label>
                <textarea
                  id="welcome-message"
                  rows={3}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  placeholder="Welcome message for viewers joining your live shows"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Shopping Settings */}
        <div className="space-y-6" data-onboarding="feature-settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Live Show Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-record">Auto-Record Shows</Label>
                  <p className="text-sm text-gray-600">Automatically record all live shows</p>
                </div>
                <Switch
                  id="auto-record"
                  checked={autoRecord}
                  onCheckedChange={setAutoRecord}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="chat-moderation">Chat Moderation</Label>
                  <p className="text-sm text-gray-600">Enable automatic chat filtering</p>
                </div>
                <Switch
                  id="chat-moderation"
                  checked={chatModeration}
                  onCheckedChange={setChatModeration}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="viewer-count">Show Viewer Count</Label>
                  <p className="text-sm text-gray-600">Display live viewer count to audience</p>
                </div>
                <Switch id="viewer-count" defaultChecked />
              </div>

              <div>
                <Label htmlFor="max-viewers">Maximum Viewers</Label>
                <Input
                  id="max-viewers"
                  type="number"
                  placeholder="1000"
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Stream Quality
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="video-quality">Default Video Quality</Label>
                <select className="w-full mt-2 p-2 border border-gray-300 rounded-md">
                  <option>1080p HD</option>
                  <option>720p</option>
                  <option>480p</option>
                  <option>Auto</option>
                </select>
              </div>

              <div>
                <Label htmlFor="audio-quality">Audio Quality</Label>
                <select className="w-full mt-2 p-2 border border-gray-300 rounded-md">
                  <option>High (128 kbps)</option>
                  <option>Medium (96 kbps)</option>
                  <option>Low (64 kbps)</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="adaptive-streaming">Adaptive Streaming</Label>
                  <p className="text-sm text-gray-600">Automatically adjust quality based on connection</p>
                </div>
                <Switch id="adaptive-streaming" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <Button className="bg-[#0066CC] hover:bg-[#0052A3] text-white px-8">
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Customisation;

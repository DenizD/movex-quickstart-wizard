
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Palette, Upload, Settings, Bell, Shield, Globe } from 'lucide-react';

const Customisation = () => {
  const [brandColor, setBrandColor] = useState('#0066CC');
  const [notifications, setNotifications] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6" data-onboarding="customisation-header">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Customisation</h1>
        <p className="text-gray-600">Personalisieren Sie Ihre MOVEX Plattform</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Design Settings */}
        <div className="space-y-6" data-onboarding="design-settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Brand Design
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="brand-color">Brand Color</Label>
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
                  <p className="text-sm text-gray-600">Drag & drop your logo here or click to browse</p>
                  <Button variant="outline" className="mt-2">
                    Choose File
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  placeholder="Enter your company name"
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Platform Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="public-profile">Public Profile</Label>
                  <p className="text-sm text-gray-600">Make your profile visible to everyone</p>
                </div>
                <Switch
                  id="public-profile"
                  checked={publicProfile}
                  onCheckedChange={setPublicProfile}
                />
              </div>

              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <select className="w-full mt-2 p-2 border border-gray-300 rounded-md">
                  <option>Europe/Berlin</option>
                  <option>Europe/London</option>
                  <option>America/New_York</option>
                  <option>America/Los_Angeles</option>
                </select>
              </div>

              <div>
                <Label htmlFor="language">Language</Label>
                <select className="w-full mt-2 p-2 border border-gray-300 rounded-md">
                  <option>Deutsch</option>
                  <option>English</option>
                  <option>Français</option>
                  <option>Español</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Settings */}
        <div className="space-y-6" data-onboarding="feature-settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-600">Receive email updates about your shows</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-gray-600">Receive browser notifications</p>
                </div>
                <Switch id="push-notifications" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-gray-600">Receive SMS alerts for important events</p>
                </div>
                <Switch id="sms-notifications" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Feature Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-record">Auto-Record Shows</Label>
                  <p className="text-sm text-gray-600">Automatically record all live shows</p>
                </div>
                <Switch id="auto-record" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="chat-moderation">Chat Moderation</Label>
                  <p className="text-sm text-gray-600">Enable automatic chat moderation</p>
                </div>
                <Switch id="chat-moderation" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics-tracking">Analytics Tracking</Label>
                  <p className="text-sm text-gray-600">Track detailed user analytics</p>
                </div>
                <Switch id="analytics-tracking" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600">Add an extra layer of security</p>
                </div>
                <Switch id="two-factor" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-export">Data Export</Label>
                  <p className="text-sm text-gray-600">Allow users to export their data</p>
                </div>
                <Switch id="data-export" defaultChecked />
              </div>

              <Button variant="outline" className="w-full">
                Download Privacy Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <Button className="bg-[#0066CC] hover:bg-[#0052A3] text-white px-8">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Customisation;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { User, Bell, Monitor, Mic, Camera } from 'lucide-react';

const UserSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [streamNotifications, setStreamNotifications] = useState(true);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p className="text-gray-600">Manage your personal profile and streaming preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="display-name">Display Name</Label>
              <Input
                id="display-name"
                defaultValue="Deniz"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                defaultValue="deniz@movex.com"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="host-bio">Host Bio</Label>
              <textarea
                id="host-bio"
                rows={3}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="Tell your viewers about yourself..."
              />
            </div>

            <div>
              <Label htmlFor="social-links">Social Media Links</Label>
              <Input
                id="social-links"
                placeholder="@yourusername"
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Streaming Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Streaming Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="default-camera">Default Camera</Label>
              <select className="w-full mt-2 p-2 border border-gray-300 rounded-md">
                <option>Built-in Camera</option>
                <option>External Webcam</option>
                <option>DSLR Camera</option>
              </select>
            </div>

            <div>
              <Label htmlFor="default-microphone">Default Microphone</Label>
              <select className="w-full mt-2 p-2 border border-gray-300 rounded-md">
                <option>Built-in Microphone</option>
                <option>USB Microphone</option>
                <option>Wireless Headset</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-start-camera">Auto-start Camera</Label>
                <p className="text-sm text-gray-600">Automatically enable camera when starting stream</p>
              </div>
              <Switch id="auto-start-camera" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-start-mic">Auto-start Microphone</Label>
                <p className="text-sm text-gray-600">Automatically enable microphone when starting stream</p>
              </div>
              <Switch id="auto-start-mic" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-gray-600">Receive show and sales updates via email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="stream-notifications">Stream Alerts</Label>
                <p className="text-sm text-gray-600">Get notified about stream events</p>
              </div>
              <Switch
                id="stream-notifications"
                checked={streamNotifications}
                onCheckedChange={setStreamNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="chat-mentions">Chat Mentions</Label>
                <p className="text-sm text-gray-600">Get notified when mentioned in chat</p>
              </div>
              <Switch id="chat-mentions" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Language & Regional Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Regional Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="language">Interface Language</Label>
              <select className="w-full mt-2 p-2 border border-gray-300 rounded-md">
                <option>English</option>
                <option>Deutsch</option>
                <option>Español</option>
                <option>繁體中文</option>
              </select>
            </div>

            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <select className="w-full mt-2 p-2 border border-gray-300 rounded-md">
                <option>Europe/Berlin</option>
                <option>Europe/London</option>
                <option>America/New_York</option>
                <option>America/Los_Angeles</option>
                <option>Asia/Hong_Kong</option>
              </select>
            </div>

            <div>
              <Label htmlFor="currency">Default Currency</Label>
              <select className="w-full mt-2 p-2 border border-gray-300 rounded-md">
                <option>EUR (€)</option>
                <option>USD ($)</option>
                <option>GBP (£)</option>
                <option>HKD (HK$)</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-end">
        <Button className="bg-[#0066CC] hover:bg-[#0052A3] text-white px-8">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default UserSettings;

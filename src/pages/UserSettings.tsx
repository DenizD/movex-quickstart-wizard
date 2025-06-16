
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { User, Mail, Bell, Eye, Shield } from 'lucide-react';

const UserSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [profileVisible, setProfileVisible] = useState(false);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">User Settings</h1>
        <p className="text-gray-600">Manage your personal preferences and profile settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                defaultValue="Deniz"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                defaultValue=""
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
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                rows={3}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="Tell us about yourself..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
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
                <p className="text-sm text-gray-600">Receive updates via email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="browser-notifications">Browser Notifications</Label>
                <p className="text-sm text-gray-600">Show notifications in browser</p>
              </div>
              <Switch id="browser-notifications" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <p className="text-sm text-gray-600">Receive product updates and offers</p>
              </div>
              <Switch id="marketing-emails" />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Privacy Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="profile-visible">Public Profile</Label>
                <p className="text-sm text-gray-600">Make profile visible to other users</p>
              </div>
              <Switch
                id="profile-visible"
                checked={profileVisible}
                onCheckedChange={setProfileVisible}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-activity">Show Activity Status</Label>
                <p className="text-sm text-gray-600">Let others see when you're online</p>
              </div>
              <Switch id="show-activity" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="analytics-consent">Analytics Consent</Label>
                <p className="text-sm text-gray-600">Allow us to track usage for improvements</p>
              </div>
              <Switch id="analytics-consent" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Language & Timezone */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Regional Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="language">Preferred Language</Label>
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
                <option>Asia/Tokyo</option>
              </select>
            </div>

            <div>
              <Label htmlFor="date-format">Date Format</Label>
              <select className="w-full mt-2 p-2 border border-gray-300 rounded-md">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
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

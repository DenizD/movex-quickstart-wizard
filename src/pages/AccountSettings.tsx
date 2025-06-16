
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Shield, CreditCard, Key, AlertTriangle, Download, Trash2, Users } from 'lucide-react';

const AccountSettings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Account & Billing</h1>
        <p className="text-gray-600">Manage your account security, subscription, and team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscription & Billing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Subscription & Billing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-800">Pro Plan</p>
                  <p className="text-sm text-green-600">€49/month • Next billing: Jan 15, 2025</p>
                </div>
                <Button size="sm" variant="outline">
                  Manage Plan
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Live Shows</p>
                <p className="font-medium">Unlimited</p>
              </div>
              <div>
                <p className="text-gray-600">Storage</p>
                <p className="font-medium">100 GB</p>
              </div>
              <div>
                <p className="text-gray-600">Viewers</p>
                <p className="font-medium">Up to 1,000</p>
              </div>
              <div>
                <p className="text-gray-600">Team Members</p>
                <p className="font-medium">5 included</p>
              </div>
            </div>

            <div>
              <Label htmlFor="billing-email">Billing Email</Label>
              <Input
                id="billing-email"
                type="email"
                defaultValue="billing@movex.com"
                className="mt-2"
              />
            </div>

            <Button variant="outline" className="w-full">
              Download Invoices
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                className="mt-2"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">Secure your account with 2FA</p>
              </div>
              <Switch
                id="two-factor"
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>

            <Button variant="outline" className="w-full">
              <Key className="w-4 h-4 mr-2" />
              Generate API Keys
            </Button>
          </CardContent>
        </Card>

        {/* Team Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Deniz (Owner)</p>
                  <p className="text-sm text-gray-600">deniz@movex.com</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Owner</span>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Invite Team Member
            </Button>

            <div>
              <Label>Team Usage</Label>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>1 of 5 members</span>
                  <span>4 slots available</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#0066CC] h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data & Export */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-backup">Automatic Backup</Label>
                <p className="text-sm text-gray-600">Weekly backup of shows and data</p>
              </div>
              <Switch
                id="auto-backup"
                checked={autoBackup}
                onCheckedChange={setAutoBackup}
              />
            </div>

            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export Analytics Data
            </Button>

            <div>
              <Label>Storage Usage</Label>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Used: 23.4 GB</span>
                  <span>Available: 76.6 GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#0066CC] h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
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

export default AccountSettings;

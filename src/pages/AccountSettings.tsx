
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Shield, CreditCard, Key, AlertTriangle, Download, Trash2 } from 'lucide-react';

const AccountSettings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600">Manage your account security, billing, and data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

            <div>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                className="mt-2"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">Add extra security to your account</p>
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

        {/* Billing Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Billing Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-800">Trial Plan</p>
                  <p className="text-sm text-green-600">Free until January 15, 2025</p>
                </div>
                <Button size="sm" className="bg-[#0066CC] hover:bg-[#0052A3] text-white">
                  Upgrade
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                defaultValue="MOVEX"
                className="mt-2"
              />
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

            <div>
              <Label htmlFor="tax-id">Tax ID / VAT Number</Label>
              <Input
                id="tax-id"
                className="mt-2"
              />
            </div>

            <Button variant="outline" className="w-full">
              Download Invoices
            </Button>
          </CardContent>
        </Card>

        {/* Data Management */}
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
                <p className="text-sm text-gray-600">Automatically backup your data weekly</p>
              </div>
              <Switch
                id="auto-backup"
                checked={autoBackup}
                onCheckedChange={setAutoBackup}
              />
            </div>

            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export All Data
            </Button>

            <div>
              <Label>Storage Usage</Label>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Used: 2.3 GB</span>
                  <span>Available: 7.7 GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#0066CC] h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
              <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
              <p className="text-sm text-red-600 mb-4">
                This action cannot be undone. This will permanently delete your account and all associated data.
              </p>
              <Button variant="destructive" className="w-full">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>

            <Button variant="outline" className="w-full border-orange-200 text-orange-600 hover:bg-orange-50">
              Deactivate Account
            </Button>
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

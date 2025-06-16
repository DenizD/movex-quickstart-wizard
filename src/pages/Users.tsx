
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users as UsersIcon } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const Users = () => {
  const { t } = useLanguage();

  return (
    <div className="flex-1 p-6">
      <div className="mb-6" data-onboarding="users-header">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('page.users.title')}</h1>
        <p className="text-gray-600">{t('page.users.subtitle')}</p>
      </div>

      <div className="flex justify-end mb-6">
        <Button className="bg-[#0066CC] hover:bg-[#0052A3] text-white" data-onboarding="invite-user-button">
          <Plus size={16} className="mr-2" />
          Invite User
        </Button>
      </div>

      {/* Current user */}
      <Card data-onboarding="users-list">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0066CC] rounded-full flex items-center justify-center text-white font-medium">
                D
              </div>
              <div>
                <p className="font-medium">Deniz (You)</p>
                <p className="text-sm text-gray-600">deniz@movex.com</p>
              </div>
            </div>
            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Owner</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;

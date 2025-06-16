
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users as UsersIcon } from 'lucide-react';

const Users = () => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Users</h1>
        <p className="text-gray-600">Manage team members and permissions.</p>
      </div>

      <div className="flex justify-end mb-6">
        <Button className="bg-movex-blue hover:bg-blue-700" data-onboarding="invite-user-button">
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
              <div className="w-10 h-10 bg-movex-blue rounded-full flex items-center justify-center text-white font-medium">
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


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">Detailed insights into your performance.</p>
      </div>

      {/* Analytics placeholder */}
      <Card className="text-center py-16" data-onboarding="analytics-dashboard">
        <CardContent>
          <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
          <CardTitle className="mb-2">Analytics Dashboard</CardTitle>
          <p className="text-gray-600">Detailed analytics will appear here once you have show data</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;

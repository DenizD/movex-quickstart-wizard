
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('Show');

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="mb-4">
        <span className="text-sm text-gray-500">Analytics / Lascana Test Show</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Lascana Test Show</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Export as PDF</Button>
          <Button variant="outline" size="sm" className="bg-teal-600 text-white border-teal-600">Export as CSV</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {['Show', 'Item'].map((tab) => (
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

      {/* Key Metrics */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-500 mb-1">Total viewers</div>
              <div className="text-3xl font-bold mb-2">0</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-500 mb-1">Total qualified viewer</div>
              <div className="text-3xl font-bold mb-2">0</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-500 mb-1">Total non-qualified viewers</div>
              <div className="text-3xl font-bold mb-2">0</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-500 mb-1">Average qualified viewing time</div>
              <div className="text-3xl font-bold mb-1">0</div>
              <div className="text-sm text-gray-500">Mins</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-sm text-gray-500 mb-1">Engagement</div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xl font-bold">0</div>
                  <div className="text-xs text-gray-500">Chat users</div>
                </div>
                <div>
                  <div className="text-xl font-bold">0</div>
                  <div className="text-xs text-gray-500">Messages in chat</div>
                </div>
                <div>
                  <div className="text-xl font-bold">0</div>
                  <div className="text-xs text-gray-500">Live hearts</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-500 mb-1">Duration</div>
              <div className="text-3xl font-bold mb-1">59,03</div>
              <div className="text-sm text-gray-500">Live duration</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Live activity timeline (mins)</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-gray-500">analyticsList.common.noData</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">VoD Timeline (days)</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-gray-500">analyticsList.common.noData</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;

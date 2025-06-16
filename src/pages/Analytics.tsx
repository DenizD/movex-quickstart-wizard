
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Play, DollarSign, Calendar, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30 days');

  const performanceData = [
    { date: '1 Jun', viewers: 2400, engagement: 85, sales: 3200 },
    { date: '8 Jun', viewers: 1398, engagement: 75, sales: 2100 },
    { date: '15 Jun', viewers: 9800, engagement: 92, sales: 8900 },
    { date: '22 Jun', viewers: 3908, engagement: 88, sales: 4200 },
    { date: '29 Jun', viewers: 4800, engagement: 91, sales: 5100 },
  ];

  const categoryData = [
    { name: 'Fashion', value: 35, color: '#0066CC' },
    { name: 'Electronics', value: 28, color: '#FF6B6B' },
    { name: 'Home & Garden', value: 22, color: '#4ECDC4' },
    { name: 'Beauty', value: 15, color: '#45B7D1' },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6" data-onboarding="analytics-header">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics</h1>
            <p className="text-gray-600">Detaillierte Einblicke in Ihre Performance</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {selectedPeriod}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-onboarding="analytics-cards">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Viewers</p>
                <p className="text-2xl font-bold text-gray-900">45.2K</p>
                <p className="text-sm text-green-600">+12.5% from last month</p>
              </div>
              <div className="w-12 h-12 bg-[#E6F3FF] rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-[#0066CC]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                <p className="text-2xl font-bold text-gray-900">87.3%</p>
                <p className="text-sm text-green-600">+5.2% from last week</p>
              </div>
              <div className="w-12 h-12 bg-[#E6F3FF] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#0066CC]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900">€124.3K</p>
                <p className="text-sm text-green-600">+18.1% from last month</p>
              </div>
              <div className="w-12 h-12 bg-[#E6F3FF] rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#0066CC]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">4.2%</p>
                <p className="text-sm text-green-600">+0.8% from last week</p>
              </div>
              <div className="w-12 h-12 bg-[#E6F3FF] rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-[#0066CC]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" data-onboarding="analytics-charts">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="viewers" stroke="#0066CC" strokeWidth={2} />
                  <Line type="monotone" dataKey="engagement" stroke="#FF6B6B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Shows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Summer Fashion Week', viewers: '12.5K', engagement: '94%' },
                { name: 'Tech Gadgets Special', viewers: '8.9K', engagement: '87%' },
                { name: 'Home Decor Trends', viewers: '6.2K', engagement: '82%' },
              ].map((show, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{show.name}</p>
                    <p className="text-xs text-gray-500">{show.viewers} viewers</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#0066CC]">{show.engagement}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'New show created', time: '2 hours ago' },
                { action: 'Clip published', time: '4 hours ago' },
                { action: 'User invited', time: '1 day ago' },
                { action: 'Analytics report generated', time: '2 days ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { metric: 'Average Watch Time', value: '3:42', change: '+12%' },
                { metric: 'Click-through Rate', value: '8.5%', change: '+5%' },
                { metric: 'Share Rate', value: '2.1%', change: '-3%' },
                { metric: 'Comment Rate', value: '4.8%', change: '+8%' },
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{metric.metric}</p>
                    <p className="text-lg font-bold text-[#0066CC]">{metric.value}</p>
                  </div>
                  <div className={`text-sm font-medium ${
                    metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;

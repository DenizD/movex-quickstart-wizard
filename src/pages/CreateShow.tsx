
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, Settings, Users, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateShow = () => {
  const navigate = useNavigate();
  const [showName, setShowName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6" data-onboarding="create-show-header">
        <Button variant="ghost" onClick={() => navigate('/shows')} className="p-2">
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Show</h1>
          <p className="text-gray-600">Erstellen Sie eine neue Live Shopping Show</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card data-onboarding="show-basic-info">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video size={20} />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Show Name *
                </label>
                <Input
                  value={showName}
                  onChange={(e) => setShowName(e.target.value)}
                  placeholder="Enter show name"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md resize-none"
                  rows={3}
                  placeholder="Describe your show..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card data-onboarding="show-schedule">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={20} />
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <Input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <Input
                  type="number"
                  placeholder="60"
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card data-onboarding="show-settings">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings size={20} />
                Show Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Chat aktivieren</h4>
                  <p className="text-sm text-gray-600">Zuschauer können während der Show chatten</p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Warteraum aktivieren</h4>
                  <p className="text-sm text-gray-600">Zuschauer warten vor Show-Start</p>
                </div>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Aufzeichnung aktivieren</h4>
                  <p className="text-sm text-gray-600">Show automatisch aufzeichnen</p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview */}
          <Card data-onboarding="show-preview">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <Video size={48} className="text-gray-400" />
              </div>
              <h3 className="font-medium mb-2">{showName || 'Show Name'}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{selectedDate || 'Select date'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{selectedTime || 'Select time'}</span>
                </div>
              </div>
              <Badge className="mt-3 bg-blue-100 text-blue-800">
                Geplant
              </Badge>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card data-onboarding="show-actions">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button className="w-full bg-[#0066CC] hover:bg-[#0052A3] text-white">
                  Show erstellen
                </Button>
                <Button variant="outline" className="w-full">
                  Als Entwurf speichern
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => navigate('/shows')}>
                  Abbrechen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateShow;

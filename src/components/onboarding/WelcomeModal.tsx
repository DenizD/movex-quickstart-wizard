
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Upload, Calendar, Play, CreditCard } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onFocusSelect: (focus: string) => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ 
  isOpen, 
  onClose, 
  userName, 
  onFocusSelect 
}) => {
  const [selectedFocus, setSelectedFocus] = useState<string>('');

  const focusOptions = [
    {
      id: 'upload',
      title: 'Video hochladen',
      description: 'Laden Sie Ihr erstes Video hoch und erstellen Sie shoppable Content',
      icon: Upload,
      color: 'bg-blue-500',
      gradient: 'from-blue-50 to-blue-100'
    },
    {
      id: 'show',
      title: 'Live Show planen',
      description: 'Planen Sie Ihre erste Live Shopping Show mit Produktintegration',
      icon: Calendar,
      color: 'bg-purple-500',
      gradient: 'from-purple-50 to-purple-100'
    },
    {
      id: 'clip',
      title: 'Clip erstellen',
      description: 'Erstellen Sie kurze, ansprechende Videos für Ihre Produkte',
      icon: Play,
      color: 'bg-green-500',
      gradient: 'from-green-50 to-green-100'
    },
    {
      id: 'minutes',
      title: 'Minuten testen',
      description: 'Testen Sie die Plattform mit kostenlosen Test-Minuten',
      icon: CreditCard,
      color: 'bg-orange-500',
      gradient: 'from-orange-50 to-orange-100'
    }
  ];

  const handleContinue = () => {
    if (selectedFocus) {
      onFocusSelect(selectedFocus);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-2xl mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Willkommen, {userName}!</h2>
            <p className="text-gray-600">
              Großartig! Ihr Konto ist bereit. Wählen Sie Ihren Fokus, um mit MOVEX zu starten.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <h3 className="font-semibold text-lg text-center">Was möchten Sie zuerst tun?</h3>
            {focusOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedFocus(option.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedFocus === option.id
                      ? 'border-[#0066CC] bg-gradient-to-r ' + option.gradient
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${option.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{option.title}</h4>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-6"
            >
              Später entscheiden
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedFocus}
              className="bg-[#0066CC] hover:bg-[#0052A3] text-white px-6"
            >
              Los geht's!
            </Button>
          </div>

          <div className="mt-6 p-4 bg-[#E6F3FF] rounded-lg">
            <p className="text-sm text-[#0066CC] text-center">
              💡 <strong>Tipp:</strong> Sie erhalten automatisch 2 Test-Minuten, um die Plattform auszuprobieren!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeModal;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Building, User, Mail, Lock, Target } from 'lucide-react';

interface SignupData {
  email: string;
  name: string;
  password: string;
  company: string;
  role: string;
  purpose: string[];
  industry: string;
}

const MultiStepSignup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState<SignupData>({
    email: '',
    name: '',
    password: '',
    company: '',
    role: '',
    purpose: [],
    industry: ''
  });

  const totalSteps = 2;
  const progress = (currentStep / totalSteps) * 100;

  const purposeOptions = [
    { id: 'show-planning', label: 'Show planen', icon: '🎬' },
    { id: 'clip-creation', label: 'Clips erstellen', icon: '✂️' },
    { id: 'product-selling', label: 'Produkte verkaufen', icon: '🛍️' },
    { id: 'audience-building', label: 'Audience aufbauen', icon: '👥' },
    { id: 'brand-awareness', label: 'Markenbekanntheit', icon: '📢' },
    { id: 'testing', label: 'Plattform testen', icon: '🔍' }
  ];

  const handlePurposeToggle = (purposeId: string) => {
    setSignupData(prev => ({
      ...prev,
      purpose: prev.purpose.includes(purposeId)
        ? prev.purpose.filter(p => p !== purposeId)
        : [...prev.purpose, purposeId]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Signup data:', signupData);
    // Hier würde die tatsächliche Registrierung erfolgen
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#0066CC] rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="font-bold text-gray-900">MOVEX</h1>
              <p className="text-xs text-gray-500">Live Shopping</p>
            </div>
          </div>
          <CardTitle>Konto erstellen</CardTitle>
          <p className="text-sm text-gray-600">Schritt {currentStep} von {totalSteps}</p>
          <Progress value={progress} className="mt-2" />
        </CardHeader>

        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  E-Mail-Adresse
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={signupData.email}
                  onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="ihre@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Vollständiger Name
                </Label>
                <Input
                  id="name"
                  value={signupData.name}
                  onChange={(e) => setSignupData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Max Mustermann"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Passwort
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={signupData.password}
                  onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Mindestens 8 Zeichen"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Unternehmen (optional)
                </Label>
                <Input
                  id="company"
                  value={signupData.company}
                  onChange={(e) => setSignupData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Ihr Unternehmen"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <Target className="w-8 h-8 mx-auto mb-2 text-[#0066CC]" />
                <h3 className="font-semibold">Was ist Ihr Hauptziel?</h3>
                <p className="text-sm text-gray-600">Wählen Sie alle zutreffenden Optionen</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {purposeOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handlePurposeToggle(option.id)}
                    className={`p-3 rounded-lg border-2 text-sm transition-all ${
                      signupData.purpose.includes(option.id)
                        ? 'border-[#0066CC] bg-[#E6F3FF] text-[#0066CC]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-lg mb-1">{option.icon}</div>
                    <div className="font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Zurück
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                className="bg-[#0066CC] hover:bg-[#0052A3] text-white flex items-center gap-2"
              >
                Weiter
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-[#0066CC] hover:bg-[#0052A3] text-white"
              >
                Konto erstellen
              </Button>
            )}
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Durch die Registrierung stimmen Sie unseren{' '}
            <a href="/terms" className="text-[#0066CC] hover:underline">
              Nutzungsbedingungen
            </a>{' '}
            und der{' '}
            <a href="/privacy" className="text-[#0066CC] hover:underline">
              Datenschutzerklärung
            </a>{' '}
            zu.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiStepSignup;

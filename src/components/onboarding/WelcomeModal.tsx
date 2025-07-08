import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play, Book, HelpCircle } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartOnboarding: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose, onStartOnboarding }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded"></div>
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold">Willkommen bei MOVEX Live Shopping!</DialogTitle>
              <p className="text-muted-foreground mt-1">Ihre neue Plattform für interaktiven Videokommerz</p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Welcome Video Placeholder */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 text-center">
            <Play className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Entdecken Sie die Zukunft des Online-Shoppings</h3>
            <p className="text-muted-foreground">
              Erstellen Sie interaktive Live-Shows, shoppable Clips und begeistern Sie Ihre Kunden mit 
              einzigartigen Einkaufserlebnissen direkt in Ihrem Video-Content.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Play className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-medium text-sm">Live Shows</h4>
              <p className="text-xs text-muted-foreground mt-1">Interaktive Live-Streaming Events</p>
            </div>
            <div className="text-center p-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-5 h-5 bg-primary rounded"></div>
              </div>
              <h4 className="font-medium text-sm">Shoppable Clips</h4>
              <p className="text-xs text-muted-foreground mt-1">Kurze, kaufbare Video-Inhalte</p>
            </div>
            <div className="text-center p-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Book className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-medium text-sm">Analytics</h4>
              <p className="text-xs text-muted-foreground mt-1">Detaillierte Erfolgsanalysen</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={onStartOnboarding} 
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <Play className="w-4 h-4 mr-2" />
              Los geht's - Onboarding starten
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Book className="w-4 h-4 mr-2" />
                User Guide
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <HelpCircle className="w-4 h-4 mr-2" />
                Support
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
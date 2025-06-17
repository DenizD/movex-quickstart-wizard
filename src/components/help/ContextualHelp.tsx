
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  HelpCircle, 
  X, 
  Search, 
  BookOpen, 
  Video, 
  MessageCircle,
  ExternalLink,
  ChevronRight 
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface HelpItem {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'video' | 'faq';
  url?: string;
  duration?: string;
}

interface ContextualHelpProps {
  context?: string;
  helpItems?: HelpItem[];
}

const ContextualHelp: React.FC<ContextualHelpProps> = ({ 
  context = 'general',
  helpItems = []
}) => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const defaultHelpItems: HelpItem[] = [
    {
      id: '1',
      title: 'Erste Schritte mit MOVEX',
      description: 'Lernen Sie die Grundlagen der Live Shopping Plattform',
      type: 'guide',
      url: '/help/getting-started'
    },
    {
      id: '2',
      title: 'Video Upload Tutorial',
      description: 'So laden Sie Ihr erstes Video hoch',
      type: 'video',
      duration: '2:30',
      url: '/help/video-upload'
    },
    {
      id: '3',
      title: 'Live Show planen',
      description: 'Schritt-für-Schritt Anleitung für Ihre erste Show',
      type: 'guide',
      url: '/help/create-show'
    },
    {
      id: '4',
      title: 'Häufige Fragen zu Abrechnung',
      description: 'Antworten zu Plänen, Minuten und Zahlungen',
      type: 'faq',
      url: '/help/billing-faq'
    }
  ];

  const allHelpItems = helpItems.length > 0 ? helpItems : defaultHelpItems;
  
  const filteredItems = allHelpItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeIcon = (type: 'guide' | 'video' | 'faq') => {
    switch (type) {
      case 'guide':
        return <BookOpen className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'faq':
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: 'guide' | 'video' | 'faq') => {
    switch (type) {
      case 'guide':
        return 'text-blue-600 bg-blue-50';
      case 'video':
        return 'text-purple-600 bg-purple-50';
      case 'faq':
        return 'text-green-600 bg-green-50';
    }
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-40">
        <Popover open={isHelpOpen} onOpenChange={setIsHelpOpen}>
          <PopoverTrigger asChild>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="lg"
                  className="w-14 h-14 rounded-full bg-[#0066CC] hover:bg-[#0052A3] text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <HelpCircle className="w-6 h-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Hilfe & Support</p>
              </TooltipContent>
            </Tooltip>
          </PopoverTrigger>

          <PopoverContent 
            side="top" 
            align="end" 
            className="w-80 p-0"
            sideOffset={10}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Hilfe & Support</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsHelpOpen(false)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Hilfe suchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  />
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="max-h-80 overflow-y-auto">
                  {filteredItems.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      Keine Hilfe-Artikel gefunden
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {filteredItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            if (item.url) {
                              window.open(item.url, '_blank');
                            }
                            setIsHelpOpen(false);
                          }}
                          className="w-full text-left p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(item.type)}`}>
                              {getTypeIcon(item.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <h4 className="font-medium text-sm text-gray-900 line-clamp-1">
                                  {item.title}
                                </h4>
                                <div className="flex items-center gap-1 ml-2">
                                  {item.duration && (
                                    <span className="text-xs text-gray-500">{item.duration}</span>
                                  )}
                                  <ChevronRight className="w-3 h-3 text-gray-400" />
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-sm"
                    onClick={() => {
                      window.open('/help', '_blank');
                      setIsHelpOpen(false);
                    }}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Vollständiges Help Center
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      </div>
    </TooltipProvider>
  );
};

export default ContextualHelp;

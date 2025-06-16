
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from '@/hooks/useLanguage';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages: { value: Language; label: string }[] = [
    { value: 'de', label: t('language.de') },
    { value: 'en', label: t('language.en') },
    { value: 'es', label: t('language.es') },
    { value: 'zh-TW', label: t('language.zh-TW') }
  ];

  return (
    <div className="flex items-center gap-2">
      <Globe size={16} className="text-gray-500" />
      <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
        <SelectTrigger className="w-32 h-8 text-sm border-gray-300">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;

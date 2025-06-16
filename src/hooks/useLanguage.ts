
import { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'de' | 'en' | 'es' | 'zh-TW';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation keys and values
const translations = {
  de: {
    // Navigation
    'nav.overview': 'Overview',
    'nav.shows': 'Shows',
    'nav.clips': 'Clips',
    'nav.mediaLibrary': 'Media Library',
    'nav.users': 'Users',
    'nav.analytics': 'Analytics',
    'nav.customisation': 'Customisation',
    'nav.support': 'Support',
    'nav.streamingApp': 'Streaming APP',
    
    // Common actions
    'action.create': 'Erstellen',
    'action.save': 'Speichern',
    'action.cancel': 'Abbrechen',
    'action.delete': 'Löschen',
    'action.edit': 'Bearbeiten',
    'action.search': 'Suchen',
    'action.startTour': 'Tour starten',
    'action.back': 'Zurück',
    'action.next': 'Weiter',
    'action.finish': 'Tour beenden',
    'action.skip': 'Überspringen',
    
    // Wizard steps
    'wizard.welcome.title': 'Willkommen bei MOVEX',
    'wizard.welcome.description': 'Ihre Live Shopping Plattform für interaktive Verkaufserlebnisse. Hier bekommen Sie einen Überblick über alle wichtigen Metriken.',
    'wizard.performance.title': 'Performance Dashboard',
    'wizard.performance.description': 'Verfolgen Sie Ihre wichtigsten KPIs wie Zuschauer, Conversion Rate und Engagement in Echtzeit.',
    'wizard.analytics.title': 'Analytics Übersicht',
    'wizard.analytics.description': 'Detaillierte Diagramme zeigen Ihnen die Performance Ihrer Shows über verschiedene Zeiträume.',
    'wizard.quickActions.title': 'Schnellaktionen',
    'wizard.quickActions.description': 'Erstellen Sie neue Shows, Clips oder Media Libraries direkt von hier aus.',
    
    // Pages
    'page.overview.title': 'Overview',
    'page.overview.subtitle': 'Willkommen bei MOVEX - Ihrer Live Shopping Plattform',
    'page.shows.title': 'Shows',
    'page.shows.subtitle': 'Verwalten Sie Ihre Live Shopping Shows',
    'page.clips.title': 'Clips',
    'page.clips.subtitle': 'Erstellen und verwalten Sie Ihre Video Clips.',
    'page.mediaLibrary.title': 'Media Library',
    'page.mediaLibrary.subtitle': 'Organisieren Sie Ihre Inhalte in strukturierten Bibliotheken.',
    'page.users.title': 'Team Verwaltung',
    'page.users.subtitle': 'Verwalten Sie Teammitglieder und deren Berechtigungen.',
    'page.analytics.title': 'Analytics',
    'page.analytics.subtitle': 'Detaillierte Einblicke in Ihre Performance.',
    'page.customisation.title': 'Anpassung',
    'page.customisation.subtitle': 'Personalisieren Sie Ihre MOVEX Plattform',
    
    // Language names
    'language.de': 'Deutsch',
    'language.en': 'English',
    'language.es': 'Español',
    'language.zh-TW': '繁體中文'
  },
  en: {
    // Navigation
    'nav.overview': 'Overview',
    'nav.shows': 'Shows',
    'nav.clips': 'Clips',
    'nav.mediaLibrary': 'Media Library',
    'nav.users': 'Users',
    'nav.analytics': 'Analytics',
    'nav.customisation': 'Customisation',
    'nav.support': 'Support',
    'nav.streamingApp': 'Streaming APP',
    
    // Common actions
    'action.create': 'Create',
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.delete': 'Delete',
    'action.edit': 'Edit',
    'action.search': 'Search',
    'action.startTour': 'Start Tour',
    'action.back': 'Back',
    'action.next': 'Next',
    'action.finish': 'Finish Tour',
    'action.skip': 'Skip',
    
    // Wizard steps
    'wizard.welcome.title': 'Welcome to MOVEX',
    'wizard.welcome.description': 'Your Live Shopping platform for interactive sales experiences. Get an overview of all important metrics here.',
    'wizard.performance.title': 'Performance Dashboard',
    'wizard.performance.description': 'Track your key KPIs like viewers, conversion rate and engagement in real-time.',
    'wizard.analytics.title': 'Analytics Overview',
    'wizard.analytics.description': 'Detailed charts show you the performance of your shows over different time periods.',
    'wizard.quickActions.title': 'Quick Actions',
    'wizard.quickActions.description': 'Create new shows, clips or media libraries directly from here.',
    
    // Pages
    'page.overview.title': 'Overview',
    'page.overview.subtitle': 'Welcome to MOVEX - Your Live Shopping Platform',
    'page.shows.title': 'Shows',
    'page.shows.subtitle': 'Manage your Live Shopping Shows',
    'page.clips.title': 'Clips',
    'page.clips.subtitle': 'Create and manage your video clips.',
    'page.mediaLibrary.title': 'Media Library',
    'page.mediaLibrary.subtitle': 'Organize your content in structured libraries.',
    'page.users.title': 'Team Management',
    'page.users.subtitle': 'Manage team members and their permissions.',
    'page.analytics.title': 'Analytics',
    'page.analytics.subtitle': 'Detailed insights into your performance.',
    'page.customisation.title': 'Customisation',
    'page.customisation.subtitle': 'Personalize your MOVEX platform',
    
    // Language names
    'language.de': 'Deutsch',
    'language.en': 'English',
    'language.es': 'Español',
    'language.zh-TW': '繁體中文'
  },
  es: {
    // Navigation
    'nav.overview': 'Resumen',
    'nav.shows': 'Shows',
    'nav.clips': 'Clips',
    'nav.mediaLibrary': 'Biblioteca de Medios',
    'nav.users': 'Usuarios',
    'nav.analytics': 'Analíticas',
    'nav.customisation': 'Personalización',
    'nav.support': 'Soporte',
    'nav.streamingApp': 'APP de Streaming',
    
    // Common actions
    'action.create': 'Crear',
    'action.save': 'Guardar',
    'action.cancel': 'Cancelar',
    'action.delete': 'Eliminar',
    'action.edit': 'Editar',
    'action.search': 'Buscar',
    'action.startTour': 'Iniciar Tour',
    'action.back': 'Atrás',
    'action.next': 'Siguiente',
    'action.finish': 'Finalizar Tour',
    'action.skip': 'Saltar',
    
    // Wizard steps
    'wizard.welcome.title': 'Bienvenido a MOVEX',
    'wizard.welcome.description': 'Su plataforma de Live Shopping para experiencias de ventas interactivas. Obtenga una visión general de todas las métricas importantes aquí.',
    'wizard.performance.title': 'Panel de Rendimiento',
    'wizard.performance.description': 'Rastree sus KPIs clave como espectadores, tasa de conversión y engagement en tiempo real.',
    'wizard.analytics.title': 'Resumen de Analíticas',
    'wizard.analytics.description': 'Los gráficos detallados le muestran el rendimiento de sus shows en diferentes períodos de tiempo.',
    'wizard.quickActions.title': 'Acciones Rápidas',
    'wizard.quickActions.description': 'Cree nuevos shows, clips o bibliotecas de medios directamente desde aquí.',
    
    // Pages
    'page.overview.title': 'Resumen',
    'page.overview.subtitle': 'Bienvenido a MOVEX - Su Plataforma de Live Shopping',
    'page.shows.title': 'Shows',
    'page.shows.subtitle': 'Gestione sus Shows de Live Shopping',
    'page.clips.title': 'Clips',
    'page.clips.subtitle': 'Cree y gestione sus clips de video.',
    'page.mediaLibrary.title': 'Biblioteca de Medios',
    'page.mediaLibrary.subtitle': 'Organice su contenido en bibliotecas estructuradas.',
    'page.users.title': 'Gestión de Equipo',
    'page.users.subtitle': 'Gestione miembros del equipo y sus permisos.',
    'page.analytics.title': 'Analíticas',
    'page.analytics.subtitle': 'Perspectivas detalladas de su rendimiento.',
    'page.customisation.title': 'Personalización',
    'page.customisation.subtitle': 'Personalice su plataforma MOVEX',
    
    // Language names
    'language.de': 'Deutsch',
    'language.en': 'English',
    'language.es': 'Español',
    'language.zh-TW': '繁體中文'
  },
  'zh-TW': {
    // Navigation
    'nav.overview': '總覽',
    'nav.shows': '節目',
    'nav.clips': '片段',
    'nav.mediaLibrary': '媒體庫',
    'nav.users': '用戶',
    'nav.analytics': '分析',
    'nav.customisation': '自定義',
    'nav.support': '支援',
    'nav.streamingApp': '串流應用程式',
    
    // Common actions
    'action.create': '創建',
    'action.save': '保存',
    'action.cancel': '取消',
    'action.delete': '刪除',
    'action.edit': '編輯',
    'action.search': '搜索',
    'action.startTour': '開始導覽',
    'action.back': '返回',
    'action.next': '下一步',
    'action.finish': '完成導覽',
    'action.skip': '跳過',
    
    // Wizard steps
    'wizard.welcome.title': '歡迎使用 MOVEX',
    'wizard.welcome.description': '您的直播購物平台，提供互動式銷售體驗。在這裡獲得所有重要指標的概覽。',
    'wizard.performance.title': '性能儀表板',
    'wizard.performance.description': '實時跟踪您的關鍵 KPI，如觀眾數量、轉換率和參與度。',
    'wizard.analytics.title': '分析概覽',
    'wizard.analytics.description': '詳細圖表顯示您的節目在不同時間段的表現。',
    'wizard.quickActions.title': '快速操作',
    'wizard.quickActions.description': '直接從這裡創建新的節目、片段或媒體庫。',
    
    // Pages
    'page.overview.title': '總覽',
    'page.overview.subtitle': '歡迎使用 MOVEX - 您的直播購物平台',
    'page.shows.title': '節目',
    'page.shows.subtitle': '管理您的直播購物節目',
    'page.clips.title': '片段',
    'page.clips.subtitle': '創建和管理您的視頻片段。',
    'page.mediaLibrary.title': '媒體庫',
    'page.mediaLibrary.subtitle': '在結構化庫中組織您的內容。',
    'page.users.title': '團隊管理',
    'page.users.subtitle': '管理團隊成員及其權限。',
    'page.analytics.title': '分析',
    'page.analytics.subtitle': '您表現的詳細洞察。',
    'page.customisation.title': '自定義',
    'page.customisation.subtitle': '個性化您的 MOVEX 平台',
    
    // Language names
    'language.de': 'Deutsch',
    'language.en': 'English',
    'language.es': 'Español',
    'language.zh-TW': '繁體中文'
  }
};

export const useTranslation = (language: Language) => {
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return { t };
};

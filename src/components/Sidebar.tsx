
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Video, 
  Scissors, 
  Library, 
  Users, 
  Settings, 
  Download,
  HelpCircle,
  Play,
  User,
  UserCog
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const Sidebar = () => {
  const { t } = useLanguage();
  
  const navItems = [
    {
      section: 'Overview',
      items: [
        { icon: BarChart3, label: t('nav.overview'), path: '/', id: 'overview' }
      ]
    },
    {
      section: 'Content Management',
      items: [
        { icon: Video, label: t('nav.shows'), path: '/shows', id: 'shows' },
        { icon: Scissors, label: t('nav.clips'), path: '/clips', id: 'clips' },
        { icon: Library, label: t('nav.mediaLibrary'), path: '/media-library', id: 'media-library' }
      ]
    },
    {
      section: 'Analytics & Users',
      items: [
        { icon: BarChart3, label: t('nav.analytics'), path: '/analytics', id: 'analytics' },
        { icon: Users, label: t('nav.users'), path: '/users', id: 'users' }
      ]
    },
    {
      section: 'Tools',
      items: [
        { icon: Download, label: t('nav.streamingApp'), path: '/streaming', id: 'streaming-app' }
      ]
    },
    {
      section: 'Settings',
      items: [
        { icon: Settings, label: 'Customisation', path: '/customisation', id: 'customisation' },
        { icon: User, label: 'User Settings', path: '/user-settings', id: 'user-settings' },
        { icon: UserCog, label: 'Account Settings', path: '/account-settings', id: 'account-settings' }
      ]
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col" data-onboarding="sidebar">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-movex-blue rounded-lg flex items-center justify-center">
            <Play className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">MOVEX</h1>
            <p className="text-xs text-gray-500">Live Shopping</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {navItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              {section.section}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    data-onboarding={item.id}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                      ${isActive 
                        ? 'bg-movex-light text-movex-blue font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Support */}
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 w-full">
          <HelpCircle size={18} />
          <span>{t('nav.support')}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

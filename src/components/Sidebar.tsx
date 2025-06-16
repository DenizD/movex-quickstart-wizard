
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
  UserCog,
  ShoppingBag,
  Calendar,
  MessageSquare,
  TrendingUp,
  Zap,
  Globe,
  CreditCard,
  LogOut,
  ChevronDown,
  Building
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const Sidebar = () => {
  const { t } = useLanguage();
  
  const navItems = [
    {
      section: '🎬 Content Management',
      items: [
        { icon: BarChart3, label: 'Overview', path: '/', id: 'overview' },
        { icon: Video, label: 'Shows', path: '/shows', id: 'shows' },
        { icon: Scissors, label: 'Clips', path: '/clips', id: 'clips' },
        { icon: Library, label: 'Media Library', path: '/media-library', id: 'media-library' }
      ]
    },
    {
      section: '📡 Live-Streaming',
      items: [
        { icon: Download, label: 'Streaming App', path: '/streaming', id: 'streaming-app' }
      ]
    },
    {
      section: '👥 User Management',
      items: [
        { icon: Users, label: 'Users', path: '/users', id: 'users' },
        { icon: Settings, label: 'Customisation', path: '/customisation', id: 'customisation' }
      ]
    },
    {
      section: '📊 Analytics & Insights',
      items: [
        { icon: BarChart3, label: 'Analytics', path: '/analytics', id: 'analytics' }
      ]
    },
    {
      section: '💼 Billing & Plans',
      items: [
        { icon: CreditCard, label: 'Manage Plan', path: '/account-settings', id: 'account-settings' },
        { icon: TrendingUp, label: 'Payment History', path: '/payment-history', id: 'payment-history' },
        { icon: Zap, label: 'Usage', path: '/usage', id: 'usage' }
      ]
    },
    {
      section: '⚙️ Settings',
      items: [
        { icon: Building, label: 'Company Settings', path: '/company-settings', id: 'company-settings' },
        { icon: HelpCircle, label: 'Support', path: '/support', id: 'support' },
        { icon: Globe, label: 'Language (En)', path: '/language', id: 'language' }
      ]
    },
    {
      section: '👤 My Area',
      items: [
        { icon: User, label: 'Profile (Deniz OSP)', path: '/user-settings', id: 'user-settings' },
        { icon: UserCog, label: 'Show Role', path: '/role', id: 'role' },
        { icon: LogOut, label: 'Logout', path: '/logout', id: 'logout' }
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
      <nav className="flex-1 p-4 overflow-y-auto">
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
    </div>
  );
};

export default Sidebar;

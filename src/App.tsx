import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/components/LanguageProvider';
import Layout from '@/components/Layout';
import Index from '@/pages/Index';
import Shows from '@/pages/Shows';
import CreateShow from '@/pages/CreateShow';
import Clips from '@/pages/Clips';
import CreateClip from '@/pages/CreateClip';
import MediaLibrary from '@/pages/MediaLibrary';
import CreateMediaLibrary from '@/pages/CreateMediaLibrary';
import Users from '@/pages/Users';
import Analytics from '@/pages/Analytics';
import Customisation from '@/pages/Customisation';
import UserSettings from '@/pages/UserSettings';
import AccountSettings from '@/pages/AccountSettings';
import NotFound from '@/pages/NotFound';
import Signup from '@/pages/Signup';
import './App.css';

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes with Layout */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shows" element={<Shows />} />
                <Route path="/shows/create" element={<CreateShow />} />
                <Route path="/clips" element={<Clips />} />
                <Route path="/clips/create" element={<CreateClip />} />
                <Route path="/media-library" element={<MediaLibrary />} />
                <Route path="/media-library/create" element={<CreateMediaLibrary />} />
                <Route path="/streaming" element={<div className="p-6"><h1 className="text-2xl font-bold">Streaming App</h1><p>Download and manage your streaming application.</p></div>} />
                <Route path="/users" element={<Users />} />
                <Route path="/customisation" element={<Customisation />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/account-settings" element={<AccountSettings />} />
                <Route path="/payment-history" element={<div className="p-6"><h1 className="text-2xl font-bold">Payment History</h1><p>View your billing and payment history.</p></div>} />
                <Route path="/usage" element={<div className="p-6"><h1 className="text-2xl font-bold">Usage</h1><p>Monitor your platform usage and consumption.</p></div>} />
                <Route path="/company-settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Company Settings</h1><p>Manage your company-wide settings and configurations.</p></div>} />
                <Route path="/support" element={<div className="p-6"><h1 className="text-2xl font-bold">Support</h1><p>Get help and contact our support team.</p></div>} />
                <Route path="/language" element={<div className="p-6"><h1 className="text-2xl font-bold">Language Settings</h1><p>Change your language preferences.</p></div>} />
                <Route path="/user-settings" element={<UserSettings />} />
                <Route path="/role" element={<div className="p-6"><h1 className="text-2xl font-bold">Role Information</h1><p>View your current role and permissions.</p></div>} />
                <Route path="/logout" element={<div className="p-6"><h1 className="text-2xl font-bold">Logout</h1><p>You have been logged out successfully.</p></div>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;

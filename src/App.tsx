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
import './App.css';

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shows" element={<Shows />} />
            <Route path="/shows/create" element={<CreateShow />} />
            <Route path="/clips" element={<Clips />} />
            <Route path="/clips/create" element={<CreateClip />} />
            <Route path="/media-library" element={<MediaLibrary />} />
            <Route path="/media-library/create" element={<CreateMediaLibrary />} />
            <Route path="/users" element={<Users />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/customisation" element={<Customisation />} />
            <Route path="/user-settings" element={<UserSettings />} />
            <Route path="/account-settings" element={<AccountSettings />} />
            <Route path="/streaming" element={<div className="p-6"><h1 className="text-2xl font-bold">Streaming App</h1><p>Coming soon...</p></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
};

export default App;

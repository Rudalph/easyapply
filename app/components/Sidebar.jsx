'use client';

import React, { useState } from 'react';
import { Home, Search, Library, PlusSquare, Heart, User, Settings, Menu, X } from 'lucide-react';
import Profile from '@/app/profile/page'
import Logout from "@/app/logout/page"

const Sidebar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');

  const displayName = user?.displayName || 'Guest User';

  const menuItems = [
    { name: 'Dashboard', icon: Home, shortcut: '⌘D' },
    { name: 'Explore', icon: Search },
    { name: 'Library', icon: Library },
    { name: 'Create', icon: PlusSquare },
    { name: 'Favorites', icon: Heart, badge: '12' },
    { name: 'Profile', icon: User },
    { name: 'Settings', icon: Settings },
  ];

  const handleMenuClick = (name) => {
    setActivePage(name);
    setIsOpen(false); // Close on mobile
  };

  const renderPage = () => {
    switch (activePage) {
    //   case 'Dashboard': return <Dashboard />;
    //   case 'Explore': return <Explore />;
    //   case 'Library': return <LibraryPage />;
    //   case 'Create': return <Create />;
    //   case 'Favorites': return <Favorites />;
      case 'Profile': return <Profile />;
    //   case 'Settings': return <SettingsPage />;
      default: return <Logout />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-3 bg-black text-white rounded-lg shadow-lg hover:bg-gray-900 transition-all lg:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Fixed Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-black text-white flex flex-col z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold tracking-tight">ezApply</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.slice(0, 5).map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleMenuClick(item.name)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group text-left ${
                    activePage === item.name
                      ? 'bg-gray-900 border border-gray-800'
                      : 'hover:bg-gray-900'
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      activePage !== item.name && 'group-hover:scale-110'
                    } transition-transform`}
                  />
                  <span className="font-medium">{item.name}</span>
                  {item.shortcut && activePage === item.name && (
                    <span className="ml-auto text-xs text-gray-500">{item.shortcut}</span>
                  )}
                  {item.badge && (
                    <span className="ml-auto text-xs bg-red-500 px-2 py-0.5 rounded-full text-[10px]">
                      {item.badge}
                    </span>
                  )}
                  {activePage === item.name && !item.badge && !item.shortcut && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="my-8 border-t border-gray-800" />

          <ul className="space-y-2">
            {menuItems.slice(5).map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleMenuClick(item.name)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                    activePage === item.name
                      ? 'bg-gray-900 opacity-100'
                      : 'opacity-70 hover:opacity-100 hover:bg-gray-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-800 border-t-gray-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-gray-800 rounded-full border-2 border-gray-700 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{displayName}</p>
              <p className="text-xs text-gray-400">Pro Member</p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Scrollable Main Content Area */}
      <main className="flex-1 ml-0 lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-10">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
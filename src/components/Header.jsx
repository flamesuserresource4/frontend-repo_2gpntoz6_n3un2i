import React from 'react';
import { Globe2, Search, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/70 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe2 className="w-6 h-6 text-cyan-400" />
          <span className="font-semibold tracking-tight text-lg">The Foreign Desk</span>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-slate-800/70 border border-slate-700 rounded-full px-3 py-1.5">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            className="bg-transparent outline-none text-sm placeholder:text-slate-400 w-64"
            placeholder="Search world topics, regions, conflicts..."
            aria-label="Search"
          />
        </div>
        <button className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-slate-200">
          <Menu className="w-5 h-5" />
          Menu
        </button>
      </div>
    </header>
  );
};

export default Header;

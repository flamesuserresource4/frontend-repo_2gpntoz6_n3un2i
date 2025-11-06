import React, { useState, useMemo } from 'react';
import { Globe2, Search, Menu, X } from 'lucide-react';
import { posts } from './posts.js';

const Header = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return posts.filter((p) =>
      [p.title, p.region, p.excerpt, ...(p.tags || [])].some((field) =>
        String(field).toLowerCase().includes(q)
      )
    ).slice(0, 6);
  }, [query]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/70 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <Globe2 className="w-6 h-6 text-cyan-400" />
          <span className="font-semibold tracking-tight text-lg">The Foreign Desk</span>
        </a>
        <div className="relative hidden md:flex items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-800/70 border border-slate-700 rounded-full px-3 py-1.5">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              className="bg-transparent outline-none text-sm placeholder:text-slate-400 w-64"
              placeholder="Search world topics, regions, conflicts..."
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {results.length > 0 && (
            <div className="absolute top-12 right-0 w-[32rem] bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
              <div className="max-h-96 overflow-y-auto divide-y divide-slate-800">
                {results.map((r) => (
                  <a key={r.id} href={`#post-${r.id}`} className="block px-4 py-3 hover:bg-slate-800/60">
                    <div className="text-sm font-semibold text-slate-100">{r.title}</div>
                    <div className="text-xs text-slate-400">{r.region} • {r.date}</div>
                    <div className="text-xs text-slate-400 line-clamp-2">{r.excerpt}</div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-slate-200"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          Menu
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900/80">
          <div className="px-4 py-3">
            <div className="flex items-center gap-2 bg-slate-800/70 border border-slate-700 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                className="bg-transparent outline-none text-sm placeholder:text-slate-400 w-full"
                placeholder="Search world topics, regions, conflicts..."
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {results.length > 0 && (
              <div className="mt-3 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-800">
                  {results.map((r) => (
                    <a key={r.id} href={`#post-${r.id}`} className="block px-4 py-3 hover:bg-slate-800/60">
                      <div className="text-sm font-semibold text-slate-100">{r.title}</div>
                      <div className="text-xs text-slate-400">{r.region} • {r.date}</div>
                      <div className="text-xs text-slate-400 line-clamp-2">{r.excerpt}</div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

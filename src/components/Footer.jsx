import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 py-10 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-semibold">The Foreign Desk</p>
            <p className="text-slate-400 text-sm">Daily analysis on geopolitics, markets, and power.</p>
          </div>
          <div className="text-slate-400 text-sm">
            © {new Date().getFullYear()} The Foreign Desk. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

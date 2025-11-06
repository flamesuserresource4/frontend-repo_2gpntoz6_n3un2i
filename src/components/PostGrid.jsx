import React from 'react';
import PostCard from './PostCard.jsx';

const samplePosts = [
  {
    title: 'Ceasefire Talks Shift Markets as Energy Corridor Opens',
    region: 'Middle East',
    excerpt: 'Weeklong negotiations reshape crude routes while regional actors recalibrate security guarantees.',
    date: 'Nov 6, 2025',
  },
  {
    title: 'Election Ripple Effects Across the Indo-Pacific',
    region: 'Asia-Pacific',
    excerpt: 'Defense compacts and semiconductor supply chains face new incentives after surprise coalition.',
    date: 'Nov 6, 2025',
  },
  {
    title: 'Central Bank Swaps and the Weaponization of Finance',
    region: 'Global',
    excerpt: 'Why liquidity lines and sanctions architecture now define geopolitical leverage beyond militaries.',
    date: 'Nov 5, 2025',
  },
  {
    title: 'Arctic Shipping Season Extends as Ice Retreats',
    region: 'Europe',
    excerpt: 'Northern routes accelerate minerals trade as insurers and navies race to update risk models.',
    date: 'Nov 4, 2025',
  },
];

const PostGrid = () => {
  return (
    <section id="latest" className="py-14 border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Latest Briefings</h2>
            <p className="text-slate-400 mt-1">Fresh, concise reads updated daily.</p>
          </div>
          <a href="#" className="text-cyan-400 hover:text-cyan-300 font-medium">View all</a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {samplePosts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
        <div id="subscribe" className="mt-14 bg-gradient-to-br from-cyan-500/10 via-cyan-400/5 to-transparent border border-cyan-400/20 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold">Get The Foreign Desk in your inbox</h3>
              <p className="text-slate-400 text-sm">A short daily read with charts and links. No spam, unsubscribe anytime.</p>
            </div>
            <form className="flex w-full sm:w-auto gap-2">
              <input type="email" required placeholder="you@domain.com" className="flex-1 sm:w-80 bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2 outline-none focus:border-cyan-400" />
              <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-4 py-2 rounded-lg">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostGrid;

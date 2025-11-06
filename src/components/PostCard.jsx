import React from 'react';
import { ArrowRight, Globe2 } from 'lucide-react';

const PostCard = ({ title, region, excerpt, date }) => {
  return (
    <article className="group bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-cyan-600/40 hover:bg-slate-900/80 transition-colors">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Globe2 className="w-4 h-4 text-cyan-400" />
        <span className="uppercase tracking-widest">{region}</span>
        <span>•</span>
        <time>{date}</time>
      </div>
      <h3 className="mt-3 text-xl font-semibold leading-snug group-hover:text-cyan-300">
        {title}
      </h3>
      <p className="mt-2 text-slate-400 text-sm leading-relaxed">{excerpt}</p>
      <button className="mt-4 inline-flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300">
        Read analysis
        <ArrowRight className="w-4 h-4" />
      </button>
    </article>
  );
};

export default PostCard;

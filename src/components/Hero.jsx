import React from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 grid lg:grid-cols-2 gap-10 items-center">
        <div className="order-2 lg:order-1">
          <span className="inline-flex items-center text-xs font-medium uppercase tracking-widest text-cyan-300/90 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-3 py-1 mb-4">Daily Geopolitics</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            The Foreign Desk
          </h1>
          <p className="mt-4 text-slate-300 text-lg leading-relaxed">
            Sharp analysis and on-the-ground reporting on the forces shaping our world. Explore regions, conflicts, markets, and diplomacy with an interactive reading experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#latest" className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-5 py-3 rounded-lg transition-colors">
              Read Latest
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#subscribe" className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 font-semibold px-5 py-3 rounded-lg transition-colors">
              Subscribe
            </a>
          </div>
        </div>
        <div className="relative h-[420px] sm:h-[520px] lg:h-[560px] order-1 lg:order-2">
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

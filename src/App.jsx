import React from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import PostGrid from './components/PostGrid.jsx';
import ArticleExample from './components/ArticleExample.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <main>
        <Hero />
        <PostGrid />
        <ArticleExample />
      </main>
      <Footer />
    </div>
  );
}

export default App;

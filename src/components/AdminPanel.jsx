import React, { useEffect, useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

export default function AdminPanel() {
  const [form, setForm] = useState({
    title: '',
    region: '',
    excerpt: '',
    date: '',
    tags: '',
    content: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [loadingList, setLoadingList] = useState(false);

  const resetForm = () => {
    setForm({ title: '', region: '', excerpt: '', date: '', tags: '', content: '' });
  };

  const fetchPosts = async () => {
    try {
      setLoadingList(true);
      const res = await fetch(`${API_BASE}/api/posts${query ? `?q=${encodeURIComponent(query)}` : ''}`);
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setTimeout(() => fetchPosts(), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const parsedPayload = useMemo(() => {
    const tags = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const content = form.content
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
    const date = form.date ? form.date : new Date().toISOString().slice(0, 10);

    return {
      title: form.title.trim(),
      region: form.region.trim(),
      excerpt: form.excerpt.trim(),
      date,
      tags,
      content,
    };
  }, [form]);

  const canSubmit = useMemo(() => {
    return (
      parsedPayload.title &&
      parsedPayload.region &&
      parsedPayload.excerpt &&
      parsedPayload.date &&
      parsedPayload.content.length > 0
    );
  }, [parsedPayload]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedPayload),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.detail || 'Failed to create post');
      }
      setSuccess('Post published successfully');
      resetForm();
      fetchPosts();
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="admin" className="relative py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Admin Panel</h2>
          <div className="text-sm text-slate-400">
            API: <span className="font-mono">{API_BASE}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
            <h3 className="mb-4 text-lg font-semibold">Create New Article</h3>
            {error && (
              <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
                {success}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Title">
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                  placeholder="e.g., Energy Politics in the Black Sea"
                />
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Region / Topic">
                  <input
                    type="text"
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                    placeholder="Europe, MENA, Asia..."
                  />
                </Field>
                <Field label="Publish Date">
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                  />
                </Field>
              </div>
              <Field label="Excerpt">
                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                  placeholder="A concise summary for the homepage card"
                />
              </Field>
              <Field label="Tags (comma separated)">
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                  placeholder="sanctions, energy, security"
                />
              </Field>
              <Field label="Content (separate paragraphs by blank line)">
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows={8}
                  className="w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                  placeholder={'First paragraph...\n\nSecond paragraph...'}
                />
              </Field>
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md border border-slate-800 bg-slate-800/40 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={submitting || !canSubmit}
                  className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? 'Publishing...' : 'Publish'}
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recent Posts</h3>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts..."
                className="w-56 rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
              />
            </div>
            <div className="space-y-3">
              {loadingList && (
                <div className="text-sm text-slate-400">Loading...</div>
              )}
              {!loadingList && posts.length === 0 && (
                <div className="text-sm text-slate-400">No posts found.</div>
              )}
              {posts.map((p, idx) => (
                <div key={idx} className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm text-slate-400">{p.region} • {p.date}</div>
                      <div className="font-medium">{p.title}</div>
                    </div>
                    {Array.isArray(p.tags) && p.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {p.tags.map((t) => (
                          <span key={t} className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-300">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  {p.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm text-slate-300">{p.excerpt}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Search, Download, Sun, Moon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ── Searchable content index ──────────────────────────────
const searchIndex = [
  { label: "Dashboard",          path: "/dashboard",  section: "Main",       keywords: "home overview" },
  { label: "About Me",           path: "/about",      section: "Main",       keywords: "bio background who" },
  { label: "Experience",         path: "/experience", section: "Main",       keywords: "work history jobs cloud azure" },
  { label: "Projects",           path: "/projects",   section: "Main",       keywords: "portfolio work builds" },
  { label: "Skills",             path: "/skills",     section: "Main",       keywords: "tech stack tools languages" },
  { label: "Leo Club",           path: "/leo",        section: "Volunteer",  keywords: "leo lions volunteer community service" },
  { label: "Certifications",     path: "/certs",      section: "Security",   keywords: "az-500 sc-200 comptia microsoft azure certs" },
  { label: "Quiz",              path: "/quiz",       section: "Security",   keywords: "cybersecurity awareness quiz" },
  { label: "Security Lab",       path: "/lab",        section: "Security",   keywords: "tools demos ctf hacking analyzer" },
  { label: "Blog & Writeups",    path: "/blog",       section: "Security",   keywords: "articles posts ctf writeups" },
  { label: "Contact",            path: "/contact",    section: "Other",      keywords: "email reach out hire" },
];

// ── Live Clock ────────────────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-mono text-xs text-xdr-muted tabular-nums tracking-wider">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  );
}

// ── Main Topbar ───────────────────────────────────────────
export default function Topbar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof searchIndex>([]);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Search logic
  useEffect(() => {
    if (!query.trim()) { setResults([]); setOpen(false); return; }
    const q = query.toLowerCase();
    const matched = searchIndex.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q)
    );
    setResults(matched);
    setOpen(true);
  }, [query]);

  // Keyboard shortcut: "/" to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setQuery('');
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Theme toggle
  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', !dark);
  }, [dark]);

  const handleSelect = (path: string) => {
    navigate(path);
    setQuery('');
    setOpen(false);
  };

  return (
    <div className="h-16 glassXDR flex items-center px-4 md:px-6 border-b border-xdr-border shadow-control-room relative z-30">

      {/* Left: Logo — mobile only (hidden on desktop since sidebar shows it) */}
      <div className="flex md:hidden items-center space-x-2 mr-4 flex-shrink-0">
        <img src="/logo.png" alt="Sijen" className="w-8 h-8 rounded-lg object-cover" />
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-xl mx-auto relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-xdr-muted w-4 h-4 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            placeholder='Search pages, skills, certs… (press "/")'
            className="w-full pl-10 pr-8 py-2 bg-xdr-panel/50 border border-xdr-border rounded-lg text-sm text-xdr-text placeholder-xdr-muted focus:outline-none focus:border-xdr-info/50 transition-colors"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setOpen(true)}
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setOpen(false); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xdr-muted hover:text-xdr-text"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Search dropdown */}
        {open && results.length > 0 && (
          <div className="absolute top-full mt-2 w-full glassXDR border border-xdr-border rounded-xl shadow-control-room overflow-hidden">
            {results.map((item) => (
              <button
                key={item.path}
                onClick={() => handleSelect(item.path)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-xdr-panel/60 transition-colors text-left"
              >
                <span className="text-sm text-xdr-text font-medium">{item.label}</span>
                <span className="text-xs text-xdr-muted bg-xdr-panel/50 px-2 py-0.5 rounded-md">
                  {item.section}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* No results */}
        {open && query && results.length === 0 && (
          <div className="absolute top-full mt-2 w-full glassXDR border border-xdr-border rounded-xl shadow-control-room px-4 py-3">
            <p className="text-sm text-xdr-muted">No results for "<span className="text-xdr-text">{query}</span>"</p>
          </div>
        )}
      </div>

      {/* Right: Clock + Theme toggle + Download CV */}
      <div className="flex items-center space-x-3 ml-4 flex-shrink-0">

        {/* Live clock — hidden on small mobile */}
        <div className="hidden sm:flex items-center space-x-1.5 bg-xdr-panel/40 border border-xdr-border rounded-lg px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <LiveClock />
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setDark(!dark)}
          title="Toggle theme"
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-xdr-border hover:border-xdr-info/50 hover:bg-xdr-panel/50 transition-all text-xdr-muted hover:text-xdr-info"
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Download CV */}
        
          <a href="/cv.pdf"
          download
          title="Download CV"
          className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-xdr-info/40 text-xdr-info hover:bg-xdr-info/10 transition-all text-xs font-medium"
        >
          <Download className="w-3.5 h-3.5" />
          <span>CV</span>
        </a>
      </div>
    </div>
  );
}
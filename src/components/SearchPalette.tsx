import { useState, useEffect, useRef, useCallback } from 'react';

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  href: string;
  category?: string;
  icon?: React.ReactNode;
}

interface SearchPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch?: (query: string) => SearchResult[];
  placeholder?: string;
  results?: SearchResult[];
}

// Default search results for demo
const defaultResults: SearchResult[] = [
  { id: '1', title: 'Home', href: '/', category: 'Pages' },
  { id: '2', title: 'Work', href: '/work', category: 'Pages' },
  { id: '3', title: 'Writing', href: '/writing', category: 'Pages' },
  { id: '4', title: 'About', href: '/about', category: 'Pages' },
  { id: '5', title: 'Contact', href: '/contact', category: 'Pages' },
];

export default function SearchPalette({
  isOpen,
  onClose,
  onSearch,
  placeholder = 'Search...',
  results: externalResults,
}: SearchPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Filter results based on query
  const results = onSearch
    ? onSearch(query)
    : (externalResults || defaultResults).filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
      );

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            window.location.href = results[selectedIndex].href;
            onClose();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    },
    [results, selectedIndex, onClose]
  );

  // Global keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, onClose]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex, results.length]);

  if (!isOpen) return null;

  // Group results by category
  const groupedResults = results.reduce(
    (acc, result) => {
      const category = result.category || 'Results';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(result);
      return acc;
    },
    {} as Record<string, SearchResult[]>
  );

  let currentIndex = -1;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-os-black/50 backdrop-blur-sm transition-opacity duration-200 ease-out motion-reduce:transition-none"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Palette */}
      <div
        className="fixed inset-x-4 top-[20vh] z-50 mx-auto max-w-xl
          transform transition-all duration-200 ease-out motion-reduce:transition-none
          animate-slide-down"
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        <div className="overflow-hidden rounded-xl border border-os-light bg-os-white shadow-os-xl">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-os-light">
            <svg
              className="w-5 h-5 text-os-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 bg-transparent text-os-black placeholder-os-muted outline-none text-sm"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-os-muted bg-os-light rounded">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div ref={resultsRef} className="max-h-80 overflow-y-auto py-2">
            {results.length === 0 && query !== '' ? (
              <div className="px-4 py-8 text-center text-sm text-os-muted">
                No results found for "{query}"
              </div>
            ) : (
              Object.entries(groupedResults).map(([category, categoryResults]) => (
                <div key={category}>
                  <div className="px-4 py-2 text-xs font-semibold text-os-muted uppercase tracking-wide">
                    {category}
                  </div>
                  {categoryResults.map((result) => {
                    currentIndex++;
                    const itemIndex = currentIndex;
                    return (
                      <a
                        key={result.id}
                        href={result.href}
                        className={`
                          flex items-center gap-3 px-4 py-2 no-underline
                          transition-colors duration-150 ease-out motion-reduce:transition-none
                          ${
                            itemIndex === selectedIndex
                              ? 'bg-os-light text-os-black'
                              : 'text-os-dark hover:bg-os-light/50'
                          }
                        `}
                        onClick={onClose}
                        onMouseEnter={() => setSelectedIndex(itemIndex)}
                      >
                        {result.icon ? (
                          <span className="text-os-muted">{result.icon}</span>
                        ) : (
                          <svg
                            className="w-4 h-4 text-os-muted"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{result.title}</div>
                          {result.description && (
                            <div className="text-xs text-os-muted truncate">
                              {result.description}
                            </div>
                          )}
                        </div>
                        {itemIndex === selectedIndex && (
                          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium text-os-muted bg-os-white rounded border border-os-light">
                            ↵
                          </kbd>
                        )}
                      </a>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-os-light bg-os-light/30">
            <div className="flex items-center gap-4 text-xs text-os-muted">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-os-white rounded border border-os-light">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-os-white rounded border border-os-light">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-os-white rounded border border-os-light">↵</kbd>
                to select
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Hook for managing search palette state
export function useSearchPalette() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
  };
}

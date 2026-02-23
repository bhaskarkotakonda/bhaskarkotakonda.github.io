import { useState, useEffect } from 'react';

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  currentPath?: string;
  basePath?: string;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
];

export default function Navbar({ currentPath = '/', basePath = '/personal-os' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getFullPath = (path: string) => `${basePath}${path === '/' ? '' : path}`;

  const isActive = (href: string) => {
    const fullPath = getFullPath(href);
    if (href === '/') {
      return currentPath === fullPath || currentPath === `${fullPath}/`;
    }
    return currentPath.startsWith(fullPath);
  };

  const transitionClass = prefersReducedMotion
    ? ''
    : 'transition-all duration-200 ease-out';

  return (
    <header className="sticky top-0 z-50 bg-os-white/80 backdrop-blur-md border-b border-os-light">
      <nav className="max-w-content mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href={getFullPath('/')}
            className={`text-xl font-bold text-os-black no-underline hover:text-os-accent ${transitionClass}`}
          >
            <span className="text-os-accent">⊙</span> Personal OS
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.href} className="relative group">
                <a
                  href={getFullPath(link.href)}
                  className={`text-sm font-medium no-underline ${transitionClass} ${
                    isActive(link.href)
                      ? 'text-os-black'
                      : 'text-os-muted hover:text-os-accent'
                  }`}
                >
                  {link.label}
                  {/* Hover underline slide animation */}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-os-accent ${transitionClass} ${
                      isActive(link.href)
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    }`}
                    style={{
                      transitionDuration: prefersReducedMotion ? '0ms' : '200ms',
                    }}
                  />
                </a>
              </li>
            ))}
            <li>
              <a
                href={getFullPath('/login')}
                className={`inline-block px-4 py-1.5 text-sm font-medium border border-os-black rounded-md no-underline
                  hover:bg-os-black hover:text-os-white ${transitionClass}`}
              >
                Login
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 text-os-black hover:text-os-accent ${transitionClass}`}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden ${transitionClass}`}
          style={{
            maxHeight: isMenuOpen ? '300px' : '0',
            opacity: isMenuOpen ? 1 : 0,
          }}
        >
          <ul className="flex flex-col space-y-4 pb-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={getFullPath(link.href)}
                  className={`block text-sm font-medium no-underline ${transitionClass} ${
                    isActive(link.href)
                      ? 'text-os-black'
                      : 'text-os-muted hover:text-os-accent'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={getFullPath('/login')}
                className={`inline-block px-4 py-1.5 text-sm font-medium border border-os-black rounded-md no-underline
                  hover:bg-os-black hover:text-os-white ${transitionClass}`}
              >
                Login
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

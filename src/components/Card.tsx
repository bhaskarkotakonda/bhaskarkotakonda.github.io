/**
 * Card.tsx — Composable card component for structured content sections.
 *
 * Exports:
 *   - Card (default)   — Container with optional link wrapper, padding, and hover shadow.
 *   - CardHeader        — Top section (typically holds title + description).
 *   - CardTitle         — Heading element (h2/h3/h4).
 *   - CardDescription   — Muted subtitle text.
 *   - CardContent       — Arbitrary body content.
 *   - CardFooter        — Bottom section with top border.
 */
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  href?: string;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export default function Card({
  children,
  href,
  className = '',
  padding = 'md',
  hoverable = true,
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseClasses = `
    block rounded-lg border border-os-light bg-os-white
    ${paddingClasses[padding]}
    ${hoverable ? 'transition-shadow duration-200 ease-out motion-reduce:transition-none hover:shadow-os-md' : ''}
    ${className}
  `;

  if (href) {
    return (
      <a href={href} className={`${baseClasses} no-underline`}>
        {children}
      </a>
    );
  }

  return <div className={baseClasses}>{children}</div>;
}

/* ---------- Card sub-components ---------- */

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
  as?: 'h2' | 'h3' | 'h4';
  className?: string;
}

export function CardTitle({ children, as: Component = 'h3', className = '' }: CardTitleProps) {
  return (
    <Component className={`text-lg font-semibold text-os-black ${className}`}>
      {children}
    </Component>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return <p className={`text-sm text-os-muted mt-1 ${className}`}>{children}</p>;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={className}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`mt-4 pt-4 border-t border-os-light ${className}`}>{children}</div>
  );
}

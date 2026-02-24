/**
 * Button.tsx — Reusable button component with multiple visual variants and sizes.
 *
 * Exports:
 *   - Button (default) — `<button>` element with loading state, icon slots, and a11y support.
 *   - ButtonLink — `<a>` element styled identically to Button (for navigation).
 *
 * Variants: primary | secondary | outline | ghost
 * Sizes:    sm | md | lg
 *
 * All variants respect `prefers-reduced-motion` and include focus ring styles.
 */
import type { ReactNode, ButtonHTMLAttributes } from 'react';

/** Props for the `<button>` variant. Extends native HTML button attributes. */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-md
    transition-all duration-150 ease-out
    motion-reduce:transition-none motion-reduce:transform-none
    focus:outline-none focus:ring-2 focus:ring-os-accent focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    active:scale-[0.98]
  `;

  const variantClasses = {
    primary: 'bg-os-black text-os-white hover:bg-os-dark active:bg-os-gray',
    secondary: 'bg-os-accent text-os-black hover:bg-os-accent-hover',
    outline:
      'border border-os-black text-os-black bg-transparent hover:bg-os-black hover:text-os-white',
    ghost: 'text-os-dark hover:bg-os-light hover:text-os-accent',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        leftIcon
      )}
      {children}
      {rightIcon && !isLoading && rightIcon}
    </button>
  );
}

/**
 * ButtonLink — An `<a>` element styled as a button.
 * Use when the action navigates to a URL rather than triggering a JS event.
 */
interface ButtonLinkProps {
  children: ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
}

export function ButtonLink({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
}: ButtonLinkProps) {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-md no-underline
    transition-all duration-150 ease-out
    motion-reduce:transition-none motion-reduce:transform-none
    focus:outline-none focus:ring-2 focus:ring-os-accent focus:ring-offset-2
    active:scale-[0.98]
  `;

  const variantClasses = {
    primary: 'bg-os-black text-os-white hover:bg-os-dark active:bg-os-gray',
    secondary: 'bg-os-accent text-os-black hover:bg-os-accent-hover',
    outline:
      'border border-os-black text-os-black bg-transparent hover:bg-os-black hover:text-os-white',
    ghost: 'text-os-dark hover:bg-os-light hover:text-os-accent',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <a
      href={href}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}

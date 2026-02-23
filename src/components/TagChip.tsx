interface TagChipProps {
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  size?: 'sm' | 'md';
}

export default function TagChip({
  label,
  href,
  onClick,
  isActive = false,
  size = 'md',
}: TagChipProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  const baseClasses = `
    inline-flex items-center font-medium rounded-full
    border border-os-light bg-os-white text-os-dark
    transition-all duration-200 ease-out
    motion-reduce:transition-none
    hover:border-os-accent hover:text-os-accent
    focus:outline-none focus:ring-2 focus:ring-os-accent focus:ring-offset-2
    focus:border-os-accent
    ${sizeClasses[size]}
    ${isActive ? 'border-os-accent bg-os-accent-light text-os-black' : ''}
  `;

  if (href) {
    return (
      <a href={href} className={`${baseClasses} no-underline`}>
        {label}
      </a>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={baseClasses}>
        {label}
      </button>
    );
  }

  return <span className={baseClasses}>{label}</span>;
}

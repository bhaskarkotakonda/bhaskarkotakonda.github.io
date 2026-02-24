/**
 * Toast.tsx — Toast notification component with auto-dismiss.
 *
 * Exports:
 *   - Toast (default)  — Renders a positioned notification with icon, message, and close button.
 *   - useToast (hook)  — State management helper returning { toast, showToast, hideToast }.
 *
 * Types: success (green) | error (red) | info (blue) | warning (yellow)
 * Default duration: 3 000 ms (configurable via `duration` prop).
 * Respects `prefers-reduced-motion` for slide/fade animations.
 */
import { useState, useEffect, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  isVisible: boolean;
  onClose: () => void;
}

const typeConfig = {
  success: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
    className: 'bg-green-50 text-green-800 border-green-200',
    iconClassName: 'text-green-500',
  },
  error: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
    className: 'bg-red-50 text-red-800 border-red-200',
    iconClassName: 'text-red-500',
  },
  info: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    className: 'bg-blue-50 text-blue-800 border-blue-200',
    iconClassName: 'text-blue-500',
  },
  warning: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    className: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    iconClassName: 'text-yellow-500',
  },
};

export default function Toast({
  message,
  type = 'success',
  duration = 3000,
  isVisible,
  onClose,
}: ToastProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 250); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible && !isAnimating) return null;

  const config = typeConfig[type];

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50 max-w-sm
        flex items-center gap-3 px-4 py-3 rounded-lg border shadow-os-md
        transition-all duration-250 ease-out
        motion-reduce:transition-none
        ${config.className}
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
      `}
      role="alert"
      aria-live="polite"
    >
      <span className={config.iconClassName}>{config.icon}</span>
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={onClose}
        className="p-1 rounded hover:bg-black/5 transition-colors duration-150 motion-reduce:transition-none"
        aria-label="Dismiss"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

/**
 * useToast — Convenience hook for toast state management.
 * @returns {{ toast, showToast, hideToast }} — current state and control functions.
 */
export function useToast() {
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    setToast({ message, type, isVisible: true });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  }, []);

  return {
    toast,
    showToast,
    hideToast,
  };
}

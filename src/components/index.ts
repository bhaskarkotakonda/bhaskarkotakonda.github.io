/**
 * components/index.ts — Barrel re-export for all React UI components.
 *
 * Import from '@/components' (or '@components') instead of individual files:
 *   import { Button, Card, Toast, useToast } from '@/components';
 *
 * Note: Astro components (Navbar.astro, Footer.astro) are imported directly in
 * layout files — they are NOT re-exported here. The .tsx Navbar/Footer exports
 * below are alternative React implementations kept for reference.
 */
export { default as Navbar } from './Navbar';
export { default as Footer } from './Footer';
export { default as TagChip } from './TagChip';
export { default as Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
export { default as ListTable } from './ListTable';
export { default as Button, ButtonLink } from './Button';
export { default as Toast, useToast } from './Toast';
export { default as SearchPalette, useSearchPalette } from './SearchPalette';

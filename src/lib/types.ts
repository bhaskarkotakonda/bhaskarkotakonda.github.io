/**
 * lib/types.ts — Shared TypeScript interfaces for the personal OS app layer.
 *
 * These types represent a planned "personal operating system" data model including
 * user profiles, universal items (books, movies, tasks, etc.), daily logs, finance
 * snapshots, and an offline action queue.
 *
 * NOTE: These interfaces are aspirational — not all are actively used by the
 * current static Astro site. They serve as a specification for future dynamic
 * features (e.g., Supabase-backed CRUD, offline-first PWA sync).
 */

/** Authenticated user profile. */
export interface User {
  id: string;
  email: string;
  created_at: string;
}

/** Universal record for lists, captures, bookmarks, and tasks. */
export interface Item {
  id: string;
  space: 'library' | 'capture' | 'lists' | 'seattle';
  type: 'book' | 'movie' | 'podcast' | 'article' | 'note' | 'wishlist' | 'place' | 'task';
  title: string;
  url?: string;
  note?: string;
  tags: string[];
  status: 'inbox' | 'active' | 'done' | 'archived';
  meta: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/** Daily journal entry with mood, energy, wins, and tomorrow's plan. */
export interface DailyLog {
  id: string;
  date: string; // YYYY-MM-DD
  mood: 1 | 2 | 3 | 4 | 5;
  energy: 1 | 2 | 3 | 4 | 5;
  text: string;
  wins?: string[];
  tomorrow?: string[];
  created_at: string;
}

/** Point-in-time financial snapshot (assets, liabilities, net worth). */
export interface FinanceSnapshot {
  id: string;
  date: string; // YYYY-MM-DD
  assets_total: number;
  liabilities_total: number;
  net_worth: number;
  breakdown: {
    assets: Record<string, number>;
    liabilities: Record<string, number>;
  };
}

/** Offline queue entry — stores pending mutations for replay when back online. */
export interface QueuedAction {
  id: string;
  action: 'create' | 'update' | 'delete';
  store: 'items' | 'dailyLogs' | 'financeSnapshots';
  payload: unknown;
  timestamp: number;
}

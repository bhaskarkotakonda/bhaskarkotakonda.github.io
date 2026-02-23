// User
export interface User {
  id: string;
  email: string;
  created_at: string;
}

// Item - universal record for lists, captures, etc.
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

// Daily Log
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

// Finance Snapshot
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

// Offline queue entry
export interface QueuedAction {
  id: string;
  action: 'create' | 'update' | 'delete';
  store: 'items' | 'dailyLogs' | 'financeSnapshots';
  payload: unknown;
  timestamp: number;
}

import type { Item } from './types';
import { getAllItems } from './db';

export interface SearchOptions {
  space?: Item['space'];
  type?: Item['type'];
  status?: Item['status'];
  tags?: string[];
  limit?: number;
}

// Search items by title and tags
export async function searchItems(query: string, options: SearchOptions = {}): Promise<Item[]> {
  const items = await getAllItems();
  const normalizedQuery = query.toLowerCase().trim();

  let results = items.filter((item) => {
    // Text match on title
    const titleMatch = item.title.toLowerCase().includes(normalizedQuery);

    // Tag match
    const tagMatch = item.tags.some((tag) =>
      tag.toLowerCase().includes(normalizedQuery)
    );

    // Note match
    const noteMatch = item.note?.toLowerCase().includes(normalizedQuery) ?? false;

    return titleMatch || tagMatch || noteMatch;
  });

  // Apply filters
  if (options.space) {
    results = results.filter((item) => item.space === options.space);
  }
  if (options.type) {
    results = results.filter((item) => item.type === options.type);
  }
  if (options.status) {
    results = results.filter((item) => item.status === options.status);
  }
  if (options.tags?.length) {
    results = results.filter((item) =>
      options.tags!.some((tag) => item.tags.includes(tag))
    );
  }

  // Sort by updated_at descending
  results.sort((a, b) =>
    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  // Limit results
  if (options.limit) {
    results = results.slice(0, options.limit);
  }

  return results;
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const items = await getAllItems();
  const tagSet = new Set<string>();
  items.forEach((item) => item.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

// Filter items by multiple criteria
export async function filterItems(options: SearchOptions): Promise<Item[]> {
  let items = await getAllItems();

  if (options.space) {
    items = items.filter((item) => item.space === options.space);
  }
  if (options.type) {
    items = items.filter((item) => item.type === options.type);
  }
  if (options.status) {
    items = items.filter((item) => item.status === options.status);
  }
  if (options.tags?.length) {
    items = items.filter((item) =>
      options.tags!.every((tag) => item.tags.includes(tag))
    );
  }

  items.sort((a, b) =>
    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  if (options.limit) {
    items = items.slice(0, options.limit);
  }

  return items;
}

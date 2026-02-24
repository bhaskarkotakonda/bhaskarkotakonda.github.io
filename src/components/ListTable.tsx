/**
 * ListTable.tsx — Data table for displaying items with title, tags, status badges,
 * and formatted dates. Used on listing pages (e.g., writing index, projects).
 *
 * Renders a responsive table with:
 *   - Clickable item titles (optional href)
 *   - Tag chips via `<TagChip>`
 *   - Color-coded status badges (draft / in-progress / published / archived)
 *   - Locale-formatted dates
 *   - Empty-state message when no items are passed
 */
import TagChip from './TagChip';

/** A single row in the ListTable. */
interface ListItem {
  id: string;
  title: string;
  href?: string;
  tags: string[];
  status: 'draft' | 'in-progress' | 'published' | 'archived';
  lastUpdated: string | Date;
}

interface ListTableProps {
  items: ListItem[];
  emptyMessage?: string;
}

const statusConfig = {
  draft: {
    label: 'Draft',
    className: 'bg-os-light text-os-muted',
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-os-accent-light text-os-dark',
  },
  published: {
    label: 'Published',
    className: 'bg-green-100 text-green-800',
  },
  archived: {
    label: 'Archived',
    className: 'bg-os-light text-os-muted',
  },
};

function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function ListTable({
  items,
  emptyMessage = 'No items found',
}: ListTableProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-os-muted">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-os-light">
            <th className="text-left py-3 px-4 text-sm font-semibold text-os-dark">
              Title
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-os-dark hidden md:table-cell">
              Tags
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-os-dark">
              Status
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-os-dark hidden sm:table-cell">
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-b border-os-light transition-colors duration-150 ease-out motion-reduce:transition-none hover:bg-os-light/50"
            >
              <td className="py-4 px-4">
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm font-medium text-os-black no-underline hover:text-os-accent-hover transition-colors duration-200 ease-out motion-reduce:transition-none"
                  >
                    {item.title}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-os-black">
                    {item.title}
                  </span>
                )}
              </td>
              <td className="py-4 px-4 hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <TagChip key={tag} label={tag} size="sm" />
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-xs text-os-muted px-2 py-0.5">
                      +{item.tags.length - 3}
                    </span>
                  )}
                </div>
              </td>
              <td className="py-4 px-4">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[item.status].className}`}
                >
                  {statusConfig[item.status].label}
                </span>
              </td>
              <td className="py-4 px-4 text-sm text-os-muted hidden sm:table-cell">
                {formatDate(item.lastUpdated)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

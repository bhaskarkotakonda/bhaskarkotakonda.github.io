import React, { useState, useMemo } from 'react';

// Define the shape of our Processed_Nodes
interface Node {
  id: string;
  title: string;
  summary: string;
  importance_score: number;
  tags: string[];
  created_at: string;
  canonical_url: string;
}

export default function OsLibraryTable({ initialNodes }: { initialNodes: Node[] }) {
  const [filterTag, setFilterTag] = useState<string>('All');
  const [minScore, setMinScore] = useState<number>(0);

  // Extract all unique tags dynamically
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    (initialNodes || []).forEach(n => n.tags?.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [initialNodes]);

  const filteredNodes = useMemo(() => {
    return (initialNodes || []).filter(node => {
      const matchTag = filterTag === 'All' || node.tags?.includes(filterTag);
      const matchScore = node.importance_score >= minScore;
      return matchTag && matchScore;
    });
  }, [initialNodes, filterTag, minScore]);

  return (
    <div>
      {/* Filters UI */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select 
          value={filterTag} 
          onChange={(e) => setFilterTag(e.target.value)}
          className="bg-[#1f2833] border border-gray-800 text-gray-300 font-bold tracking-wide text-sm rounded-xl px-4 py-3 focus:border-[#45a29e] outline-none cursor-pointer"
        >
          <option value="All">All Topics</option>
          {allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
        </select>
        
        <select 
          value={minScore.toString()} 
          onChange={(e) => setMinScore(Number(e.target.value))}
          className="bg-[#1f2833] border border-gray-800 text-gray-300 font-bold tracking-wide text-sm rounded-xl px-4 py-3 focus:border-[#45a29e] outline-none cursor-pointer"
        >
          <option value="0">Any Priority</option>
          <option value="6">Priority &gt; 5</option>
          <option value="8">Super High Priority (Guides)</option>
        </select>
      </div>

      {/* Library Table */}
      <div className="bg-[#1f2833]/10 rounded-3xl border border-[#1f2833] overflow-x-auto shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead className="bg-black/40 text-gray-500 uppercase tracking-[0.2em] text-[10px]">
             <tr>
              <th className="px-6 py-5 font-bold border-b border-[#1f2833]">Topic</th>
              <th className="px-6 py-5 font-bold border-b border-[#1f2833] w-24">Priority</th>
              <th className="px-6 py-5 font-bold border-b border-[#1f2833]">Tags</th>
              <th className="px-6 py-5 font-bold border-b border-[#1f2833] text-right w-40">Ingested At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1f2833]/50">
            {filteredNodes.map(node => (
              <tr key={node.id} className="hover:bg-[#1f2833]/40 transition-colors group cursor-pointer" onClick={() => window.location.href=`/os/study/${node.id}`}>
                <td className="px-6 py-5">
                  <a href={`/os/study/${node.id}`} className="block font-bold text-gray-200 group-hover:text-[#66fcf1] transition-colors mb-1 line-clamp-1">{node.title}</a>
                  <p className="text-xs text-gray-500 line-clamp-1 max-w-[400px]">{node.summary}</p>
                </td>
                <td className="px-6 py-5 font-mono text-gray-300 font-bold">
                  {node.importance_score}<span className="text-gray-600 text-[10px]">/10</span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex gap-1.5 flex-wrap">
                    {node.tags?.slice(0, 3).map((t) => (
                      <span key={t} className="bg-black/30 border border-gray-800 px-2 py-0.5 rounded-md text-[10px] text-gray-400 font-mono tracking-tighter shadow-sm uppercase">{t}</span>
                    ))}
                    {(node.tags?.length || 0) > 3 && <span className="bg-transparent text-[10px] text-gray-600 font-bold py-0.5">+{node.tags.length - 3}</span>}
                  </div>
                </td>
                <td className="px-6 py-5 text-right text-gray-500 font-mono text-[11px] whitespace-nowrap">
                  {new Date(node.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric'})}
                </td>
              </tr>
            ))}
            {filteredNodes.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 border-none font-medium">No records found matching filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

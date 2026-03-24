import React, { useState } from 'react';

export default function OsProcessButton({ pendingCount }: { pendingCount: number }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleProcess = async () => {
    setLoading(true);
    setResult("Triggering the AI Brain...");
    try {
      // Calling the API endpoint. No auth headers needed because Astro+Clerk 
      // automatically read the cookies on the server-side logic we wrote.
      const res = await fetch('/api/process-queue', {
        method: 'POST'
      });
      
      const data = await res.json();
      if (res.ok) {
        setResult(`Success! Digested ${data.processed?.length || 0} items.`);
        setTimeout(() => window.location.reload(), 1500); // refresh the page feed
      } else {
        setResult('Error processing queue: ' + (data.message || 'Unauthorized'));
      }
    } catch (e: any) {
      setResult('Failed to trigger background processing: ' + e.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-start gap-3 mt-4">
      <button 
        onClick={handleProcess}
        disabled={loading || pendingCount === 0}
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all shadow-md active:scale-95"
      >
        {loading ? 'Processing Queue...' : `Process Pending Queue (${pendingCount})`}
      </button>
      {result && <span className="text-sm font-mono text-emerald-400 p-2 bg-gray-900 rounded-md border border-gray-800">{result}</span>}
    </div>
  );
}

import React from 'react';

export default function WorldwideGrossCard({ data }) {
  if (!data) return null;

  return (
    <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/40 rounded-xl p-6 hover:border-amber-500/60 transition-colors">
      <p className="text-xs font-semibold text-amber-300 uppercase mb-4 tracking-wider">Worldwide Gross Total</p>
      <p className="text-3xl font-bold text-amber-200">
        {data || 'N/A'}
      </p>
      <div className="mt-3 h-1 bg-gradient-to-r from-amber-500/50 to-transparent rounded-full"></div>
    </div>
  );
}

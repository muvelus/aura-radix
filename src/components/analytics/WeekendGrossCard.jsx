import React from 'react';

export default function WeekendGrossCard({ data }) {
  if (!data) return null;

  return (
    <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/5 border border-purple-500/40 rounded-xl p-6 hover:border-purple-500/60 transition-colors">
      <p className="text-xs font-semibold text-purple-300 uppercase mb-4 tracking-wider">Weekend Gross Cumulative</p>
      <p className="text-3xl font-bold text-purple-200">
        {data || 'N/A'}
      </p>
      <div className="mt-3 h-1 bg-gradient-to-r from-purple-500/50 to-transparent rounded-full"></div>
    </div>
  );
}

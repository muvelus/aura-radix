import React from 'react';

export default function PredictionMetadataCard({ metadata }) {
  if (!metadata) return null;

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-5">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Identified Period</p>
        <p className="text-xl font-bold text-white">{metadata.identified_period || 'N/A'}</p>
      </div>
      <div className="border-t border-slate-700 pt-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Analysis Logic</p>
        <p className="text-sm text-slate-300 leading-relaxed">{metadata.analysis_logic || 'N/A'}</p>
      </div>
    </div>
  );
}

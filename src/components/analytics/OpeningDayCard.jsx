import React from 'react';

export default function OpeningDayCard({ data }) {
  if (!data) return null;

  return (
    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/40 rounded-xl p-6 hover:border-blue-500/60 transition-colors">
      <p className="text-xs font-semibold text-blue-300 uppercase mb-4 tracking-wider">Opening Day Collection</p>
      <p className="text-3xl font-bold text-blue-200 mb-3">
        {data.estimated_range || 'N/A'}
      </p>
      <div className="bg-blue-600/30 rounded-lg px-3 py-2 inline-block">
        <p className="text-xs font-semibold text-blue-200">
          Confidence: <span className="text-blue-100">{data.confidence_level || 'N/A'}</span>
        </p>
      </div>
    </div>
  );
}

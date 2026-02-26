import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function MarketVerdictCard({ verdict }) {
  if (!verdict) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent border border-emerald-500/40 rounded-xl p-8 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wide mb-1">Market Verdict</p>
          <p className="text-sm text-emerald-200">Expected Performance</p>
        </div>
        <span className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-bold text-2xl shadow-lg">
          {verdict}
        </span>
      </div>
    </div>
  );
}

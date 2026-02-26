import React from 'react';
import { Award } from 'lucide-react';

export default function StrategicFitCard({ strategicFit }) {
  if (!strategicFit) return null;

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-6">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <Award className="w-5 h-5 text-amber-400" />
        Strategic Fit
      </h3>
      
      <div className="bg-slate-700/30 rounded-lg p-5">
        <p className="text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider">Optimal Genre</p>
        <p className="text-lg font-bold text-amber-300">{strategicFit.optimal_genre || 'N/A'}</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase mb-4 tracking-wider">Key Success Factors</p>
        <div className="flex flex-wrap gap-3">
          {strategicFit.key_success_factors && strategicFit.key_success_factors.length > 0 ? (
            strategicFit.key_success_factors.map((factor, idx) => (
              <span key={idx} className="px-5 py-2 bg-gradient-to-r from-emerald-600/80 to-emerald-500/60 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-shadow">
                {factor}
              </span>
            ))
          ) : (
            <p className="text-xs text-slate-400">No factors available</p>
          )}
        </div>
      </div>
    </div>
  );
}

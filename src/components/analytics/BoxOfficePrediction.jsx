import React, { useMemo } from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { boxOfficePredictions } from '../../dummydata/boxOffice';
import { topBoxOffice } from '../../dummydata/topBoxOffice';

export default function BoxOfficePrediction({ selectedEntity }) {
  // Helper to format crores with two decimals
  // Helper to format crores with one decimal (e.g., "₹164.3 cr")
  const formatCr = (num) => {
    if (num == null || Number.isNaN(Number(num))) return '-';
    const n = Number(num);
    // Show one decimal place consistently, no grouping
    return `₹${n.toFixed(1)} cr`;
  };

  // Derive prediction from selectedEntity when available
  const prediction = useMemo(() => {
    if (!selectedEntity) {
      return {
        totalPrediction: 450,
        weekendPrediction: 125,
        openingDay: 45,
        confidence: 85,
        comparison: { previousFilm: 380, trend: 'up' }
      };
    }

    // 1) Look up centralized boxOfficePredictions by id (values stored in rupees)
    const byId = boxOfficePredictions[selectedEntity.id];
    if (byId) {
      // convert rupees -> crores (1 Cr = 10,000,000)
      const toCr = (v) => Math.round((v / 1e7) * 100) / 100;
      return {
        totalPrediction: toCr(byId.predicted),
        weekendPrediction: byId.weekendPrediction ? toCr(byId.weekendPrediction) : toCr(byId.predicted / 10),
        openingDay: byId.openingDay ? toCr(byId.openingDay) : toCr(byId.predicted / 20),
        confidence: byId.confidence || 70,
        comparison: { previousFilm: byId.range ? Math.round((byId.range.min / 1e7) * 100) / 100 : 0, trend: byId.trend || 'neutral' }
      };
    }

    // 2) Fallback: if the selected entity matches a title in topBoxOffice, use actuals
    const match = topBoxOffice.find(m =>
      m.id === selectedEntity.id || m.title === selectedEntity.name || m.title.toLowerCase() === (selectedEntity.name || '').toLowerCase()
    );
    if (match) {
      return {
        totalPrediction: Math.round(match.boxOffice * 100) / 100,
        weekendPrediction: Math.round((match.openingWeek || (match.boxOffice * 0.3)) * 100) / 100,
        openingDay: Math.round((match.openingDay || (match.boxOffice * 0.05)) * 100) / 100,
        confidence: 92,
        comparison: { previousFilm: Math.round((match.boxOffice * 0.8) * 100) / 100, trend: 'up' }
      };
    }

    // Default mock
    return {
      totalPrediction: 450,
      weekendPrediction: 125,
      openingDay: 45,
      confidence: 85,
      comparison: { previousFilm: 380, trend: 'up' }
    };
  }, [selectedEntity]);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Box Office Prediction</h3>
        <DollarSign className="w-5 h-5 text-green-500" />
      </div>

      <div className="space-y-6">
        {/* Total Prediction */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Total Collection (Predicted)</p>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-green-500">{formatCr(prediction.totalPrediction)}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            {prediction.comparison.trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className="text-sm text-muted-foreground">
              {prediction.comparison.trend === 'up' ? '+' : '-'}
              {formatCr(Math.abs(prediction.totalPrediction - prediction.comparison.previousFilm))} vs similar films
            </span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background rounded-lg p-4">
            <p className="text-xs text-muted-foreground uppercase mb-2">Opening Weekend</p>
            <p className="text-2xl font-bold text-foreground">{formatCr(prediction.weekendPrediction)}</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="text-xs text-muted-foreground uppercase mb-2">Opening Day</p>
            <p className="text-2xl font-bold text-foreground">{formatCr(prediction.openingDay)}</p>
          </div>
        </div>

        {/* Confidence Meter */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Confidence Score</p>
            <span className="text-sm font-semibold text-foreground">{prediction.confidence}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all"
              style={{ width: `${prediction.confidence}%` }}
            />
          </div>
        </div>

        {/* Factors */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground uppercase mb-3">Key Factors</p>
          <div className="space-y-2">
            {[
              { label: 'Star Power', value: 90 },
              { label: 'Genre Popularity', value: 75 },
              { label: 'Social Sentiment', value: 88 },
              { label: 'Release Window', value: 70 }
            ].map((factor, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-28">{factor.label}</span>
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${factor.value}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-foreground w-8">{factor.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

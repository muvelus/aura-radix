import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { dashboardService } from '../../api/dashboardService';
import { analyticsService } from '../../api/analyticsService';
import MarketVerdictCard from './MarketVerdictCard';
import PredictionMetadataCard from './PredictionMetadataCard';
import FinancialProjectionsSection from './FinancialProjectionsSection';
import StrategicFitCard from './StrategicFitCard';

export default function AIAnalyticsView({ selectedEntity, entityType }) {
  const [boxOfficePrediction, setBoxOfficePrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Call getBoxOfficePrediction and render data
    const fetchPrediction = async () => {
      try {
        setLoading(true);
        const movieId = selectedEntity?.id || selectedEntity?.movieId;
        if (!movieId) {
          setLoading(false);
          return;
        }
        const response = await analyticsService.getBoxOfficePrediction(movieId);
        setBoxOfficePrediction(response);
        setError(null);
      } catch (err) {
        console.error('Error fetching prediction:', err);
        setError(err.message || 'Failed to fetch prediction');
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [selectedEntity?.id]);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-3" />
          <p className="text-muted-foreground">Loading prediction...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-background p-6">
        <div className="text-center">
          <p className="text-destructive mb-2">Error: {error}</p>
          <p className="text-sm text-muted-foreground">Please try again or select another movie</p>
        </div>
      </div>
    );
  }

  if (!boxOfficePrediction?.predictedBoxOffice) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">No prediction data available</p>
        </div>
      </div>
    );
  }

  const pred = boxOfficePrediction.predictedBoxOffice;

  return (
    <div className="h-full overflow-y-auto bg-slate-950">
      {/* Header */}
      <div className="border-b border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 py-5">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-7 h-7 text-amber-400" />
          <h2 className="text-3xl font-bold text-white">
            Box Office Prediction for <span className="text-amber-400">{selectedEntity?.name || selectedEntity?.title}</span>
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          AI-powered analysis based on historical data, sentiment, and market trends
        </p>
      </div>

      {/* Content */}
      <div className="p-4 space-y-5">
        {/* Market Verdict Card */}
        {/* <MarketVerdictCard verdict={boxOfficePrediction?.predictedBoxOffice?.market_verdict} /> */}

        {/* Prediction Metadata */}
        <PredictionMetadataCard metadata={pred.prediction_metadata} />

        {/* Financial Projections Grid */}
        <FinancialProjectionsSection projections={pred.financial_projections} />

        {/* Strategic Fit */}
        <StrategicFitCard strategicFit={pred.strategic_fit} />
      </div>
    </div>
  );
}

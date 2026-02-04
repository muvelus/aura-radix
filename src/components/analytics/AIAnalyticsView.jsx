import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Award, Film, DollarSign, Sparkles, Loader2 } from 'lucide-react';
import { dashboardService } from '../../api/dashboardService';
import { analyticsService } from '../../api/analyticsService';

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
    <div className="h-full overflow-y-auto bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-6">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">
            Box Office Prediction for <span className="text-primary">{selectedEntity?.name || selectedEntity?.title}</span>
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          AI-powered analysis based on historical data, sentiment, and market trends
        </p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Market Verdict Card */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-foreground">Market Verdict</h3>
            <span className="px-6 py-3 bg-emerald-500/20 text-emerald-400 rounded-lg font-bold text-xl">
              {pred.market_verdict || 'N/A'}
            </span>
          </div>
        </div>

        {/* Prediction Metadata */}
        {pred.prediction_metadata && (
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Identified Period</p>
              <p className="text-lg font-medium text-foreground">{pred.prediction_metadata.identified_period || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Analysis Logic</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{pred.prediction_metadata.analysis_logic || 'N/A'}</p>
            </div>
          </div>
        )}

        {/* Financial Projections Grid */}
        {pred.financial_projections && (
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Financial Projections</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Opening Day */}
              <div className="bg-card border border-border rounded-lg p-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Opening Day Collection</p>
                <p className="text-3xl font-bold text-primary mb-2">
                  {pred.financial_projections.opening_day_collection?.estimated_range || 'N/A'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Confidence: {pred.financial_projections.opening_day_collection?.confidence_level || 'N/A'}
                </p>
              </div>

              {/* Weekend Gross */}
              <div className="bg-card border border-border rounded-lg p-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Weekend Gross Cumulative</p>
                <p className="text-3xl font-bold text-primary">
                  {pred.financial_projections.average_weekend_gross_cumulative || 'N/A'}
                </p>
              </div>

              {/* Worldwide Gross */}
              <div className="bg-card border border-border rounded-lg p-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Worldwide Gross Total</p>
                <p className="text-3xl font-bold text-primary">
                  {pred.financial_projections.mean_worldwide_gross_total || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Strategic Fit */}
        {pred.strategic_fit && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Strategic Fit</h3>
            
            <div className="mb-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Optimal Genre</p>
              <p className="text-lg font-semibold text-primary">{pred.strategic_fit.optimal_genre || 'N/A'}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Key Success Factors</p>
              <div className="flex flex-wrap gap-2">
                {pred.strategic_fit.key_success_factors && pred.strategic_fit.key_success_factors.length > 0 ? (
                  pred.strategic_fit.key_success_factors.map((factor, idx) => (
                    <span key={idx} className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                      {factor}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground">No factors available</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Award, Film, DollarSign, Sparkles } from 'lucide-react';
import { dashboardService } from '../../api/dashboardService';
import { analyticsService } from '../../api/analyticsService';

export default function AIAnalyticsView({ selectedEntity, entityType }) {
  const [activeAnalysis, setActiveAnalysis] = useState(null);
  const [boxOfficePrediction, setBoxOfficePrediction] = useState(null);
  const [predictionLoading, setPredictionLoading] = useState(true);
  const [predictionError, setPredictionError] = useState(null);

  if (!selectedEntity) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">No entity selected</p>
          <p className="text-xs text-muted-foreground mt-2">Please select an entity to view analytics</p>
        </div>
      </div>
    );
  }

  // Fetch box office prediction on component load
  useEffect(() => {
    const fetchBoxOfficePrediction = async () => {
      try {
        setPredictionLoading(true);
        const movieId = selectedEntity?.id || selectedEntity?.movieId;
        if (!movieId) {
          setPredictionLoading(false);
          return;
        }
        const response = await analyticsService.getBoxOfficePrediction(movieId);
        setBoxOfficePrediction(response.data);
        setPredictionError(null);
      } catch (err) {
        console.error('Error fetching box office prediction:', err);
        setPredictionError(err.message || 'Failed to fetch prediction');
      } finally {
        setPredictionLoading(false);
      }
    };

    fetchBoxOfficePrediction();
  }, [selectedEntity?.id]);

  const analysisCards = [
    {
      id: 'box-office',
      title: 'Box Office Prediction',
      description: 'Predict potential box office revenue based on project details.',
      icon: DollarSign,
      color: 'from-blue-500 to-blue-600',
      disabled: false
    },
    {
      id: 'trending-genre',
      title: 'Trending Genre Analysis',
      description: 'Get insights into currently popular film genres.',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      disabled: false
    },
    {
      id: 'hit-genre',
      title: 'Hit Genre Prediction',
      description: 'Analyze the potential of the project\'s genre.',
      icon: Award,
      color: 'from-blue-500 to-blue-600',
      disabled: false
    },
    {
      id: 'best-genre-date',
      title: 'Best Genre on this Date',
      description: 'Discover genres that historically succeeded on this date.',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      disabled: false
    },
    {
      id: 'top-box-office-date',
      title: 'Top Box Office on this Date',
      description: 'See top-grossing films released on this date.',
      icon: Film,
      color: 'from-blue-500 to-blue-600',
      disabled: false
    }
  ];

  const handleGenerateAnalysis = async (analysisId) => {
    setActiveAnalysis(analysisId);
    
    try {
      if (analysisId === 'box-office') {
        const movieId = selectedEntity?.id || selectedEntity?.movieId;
        if (!movieId) {
          console.error('No movie ID available for box office prediction');
          return;
        }
        const response = await dashboardService.getBoxOfficePrediction(movieId);
        console.log('Box Office Prediction Response:', response);
      } else {
        console.log(`Generating ${analysisId} analysis for:`, selectedEntity);
      }
    } catch (err) {
      console.error('Error generating analysis:', err);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-6">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">
            AI Analytics for {entityType === 'movie' ? 'Movie' : 'Celebrity'}: 
            <span className="text-primary ml-2">{selectedEntity?.name || selectedEntity?.title}</span>
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Leverage AI-powered insights to make data-driven decisions about your project
        </p>
      </div>

      {/* Analysis Cards Grid */}
      <div className="p-6">
        {/* Box Office Prediction Results */}
        {boxOfficePrediction && (
          <div className="mb-8 space-y-6">
            {/* Market Verdict Card */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-foreground">Market Verdict</h3>
                <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg font-bold text-lg">
                  {boxOfficePrediction.predictedBoxOffice?.market_verdict}
                </span>
              </div>
              
              {/* Prediction Metadata */}
              {boxOfficePrediction.predictedBoxOffice?.prediction_metadata && (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Identified Period</p>
                    <p className="text-foreground font-medium">{boxOfficePrediction.predictedBoxOffice.prediction_metadata.identified_period}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Analysis Logic</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{boxOfficePrediction.predictedBoxOffice.prediction_metadata.analysis_logic}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Financial Projections Grid */}
            {boxOfficePrediction.predictedBoxOffice?.financial_projections && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Opening Day */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Opening Day Collection</p>
                  <p className="text-2xl font-bold text-primary mb-2">
                    {boxOfficePrediction.predictedBoxOffice.financial_projections.opening_day_collection?.estimated_range}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Confidence: {boxOfficePrediction.predictedBoxOffice.financial_projections.opening_day_collection?.confidence_level}
                  </p>
                </div>

                {/* Weekend Gross */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Weekend Gross Cumulative</p>
                  <p className="text-2xl font-bold text-primary">
                    {boxOfficePrediction.predictedBoxOffice.financial_projections.average_weekend_gross_cumulative}
                  </p>
                </div>

                {/* Worldwide Gross */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Worldwide Gross Total</p>
                  <p className="text-2xl font-bold text-primary">
                    {boxOfficePrediction.predictedBoxOffice.financial_projections.mean_worldwide_gross_total}
                  </p>
                </div>
              </div>
            )}

            {/* Strategic Fit */}
            {boxOfficePrediction.predictedBoxOffice?.strategic_fit && (
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-4">Strategic Fit</p>
                <div className="mb-4">
                  <p className="text-lg font-bold text-foreground mb-2">Optimal Genre</p>
                  <p className="text-primary font-semibold">{boxOfficePrediction.predictedBoxOffice.strategic_fit.optimal_genre}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Key Success Factors</p>
                  <div className="flex flex-wrap gap-2">
                    {boxOfficePrediction.predictedBoxOffice.strategic_fit.key_success_factors?.map((factor, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-border pt-6" />
          </div>
        )}

        {/* Loading State */}
        {predictionLoading && !boxOfficePrediction && (
          <div className="mb-8 p-6 bg-card border border-border rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Loading box office prediction...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {predictionError && (
          <div className="mb-8 p-4 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg">
            <p>Error loading prediction: {predictionError}</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analysisCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`bg-card border border-border rounded-lg p-6 transition-all hover:shadow-lg ${
                  card.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {card.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-6 min-h-[40px]">
                  {card.description}
                </p>

                <button
                  onClick={() => !card.disabled && handleGenerateAnalysis(card.id)}
                  disabled={card.disabled}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                    card.disabled
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : 'bg-slate-700 text-slate-100 hover:bg-slate-600 border border-slate-600 hover:border-slate-500 shadow-md hover:shadow-lg'
                  }`}
                >
                  Generate Analysis
                </button>
              </div>
            );
          })}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">AI-Powered Insights Coming Soon</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            These advanced analytics features are currently in development. Each analysis will provide
            comprehensive insights powered by machine learning models trained on historical box office data,
            social media trends, and industry patterns.
          </p>
        </div>
      </div>

      {/* Analysis Results Panel (placeholder for future implementation) */}
      {activeAnalysis && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-card border border-border rounded-lg shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">
                {analysisCards.find(c => c.id === activeAnalysis)?.title}
              </h3>
              <button
                onClick={() => setActiveAnalysis(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Sparkles className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
                  <p className="text-muted-foreground">Analysis generation in progress...</p>
                  <p className="text-sm text-muted-foreground mt-2">This feature is coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

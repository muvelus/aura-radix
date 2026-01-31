import React, { useState } from 'react';
import { TrendingUp, Calendar, Award, Film, DollarSign, Sparkles } from 'lucide-react';

export default function AIAnalyticsView({ selectedEntity, entityType }) {
  const [activeAnalysis, setActiveAnalysis] = useState(null);

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

  const handleGenerateAnalysis = (analysisId) => {
    setActiveAnalysis(analysisId);
    // TODO: Implement AI analysis generation
    console.log(`Generating ${analysisId} analysis for:`, selectedEntity);
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

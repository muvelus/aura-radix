import React, { useState } from 'react';
import { Target, Plus, X, TrendingUp, MessageSquare, Search } from 'lucide-react';
import { competitorMoviesDB } from '../../dummydata';

export default function CompetitivePositioning({ competitiveData }) {
  const [competitors, setCompetitors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const filtered = competitorMoviesDB.filter(movie => 
      movie.name.toLowerCase().includes(query.toLowerCase()) &&
      !competitors.some(c => c.name === movie.name)
    );
    setFilteredMovies(filtered);
  };

  const handleInputFocus = () => {
    // Show all available competitors when input is focused
    const filtered = competitorMoviesDB.filter(movie => 
      !competitors.some(c => c.name === movie.name)
    );
    setFilteredMovies(filtered);
  };

  const addCompetitor = (movieData) => {
    if (competitors.length < 5) {
      const newComp = {
        id: Date.now(),
        ...movieData,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`
      };

      setCompetitors([...competitors, newComp]);
      setSearchQuery('');
      setFilteredMovies([]);
      setIsAdding(false);
    }
  };

  const removeCompetitor = (id) => {
    setCompetitors(competitors.filter(c => c.id !== id));
  };

  const getSentimentColor = (label) => {
    if (label === 'Positive') return 'text-green-500';
    if (label === 'Negative') return 'text-red-500';
    return 'text-yellow-500';
  };

  const formatMentions = (count) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Competitor Snapshot</h3>
      </div>

      {/* Add Competitor Form */}
      {isAdding && (
        <div className="mb-4 p-4 bg-accent/30 border border-border rounded-lg relative">
          <div className="flex items-center gap-2 mb-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={handleInputFocus}
              placeholder="Search competitor movie (e.g., War 2, Stree 3)"
              className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              autoFocus
            />
            <button
              onClick={() => {
                setIsAdding(false);
                setSearchQuery('');
                setFilteredMovies([]);
              }}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* Search Results */}
          {filteredMovies.length > 0 && (
            <div className="absolute left-4 right-4 top-[calc(100%-2.5rem)] max-h-[280px] overflow-y-auto bg-background border border-border rounded-lg shadow-lg z-50 w-auto">
              {filteredMovies.map((movie, idx) => (
                <button
                  key={idx}
                  onClick={() => addCompetitor(movie)}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors border-b border-border last:border-b-0"
                >
                  <div className="font-medium text-foreground">{movie.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {formatMentions(movie.totalMentions)} mentions
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {filteredMovies.length === 0 && searchQuery && (
            <p className="text-xs text-muted-foreground mt-2">
              No competitors found matching "{searchQuery}"
            </p>
          )}
          
          {filteredMovies.length === 0 && !searchQuery && (
            <p className="text-xs text-muted-foreground mt-2">
              No more competitors available
            </p>
          )}
          
          <p className="text-xs text-muted-foreground mt-2">
            Max 5 competitors • Search from available movies
          </p>
        </div>
      )}

      {/* Competitors Row */}
      <div className="flex items-stretch gap-4 flex-wrap relative z-0">
        {competitors.map((competitor) => (
          <div 
            key={competitor.id}
            className="relative w-[calc(20%-12.8px)] p-4 bg-accent/30 border border-border rounded-lg hover:border-primary/50 transition-colors group"
          >
            {/* Remove Button */}
            <button
              onClick={() => removeCompetitor(competitor.id)}
              className="absolute top-2 right-2 p-1 bg-background/80 hover:bg-red-500/20 text-muted-foreground hover:text-red-500 rounded transition-colors opacity-0 group-hover:opacity-100"
              title="Remove competitor"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Competitor Name */}
            <h4 className="text-sm font-semibold text-primary mb-3 pr-6">
              {competitor.name}
            </h4>

            {/* Sentiment Breakdown Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Sentiment:</span>
                <span className={`text-xs font-semibold ${getSentimentColor(competitor.sentimentLabel)}`}>
                  {competitor.sentimentLabel}
                </span>
              </div>
              
              {/* Sentiment Bar */}
              <div className="h-2 bg-background rounded-full overflow-hidden flex">
                <div 
                  className="bg-green-500 transition-all"
                  style={{ width: `${competitor.sentimentBreakdown.positive}%` }}
                  title={`Positive: ${competitor.sentimentBreakdown.positive}%`}
                />
                <div 
                  className="bg-yellow-500 transition-all"
                  style={{ width: `${competitor.sentimentBreakdown.neutral}%` }}
                  title={`Neutral: ${competitor.sentimentBreakdown.neutral}%`}
                />
                <div 
                  className="bg-red-500 transition-all"
                  style={{ width: `${competitor.sentimentBreakdown.negative}%` }}
                  title={`Negative: ${competitor.sentimentBreakdown.negative}%`}
                />
              </div>
              
              {/* Sentiment Percentages */}
              <div className="flex items-center justify-between mt-1.5 text-[10px]">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <span className="text-green-500 font-medium">{competitor.sentimentBreakdown.positive}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                  <span className="text-yellow-500 font-medium">{competitor.sentimentBreakdown.neutral}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  <span className="text-red-500 font-medium">{competitor.sentimentBreakdown.negative}%</span>
                </div>
              </div>
            </div>

            {/* Total Mentions */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Mentions:</span>
                <span className="text-sm font-semibold text-foreground">
                  {formatMentions(competitor.totalMentions)}
                </span>
              </div>
            </div>

            {/* Platform Breakdown */}
            <div className="space-y-1.5 pt-2 border-t border-border">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#FF4500]"></span>
                  Reddit
                </span>
                <span className="font-medium text-foreground">{formatMentions(competitor.platforms.reddit)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#E1306C]"></span>
                  Instagram
                </span>
                <span className="font-medium text-foreground">{formatMentions(competitor.platforms.youtube)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#000000]"></span>
                  X
                </span>
                <span className="font-medium text-foreground">{formatMentions(competitor.platforms.twitter)}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Add Competitor Button */}
        {competitors.length < 5 && !isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="w-[calc(20%-12.8px)] flex flex-col items-center justify-center p-4 bg-accent/20 border-2 border-dashed border-border hover:border-primary/50 rounded-lg transition-colors group min-h-[280px]"
            title="Add competitor"
          >
            <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mb-2" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
              Add Competitor
            </span>
          </button>
        )}
      </div>

      {/* Empty State */}
      {competitors.length === 0 && !isAdding && (
        <div className="w-full flex flex-col items-center justify-center py-12 text-muted-foreground">
          <MessageSquare className="w-10 h-10 mb-3 opacity-50" />
          <p className="text-sm">No competitors added yet</p>
        </div>
      )}
    </div>
  );
}

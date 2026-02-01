import React from 'react';
import { Film, TrendingUp, Star } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { topBoxOffice } from '../../dummydata/topBoxOffice';

export default function TopBoxOfficeMovies({ releaseDate }) {
  // Use top box office data from dummydata (keeps the list maintainable)
  const topMovies = topBoxOffice;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'this period';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long' });
  };

  // Format numbers in crore with two decimals and locale separators
  const formatCr = (num) => {
    if (num == null || Number.isNaN(Number(num))) return '-';
    // Use en-IN for lakh/crore grouping, fall back to en-US if unsupported
    try {
      return `₹${Number(num).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr`;
    } catch (e) {
      return `₹${Number(num).toFixed(2)} Cr`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Top Box Office Movies</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Recent blockbusters released in {formatDate(releaseDate)}
            </p>
          </div>
          <Film className="w-5 h-5 text-yellow-500" />
        </div>
      </CardHeader>
      <CardContent>
        {/* Movie List */}
        {topMovies.map((movie) => (
          <div 
            key={movie.rank}
            className="bg-background border border-border rounded-lg p-4 hover:border-primary/50 transition-all"
          >
            <div className="flex items-start gap-4">
              {/* Rank Badge */}
              <div 
                className="flex items-center justify-center w-10 h-10 rounded-lg font-bold text-white flex-shrink-0"
                style={{ backgroundColor: movie.color }}
              >
                #{movie.rank}
              </div>

              {/* Movie Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground truncate">
                      {movie.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {movie.year} • {movie.genre}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-semibold text-foreground">{movie.rating}</span>
                  </div>
                </div>

                {/* Box Office Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-card rounded px-3 py-2">
                    <p className="text-xs text-muted-foreground mb-1">Total Collection</p>
                    <p className="text-sm font-bold text-green-500">{formatCr(movie.boxOffice)}</p>
                  </div>
                  <div className="bg-card rounded px-3 py-2">
                    <p className="text-xs text-muted-foreground mb-1">Opening Day</p>
                    <p className="text-sm font-bold text-foreground">{formatCr(movie.openingDay)}</p>
                  </div>
                  <div className="bg-card rounded px-3 py-2">
                    <p className="text-xs text-muted-foreground mb-1">Opening Week</p>
                    <p className="text-sm font-bold text-foreground">{formatCr(movie.openingWeek)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Average Stats */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <p className="text-xs text-muted-foreground uppercase">Avg. Total</p>
              </div>
              <p className="text-2xl font-bold text-green-500">{formatCr(topMovies.reduce((sum, m) => sum + m.boxOffice, 0) / topMovies.length)}</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Film className="w-4 h-4 text-purple-500" />
                <p className="text-xs text-muted-foreground uppercase">Avg. Opening Day</p>
              </div>
              <p className="text-2xl font-bold text-purple-500">{formatCr(topMovies.reduce((sum, m) => sum + m.openingDay, 0) / topMovies.length)}</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Film className="w-4 h-4 text-blue-500" />
                <p className="text-xs text-muted-foreground uppercase">Avg. Opening Week</p>
              </div>
              <p className="text-2xl font-bold text-blue-500">{formatCr(topMovies.reduce((sum, m) => sum + (m.openingWeek || 0), 0) / topMovies.length)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

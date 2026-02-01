import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LeftNavbar from './navigation/LeftNavbar';
import EntitySelector from './navigation/EntitySelector';
import DashboardView from './dashboard/DashboardView';
import AnalyticsView from './analytics/AnalyticsView';
import AIAnalyticsView from './analytics/AIAnalyticsView';
import CrisisFocusView from './feed/CrisisFocusView';
import NegativeCommentSummary from './crisis/NegativeCommentSummary';
import EnhancedMetricsDashboard from './metrics/EnhancedMetricsDashboard';
import CommandPalette from './navigation/CommandPalette';
import LoginModal from './auth/LoginModal';
// Import API services
import { entityService, dashboardService, analyticsService } from '../api';

export default function PRCommandCenter() {
  const queryClient = useQueryClient();
  const [selectedMention, setSelectedMention] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [entityType, setEntityType] = useState('movie');
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedSentiments, setSelectedSentiments] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [commandOpen, setCommandOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('60m');
  const [competitors, setCompetitors] = useState([]);
  const [dateRange, setDateRange] = useState('7days');
  const [hasLoadedEntities, setHasLoadedEntities] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwtToken'));

  // Fetch all entities based on type
  const { data: entities = [], isLoading: entitiesLoading } = useQuery({
    queryKey: ['entities', entityType],
    queryFn: () => entityService.getAll(entityType),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!localStorage.getItem('jwtToken'), // Check localStorage directly
  });

  // Set default entity when entities load
  useEffect(() => {
    if (entities.length > 0 && !selectedEntity) {
      setSelectedEntity(entities[0]);
      setHasLoadedEntities(true);
    }
  }, [entities, selectedEntity]);

  // Fetch mentions for selected entity
  const { data: mentionsData = {}, refetch: refetchMentions, isLoading: mentionsLoading } = useQuery({
    queryKey: ['mentions', selectedEntity?.id, entityType, selectedTimeRange],
    queryFn: () => 
      dashboardService.getMentions(entityType, selectedEntity?.id, {
        timeRange: selectedTimeRange,
      }),
    enabled: !!localStorage.getItem('jwtToken') && !!selectedEntity?.id,
    refetchInterval: 300000, // 5 minutes
  });

  // Extract mentions array from response (backend returns paginated { content: [...] })
  const mentions = Array.isArray(mentionsData?.content) ? mentionsData.content : [];

  // Fetch metrics/stats for selected entity
  const { data: metricsData = {}, isLoading: metricsLoading } = useQuery({
    queryKey: ['stats', selectedEntity?.id, entityType, dateRange],
    queryFn: () =>
      dashboardService.getStats(entityType, selectedEntity?.id, dateRange),
    enabled: !!localStorage.getItem('jwtToken') && !!selectedEntity?.id,
    refetchInterval: 300000,
  });

  // Fetch sentiment trend data
  const { data: sentimentTrend = [], isLoading: trendLoading } = useQuery({
    queryKey: ['sentiment-trend', selectedEntity?.id, entityType, dateRange],
    queryFn: () => {
      // Convert dateRange to period format (DAY, WEEK, MONTH)
      const periodMap = { '7days': 'WEEK', '30days': 'MONTH', '1day': 'DAY' };
      const period = periodMap[dateRange] || 'DAY';
      return dashboardService.getSentimentOverTime(entityType, selectedEntity?.id, period);
    },
    enabled: !!localStorage.getItem('jwtToken') && !!selectedEntity?.id,
    refetchInterval: 300000,
  });

  // Fetch platform breakdown
  const { data: platformData = [], isLoading: platformLoading } = useQuery({
    queryKey: ['platform-mentions', selectedEntity?.id, entityType, dateRange],
    queryFn: () =>
      dashboardService.getPlatformMentions(entityType, selectedEntity?.id, dateRange),
    enabled: !!localStorage.getItem('jwtToken') && !!selectedEntity?.id,
    refetchInterval: 300000,
  });

  // Fetch competitive data
  const { data: competitiveData = [], isLoading: competitiveLoading } = useQuery({
    queryKey: ['competitive-snapshot', selectedEntity?.id, entityType],
    queryFn: () =>
      dashboardService.getCompetitorSnapshot(entityType, selectedEntity?.id),
    enabled: !!localStorage.getItem('jwtToken') && !!selectedEntity?.id,
    refetchInterval: 300000,
  });

  // Fetch analytics data
  const { data: analyticsData = {} } = useQuery({
    queryKey: ['analytics', entityType],
    queryFn: async () => {
      if (entityType === 'movie') {
        // Generate ISO format date (today)
        const today = new Date().toISOString().split('T')[0];
        return {
          topBoxOffice: await analyticsService.getTopBoxOffice(today),
          genreTrends: await analyticsService.getTrendingGenre(today),
          hitGenres: await analyticsService.getHitGenrePrediction(),
        };
      }
      return {};
    },
    enabled: !!localStorage.getItem('jwtToken'),
    refetchInterval: 600000, // 10 minutes
  });

  // Filter mentions by platform, sentiment, and status
  let filteredMentions = mentions;

  if (selectedPlatforms.length > 0) {
    filteredMentions = filteredMentions.filter(m =>
      selectedPlatforms.includes(m.platform)
    );
  }

  if (selectedSentiments.length > 0) {
    filteredMentions = filteredMentions.filter(m =>
      selectedSentiments.includes(m.aiSentiment)
    );
  }

  if (selectedStatuses.length > 0) {
    filteredMentions = filteredMentions.filter(m => {
      const status = m.aiThreatScore > 70 ? 'pending' :
        m.aiThreatScore > 40 ? 'replied' : 'no-reply';
      return selectedStatuses.includes(status);
    });
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const anomalyCount = mentions.filter(m => m.isAnomaly).length;
  const isLoadingEntities = entitiesLoading && !hasLoadedEntities;
  const isLoading = (mentionsLoading || metricsLoading) && hasLoadedEntities;

  return (
    <div className="h-screen flex bg-background text-foreground">
      {/* Left Navbar */}
      <div className="w-64">
        <LeftNavbar activeTab={activeView} onTabChange={setActiveView} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header with Entity Selector */}
        <div className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-foreground">PR Command Center</h1>
            <div className="h-6 w-px bg-border" />
            {selectedEntity && (
              <EntitySelector
                selectedEntity={selectedEntity}
                onEntityChange={setSelectedEntity}
                entities={entities}
                entityType={entityType}
              />
            )}
            <div className="h-6 w-px bg-border" />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setEntityType('movie')}
              className={`px-4 py-2 h-10 text-sm font-medium rounded-lg transition-colors ${
                entityType === 'movie'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-accent text-muted-foreground hover:text-foreground'
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => {
                setEntityType('celebrity');
                setSelectedEntity(null);
              }}
              className={`px-4 py-2 h-10 text-sm font-medium rounded-lg transition-colors ${
                entityType === 'celebrity'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-accent text-muted-foreground hover:text-foreground'
              }`}
            >
              Celebrities
            </button>
            <div className="h-6 w-px bg-border" />
            <button
              onClick={() => setLoginOpen(true)}
              className="px-4 py-2 h-10 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-colors"
            >
              Login
            </button>
            {isAuthenticated && (
              <button
                onClick={() => {
                  // Manually trigger all data fetches
                  queryClient.invalidateQueries({ queryKey: ['entities'] });
                  queryClient.invalidateQueries({ queryKey: ['mentions'] });
                  queryClient.invalidateQueries({ queryKey: ['stats'] });
                  queryClient.invalidateQueries({ queryKey: ['sentiment-trend'] });
                  queryClient.invalidateQueries({ queryKey: ['platform-mentions'] });
                  queryClient.invalidateQueries({ queryKey: ['competitive-snapshot'] });
                  queryClient.invalidateQueries({ queryKey: ['analytics'] });
                }}
                className="px-4 py-2 h-10 text-sm font-medium rounded-lg bg-green-600 text-white hover:opacity-90 transition-colors"
              >
                Fetch Data
              </button>
            )}
          </div>
        </div>

        {/* Unauthenticated Screen - Show when not logged in */}
        {!isAuthenticated && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-5xl font-bold text-foreground mb-4">Welcome to Project Aura</h2>
              <p className="text-muted-foreground mb-8">Please log in to get started</p>
              <button
                onClick={() => setLoginOpen(true)}
                className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-colors"
              >
                Open Login
              </button>
            </div>
          </div>
        )}

        {/* Welcome Screen - Show on first load before entities are fetched */}
        {isAuthenticated && isLoadingEntities && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-5xl font-bold text-foreground mb-4">Welcome to Project Aura</h2>
              <p className="text-muted-foreground mb-8">Loading your entities...</p>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
          </div>
        )}

        {/* Welcome Screen - Show when no entity is selected yet */}
        {isAuthenticated && hasLoadedEntities && !selectedEntity && !isLoadingEntities && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-5xl font-bold text-foreground mb-4">Welcome to Project Aura</h2>
              <p className="text-muted-foreground">Select an entity to get started</p>
            </div>
          </div>
        )}

        {/* Loading state for data after entity is selected */}
        {isLoading && selectedEntity && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading data...</p>
            </div>
          </div>
        )}

        {/* Dashboard View */}
        {isAuthenticated && !isLoading && activeView === 'dashboard' && selectedEntity && (
          <DashboardView
            selectedEntity={selectedEntity}
            entityType={entityType}
            competitiveData={competitiveData}
            mentions={filteredMentions}
            stats={metricsData}
            onMentionSelect={setSelectedMention}
            onRefresh={refetchMentions}
          />
        )}

        {/* Analytics View */}
        {isAuthenticated && !isLoading && activeView === 'analytics' && selectedEntity && (
          <AnalyticsView
            selectedEntity={selectedEntity}
            entityType={entityType}
            mentions={filteredMentions}
            sentimentData={sentimentTrend}
            platformData={platformData}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        )}

        {/* AI Analytics */}
        {isAuthenticated && !isLoading && activeView === 'ai-analytics' && selectedEntity && (
          <AIAnalyticsView
            selectedEntity={selectedEntity}
            entityType={entityType}
            analyticsData={analyticsData}
          />
        )}

        {/* Crisis Center */}
        {isAuthenticated && !isLoading && activeView === 'crisis-center' && selectedEntity && (
          <CrisisFocusView
            selectedEntity={selectedEntity}
            entityType={entityType}
            mentions={filteredMentions}
            onMentionSelect={setSelectedMention}
          />
        )}

        {/* Negative Analysis */}
        {isAuthenticated && !isLoading && activeView === 'negative-analysis' && selectedEntity && (
          <NegativeCommentSummary
            selectedEntity={selectedEntity}
            entityType={entityType}
            mentions={filteredMentions}
          />
        )}

        {/* Metrics Dashboard */}
        {isAuthenticated && !isLoading && activeView === 'metrics' && selectedEntity && (
          <EnhancedMetricsDashboard
            selectedEntity={selectedEntity}
            entityType={entityType}
            stats={metricsData}
            mentions={filteredMentions}
          />
        )}
      </div>

      {/* Command Palette */}
      <CommandPalette 
        open={commandOpen} 
        onOpenChange={setCommandOpen}
        mentions={filteredMentions}
        onSelectMention={setSelectedMention}
        onRefresh={refetchMentions}
      />

      {/* Login Modal */}
      <LoginModal 
        open={loginOpen} 
        onOpenChange={setLoginOpen}
        onLoginSuccess={() => {
          // Set authenticated state
          setIsAuthenticated(true);
          
          // Invalidate all queries to trigger fresh fetches with JWT token
          setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['entities'] });
            queryClient.invalidateQueries({ queryKey: ['mentions'] });
            queryClient.invalidateQueries({ queryKey: ['stats'] });
            queryClient.invalidateQueries({ queryKey: ['sentiment-trend'] });
            queryClient.invalidateQueries({ queryKey: ['platform-mentions'] });
            queryClient.invalidateQueries({ queryKey: ['competitive-snapshot'] });
            queryClient.invalidateQueries({ queryKey: ['analytics'] });
          }, 100); // Small delay to ensure localStorage is synced
        }}
      />
    </div>
  );
}

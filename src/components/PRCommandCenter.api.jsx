import React, { useState, useEffect } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useQuery } from '@tanstack/react-query';
import LeftNavbar from './navigation/LeftNavbar';
import EntitySelector from './navigation/EntitySelector';
import PlatformMultiSelect from './navigation/PlatformMultiSelect';
import SentimentFilter from './navigation/SentimentFilter';
import TimeRangeFilter from './navigation/TimeRangeFilter';
import ReplyStatusFilter from './navigation/ReplyStatusFilter';
import DashboardView from './dashboard/DashboardView';
import AnalyticsView from './analytics/AnalyticsView';
import AIAnalyticsView from './analytics/AIAnalyticsView';
import CrisisFocusView from './feed/CrisisFocusView';
import CrisisPlanGenerator from './crisis/CrisisPlanGenerator';
import NegativeCommentSummary from './crisis/NegativeCommentSummary';
import EnhancedMetricsDashboard from './metrics/EnhancedMetricsDashboard';
import CommandPalette from './navigation/CommandPalette';
// Import API services
import { entityService, dashboardService, analyticsService } from '../api';

export default function PRCommandCenter() {
  const [selectedMention, setSelectedMention] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [entityType, setEntityType] = useState('movie');
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedSentiments, setSelectedSentiments] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [commandOpen, setCommandOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('60m');
  const [competitors, setCompetitors] = useState([]);
  const [dateRange, setDateRange] = useState('7days');

  // Fetch all entities based on type
  const { data: entities = [], isLoading: entitiesLoading } = useQuery({
    queryKey: ['entities', entityType],
    queryFn: () => entityService.getAll(entityType),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Set default entity when entities load
  useEffect(() => {
    if (entities.length > 0 && !selectedEntity) {
      setSelectedEntity(entities[0]);
    }
  }, [entities, selectedEntity]);

  // Fetch mentions for selected entity
  const { data: mentions = [], refetch: refetchMentions, isLoading: mentionsLoading } = useQuery({
    queryKey: ['mentions', selectedEntity?.id, entityType, selectedTimeRange],
    queryFn: () => 
      dashboardService.getMentions(entityType, selectedEntity?.id, {
        timeRange: selectedTimeRange,
      }),
    enabled: !!selectedEntity?.id,
    refetchInterval: 300000, // 5 minutes
  });

  // Fetch metrics/stats for selected entity
  const { data: metricsData = {}, isLoading: metricsLoading } = useQuery({
    queryKey: ['stats', selectedEntity?.id, entityType, dateRange],
    queryFn: () =>
      dashboardService.getStats(entityType, selectedEntity?.id, dateRange),
    enabled: !!selectedEntity?.id,
    refetchInterval: 300000,
  });

  // Fetch sentiment trend data
  const { data: sentimentTrend = [], isLoading: trendLoading } = useQuery({
    queryKey: ['sentiment-trend', selectedEntity?.id, entityType, dateRange],
    queryFn: () =>
      dashboardService.getSentimentOverTime(entityType, selectedEntity?.id, dateRange),
    enabled: !!selectedEntity?.id,
    refetchInterval: 300000,
  });

  // Fetch platform breakdown
  const { data: platformData = [], isLoading: platformLoading } = useQuery({
    queryKey: ['platform-mentions', selectedEntity?.id, entityType, dateRange],
    queryFn: () =>
      dashboardService.getPlatformMentions(entityType, selectedEntity?.id, dateRange),
    enabled: !!selectedEntity?.id,
    refetchInterval: 300000,
  });

  // Fetch competitive data
  const { data: competitiveData = [], isLoading: competitiveLoading } = useQuery({
    queryKey: ['competitive-snapshot', selectedEntity?.id, entityType],
    queryFn: () =>
      dashboardService.getCompetitorSnapshot(entityType, selectedEntity?.id),
    enabled: !!selectedEntity?.id,
    refetchInterval: 300000,
  });

  // Fetch analytics data
  const { data: analyticsData = {} } = useQuery({
    queryKey: ['analytics', entityType],
    queryFn: async () => {
      if (entityType === 'movie') {
        return {
          topBoxOffice: await analyticsService.getTopBoxOffice(10),
          genreTrends: await analyticsService.getTrendingGenre('30days'),
          hitGenres: await analyticsService.getHitGenrePrediction('90days'),
        };
      }
      return {};
    },
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
  const isLoading = entitiesLoading || mentionsLoading || metricsLoading;

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
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading data...</p>
            </div>
          </div>
        )}

        {/* Dashboard View */}
        {!isLoading && activeView === 'dashboard' && selectedEntity && (
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
        {!isLoading && activeView === 'analytics' && selectedEntity && (
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
        {!isLoading && activeView === 'ai-analytics' && selectedEntity && (
          <AIAnalyticsView
            selectedEntity={selectedEntity}
            entityType={entityType}
            analyticsData={analyticsData}
          />
        )}

        {/* Crisis Center */}
        {!isLoading && activeView === 'crisis-center' && selectedEntity && (
          <CrisisFocusView
            selectedEntity={selectedEntity}
            entityType={entityType}
            mentions={filteredMentions}
            onMentionSelect={setSelectedMention}
          />
        )}

        {/* Negative Analysis */}
        {!isLoading && activeView === 'negative-analysis' && selectedEntity && (
          <NegativeCommentSummary
            selectedEntity={selectedEntity}
            entityType={entityType}
            mentions={filteredMentions}
          />
        )}

        {/* Metrics Dashboard */}
        {!isLoading && activeView === 'metrics' && selectedEntity && (
          <EnhancedMetricsDashboard
            selectedEntity={selectedEntity}
            entityType={entityType}
            stats={metricsData}
            mentions={filteredMentions}
          />
        )}
      </div>

      {/* Command Palette */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  );
}

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Separator from '@radix-ui/react-separator';
import { AlertTriangle, X, ChevronLeft, ChevronRight, User, Bot, Calendar, TrendingUp, FileText, BarChart3, ExternalLink } from 'lucide-react';
import MentionFeed from './MentionFeed';
import { getThreatColor, getThreatBg, formatTimestamp, getSentimentBg } from '../../utils/helpers';

export default function CrisisFocusView({ mentions, selectedMention, onSelectMention, activeView = 'crisis' }) {
  const [crisisModalOpen, setCrisisModalOpen] = useState(false);
  const [currentCrisisIndex, setCurrentCrisisIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  // Separate crisis posts (threat >= 85) from routine posts
  const crisisPosts = mentions.filter(m => m.aiThreatScore >= 85);
  const routinePosts = mentions.filter(m => m.aiThreatScore < 85);

  // Get current crisis post
  const currentCrisisPost = crisisPosts[currentCrisisIndex];

  // Navigation handlers
  const goToNext = () => {
    if (currentCrisisIndex < crisisPosts.length - 1) {
      setCurrentCrisisIndex(currentCrisisIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentCrisisIndex > 0) {
      setCurrentCrisisIndex(currentCrisisIndex - 1);
    }
  };

  // Reset index when modal opens
  React.useEffect(() => {
    if (crisisModalOpen) {
      setCurrentCrisisIndex(0);
    }
  }, [crisisModalOpen]);

  // Calculate summary statistics for routine posts
  const routineStats = {
    total: routinePosts.length,
    highRisk: routinePosts.filter(m => m.aiThreatScore >= 60 && m.aiThreatScore < 85).length,
    mediumRisk: routinePosts.filter(m => m.aiThreatScore >= 40 && m.aiThreatScore < 60).length,
    lowRisk: routinePosts.filter(m => m.aiThreatScore < 40).length,
  };

  return (
    <div className="h-full flex flex-col bg-background relative">
      {/* Main Feed - All Mentions */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider">The Feed</h2>
            <div className="text-xs text-muted-foreground mt-1">
              {mentions.length} mentions • Real-time monitoring
            </div>
          </div>
          {crisisPosts.length > 0 && (
            <button
              onClick={() => setCrisisModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-threat-critical/10 hover:bg-threat-critical/20 text-threat-critical rounded-md transition-colors border border-threat-critical/30"
            >
              <AlertTriangle className="w-4 h-4" />
              <div className="text-left">
                <div className="text-xs font-semibold">{crisisPosts.length} Crisis Posts</div>
                <div className="text-xs opacity-70">Click to review</div>
              </div>
            </button>
          )}
        </div>
      </div>

      <MentionFeed
        mentions={mentions}
        selectedMention={selectedMention}
        onSelectMention={onSelectMention}
      />

      {/* Crisis Posts Modal */}
      {crisisPosts.length > 0 && (
        <Dialog.Root open={crisisModalOpen} onOpenChange={setCrisisModalOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <Dialog.Content className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-[95vw] max-w-[1400px] h-[90vh] bg-background border-2 border-threat-critical rounded-lg shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] flex flex-col">
              {/* Crisis Modal Header */}
              <div className="p-4 border-b border-threat-critical bg-threat-critical/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-threat-critical" />
                    <div>
                      <Dialog.Title className="text-lg font-semibold text-threat-critical">
                        Crisis Posts - Immediate Attention Required
                      </Dialog.Title>
                      <Dialog.Description className="text-xs text-muted-foreground mt-1">
                        Showing {currentCrisisIndex + 1} of {crisisPosts.length} critical {crisisPosts.length === 1 ? 'mention' : 'mentions'} • Threat Score ≥ 85
                      </Dialog.Description>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-1 px-2 py-1 bg-background rounded-md border border-border">
                      <button
                        onClick={goToPrevious}
                        disabled={currentCrisisIndex === 0}
                        className="p-1.5 rounded hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Previous crisis post"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="px-2 text-sm font-mono">
                        {currentCrisisIndex + 1}/{crisisPosts.length}
                      </div>
                      <button
                        onClick={goToNext}
                        disabled={currentCrisisIndex === crisisPosts.length - 1}
                        className="p-1.5 rounded hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Next crisis post"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                    <Dialog.Close className="rounded-md p-2 hover:bg-accent transition-colors">
                      <X className="w-5 h-5" />
                      <span className="sr-only">Close</span>
                    </Dialog.Close>
                  </div>
                </div>

                {/* Routine Posts Summary */}
                {routinePosts.length > 0 && (
                  <div className="mt-3 p-3 bg-background/50 rounded-lg border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-medium text-muted-foreground">
                        Routine Monitoring (below critical threshold)
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {routineStats.total} mentions
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2 bg-threat-high/10 rounded">
                        <div className="text-lg font-bold text-threat-high">{routineStats.highRisk}</div>
                        <div className="text-xs text-muted-foreground">High Risk Posts</div>
                        <div className="text-xs text-muted-foreground opacity-70">60-84</div>
                      </div>
                      <div className="text-center p-2 bg-threat-medium/10 rounded">
                        <div className="text-lg font-bold text-threat-medium">{routineStats.mediumRisk}</div>
                        <div className="text-xs text-muted-foreground">Medium Risk Posts</div>
                        <div className="text-xs text-muted-foreground opacity-70">40-59</div>
                      </div>
                      <div className="text-center p-2 bg-threat-low/10 rounded">
                        <div className="text-lg font-bold text-threat-low">{routineStats.lowRisk}</div>
                        <div className="text-xs text-muted-foreground">Low Risk Posts</div>
                        <div className="text-xs text-muted-foreground opacity-70">&lt;40</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Crisis Posts Feed (Scrollable) */}
              <div className="flex-1 overflow-hidden flex">
                {/* Left Side: Crisis Post Feed */}
                <div className="w-1/2 border-r border-border overflow-hidden">
                  {currentCrisisPost && (
                    <MentionFeed
                      mentions={[currentCrisisPost]}
                      selectedMention={selectedMention}
                      onSelectMention={(mention) => {
                        onSelectMention(mention);
                      }}
                    />
                  )}
                </div>

                {/* Right Side: Deep Analysis */}
                <div className="w-1/2 flex flex-col bg-card">
                  <div className="p-3 border-b border-border">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Deep Analysis
                    </h2>
                  </div>

                  <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                    <Tabs.List className="flex border-b border-border bg-background/50">
                      <Tabs.Trigger
                        value="overview"
                        className="flex-1 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary transition-colors"
                      >
                        <FileText className="w-3 h-3 inline-block mr-1" />
                        Overview
                      </Tabs.Trigger>
                      <Tabs.Trigger
                        value="user"
                        className="flex-1 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary transition-colors"
                      >
                        <User className="w-3 h-3 inline-block mr-1" />
                        User
                      </Tabs.Trigger>
                      <Tabs.Trigger
                        value="analytics"
                        className="flex-1 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary transition-colors"
                      >
                        <BarChart3 className="w-3 h-3 inline-block mr-1" />
                        Analytics
                      </Tabs.Trigger>
                    </Tabs.List>

                    {/* Overview Tab */}
                    <Tabs.Content value="overview" className="flex-1 overflow-hidden">
                      <ScrollArea.Root className="h-full">
                        <ScrollArea.Viewport className="w-full h-full">
                          {currentCrisisPost && (
                            <div className="p-3 space-y-4">
                              {/* Threat Assessment */}
                              <div className={`p-3 rounded-lg border ${getThreatBg(currentCrisisPost.aiThreatScore)}`}>
                                <div className="flex items-center gap-2 mb-2">
                                  <AlertTriangle className={`w-4 h-4 ${getThreatColor(currentCrisisPost.aiThreatScore)}`} />
                                  <h3 className="font-semibold text-xs">Threat Level</h3>
                                </div>
                                <div className={`text-3xl font-bold mb-1 ${getThreatColor(currentCrisisPost.aiThreatScore)}`}>
                                  {currentCrisisPost.aiThreatScore}/100
                                </div>
                                <div className="w-full bg-background/50 rounded-full h-1.5 overflow-hidden">
                                  <div
                                    className={`h-full ${
                                      currentCrisisPost.aiThreatScore >= 80 ? 'bg-threat-critical' :
                                      currentCrisisPost.aiThreatScore >= 60 ? 'bg-threat-high' :
                                      currentCrisisPost.aiThreatScore >= 40 ? 'bg-threat-medium' :
                                      'bg-threat-low'
                                    }`}
                                    style={{ width: `${currentCrisisPost.aiThreatScore}%` }}
                                  />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                  {currentCrisisPost.aiThreatScore >= 80 ? 'Critical - Immediate action' :
                                   currentCrisisPost.aiThreatScore >= 60 ? 'High - Monitor closely' :
                                   currentCrisisPost.aiThreatScore >= 40 ? 'Medium - Routine' :
                                   'Low - Standard'}
                                </p>
                              </div>

                              {/* Full Content */}
                              <div>
                                <h3 className="font-semibold text-xs mb-2">Content</h3>
                                <div className="bg-background/50 p-2 rounded-lg text-xs">
                                  {currentCrisisPost.textSnippet}
                                </div>
                                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                  <span>❤️ {currentCrisisPost.engagement.likes}</span>
                                  <span>💬 {currentCrisisPost.engagement.comments}</span>
                                  <span>🔄 {currentCrisisPost.engagement.shares}</span>
                                </div>
                              </div>

                              {/* Narrative Analysis */}
                              <div>
                                <h3 className="font-semibold text-xs mb-2">Narrative</h3>
                                <div className="bg-primary/10 border border-primary/30 p-2 rounded-lg">
                                  <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp className="w-3 h-3" />
                                    <span className="font-semibold text-xs">{currentCrisisPost.narrative}</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    Part of trending "{currentCrisisPost.narrative}" cluster
                                  </p>
                                </div>
                              </div>

                              {/* Source Link */}
                              {currentCrisisPost.sourceUrl && (
                                <div>
                                  <a
                                    href={currentCrisisPost.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors text-xs font-medium"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    Open Original Post
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                        </ScrollArea.Viewport>
                        <ScrollArea.Scrollbar orientation="vertical" className="w-2 bg-transparent">
                          <ScrollArea.Thumb className="bg-border rounded-full" />
                        </ScrollArea.Scrollbar>
                      </ScrollArea.Root>
                    </Tabs.Content>

                    {/* User Tab */}
                    <Tabs.Content value="user" className="flex-1 overflow-hidden">
                      <ScrollArea.Root className="h-full">
                        <ScrollArea.Viewport className="w-full h-full">
                          {currentCrisisPost && (
                            <div className="p-3 space-y-4">
                              <div>
                                <h3 className="font-semibold text-xs mb-3">User Profile</h3>
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2 text-xs">
                                    <User className="w-3 h-3" />
                                    <span className="font-medium">{currentCrisisPost.author}</span>
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-background/50 p-2 rounded-lg">
                                      <div className="flex items-center gap-1 mb-1">
                                        <Bot className="w-3 h-3 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">Bot Risk</span>
                                      </div>
                                      <div className={`text-base font-semibold ${
                                        currentCrisisPost.userProfile.botProbability > 70 ? 'text-threat-critical' :
                                        currentCrisisPost.userProfile.botProbability > 40 ? 'text-threat-medium' :
                                        'text-threat-low'
                                      }`}>
                                        {currentCrisisPost.userProfile.botProbability.toFixed(1)}%
                                      </div>
                                    </div>

                                    <div className="bg-background/50 p-2 rounded-lg">
                                      <div className="flex items-center gap-1 mb-1">
                                        <Calendar className="w-3 h-3 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">Age</span>
                                      </div>
                                      <div className="text-base font-semibold">
                                        {Math.floor(currentCrisisPost.userProfile.accountAge / 365)}y
                                      </div>
                                    </div>
                                  </div>

                                  <div className="bg-background/50 p-2 rounded-lg">
                                    <div className="text-xs text-muted-foreground mb-1">Followers</div>
                                    <div className="text-base font-semibold">
                                      {currentCrisisPost.userProfile.followerCount.toLocaleString()}
                                    </div>
                                  </div>

                                  <div className="bg-background/50 p-2 rounded-lg">
                                    <div className="text-xs text-muted-foreground mb-1">Past Negative</div>
                                    <div className="text-base font-semibold text-threat-high">
                                      {currentCrisisPost.userProfile.pastNegativeCount}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </ScrollArea.Viewport>
                        <ScrollArea.Scrollbar orientation="vertical" className="w-2 bg-transparent">
                          <ScrollArea.Thumb className="bg-border rounded-full" />
                        </ScrollArea.Scrollbar>
                      </ScrollArea.Root>
                    </Tabs.Content>

                    {/* Analytics Tab */}
                    <Tabs.Content value="analytics" className="flex-1 overflow-hidden">
                      <ScrollArea.Root className="h-full">
                        <ScrollArea.Viewport className="w-full h-full">
                          {currentCrisisPost && (
                            <div className="p-3 space-y-4">
                              <div>
                                <h3 className="font-semibold text-xs mb-2">Engagement Metrics</h3>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                                    <span className="text-xs text-muted-foreground">Likes</span>
                                    <span className="text-xs font-semibold">{currentCrisisPost.engagement.likes}</span>
                                  </div>
                                  <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                                    <span className="text-xs text-muted-foreground">Comments</span>
                                    <span className="text-xs font-semibold">{currentCrisisPost.engagement.comments}</span>
                                  </div>
                                  <div className="flex items-center justify-between p-2 bg-background/50 rounded">
                                    <span className="text-xs text-muted-foreground">Shares</span>
                                    <span className="text-xs font-semibold">{currentCrisisPost.engagement.shares}</span>
                                  </div>
                                </div>
                              </div>

                              <Separator.Root className="bg-border" />

                              <div>
                                <h3 className="font-semibold text-xs mb-2">Sentiment Analysis</h3>
                                <div className="bg-background/50 p-2 rounded-lg">
                                  <div className="text-xs text-muted-foreground mb-1">Classification</div>
                                  <div className={`text-sm font-semibold capitalize px-2 py-1 rounded inline-block ${getSentimentBg(currentCrisisPost.aiSentiment)}`}>
                                    {currentCrisisPost.aiSentiment}
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h3 className="font-semibold text-xs mb-2">Platform</h3>
                                <div className="bg-background/50 p-2 rounded-lg">
                                  <div className="text-sm font-semibold capitalize">
                                    {currentCrisisPost.platform}
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {formatTimestamp(currentCrisisPost.timestamp)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </ScrollArea.Viewport>
                        <ScrollArea.Scrollbar orientation="vertical" className="w-2 bg-transparent">
                          <ScrollArea.Thumb className="bg-border rounded-full" />
                        </ScrollArea.Scrollbar>
                      </ScrollArea.Root>
                    </Tabs.Content>
                  </Tabs.Root>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-border bg-card/50">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Use arrow buttons to navigate • Click mention to inspect details
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (currentCrisisPost) {
                          onSelectMention(currentCrisisPost);
                          window.dispatchEvent(new CustomEvent('openAIReply', { detail: currentCrisisPost }));
                        }
                      }}
                      className="px-4 py-2 bg-threat-critical/10 text-threat-critical border border-threat-critical/30 rounded-md hover:bg-threat-critical/20 transition-colors text-sm font-medium"
                    >
                      Generate AI Reply
                    </button>
                    <Dialog.Close asChild>
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium">
                        View All Posts
                      </button>
                    </Dialog.Close>
                  </div>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}

      {/* No Crisis State */}
      {crisisPosts.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center p-6 bg-background/95 rounded-lg border border-border shadow-lg">
            <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-threat-low opacity-50" />
            <p className="text-sm font-medium mb-1">No Crisis Posts</p>
            <p className="text-xs text-muted-foreground">All mentions are below critical threshold</p>
          </div>
        </div>
      )}
    </div>
  );
}

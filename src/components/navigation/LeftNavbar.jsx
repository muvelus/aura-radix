import React, { useState } from 'react';
import { LayoutDashboard, BarChart3, AlertTriangle, ChevronDown, ChevronRight } from 'lucide-react';

export default function LeftNavbar({ activeTab, onTabChange }) {
  const [crisisExpanded, setCrisisExpanded] = useState(true);
  const [analyticsExpanded, setAnalyticsExpanded] = useState(true);
  
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: BarChart3,
      subTabs: [
        { id: 'box-office', label: 'Box Office Prediction', disabled: true },
        { id: 'hit-genre', label: 'Hit Genre Prediction', disabled: true },
        { id: 'sentiment-analysis', label: 'Sentiment Analysis' },
        { id: 'trending-genre', label: 'Trending Genre Analysis' },
        { id: 'historical-data', label: 'Historical Data Analysis' }
      ]
    },
    { 
      id: 'crisis', 
      label: 'Crisis Management', 
      icon: AlertTriangle,
      subTabs: [
        { id: 'crisis-center', label: 'Crisis Management Center' },
        // { id: 'metrics', label: 'Metrics Dashboard' },
        { id: 'negative-analysis', label: 'Negative Sentiment Analysis' }
      ]
    }
  ];

  return (
    <div className="h-full bg-card border-r border-border flex flex-col">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">Aura</h2>
      </div>
      
      <nav className="flex-1 p-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id || (tab.subTabs && tab.subTabs.some(sub => sub.id === activeTab));
          const hasSubTabs = tab.subTabs && tab.subTabs.length > 0;
          
          return (
            <div key={tab.id}>
              <button
                onClick={() => {
                  if (hasSubTabs) {
                    if (tab.id === 'crisis') {
                      setCrisisExpanded(!crisisExpanded);
                      if (!crisisExpanded) {
                        onTabChange(tab.subTabs[0].id);
                      }
                    } else if (tab.id === 'analytics') {
                      setAnalyticsExpanded(!analyticsExpanded);
                      if (!analyticsExpanded) {
                        onTabChange(tab.subTabs[0].id);
                      }
                    }
                  } else {
                    onTabChange(tab.id);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm flex-1 text-left">{tab.label}</span>
                {hasSubTabs && (
                  (tab.id === 'crisis' ? crisisExpanded : analyticsExpanded) ? 
                    <ChevronDown className="w-4 h-4 flex-shrink-0" /> : 
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                )}
              </button>
              
              {/* Sub-tabs */}
              {hasSubTabs && (tab.id === 'crisis' ? crisisExpanded : analyticsExpanded) && (
                <div className="ml-4 mt-1 mb-1 space-y-1">
                  {tab.subTabs.map(subTab => {
                    const isSubActive = activeTab === subTab.id;
                    const isDisabled = subTab.disabled;
                    return (
                      <button
                        key={subTab.id}
                        onClick={() => !isDisabled && onTabChange(subTab.id)}
                        disabled={isDisabled}
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-xs ${
                          isDisabled
                            ? 'text-muted-foreground/50 cursor-not-allowed opacity-50'
                            : isSubActive
                            ? 'bg-primary/20 text-primary font-medium'
                            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                        <span className="text-left">{subTab.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}

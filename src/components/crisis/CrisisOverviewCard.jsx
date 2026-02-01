import React from 'react';
import { Card, CardHeader, CardTitle } from '../ui/Card';

export default function CrisisOverviewCard({ plan, getSeverityColor }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Crisis Overview</CardTitle>
          <div className={`px-3 py-1 rounded-full border text-xs font-semibold uppercase ${getSeverityColor(plan.severity)}`}>
            {plan.severity} Severity
          </div>
        </div>
      </CardHeader>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-accent/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Recommended Timeline</p>
          <p className="text-lg font-semibold text-foreground">{plan.timeline}</p>
        </div>
        <div className="p-4 bg-accent/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Response Phases</p>
          <p className="text-lg font-semibold text-foreground">{plan.steps.length} Phases</p>
        </div>
      </div>
      
      {plan.realTimeMetrics && (
        <div className="pt-4 border-t border-border">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">Real-Time Impact</p>
          <div className="grid grid-cols-4 gap-3">
            <div className="p-2 bg-background rounded text-center">
              <div className="text-2xl font-bold text-threat-critical">{plan.realTimeMetrics.criticalMentions}</div>
              <div className="text-xs text-muted-foreground mt-1">Critical</div>
            </div>
            <div className="p-2 bg-background rounded text-center">
              <div className="text-2xl font-bold text-threat-high">{plan.realTimeMetrics.highRiskMentions}</div>
              <div className="text-xs text-muted-foreground mt-1">High Risk</div>
            </div>
            <div className="p-2 bg-background rounded text-center">
              <div className="text-2xl font-bold text-threat-medium">{plan.realTimeMetrics.avgThreatLevel}</div>
              <div className="text-xs text-muted-foreground mt-1">Avg Threat</div>
            </div>
            <div className="p-2 bg-background rounded text-center">
              <div className="text-2xl font-bold text-primary">{plan.realTimeMetrics.topThreats.length}</div>
              <div className="text-xs text-muted-foreground mt-1">Top Issues</div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

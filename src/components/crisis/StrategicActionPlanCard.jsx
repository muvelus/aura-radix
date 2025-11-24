import React from 'react';
import { AlertTriangle, MessageSquare, TrendingUp, Shield } from 'lucide-react';

const PHASE_ICONS = {
  immediate: AlertTriangle,
  strategic: MessageSquare,
  reputation: TrendingUp,
  mitigation: Shield
};

const PHASE_COLORS = {
  immediate: 'text-red-500',
  strategic: 'text-orange-500',
  reputation: 'text-yellow-500',
  mitigation: 'text-green-500'
};

export default function StrategicActionPlanCard({ steps }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Strategic Action Plan</h3>
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="border border-border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 bg-accent rounded-lg ${step.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-foreground">{step.phase}</h4>
              </div>
              <ul className="space-y-2.5">
                {step.actions.map((action, actionIdx) => (
                  <li key={actionIdx} className="flex items-start gap-3 text-sm text-foreground pl-11">
                    <span className="text-primary mt-0.5 flex-shrink-0">●</span>
                    <span className="flex-1">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

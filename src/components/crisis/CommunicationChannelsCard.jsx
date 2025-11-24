import React from 'react';
import { Target } from 'lucide-react';

export default function CommunicationChannelsCard({ channels }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Communication Channels</h3>
      </div>
      <div className="space-y-3">
        {channels.map((channel, idx) => (
          <div key={idx} className="flex items-center gap-4 p-3 bg-accent/30 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-foreground">{channel.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  channel.priority === 'High' ? 'bg-red-500/20 text-red-500' :
                  channel.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' :
                  'bg-green-500/20 text-green-500'
                }`}>
                  {channel.priority}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{channel.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

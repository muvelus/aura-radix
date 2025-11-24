import React from 'react';
import { FileText, Send } from 'lucide-react';

export default function OfficialStatementCard({ statement }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Draft Official Statement</h3>
      </div>
      <div className="p-4 bg-accent/30 rounded-lg border border-border">
        <p className="text-sm text-foreground leading-relaxed">
          {statement}
        </p>
      </div>
      <button className="mt-3 flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
        <Send className="w-4 h-4" />
        Copy Statement
      </button>
    </div>
  );
}

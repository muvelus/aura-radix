import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function KeyMessagingCard({ messages }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Key Messaging Guidelines</h3>
      </div>
      <ul className="space-y-3">
        {messages.map((message, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
            <span className="text-primary font-bold flex-shrink-0 w-6">{idx + 1}.</span>
            <span className="flex-1">{message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

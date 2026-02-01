import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export default function KeyMessagingCard({ messages }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <CardTitle>Key Messaging Guidelines</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {messages.map((message, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
              <span className="text-primary font-bold flex-shrink-0 w-6">{idx + 1}.</span>
              <span className="flex-1">{message}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

import React from 'react';
import { FileText, Send } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';

export default function OfficialStatementCard({ statement }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <CardTitle>Draft Official Statement</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-accent/30 rounded-lg border border-border">
          <p className="text-sm text-foreground leading-relaxed">
            {statement}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
          <Send className="w-4 h-4" />
          Copy Statement
        </button>
      </CardFooter>
    </Card>
  );
}

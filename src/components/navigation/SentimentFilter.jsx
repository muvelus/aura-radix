import React from 'react';
import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown, Smile } from 'lucide-react';

export default function SentimentFilter({ selectedSentiments, onSentimentsChange }) {
  const sentiments = [
    { id: 'positive', name: 'Positive', color: '#22c55e' },
    { id: 'neutral', name: 'Neutral', color: '#eab308' },
    { id: 'negative', name: 'Negative', color: '#ef4444' }
  ];

  const toggleSentiment = (sentimentId) => {
    if (selectedSentiments.includes(sentimentId)) {
      onSentimentsChange(selectedSentiments.filter(s => s !== sentimentId));
    } else {
      onSentimentsChange([...selectedSentiments, sentimentId]);
    }
  };

  const selectedCount = selectedSentiments.length;
  const allSelected = selectedCount === sentiments.length;

  return (
    <div className="relative">
      <Select.Root>
        <Select.Trigger className="inline-flex items-center gap-2 px-4 py-2 h-10 bg-card border border-border rounded-lg hover:bg-accent transition-colors min-w-[140px]">
          <Smile className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <Select.Value>
            {selectedCount === 0 ? (
              <span className="text-sm text-muted-foreground">Filter Sentiment</span>
            ) : allSelected ? (
              <span className="text-sm text-foreground">All Sentiment</span>
            ) : (
              <span className="text-sm text-foreground font-medium">{selectedCount} Sentiment{selectedCount > 1 ? 's' : ''}</span>
            )}
          </Select.Value>
          <Select.Icon className="ml-auto">
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="overflow-hidden bg-card rounded-lg border border-border shadow-lg z-[100]">
            <Select.Viewport className="p-2">
              {/* Select All Option */}
              <div
                onClick={() => {
                  if (allSelected) {
                    onSentimentsChange([]);
                  } else {
                    onSentimentsChange(sentiments.map(s => s.id));
                  }
                }}
                className="relative flex items-center gap-3 px-3 py-2 pr-8 rounded cursor-pointer outline-none hover:bg-accent transition-colors"
              >
                <span className="text-sm font-medium text-foreground">All Sentiment</span>
                <div className="absolute right-2 w-4 h-4 border-2 border-green-500 rounded flex items-center justify-center">
                  {allSelected && <Check className="w-3 h-3 text-green-500" />}
                </div>
              </div>

              <div className="h-px bg-border my-1" />

              {/* Individual Sentiment Options */}
              {sentiments.map((sentiment) => {
                const isSelected = selectedSentiments.includes(sentiment.id);
                return (
                  <div
                    key={sentiment.id}
                    onClick={() => toggleSentiment(sentiment.id)}
                    className="relative flex items-center gap-3 px-3 py-2 pr-8 rounded cursor-pointer outline-none hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: sentiment.color }}
                      />
                      <span className="text-sm text-foreground">{sentiment.name}</span>
                    </div>
                    <div className="absolute right-2 w-4 h-4 border-2 border-green-500 rounded flex items-center justify-center">
                      {isSelected && <Check className="w-3 h-3 text-green-500" />}
                    </div>
                  </div>
                );
              })}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

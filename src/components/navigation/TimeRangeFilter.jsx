import React from 'react';
import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown, Clock } from 'lucide-react';

export default function TimeRangeFilter({ selectedTimeRange, onTimeRangeChange }) {
  const timeRanges = [
    { id: '1h', name: 'Last Hour' },
    { id: '24h', name: 'Last 24 Hours' },
    { id: '7d', name: 'Last 7 Days' },
    { id: '30d', name: 'Last 30 Days' },
    { id: '90d', name: 'Last 90 Days' }
  ];

  const selectedRange = timeRanges.find(r => r.id === selectedTimeRange);

  return (
    <div className="relative">
      <Select.Root value={selectedTimeRange} onValueChange={onTimeRangeChange}>
        <Select.Trigger className="inline-flex items-center gap-2 px-4 py-2 h-10 bg-card border border-border rounded-lg hover:bg-accent transition-colors min-w-[150px]">
          <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <Select.Value>
            <span className="text-sm text-foreground">{selectedRange?.name || 'Select Range'}</span>
          </Select.Value>
          <Select.Icon className="ml-auto">
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="overflow-hidden bg-card rounded-lg border border-border shadow-lg z-[100]">
            <Select.Viewport className="p-2">
              {timeRanges.map((range) => (
                <Select.Item
                  key={range.id}
                  value={range.id}
                  className="relative flex items-center gap-3 px-3 py-2 pr-8 rounded cursor-pointer outline-none hover:bg-accent transition-colors data-[state=checked]:bg-accent"
                >
                  <Select.ItemText>
                    <span className="text-sm text-foreground">{range.name}</span>
                  </Select.ItemText>
                  <Select.ItemIndicator className="absolute right-2">
                    <Check className="w-4 h-4 text-green-500" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

import React from 'react';
import { Calendar, Clock, ChevronDown } from 'lucide-react';
import * as Select from '@radix-ui/react-select';

export default function AnalyticsHeader({ dateRange, onDateRangeChange, dateRangeOptions, selectedEntity }) {
  return (
    <div className="sticky top-0 z-10 border-b border-border bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">AI Analytics Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time insights for {selectedEntity?.name || 'All Entities'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Date Range Selector */}
          <Select.Root value={dateRange} onValueChange={onDateRangeChange}>
            <Select.Trigger className="flex items-center gap-2 px-3 py-2 text-sm bg-background border border-border rounded-lg hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <Select.Value />
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="z-[100] bg-background border border-border rounded-lg shadow-xl overflow-hidden">
                <Select.Viewport>
                  {dateRangeOptions.map(option => (
                    <Select.Item
                      key={option.value}
                      value={option.value}
                      className="px-3 py-2 text-sm text-foreground hover:bg-accent cursor-pointer outline-none"
                    >
                      <Select.ItemText>{option.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

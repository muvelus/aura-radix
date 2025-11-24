import React from 'react';
import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown, MessageSquare } from 'lucide-react';

export default function ReplyStatusFilter({ selectedStatuses, onStatusesChange }) {
  const statuses = [
    { id: 'pending', name: 'Pending Reply', color: '#eab308' },
    { id: 'replied', name: 'Replied', color: '#22c55e' },
    { id: 'no-reply', name: 'No Reply Needed', color: '#64748b' }
  ];

  const toggleStatus = (statusId) => {
    if (selectedStatuses.includes(statusId)) {
      onStatusesChange(selectedStatuses.filter(s => s !== statusId));
    } else {
      onStatusesChange([...selectedStatuses, statusId]);
    }
  };

  const selectedCount = selectedStatuses.length;
  const allSelected = selectedCount === statuses.length;

  return (
    <div className="relative">
      <Select.Root>
        <Select.Trigger className="inline-flex items-center gap-2 px-4 py-2 h-10 bg-card border border-border rounded-lg hover:bg-accent transition-colors min-w-[140px]">
          <MessageSquare className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <Select.Value>
            {selectedCount === 0 ? (
              <span className="text-sm text-muted-foreground">Filter Status</span>
            ) : allSelected ? (
              <span className="text-sm text-foreground">All Status</span>
            ) : (
              <span className="text-sm text-foreground font-medium">{selectedCount} Status{selectedCount > 1 ? 'es' : ''}</span>
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
                    onStatusesChange([]);
                  } else {
                    onStatusesChange(statuses.map(s => s.id));
                  }
                }}
                className="relative flex items-center gap-3 px-3 py-2 pr-8 rounded cursor-pointer outline-none hover:bg-accent transition-colors"
              >
                <span className="text-sm font-medium text-foreground">All Status</span>
                <div className="absolute right-2 w-4 h-4 border-2 border-green-500 rounded flex items-center justify-center">
                  {allSelected && <Check className="w-3 h-3 text-green-500" />}
                </div>
              </div>

              <div className="h-px bg-border my-1" />

              {/* Individual Status Options */}
              {statuses.map((status) => {
                const isSelected = selectedStatuses.includes(status.id);
                return (
                  <div
                    key={status.id}
                    onClick={() => toggleStatus(status.id)}
                    className="relative flex items-center gap-3 px-3 py-2 pr-8 rounded cursor-pointer outline-none hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: status.color }}
                      />
                      <span className="text-sm text-foreground">{status.name}</span>
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

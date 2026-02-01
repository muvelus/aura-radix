import React from 'react';
import { AlertTriangle } from 'lucide-react';
import CrisisPlanGenerator from './CrisisPlanGenerator';

export default function CrisisManagementCenter({
  selectedEntity,
  entityType,
  mentions = [],
}) {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <CrisisPlanGenerator
          selectedEntity={selectedEntity}
          mentions={mentions}
        />
      </div>
    </div>
  );
}

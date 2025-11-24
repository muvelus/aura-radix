import React, { useState, useMemo } from 'react';
import CrisisInputSection from './CrisisInputSection';
import CrisisOverviewCard from './CrisisOverviewCard';
import OfficialStatementCard from './OfficialStatementCard';
import KeyMessagingCard from './KeyMessagingCard';
import StrategicActionPlanCard from './StrategicActionPlanCard';
import CommunicationChannelsCard from './CommunicationChannelsCard';
import {
  calculateCrisisMetrics,
  determineSeverity,
  generateCrisisPlan,
  getSeverityColor
} from './crisisUtils';

export default function CrisisPlanGenerator({ selectedEntity, mentions = [] }) {
  const [problemDescription, setProblemDescription] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const crisisMetrics = useMemo(() => calculateCrisisMetrics(mentions), [mentions]);

  const handleGenerate = async () => {
    if (!problemDescription.trim()) return;

    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const severity = determineSeverity(problemDescription, crisisMetrics);
    const plan = generateCrisisPlan(problemDescription, severity, crisisMetrics, selectedEntity);

    setGeneratedPlan(plan);
    setIsGenerating(false);
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="p-6 space-y-6">
        <CrisisInputSection
          problemDescription={problemDescription}
          onDescriptionChange={setProblemDescription}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />

        {generatedPlan && (
          <div className="space-y-6">
            {/* Grid Layout - 2 columns */}
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column - 50% width */}
              <div className="space-y-6">
                <CrisisOverviewCard plan={generatedPlan} getSeverityColor={getSeverityColor} />
                <OfficialStatementCard statement={generatedPlan.officialStatement} />
                <KeyMessagingCard messages={generatedPlan.keyMessages} />
              </div>

              {/* Right Column - 50% width */}
              <div className="space-y-6">
                <StrategicActionPlanCard steps={generatedPlan.steps} />
                <CommunicationChannelsCard channels={generatedPlan.channels} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

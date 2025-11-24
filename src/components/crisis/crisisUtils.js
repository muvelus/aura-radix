import { AlertTriangle, MessageSquare, TrendingUp, Shield } from 'lucide-react';

export const calculateCrisisMetrics = (mentions) => {
  const negativeMentions = mentions.filter(m => m.aiSentiment === 'negative' && m.aiThreatScore >= 60);
  const criticalMentions = mentions.filter(m => m.aiThreatScore >= 85);
  const avgThreatScore = mentions.length > 0 
    ? Math.round(mentions.reduce((sum, m) => sum + m.aiThreatScore, 0) / mentions.length)
    : 0;

  return {
    totalCrisisMentions: criticalMentions.length,
    highRiskMentions: negativeMentions.length,
    avgThreatLevel: avgThreatScore,
    topThreats: mentions
      .filter(m => m.aiThreatScore >= 60)
      .sort((a, b) => b.aiThreatScore - a.aiThreatScore)
      .slice(0, 3)
      .map(m => ({
        text: m.textSnippet.substring(0, 80) + '...',
        score: m.aiThreatScore,
        platform: m.platform
      }))
  };
};

export const determineSeverity = (description, metrics) => {
  const hasRealCrisis = metrics.totalCrisisMentions > 0;
  const baselineSeverity = description.toLowerCase().includes('viral') || 
                           description.toLowerCase().includes('scandal') ? 'high' : 
                           description.toLowerCase().includes('negative') ? 'medium' : 'low';
  
  return (metrics.avgThreatLevel >= 85 || metrics.totalCrisisMentions >= 5) 
    ? 'high' 
    : metrics.avgThreatLevel >= 60 ? 'medium' : baselineSeverity;
};

export const generateCrisisPlan = (description, severity, metrics, selectedEntity) => {
  const hasRealCrisis = metrics.totalCrisisMentions > 0;
  
  return {
    severity,
    entityName: selectedEntity?.name || 'Entity',
    realTimeMetrics: {
      criticalMentions: metrics.totalCrisisMentions,
      highRiskMentions: metrics.highRiskMentions,
      avgThreatLevel: metrics.avgThreatLevel,
      topThreats: metrics.topThreats
    },
    timeline: severity === 'high' ? '4-6 hours' : severity === 'medium' ? '12-24 hours' : '24-48 hours',
    steps: [
      {
        phase: 'Immediate Response (0-2 hours)',
        icon: AlertTriangle,
        color: 'text-red-500',
        actions: [
          'Activate crisis communication team',
          `Monitor social media sentiment in real-time (Current: ${metrics.avgThreatLevel}/100 threat)`,
          'Prepare holding statement for immediate release',
          'Brief key stakeholders and management'
        ]
      },
      {
        phase: 'Strategic Communication (2-6 hours)',
        icon: MessageSquare,
        color: 'text-orange-500',
        actions: [
          'Draft official statement addressing concerns',
          'Identify key influencers and media contacts',
          'Prepare Q&A document for spokesperson',
          `Address top concerns: ${metrics.topThreats.length > 0 ? metrics.topThreats[0].platform : 'all platforms'}`
        ]
      },
      {
        phase: 'Reputation Recovery (6-24 hours)',
        icon: TrendingUp,
        color: 'text-yellow-500',
        actions: [
          'Launch positive narrative campaign',
          'Engage with community through verified channels',
          'Share behind-the-scenes content to humanize',
          'Activate brand ambassadors and supporters'
        ]
      },
      {
        phase: 'Long-term Mitigation (24-48 hours)',
        icon: Shield,
        color: 'text-green-500',
        actions: [
          'Monitor sentiment recovery metrics',
          'Implement preventive measures',
          'Document lessons learned',
          'Build stronger crisis protocols'
        ]
      }
    ],
    officialStatement: hasRealCrisis 
      ? `We are aware of the concerns raised and are actively monitoring the situation across all platforms. Our ${selectedEntity?.name || 'team'} is fully engaged in understanding and addressing these issues. We remain committed to our community and are taking immediate action. More details will follow within the next few hours.`
      : `We acknowledge the concerns raised regarding ${description.slice(0, 50)}... Our team is committed to transparency and accountability. We are taking immediate steps to address this situation and will provide regular updates as we work toward a resolution. The well-being of our community remains our top priority.`,
    channels: [
      { name: 'X', priority: 'High', action: 'Immediate statement + thread' },
      { name: 'Instagram', priority: 'High', action: 'Story + Feed post with video' },
      { name: 'Press Release', priority: 'Medium', action: 'Formal statement to media outlets' },
      { name: 'TikTok', priority: 'Medium', action: 'Short-form video response' },
      { name: 'Website', priority: 'Low', action: 'Dedicated crisis page with FAQs' }
    ],
    keyMessages: [
      'Acknowledge the situation with empathy',
      `Show awareness of ${metrics.highRiskMentions} reported concerns`,
      'Outline concrete action steps',
      'Emphasize commitment to values',
      'Provide clear next steps and timeline'
    ]
  };
};

export const getSeverityColor = (severity) => {
  switch(severity) {
    case 'high': return 'text-red-500 bg-red-500/10 border-red-500';
    case 'medium': return 'text-orange-500 bg-orange-500/10 border-orange-500';
    case 'low': return 'text-green-500 bg-green-500/10 border-green-500';
    default: return 'text-blue-500 bg-blue-500/10 border-blue-500';
  }
};

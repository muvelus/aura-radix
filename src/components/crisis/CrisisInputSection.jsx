import React from 'react';
import { Sparkles } from 'lucide-react';

export default function CrisisInputSection({ 
  problemDescription, 
  onDescriptionChange, 
  onGenerate, 
  isGenerating 
}) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Crisis Management Center</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Describe the crisis and get an AI-generated strategic response plan
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary rounded-lg">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered</span>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-card border border-border rounded-xl p-6">
        <label className="block text-sm font-semibold text-foreground mb-3">
          Describe the Crisis Situation
        </label>
        <textarea
          value={problemDescription}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Example: Actor X has a negative viral social media post about inappropriate behavior at a public event. The post has 50K+ shares and trending on X..."
          className="w-full h-32 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-muted-foreground">
            {problemDescription.length} characters
          </span>
          <button
            onClick={onGenerate}
            disabled={!problemDescription.trim() || isGenerating}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Crisis Plan
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

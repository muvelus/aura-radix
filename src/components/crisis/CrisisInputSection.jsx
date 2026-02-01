import React from 'react';
import { Sparkles } from 'lucide-react';
import FormInput from '../ui/FormInput';

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
        <FormInput
          id="crisis-description"
          label="Describe the Crisis Situation"
          type="textarea"
          rows={6}
          value={problemDescription}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Example: Actor X has a negative viral social media post about inappropriate behavior at a public event. The post has 50K+ shares and trending on X..."
          helpText={`${problemDescription.length} characters`}
        />
        <div className="flex items-center justify-end mt-4">
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

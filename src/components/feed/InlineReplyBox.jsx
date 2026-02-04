import React, { useState } from 'react';
import { X, Sparkles, RotateCw, Send, Loader2 } from 'lucide-react';
import { generateAIReply } from '../../utils/helpers';

export default function InlineReplyBox({ mention, onClose, onSend }) {
  const [replyText, setReplyText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAISuggest = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate appropriate reply based on sentiment
    const suggestedReply = generateAIReply(mention, 'auto');
    setReplyText(suggestedReply);
    setIsGenerating(false);
  };

  const handleRegenerate = async () => {
    if (!replyText) return;
    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Regenerate with slight variation
    const regenerated = generateAIReply(mention, 'auto');
    setReplyText(regenerated);
    setIsGenerating(false);
  };

  const handlePost = () => {
    if (!replyText.trim()) return;
    onSend(replyText);
    onClose();
  };

  return (
    <div className="border-t border-border bg-background/50 backdrop-blur-sm animate-in slide-in-from-top-2 duration-200">
      {/* Header with close button */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {(mention.author || "U").charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">{mention.author || "Unknown"}</div>
            <div className="text-xs text-muted-foreground">@{(mention.author || "user").toLowerCase().replace(/\s+/g, '')}</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          Hide Reply
        </button>
      </div>

      {/* Reply textarea */}
      <div className="px-4 pb-3">
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          disabled={isGenerating}
          className="w-full min-h-[100px] p-3 bg-accent/30 border border-border rounded-lg text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Draft your reply or use AI Suggest..."
        />
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-end gap-2 px-4 pb-4">
        {isGenerating && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mr-auto">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Generating...</span>
          </div>
        )}
        <button
          onClick={handleAISuggest}
          disabled={isGenerating}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-4 h-4" />
          AI Suggest
        </button>
        <button
          onClick={handleRegenerate}
          disabled={isGenerating || !replyText}
          className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors flex items-center gap-2 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCw className="w-4 h-4" />
          Regenerate
        </button>
        <button
          onClick={handlePost}
          disabled={isGenerating || !replyText.trim()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Post Reply
        </button>
      </div>
    </div>
  );
}

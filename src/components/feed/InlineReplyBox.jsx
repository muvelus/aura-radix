import React, { useState } from 'react';
import { Sparkles, RotateCw, Send, Loader2, Copy, Check } from 'lucide-react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Separator from '@radix-ui/react-separator';
import * as Label from '@radix-ui/react-label';
import { interactionService } from '../../api/interactionService';

export default function InlineReplyBox({ mention, onClose, onSend }) {
  const [generatedReply, setGeneratedReply] = useState('');
  const [replyText, setReplyText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleAISuggest = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Call the API endpoint: GET /api/interact/generate-reply/{id}
      const response = await interactionService.generateReply(mention.id);
      
      // Extract the generated reply from response
      let suggestedReply = response.generatedReply;
      
      if (suggestedReply && typeof suggestedReply === 'string') {
        // Clean up the response - remove escaped quotes and trim whitespace
        suggestedReply = suggestedReply.trim();
        
        // Remove leading and trailing escaped quotes if present
        if (suggestedReply.startsWith('"') && suggestedReply.endsWith('"')) {
          suggestedReply = suggestedReply.slice(1, -1);
        }
        
        // Set the generated reply in the display area and textarea
        setGeneratedReply(suggestedReply);
        setReplyText(suggestedReply);
      } else {
        setError('No suggestion generated. Please try again.');
      }
    } catch (err) {
      console.error('Error generating AI reply:', err);
      setError(err.response?.data?.message || err.message || 'Failed to generate suggestion');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async () => {
    if (!generatedReply) return;
    setIsGenerating(true);
    setError(null);
    
    try {
      // Call the API endpoint again to generate a new reply
      const response = await interactionService.generateReply(mention.id);
      
      // Extract the generated reply from response
      let regenerated = response?.generatedReply;
      
      if (regenerated && typeof regenerated === 'string') {
        // Clean up the response - remove escaped quotes and trim whitespace
        regenerated = regenerated.trim();
        
        // Remove leading and trailing escaped quotes if present
        if (regenerated.startsWith('"') && regenerated.endsWith('"')) {
          regenerated = regenerated.slice(1, -1);
        }
        
        // Set the generated reply in the display area and textarea
        setGeneratedReply(regenerated);
        setReplyText(regenerated);
      } else {
        setError('No suggestion generated. Please try again.');
      }
    } catch (err) {
      console.error('Error regenerating AI reply:', err);
      setError(err.response?.data?.message || err.message || 'Failed to regenerate suggestion');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedReply);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleUseGenerated = () => {
    setReplyText(generatedReply);
  };

  const handlePost = () => {
    if (!replyText.trim()) return;
    onSend(replyText);
    onClose();
  };

  return (
    <div 
      className="border-t border-border bg-background/50 backdrop-blur-sm animate-in slide-in-from-top-2 duration-200"
      role="region"
      aria-label="Reply box"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center" aria-label={`${mention.author || 'Unknown'} avatar`}>
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
          className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          aria-label="Close reply box"
        >
          Hide
        </button>
      </div>

      <Separator.Root className="bg-border/50" />

      {/* Error Message */}
      {error && (
        <div className="px-4 pt-3 pb-0">
          <div 
            className="px-3 py-2 bg-destructive/10 border border-destructive/30 text-destructive text-xs rounded-lg flex items-start gap-2"
            role="alert"
            aria-live="polite"
          >
            <span aria-hidden="true">⚠️</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Generated Reply Section */}
      {generatedReply && (
        <div className="px-4 py-3">
          <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide" id="generated-label">AI Generated Reply</div>
          <ScrollArea.Root className="h-max">
            <ScrollArea.Viewport className="max-h-[150px] rounded-lg border border-border bg-card/50 p-3" aria-labelledby="generated-label">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">
                {generatedReply}
              </p>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="vertical" className="w-2">
              <ScrollArea.Thumb className="bg-border rounded-full" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
          
          {/* Generated Reply Actions */}
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={handleCopy}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                copied
                  ? 'bg-green-500/20 text-green-500'
                  : 'bg-accent text-foreground hover:bg-accent/80'
              }`}
              aria-label={copied ? 'Reply copied to clipboard' : 'Copy reply to clipboard'}
              type="button"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" aria-hidden="true" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" aria-hidden="true" />
                  Copy
                </>
              )}
            </button>
            <button
              onClick={handleUseGenerated}
              className="px-3 py-1.5 rounded text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              aria-label="Use this generated reply in your message"
              type="button"
            >
              Use This Reply
            </button>
            <button
              onClick={handleRegenerate}
              disabled={isGenerating}
              className="px-3 py-1.5 rounded text-xs font-medium bg-accent text-foreground hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
              aria-label="Generate a different reply"
              aria-busy={isGenerating}
              type="button"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />
                  Regenerating...
                </>
              ) : (
                <>
                  <RotateCw className="w-3 h-3" aria-hidden="true" />
                  Regenerate
                </>
              )}
            </button>
          </div>
          
          <Separator.Root className="bg-border/50 mt-3" />
        </div>
      )}

      {/* Manual Reply Textarea */}
      <div className="px-4 py-3">
        <Label.Root htmlFor="reply-textarea" className="text-sm font-semibold text-foreground mb-1 uppercase tracking-wide block">Your Reply</Label.Root>
        <textarea
          id="reply-textarea"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          disabled={isGenerating}
          className="w-full min-h-[120px] p-4 bg-accent/30 border-2 border-border rounded-lg text-base text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Type or paste your reply here..."
          aria-label="Your reply message"
        />
      </div>

      <Separator.Root className="bg-border/50" />

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-2">
          {isGenerating && !generatedReply && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground" aria-live="polite">
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span>Generating...</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={handleAISuggest}
            disabled={isGenerating}
            className="px-5 py-2.5 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors flex items-center gap-2 font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Get AI suggestion for reply"
            aria-busy={isGenerating}
            type="button"
          >
            <Sparkles className="w-5 h-5" aria-hidden="true" />
            AI Suggest
          </button>
          <button
            onClick={handlePost}
            disabled={isGenerating || !replyText.trim()}
            className="px-8 py-3.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            aria-label="Post your reply"
            type="button"
          >
            <Send className="w-5 h-5" aria-hidden="true" />
            Post Reply
          </button>
        </div>
      </div>
    </div>
  );
}

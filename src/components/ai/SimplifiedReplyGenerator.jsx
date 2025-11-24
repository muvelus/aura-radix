import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Sparkles, Check, Copy, User, Wand2 } from 'lucide-react';
import { generateAIReply } from '../../utils/helpers';

export default function SimplifiedReplyGenerator({ mention, open, onOpenChange }) {
  const [replyMode, setReplyMode] = useState('ai-improve'); // 'ai-only', 'ai-improve', 'hybrid'
  const [userDraft, setUserDraft] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [finalDraft, setFinalDraft] = useState('');
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate AI suggestion based on mode
  useEffect(() => {
    if (open && mention) {
      if (replyMode === 'ai-only') {
        setIsGenerating(true);
        // Simulate AI generation
        setTimeout(() => {
          const reply = generateAIReply(mention);
          setAiSuggestion(reply);
          setFinalDraft(reply);
          setIsGenerating(false);
        }, 800);
      } else if (replyMode === 'ai-improve' && userDraft.trim()) {
        setIsGenerating(true);
        // Simulate AI improvement
        setTimeout(() => {
          const improved = improveUserReply(userDraft, mention);
          setAiSuggestion(improved);
          setFinalDraft(improved);
          setIsGenerating(false);
        }, 600);
      }
      setSent(false);
      setCopied(false);
    }
  }, [open, mention, replyMode]);

  // Auto-improve when user types (debounced)
  useEffect(() => {
    if (replyMode === 'ai-improve' && userDraft.trim().length > 10) {
      const timer = setTimeout(() => {
        setIsGenerating(true);
        setTimeout(() => {
          const improved = improveUserReply(userDraft, mention);
          setAiSuggestion(improved);
          setIsGenerating(false);
        }, 600);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [userDraft, replyMode, mention]);

  const handleCopy = () => {
    navigator.clipboard.writeText(finalDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      onOpenChange(false);
    }, 1500);
  };

  const handleUseAISuggestion = () => {
    setFinalDraft(aiSuggestion);
  };

  const handleUseMyReply = () => {
    setFinalDraft(userDraft);
  };

  if (!mention) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-3xl max-h-[80vh] bg-card border border-border rounded-lg shadow-2xl z-50 flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-border">
            <div className="flex items-start justify-between">
              <div>
                <Dialog.Title className="text-lg font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Quick Reply
                </Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground mt-1">
                  Respond to {mention.author} • {mention.platform}
                </Dialog.Description>
              </div>
              <Dialog.Close className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>
          </div>

          {/* Original Mention */}
          <div className="px-5 py-3 bg-accent/20 border-b border-border">
            <div className="text-xs text-muted-foreground mb-1">Original Post</div>
            <p className="text-sm line-clamp-2">{mention.textSnippet}</p>
          </div>

          {/* Reply Mode Selection - Emphasized Option 2 */}
          <div className="px-5 py-4 border-b border-border">
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setReplyMode('ai-only')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  replyMode === 'ai-only'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Sparkles className="w-5 h-5 mb-2 mx-auto text-primary" />
                <div className="text-xs font-semibold text-center">AI Reply</div>
                <div className="text-[10px] text-muted-foreground text-center mt-1">
                  Let AI handle it
                </div>
              </button>

              {/* EMPHASIZED - User + AI */}
              <button
                onClick={() => setReplyMode('ai-improve')}
                className={`p-4 rounded-lg border-2 transition-all relative ${
                  replyMode === 'ai-improve'
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-primary/50 hover:border-primary bg-primary/5'
                }`}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] rounded-full font-semibold">
                  RECOMMENDED
                </div>
                <Wand2 className="w-5 h-5 mb-2 mx-auto text-primary" />
                <div className="text-xs font-semibold text-center">Your Reply + AI</div>
                <div className="text-[10px] text-muted-foreground text-center mt-1">
                  Write, AI improves
                </div>
              </button>

              <button
                onClick={() => setReplyMode('hybrid')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  replyMode === 'hybrid'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <User className="w-5 h-5 mb-2 mx-auto text-primary" />
                <div className="text-xs font-semibold text-center">Manual</div>
                <div className="text-[10px] text-muted-foreground text-center mt-1">
                  Full control
                </div>
              </button>
            </div>
          </div>

          {/* Reply Editor */}
          <div className="flex-1 overflow-hidden flex flex-col p-5">
            {replyMode === 'ai-only' ? (
              // AI Only Mode
              <div className="space-y-3">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  AI Generated Reply
                </div>
                <textarea
                  value={finalDraft}
                  onChange={(e) => setFinalDraft(e.target.value)}
                  className="w-full h-32 bg-background border border-border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={isGenerating ? "AI is generating..." : "AI reply will appear here..."}
                  disabled={isGenerating}
                />
              </div>
            ) : replyMode === 'ai-improve' ? (
              // User + AI Mode (EMPHASIZED)
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    Your Draft
                  </div>
                  <textarea
                    value={userDraft}
                    onChange={(e) => setUserDraft(e.target.value)}
                    className="w-full h-32 bg-background border border-border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Type your reply here..."
                  />
                  <button
                    onClick={handleUseMyReply}
                    disabled={!userDraft.trim()}
                    className="w-full px-3 py-2 text-xs bg-accent hover:bg-accent/80 rounded-md transition-colors disabled:opacity-50"
                  >
                    Use My Reply
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI Improved Version
                  </div>
                  <div className="relative">
                    <textarea
                      value={aiSuggestion}
                      readOnly
                      className="w-full h-32 bg-primary/5 border border-primary/30 rounded-lg p-3 text-sm resize-none"
                      placeholder={
                        userDraft.trim().length > 10
                          ? isGenerating
                            ? "AI is improving your reply..."
                            : "AI suggestion will appear here..."
                          : "Type at least 10 characters..."
                      }
                    />
                    {isGenerating && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-lg">
                        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleUseAISuggestion}
                    disabled={!aiSuggestion}
                    className="w-full px-3 py-2 text-xs bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors disabled:opacity-50"
                  >
                    Use AI Version
                  </button>
                </div>
              </div>
            ) : (
              // Manual Mode
              <div className="space-y-3">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  Your Reply
                </div>
                <textarea
                  value={finalDraft}
                  onChange={(e) => setFinalDraft(e.target.value)}
                  className="w-full h-32 bg-background border border-border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Type your reply..."
                />
              </div>
            )}

            {/* Final Draft Display */}
            {replyMode !== 'hybrid' && (replyMode === 'ai-only' || finalDraft) && (
              <div className="mt-4 space-y-2">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  Final Reply to Send
                </div>
                <div className="bg-accent/30 border border-border rounded-lg p-3 text-sm min-h-[60px]">
                  {finalDraft || <span className="text-muted-foreground">Choose a reply above...</span>}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-border flex items-center justify-between">
            <button
              onClick={handleCopy}
              disabled={!finalDraft}
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <div className="flex items-center gap-3">
              <Dialog.Close asChild>
                <button className="px-4 py-2 text-sm hover:bg-accent rounded-md transition-colors">
                  Cancel
                </button>
              </Dialog.Close>
              <button
                onClick={handleSend}
                disabled={sent || !finalDraft}
                className={`px-6 py-2 text-sm rounded-md transition-all font-medium disabled:opacity-50 ${
                  sent
                    ? 'bg-green-600 text-white'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {sent ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Sent!
                  </span>
                ) : (
                  'Send Reply'
                )}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// Helper function to simulate AI improvement
function improveUserReply(userText, mention) {
  // In production, this would call an AI API
  // For now, simulate with template improvements
  
  const improvements = [
    `${userText}\n\nThank you for bringing this to our attention. We're committed to addressing your concerns promptly.`,
    `We appreciate your feedback. ${userText}\n\nFor further assistance, please feel free to reach out to us directly.`,
    `${userText}\n\nYour input is valuable to us, and we're taking immediate action to resolve this matter.`,
  ];
  
  return improvements[Math.floor(Math.random() * improvements.length)];
}

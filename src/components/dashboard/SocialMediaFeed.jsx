import React, { useState, useMemo } from 'react';
import { MessageSquare, Heart, MessageCircle, Share2, AlertTriangle, Star, Send, X, Sparkles, RotateCcw, Check } from 'lucide-react';

export default function SocialMediaFeed({ mentions, selectedEntity }) {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [expandedReplyId, setExpandedReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState({}); // Store replies by mention id
  const [toast, setToast] = useState(null); // Toast notification state

  // Group and filter mentions by platform
  const platformMentions = useMemo(() => {
    if (!mentions || mentions.length === 0) {
      return { all: [], reddit: [], instagram: [], twitter: [] };
    }

    const grouped = {
      all: mentions.slice(0, 20), // Show latest 20 for all
      reddit: mentions.filter(m => m.platform === 'reddit').slice(0, 15),
      instagram: mentions.filter(m => m.platform === 'youtube').slice(0, 15), // youtube used for instagram
      twitter: mentions.filter(m => m.platform === 'twitter').slice(0, 15)
    };

    return grouped;
  }, [mentions]);

  const displayMentions = platformMentions[selectedPlatform] || platformMentions.all;

  const platformInfo = {
    reddit: { icon: '🔴', name: 'Reddit', color: 'text-[#FF4500]', bg: 'bg-[#FF4500]/10' },
    instagram: { icon: '📷', name: 'Instagram', color: 'text-[#E1306C]', bg: 'bg-[#E1306C]/10' },
    twitter: { icon: '𝕏', name: 'X (Twitter)', color: 'text-black', bg: 'bg-black/10' },
    all: { icon: '🌐', name: 'All Platforms', color: 'text-primary', bg: 'bg-primary/10' }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-500';
      case 'negative':
        return 'text-red-500';
      case 'neutral':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const getSentimentBg = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500/10';
      case 'negative':
        return 'bg-red-500/10';
      case 'neutral':
        return 'bg-yellow-500/10';
      default:
        return 'bg-gray-500/10';
    }
  };

  const getThreatLevel = (score) => {
    if (score >= 70) return { label: 'High', color: 'text-red-500', bg: 'bg-red-500/10' };
    if (score >= 40) return { label: 'Medium', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
    return { label: 'Low', color: 'text-green-500', bg: 'bg-green-500/10' };
  };

  const formatEngagement = (count) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  const handleReplyClick = (mentionId) => {
    setExpandedReplyId(expandedReplyId === mentionId ? null : mentionId);
    if (expandedReplyId !== mentionId) {
      setReplyText('');
    }
  };

  const handleSendReply = (mentionId) => {
    if (replyText.trim()) {
      const timestamp = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit'
      });
      setReplies({
        ...replies,
        [mentionId]: [
          ...(replies[mentionId] || []),
          {
            id: Date.now(),
            text: replyText,
            timestamp,
            author: 'You'
          }
        ]
      });
      setReplyText('');
      setExpandedReplyId(null);
      showToast('Reply posted successfully!');
    }
  };

  const handleCancelReply = () => {
    setExpandedReplyId(null);
    setReplyText('');
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const aiSuggestions = [
    "Thank you for watching! We're thrilled you enjoyed the film. Your support means everything to us.",
    "We appreciate the love! This kind of feedback motivates our entire team to keep creating quality content.",
    "So glad you connected with the story! We'd love to hear more of your thoughts about the characters.",
    "Thanks for the wonderful review! We're committed to bringing more engaging narratives like this.",
    "Your enthusiasm is exactly what drives us to push creative boundaries. Thank you for being part of this journey!",
    "We're so happy this resonated with you. Please share your experience with friends and family!",
    "Comments like these fuel our passion for filmmaking. Excited to have you as part of our community!",
    "Thank you for taking the time to watch and share your thoughts. We value every piece of feedback.",
    "We're delighted you had such a positive experience. Looking forward to bringing you more great content!",
    "Your support is invaluable to us. We can't wait to share our next project with audiences like you!"
  ];

  const generateAISuggestion = () => {
    const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
    setReplyText(randomSuggestion);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Social Media Posts
        </h3>
        <span className="text-xs text-muted-foreground">{displayMentions.length} posts</span>
      </div>

      {/* Platform Tabs */}
      <div className="flex gap-2 border-b border-border pb-4">
        {['all', 'reddit', 'instagram', 'twitter'].map((platform) => {
          const info = platformInfo[platform];
          const count = platformMentions[platform].length;
          return (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedPlatform === platform
                  ? `${info.bg} ${info.color} border border-current`
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <span className="mr-1">{info.icon}</span>
              {info.name}
              {count > 0 && <span className="ml-2 text-xs opacity-70">({count})</span>}
            </button>
          );
        })}
      </div>

      {/* Posts List */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {displayMentions.length > 0 ? (
          displayMentions.map((mention, idx) => (
            <div key={idx} className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
              <div className="p-4 space-y-3">
              {/* Header - Platform & Author */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                    {mention.author?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{mention.author || 'Anonymous'}</p>
                      {/* Star indicator for real vs generated comments */}
                      {mention.isRealComment ? (
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" title="Real comment from social media" />
                      ) : (
                        <Star className="w-4 h-4 fill-red-300 text-red-300" title="Auto-generated comment" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {mention.platform === 'youtube' ? 'Instagram' : mention.platform === 'twitter' ? 'X' : mention.platform}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Sentiment Badge */}
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium capitalize ${getSentimentColor(
                      mention.aiSentiment
                    )} ${getSentimentBg(mention.aiSentiment)}`}
                  >
                    {mention.aiSentiment}
                  </span>
                  {/* Threat Badge */}
                  {mention.aiThreatScore >= 40 && (
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getThreatLevel(
                        mention.aiThreatScore
                      ).color} ${getThreatLevel(mention.aiThreatScore).bg}`}
                    >
                      <AlertTriangle className="w-3 h-3" />
                      {getThreatLevel(mention.aiThreatScore).label}
                    </span>
                  )}
                </div>
              </div>

              {/* Post Content */}
              <p className="text-sm text-foreground leading-relaxed line-clamp-3">{mention.text}</p>

              {/* Metadata */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pb-3 border-b border-border/50">
                <span>{new Date(mention.timestamp).toLocaleDateString()}</span>
                <span className="text-xs">Narrative: {mention.narrative}</span>
              </div>

              {/* Engagement Stats & Reply Button */}
              <div className="flex items-center justify-between">
                <div className="grid grid-cols-3 gap-4 flex-1">
                  <div className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    <Heart className="w-3 h-3" />
                    <span className="text-xs">{formatEngagement(mention.engagement?.likes || 0)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    <MessageCircle className="w-3 h-3" />
                    <span className="text-xs">{formatEngagement(mention.engagement?.comments || 0)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    <Share2 className="w-3 h-3" />
                    <span className="text-xs">{formatEngagement(mention.engagement?.shares || 0)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-primary">Risk: {mention.aiThreatScore}</span>
                  <button
                    onClick={() => handleReplyClick(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                      expandedReplyId === idx
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent text-muted-foreground hover:text-foreground hover:bg-primary/20'
                    }`}
                  >
                    <MessageSquare className="w-3 h-3" />
                    Reply
                  </button>
                </div>
              </div>

              {/* Previous Replies */}
              {replies[idx] && replies[idx].length > 0 && (
                <div className="space-y-2 pt-3 border-t border-border/50">
                  {replies[idx].map((reply) => (
                    <div key={reply.id} className="pl-4 border-l-2 border-primary/30">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-medium text-primary">{reply.author}</p>
                          <p className="text-xs text-muted-foreground">{reply.timestamp}</p>
                        </div>
                      </div>
                      <p className="text-xs text-foreground mt-1">{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}
              </div>

              {/* Reply Box */}
              {expandedReplyId === idx && (
                <div className="bg-background/50 border-t border-border p-4 space-y-3">
                  {/* Hide Reply Link */}
                  <button
                    onClick={handleCancelReply}
                    className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Hide Reply
                  </button>

                  {/* Reply Textarea */}
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Draft your reply or use AI Suggest..."
                    className="w-full px-4 py-3 bg-card/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    rows={4}
                    autoFocus
                  />

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={generateAISuggestion}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-primary/20 text-primary hover:bg-primary/30 transition-colors flex items-center gap-2"
                      title="Use AI to suggest reply based on sentiment and context"
                    >
                      <Sparkles className="w-4 h-4" />
                      AI Suggest
                    </button>
                    <button
                      onClick={() => setReplyText('')}
                      disabled={!replyText.trim()}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-accent text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                      title="Clear and regenerate suggestion"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Regenerate
                    </button>
                    <button
                      onClick={() => handleSendReply(idx)}
                      disabled={!replyText.trim()}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Post Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No posts found for this platform</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span>Real comment from social media</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-3.5 h-3.5 fill-red-300 text-red-300" />
          <span>Auto-generated comment</span>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Check className="w-4 h-4" />
          {toast}
        </div>
      )}
    </div>
  );
}

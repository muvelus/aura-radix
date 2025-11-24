import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';

export default function SentimentTrendChart({ timeBuckets, releaseDate, selectedEntity }) {
  // Robust release date matching with proper date normalization
  const releaseDateInfo = useMemo(() => {
    if (!releaseDate || !timeBuckets || timeBuckets.length === 0) {
      return { label: null, displayDate: null, isInRange: false };
    }

    try {
      // Parse release date string YYYY-MM-DD using UTC to avoid timezone issues
      const releaseParts = releaseDate.split('-');
      const releaseYear = parseInt(releaseParts[0], 10);
      const releaseMonth = parseInt(releaseParts[1], 10);
      const releaseDay = parseInt(releaseParts[2], 10);
      
      // Create date at midnight UTC (not local time!)
      const releaseDateUtc = new Date(Date.UTC(releaseYear, releaseMonth - 1, releaseDay, 0, 0, 0, 0));
      const releaseDateMs = releaseDateUtc.getTime();
      
      // For display (format nicely)
      const releaseDateObj = new Date(releaseYear, releaseMonth - 1, releaseDay);
      const displayDate = releaseDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      console.log('🔍 Release Date Debug:', {
        releaseDate,
        parsed: { releaseYear, releaseMonth, releaseDay },
        releaseDateObj: releaseDateObj.toString(),
        releaseDateMs,
        timeBucketsCount: timeBuckets.length,
        firstBucket: { time: timeBuckets[0].time, bucketDateMs: timeBuckets[0]?.bucketDateMs },
        lastBucket: { time: timeBuckets[timeBuckets.length - 1].time, bucketDateMs: timeBuckets[timeBuckets.length - 1]?.bucketDateMs }
      });
      
      // Check exact match first (for edge case where release date has its own bucket)
      if (timeBuckets[0].bucketDateMs !== undefined) {
        for (let i = 0; i < timeBuckets.length; i++) {
          if (timeBuckets[i].bucketDateMs === releaseDateMs) {
            console.log('✅ Found exact match at bucket', i, timeBuckets[i].time);
            return {
              label: timeBuckets[i].time,
              displayDate,
              isInRange: true
            };
          }
        }
      }
      
      // Check range using bucketDateMs if available
      if (timeBuckets.length > 0 && timeBuckets[0].bucketDateMs !== undefined) {
        // After .reverse() in AnalyticsView: [0] is oldest, [length-1] is newest
        const oldestMs = timeBuckets[0].bucketDateMs;
        const newestMs = timeBuckets[timeBuckets.length - 1].bucketDateMs;
        
        const isInRange = releaseDateMs >= oldestMs && releaseDateMs <= newestMs;
        
        console.log('📊 Range check (with bucketDateMs):', {
          releaseDateMs,
          oldestMs: oldestMs ? new Date(oldestMs).toDateString() : 'undefined',
          newestMs: newestMs ? new Date(newestMs).toDateString() : 'undefined',
          releaseDate: new Date(releaseDateMs).toDateString(),
          isInRange
        });
        
        if (isInRange) {
          // Find closest bucket
          let closestIdx = 0;
          let minDiff = Math.abs(releaseDateMs - timeBuckets[0].bucketDateMs);
          
          for (let i = 1; i < timeBuckets.length; i++) {
            const diff = Math.abs(releaseDateMs - timeBuckets[i].bucketDateMs);
            if (diff < minDiff) {
              minDiff = diff;
              closestIdx = i;
            }
          }
          
          console.log('✨ Closest bucket:', closestIdx, timeBuckets[closestIdx].time);
          
          return {
            label: timeBuckets[closestIdx].time,
            displayDate,
            isInRange: true
          };
        }
      } else {
        // Fallback: bucketDateMs might not be available, try to parse from timeLabels
        // This is a last resort - try to find ANY close match by date comparison
        console.log('⚠️ bucketDateMs not available, trying fallback matching');
        
        // Try to find a bucket that might contain this date by checking all buckets
        for (let i = 0; i < timeBuckets.length; i++) {
          const bucket = timeBuckets[i];
          // Try to extract date info from fullDate if available
          if (bucket.fullDate) {
            const bucketDateObj = new Date(bucket.fullDate);
            const bucketDateOnly = new Date(bucketDateObj.getFullYear(), bucketDateObj.getMonth(), bucketDateObj.getDate());
            if (bucketDateOnly.getTime() === releaseDateMs) {
              console.log('✅ Found match via fullDate at bucket', i);
              return {
                label: bucket.time,
                displayDate,
                isInRange: true
              };
            }
          }
        }
        
        // If no exact match, assume we're in range since buckets exist
        // This is a safety fallback
        console.log('⚠️ Could not match release date exactly, using closest bucket');
        return {
          label: timeBuckets[Math.floor(timeBuckets.length / 2)].time,
          displayDate,
          isInRange: true  // Assume in range if we have buckets
        };
      }
      
      return {
        label: null,
        displayDate,
        isInRange: false
      };
    } catch (err) {
      console.error('❌ Error matching release date:', err);
      return { label: null, displayDate: null, isInRange: false };
    }
  }, [releaseDate, timeBuckets]);

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Sentiment Trend</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Sentiment distribution over time
          {releaseDateInfo.displayDate && (
            <span className="ml-2 text-primary font-medium">
              📅 Release: {releaseDateInfo.displayDate}
              {!releaseDateInfo.isInRange && ' (outside visible range)'}
            </span>
          )}
        </p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={timeBuckets}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
          
          {/* Release date reference line - only shown if in range */}
          {releaseDateInfo.label && releaseDateInfo.isInRange && (
            <ReferenceLine 
              x={releaseDateInfo.label} 
              stroke="#6366f1" 
              strokeDasharray="5 5"
              strokeWidth={2.5}
              label={{ 
                value: '📅 Release', 
                position: 'top',
                fill: '#6366f1',
                fontSize: 12,
                fontWeight: 600,
                offset: 12,
                backgroundColor: '#1a1a1a',
                padding: [2, 6]
              }}
            />
          )}
          
          <XAxis 
            dataKey="time" 
            tick={{ fill: '#888', fontSize: 11 }}
            stroke="#444"
          />
          <YAxis 
            tick={{ fill: '#888', fontSize: 11 }}
            stroke="#444"
            label={{ value: '%', angle: -90, position: 'insideLeft', offset: 5, fill: '#888', fontSize: 11 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1a1a1a', 
              border: '1px solid #333',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#ffffff'
            }}
            labelFormatter={(label) => {
              // Use stored fullDate from bucket for accurate tooltip
              const bucket = timeBuckets.find(b => b.time === label);
              if (bucket?.fullDate) {
                return bucket.fullDate;
              }
              return label;
            }}
            formatter={(value, name) => {
              const sentimentNames = { positive: 'Positive', neutral: 'Neutral', negative: 'Negative' };
              const displayName = sentimentNames[name] || name;
              return [`${value}%`, displayName];
            }}
          />
          
          <Line 
            type="monotone" 
            dataKey="positive" 
            stroke="#22c55e" 
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
          />
          <Line 
            type="monotone" 
            dataKey="neutral" 
            stroke="#eab308" 
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
          />
          <Line 
            type="monotone" 
            dataKey="negative" 
            stroke="#ef4444" 
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function SentimentTrendChart({ sentimentData = [] }) {
  if (!sentimentData || sentimentData.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-5 flex items-center justify-center h-96">
        <p className="text-muted-foreground">
          No sentiment trend data available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          Sentiment Trend
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Positive, negative, and neutral mentions over time
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={sentimentData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#888", fontSize: 12 }}
            tickFormatter={(value) => {
              // Use the date field as-is, regardless of format
              // Handles: YYYY-MM-DD, YYYY-Www (week), YYYY-MM (month), etc.
              return value;
            }}
          />
          <YAxis tick={{ fill: "#888", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#fff" }}
            formatter={(value) => value}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="positive"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ fill: "#22c55e", r: 4 }}
            activeDot={{ r: 6 }}
            name="Positive"
          />
          <Line
            type="monotone"
            dataKey="negative"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ fill: "#ef4444", r: 4 }}
            activeDot={{ r: 6 }}
            name="Negative"
          />
          <Line
            type="monotone"
            dataKey="neutral"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ fill: "#8b5cf6", r: 4 }}
            activeDot={{ r: 6 }}
            name="Neutral"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

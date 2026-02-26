import React from 'react';
import { DollarSign } from 'lucide-react';
import OpeningDayCard from './OpeningDayCard';
import WeekendGrossCard from './WeekendGrossCard';
import WorldwideGrossCard from './WorldwideGrossCard';

export default function FinancialProjectionsSection({ projections }) {
  if (!projections) return null;

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-amber-400" />
        Financial Projections
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <OpeningDayCard data={projections.opening_day_collection} />
        <WeekendGrossCard data={projections.average_weekend_gross_cumulative} />
        <WorldwideGrossCard data={projections.mean_worldwide_gross_total} />
      </div>
    </div>
  );
}

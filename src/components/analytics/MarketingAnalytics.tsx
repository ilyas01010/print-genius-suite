
import React from "react";
import TrafficOverview from "./charts/TrafficOverview";
import TrafficSources from "./charts/TrafficSources";
import CampaignPerformance from "./charts/CampaignPerformance";
import CtrTrend from "./charts/CtrTrend";

const MarketingAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Traffic Overview Chart */}
      <TrafficOverview />

      {/* Two-column charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Traffic Sources */}
        <TrafficSources />

        {/* Campaign Performance */}
        <CampaignPerformance />
      </div>

      {/* CTR Trend */}
      <CtrTrend />
    </div>
  );
};

export default MarketingAnalytics;

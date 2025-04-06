
import React from "react";
import Layout from "@/components/layout/Layout";

const MarketingPlanner = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Marketing Planner</h1>
          <p className="text-muted-foreground">
            Plan and schedule your marketing campaigns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Campaigns</h2>
            <p className="text-muted-foreground">
              No campaigns scheduled yet. Create your first campaign to start planning.
            </p>
            <button className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              Create Campaign
            </button>
          </div>
          
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Marketing Templates</h2>
            <p className="text-muted-foreground">
              Use our pre-designed templates to create professional marketing materials quickly.
            </p>
            <button className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              Browse Templates
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MarketingPlanner;

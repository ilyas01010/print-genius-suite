
import React from "react";
import Layout from "@/components/layout/Layout";
import KeywordForm from "@/components/niche-research/KeywordForm";
import TrendList from "@/components/niche-research/TrendList";

const NicheResearch = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Niche Research</h1>
          <p className="text-muted-foreground">
            Discover profitable niches and analyze competition across POD platforms
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <KeywordForm />
            <div className="hidden md:block rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold mb-3">Niche Research Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Search for broad niches first, then narrow down to sub-niches</li>
                <li>• Look for niches with high search volume but low competition</li>
                <li>• Consider seasonal trends when evaluating niches</li>
                <li>• Analyze competition quality on each POD platform separately</li>
                <li>• Test multiple related keywords to find untapped opportunities</li>
              </ul>
            </div>
          </div>
          <TrendList />
        </div>
      </div>
    </Layout>
  );
};

export default NicheResearch;

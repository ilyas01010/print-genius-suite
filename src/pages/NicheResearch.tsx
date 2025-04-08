
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import KeywordForm from '@/components/niche-research/KeywordForm';
import TrendList from '@/components/niche-research/TrendList';

const NicheResearch = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        <h1 className="font-bold text-3xl">Niche Research</h1>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <KeywordForm />
          </div>
          <div>
            <TrendList />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NicheResearch;

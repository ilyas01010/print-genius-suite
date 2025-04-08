
import React from 'react';
import Layout from "@/components/layout/Layout";
import PageLayout from '@/components/layout/PageLayout';
import TrademarkForm from '@/components/copyright-checker/TrademarkForm';

const CopyrightChecker = () => {
  return (
    <Layout>
      <PageLayout>
        <div className="space-y-6">
          <h1 className="font-bold text-3xl">Copyright & Trademark Checker</h1>
          <p className="text-muted-foreground">
            Verify your designs don't infringe on existing copyrights or trademarks.
          </p>
          <TrademarkForm />
        </div>
      </PageLayout>
    </Layout>
  );
};

export default CopyrightChecker;

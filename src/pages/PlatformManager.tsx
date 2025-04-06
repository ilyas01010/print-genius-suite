
import React from "react";
import Layout from "@/components/layout/Layout";

const PlatformManager = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Platform Manager</h1>
          <p className="text-muted-foreground">
            Manage your POD platform integrations and listings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Connected Platforms</h2>
            <p className="text-muted-foreground">
              No platforms connected yet. Connect your first platform to start managing your listings.
            </p>
            <button className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              Connect Platform
            </button>
          </div>
          
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Product Stats</h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-muted-foreground">Active Products:</span> 
                <span className="font-medium">0</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Total Sales:</span> 
                <span className="font-medium">0</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Revenue:</span> 
                <span className="font-medium">$0.00</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlatformManager;

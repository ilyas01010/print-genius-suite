
import React from "react";
import Layout from "@/components/layout/Layout";

const LearningHub = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Learning Hub</h1>
          <p className="text-muted-foreground">
            Tutorials, guides, and resources to help you succeed with Print Genius
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
            <p className="text-muted-foreground mb-4">
              Learn the basics of Print Genius and how to set up your first project.
            </p>
            <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              View Guide
            </button>
          </div>
          
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Design Tips</h2>
            <p className="text-muted-foreground mb-4">
              Professional design tips to make your products stand out.
            </p>
            <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              View Tips
            </button>
          </div>
          
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Video Tutorials</h2>
            <p className="text-muted-foreground mb-4">
              Step-by-step video guides for using all Print Genius features.
            </p>
            <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              Watch Videos
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LearningHub;

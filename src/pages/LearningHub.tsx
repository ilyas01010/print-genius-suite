
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const LearningHub = () => {
  return (
    <Layout>
      <div className="space-y-4 sm:space-y-5 animate-fade">
        <div className="flex flex-col gap-1 sm:gap-2">
          <h1 className="font-bold text-2xl sm:text-3xl">Learning Hub</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Tutorials, guides, and resources to help you succeed with Print Genius
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border bg-card p-3 sm:p-4">
            <h2 className="text-lg font-semibold mb-2 sm:mb-3">Getting Started</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Learn the basics of Print Genius and how to set up your first project.
            </p>
            <Button size="sm">View Guide</Button>
          </div>
          
          <div className="rounded-lg border bg-card p-3 sm:p-4">
            <h2 className="text-lg font-semibold mb-2 sm:mb-3">Design Tips</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Professional design tips to make your products stand out.
            </p>
            <Button size="sm">View Tips</Button>
          </div>
          
          <div className="rounded-lg border bg-card p-3 sm:p-4">
            <h2 className="text-lg font-semibold mb-2 sm:mb-3">Video Tutorials</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Step-by-step video guides for using all Print Genius features.
            </p>
            <Button size="sm">Watch Videos</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LearningHub;

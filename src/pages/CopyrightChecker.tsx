
import React from "react";
import Layout from "@/components/layout/Layout";
import TrademarkForm from "@/components/copyright-checker/TrademarkForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, AlertCircle } from "lucide-react";

const CopyrightChecker = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Copyright & Trademark Checker</h1>
          <p className="text-muted-foreground">
            Verify your designs against potential copyright and trademark issues
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <TrademarkForm />
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  Common Risk Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full h-1.5 w-1.5 bg-red-500 mt-2"></div>
                    <span>Using famous brand names, even with alterations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full h-1.5 w-1.5 bg-red-500 mt-2"></div>
                    <span>Trademarked phrases or slogans from ads or movies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full h-1.5 w-1.5 bg-red-500 mt-2"></div>
                    <span>Team, university, or organization names without license</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full h-1.5 w-1.5 bg-red-500 mt-2"></div>
                    <span>Names of celebrities or public figures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full h-1.5 w-1.5 bg-red-500 mt-2"></div>
                    <span>Song lyrics, book titles, or movie quotes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-500" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pod-blue text-white">
                      1
                    </div>
                    <p>Our system scans your design text against trademark databases</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pod-blue text-white">
                      2
                    </div>
                    <p>AI algorithms identify potential risks and flag concerning content</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pod-blue text-white">
                      3
                    </div>
                    <p>Get alternative suggestions for flagged content</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pod-blue text-white">
                      4
                    </div>
                    <p>Receive a detailed report of potential issues and recommendations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CopyrightChecker;

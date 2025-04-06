
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReferralSettingsProps {
  referralCode: string;
  affiliateLink: string;
  handleCopyReferral: () => void;
  handleCopyAffiliate: () => void;
  handleRegenerateReferralCode: () => void;
}

const ReferralSettings = ({
  referralCode,
  affiliateLink,
  handleCopyReferral,
  handleCopyAffiliate,
  handleRegenerateReferralCode
}: ReferralSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Referrals & Affiliates</CardTitle>
        <CardDescription>
          Manage your referral program and affiliate settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="referral-code">Your Referral Code</Label>
          <div className="flex">
            <Input 
              id="referral-code" 
              value={referralCode} 
              readOnly
              className="rounded-r-none"
            />
            <Button variant="outline" onClick={handleCopyReferral} className="rounded-l-none border-l-0">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-end mt-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRegenerateReferralCode}
            >
              Generate New Code
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Share this code to earn rewards when new users sign up</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="affiliate-link">Affiliate Link</Label>
          <div className="flex">
            <Input 
              id="affiliate-link" 
              value={affiliateLink} 
              readOnly
              className="rounded-r-none"
            />
            <Button variant="outline" onClick={handleCopyAffiliate} className="rounded-l-none border-l-0">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Share this link to earn commission on sales</p>
        </div>
        
        <div className="border rounded-md p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium">Referral Stats</p>
            <Button variant="ghost" size="sm">View Details <ChevronRight className="h-4 w-4 ml-1" /></Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Referred Users</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
              <p className="text-2xl font-bold mt-1">$0.00</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralSettings;

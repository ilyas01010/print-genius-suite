
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, ChevronRight, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t } = useLanguage();
  
  return (
    <Card className="overflow-hidden border shadow-soft transition-all hover:shadow-soft-lg">
      <CardHeader className="bg-muted/30">
        <CardTitle>{t('settings.referrals.title')}</CardTitle>
        <CardDescription>
          {t('settings.referrals.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-3">
          <Label htmlFor="referral-code" className="text-sm font-medium">
            {t('settings.referrals.yourCode')}
          </Label>
          <div className="flex">
            <Input 
              id="referral-code" 
              value={referralCode} 
              readOnly
              className="rounded-r-none font-mono text-sm"
            />
            <Button variant="outline" onClick={handleCopyReferral} className="rounded-l-none border-l-0">
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy code</span>
            </Button>
          </div>
          <div className="flex justify-end mt-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRegenerateReferralCode}
              className="text-xs flex gap-1.5"
            >
              <RefreshCw className="h-3 w-3" />
              {t('settings.referrals.generateNew')}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {t('settings.referrals.codeDescription')}
          </p>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="affiliate-link" className="text-sm font-medium">
            {t('settings.referrals.affiliateLink')}
          </Label>
          <div className="flex">
            <Input 
              id="affiliate-link" 
              value={affiliateLink} 
              readOnly
              className="rounded-r-none text-sm"
            />
            <Button variant="outline" onClick={handleCopyAffiliate} className="rounded-l-none border-l-0">
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy link</span>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {t('settings.referrals.linkDescription')}
          </p>
        </div>
        
        <div className="rounded-xl border bg-background p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium">{t('settings.referrals.stats')}</h3>
            <Button variant="ghost" size="sm" className="h-8 text-xs flex gap-1">
              {t('settings.referrals.viewDetails')}
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-4 rounded-lg border bg-muted/20">
              <p className="text-sm text-muted-foreground mb-1">{t('settings.referrals.referred')}</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <div className="text-center p-4 rounded-lg border bg-muted/20">
              <p className="text-sm text-muted-foreground mb-1">{t('settings.referrals.earnings')}</p>
              <p className="text-3xl font-bold">$0.00</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralSettings;

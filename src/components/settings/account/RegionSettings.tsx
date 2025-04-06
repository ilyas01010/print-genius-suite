
import React from "react";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";

interface RegionSettingsProps {
  language: string;
  handleLanguageChange: (value: string) => void;
  timezone: string;
  setTimezone: (value: string) => void;
  languages: Record<string, string>;
}

const RegionSettings = ({
  language,
  handleLanguageChange,
  timezone,
  setTimezone,
  languages
}: RegionSettingsProps) => {
  const { t } = useLanguage();
  
  return (
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="language">{t('common.language')}</Label>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(languages).map(([code, name]) => (
                <SelectItem key={code} value={code}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="timezone">Time Zone</Label>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select time zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
              <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
              <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
              <SelectItem value="mst">MST (Mountain Standard Time)</SelectItem>
              <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </CardContent>
  );
};

export default RegionSettings;

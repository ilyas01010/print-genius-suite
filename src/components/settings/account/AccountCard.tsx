
import React from "react";
import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface AccountCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  savedSettings: boolean;
  handleSaveSettings: () => void;
}

const AccountCard = ({
  title,
  description,
  children,
  savedSettings,
  handleSaveSettings,
}: AccountCardProps) => {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      {children}
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={savedSettings}>
          {savedSettings ? (
            <>
              <Check className="mr-2 h-4 w-4" /> {t('common.save')}
            </>
          ) : t('common.save')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountCard;

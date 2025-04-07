
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, FileText, Code, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

const IntegrationGuide = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Guide</CardTitle>
        <CardDescription>
          Learn how to connect your POD services using our API
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <GuideCard
            icon={<FileText className="h-5 w-5 text-blue-600" />}
            title="Documentation"
            description="Read our comprehensive API documentation"
            buttonText="View Docs"
            onClick={() => window.open('#', '_blank')}
          />
          
          <GuideCard
            icon={<Code className="h-5 w-5 text-purple-600" />}
            title="API Reference"
            description="Explore endpoints, parameters and responses"
            buttonText="API Reference"
            onClick={() => window.open('#', '_blank')}
          />
          
          <GuideCard
            icon={<Lightbulb className="h-5 w-5 text-amber-600" />}
            title="Tutorials"
            description="Step-by-step guides for common integrations"
            buttonText="View Tutorials"
            onClick={() => window.open('#', '_blank')}
          />
        </div>
        
        <div className="mt-4 rounded-lg border border-dashed border-muted-foreground/50 p-4">
          <h3 className="text-sm font-medium mb-2">Quick Integration Steps</h3>
          <ol className="list-decimal list-inside text-sm space-y-2 text-muted-foreground">
            <li>Generate an API key in the section above</li>
            <li>Add the API key to your platform's integration settings</li>
            <li>Configure webhooks to receive real-time updates</li>
            <li>Test your integration using our sandbox environment</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

interface GuideCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

const GuideCard: React.FC<GuideCardProps> = ({
  icon,
  title,
  description,
  buttonText,
  onClick
}) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-medium">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClick}
          className="w-full justify-between"
        >
          {buttonText}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default IntegrationGuide;

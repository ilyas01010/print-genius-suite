
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const ResourcesTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Support Resources</CardTitle>
        <CardDescription>Helpful resources to get the most out of Print Genius</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResourceCard
            title="Documentation"
            description="Comprehensive guides and documentation for all features"
            actionLabel="View Docs"
          />
          
          <ResourceCard
            title="Video Tutorials"
            description="Step-by-step video guides for using Print Genius"
            actionLabel="Watch Videos"
          />
          
          <ResourceCard
            title="Community Forum"
            description="Connect with other users and share tips and tricks"
            actionLabel="Join Community"
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Getting Started Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li className="text-sm">Set up your account and profile</li>
              <li className="text-sm">Connect your e-commerce platforms</li>
              <li className="text-sm">Create your first design with the Design Generator</li>
              <li className="text-sm">Perform copyright checks on your designs</li>
              <li className="text-sm">List your first product on connected platforms</li>
            </ol>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full">
              <CheckCircle className="mr-2 h-4 w-4" /> Start Tutorial
            </Button>
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
};

interface ResourceCardProps {
  title: string;
  description: string;
  actionLabel: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, actionLabel }) => {
  return (
    <Card className="bg-muted">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">{actionLabel}</Button>
      </CardFooter>
    </Card>
  );
};

export default ResourcesTab;


import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Plus, MessageSquare, ImageIcon, TrendingUp, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// Sample campaign data
const campaignsData = [
  {
    id: 1,
    name: "Summer Collection Launch",
    status: "Active",
    startDate: new Date(2025, 5, 15),
    endDate: new Date(2025, 7, 30),
    platforms: ["Instagram", "Facebook", "TikTok"],
    budget: "$500",
    performance: "Good"
  },
  {
    id: 2,
    name: "Back to School",
    status: "Scheduled",
    startDate: new Date(2025, 7, 1),
    endDate: new Date(2025, 8, 15),
    platforms: ["Instagram", "Pinterest"],
    budget: "$350",
    performance: "Pending"
  },
  {
    id: 3,
    name: "Holiday Special",
    status: "Draft",
    startDate: new Date(2025, 10, 20),
    endDate: new Date(2025, 11, 31),
    platforms: ["All"],
    budget: "$1000",
    performance: "Pending"
  }
];

// Sample content ideas
const contentIdeas = [
  {
    id: 1,
    title: "Behind the scenes of your design process",
    type: "Video",
    platform: "Instagram",
    engagement: "High"
  },
  {
    id: 2,
    title: "Customer showcase with testimonials",
    type: "Carousel",
    platform: "Facebook",
    engagement: "Medium"
  },
  {
    id: 3,
    title: "Limited time discount announcement",
    type: "Story",
    platform: "Instagram",
    engagement: "High"
  },
  {
    id: 4,
    title: "Design inspiration and trends",
    type: "Pin",
    platform: "Pinterest",
    engagement: "Medium"
  }
];

const MarketingPlanner = () => {
  const { toast } = useToast();
  const [campaignName, setCampaignName] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [campaigns, setCampaigns] = useState(campaignsData);
  
  const handleCreateCampaign = () => {
    if (!campaignName) {
      toast({
        title: "Error",
        description: "Please enter a campaign name",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Campaign Created",
      description: `New campaign "${campaignName}" has been created`
    });
    
    setCampaignName("");
  };

  const handleGenerateContent = () => {
    toast({
      title: "Generating Content Ideas",
      description: "AI is analyzing your products to suggest content"
    });
    
    setTimeout(() => {
      toast({
        title: "Content Ideas Ready",
        description: "New content suggestions are available"
      });
    }, 2000);
  };
  
  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Marketing Planner</h1>
          <p className="text-muted-foreground">
            Create marketing campaigns and social media content for your POD products
          </p>
        </div>

        <Tabs defaultValue="campaigns">
          <TabsList>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="content">Content Ideas</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="campaigns" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Create Campaign</CardTitle>
                <CardDescription>Set up a new marketing campaign for your products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">Campaign Name</label>
                    <Input 
                      id="name" 
                      placeholder="Enter campaign name" 
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="start-date" className="text-sm font-medium">Start Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="start-date"
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="end-date" className="text-sm font-medium">End Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="end-date"
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleCreateCampaign}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Campaign
                </Button>
              </CardFooter>
            </Card>
            
            <h2 className="text-xl font-semibold pt-2">Your Campaigns</h2>
            
            <div className="space-y-4">
              {campaigns.map(campaign => (
                <Card key={campaign.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle>{campaign.name}</CardTitle>
                      <Badge variant={
                        campaign.status === "Active" ? "default" : 
                        campaign.status === "Scheduled" ? "secondary" : "outline"
                      }>
                        {campaign.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {format(campaign.startDate, "MMM d, yyyy")} - {format(campaign.endDate, "MMM d, yyyy")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium">Platforms</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {campaign.platforms.map((platform, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Budget</p>
                        <p className="mt-1">{campaign.budget}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Performance</p>
                        <p className="mt-1 flex items-center">
                          {campaign.performance === "Good" && (
                            <>
                              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                              <span className="text-green-500">Good</span>
                            </>
                          )}
                          {campaign.performance === "Pending" && (
                            <span className="text-muted-foreground">Pending</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3">
                    <Button variant="ghost" size="sm" className="ml-auto">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Generator</CardTitle>
                <CardDescription>Get AI-powered content ideas for your products</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Our AI can analyze your products and generate content ideas tailored to your target audience.
                </p>
                <Button onClick={handleGenerateContent}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Generate Content Ideas
                </Button>
              </CardContent>
            </Card>
            
            <h2 className="text-xl font-semibold pt-2">Content Ideas</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              {contentIdeas.map(idea => (
                <Card key={idea.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{idea.title}</CardTitle>
                      <Badge variant="outline">{idea.type}</Badge>
                    </div>
                    <CardDescription>
                      Platform: {idea.platform} • Engagement: {idea.engagement}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="border-t pt-3 flex justify-between">
                    <Button variant="ghost" size="sm">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Generate Image
                    </Button>
                    <Button variant="outline" size="sm">
                      Use Idea
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="calendar" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Calendar</CardTitle>
                <CardDescription>Schedule and manage your content across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-8 text-center">
                  <div className="space-y-3">
                    <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground/60" />
                    <h3 className="text-lg font-medium">Calendar View Coming Soon</h3>
                    <p className="text-sm text-muted-foreground">
                      The ability to view and schedule content in a calendar format is coming soon. 
                      For now, you can plan campaigns and generate content ideas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MarketingPlanner;

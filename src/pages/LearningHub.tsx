
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Bookmark, Clock, Star, ArrowRight, PenTool, TrendingUp, Target, Award, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const LearningHub = () => {
  const { toast } = useToast();

  const handleSaveResource = (title: string) => {
    toast({
      title: "Resource saved",
      description: `"${title}" has been saved to your bookmarks.`,
    });
  };

  const openResource = (title: string) => {
    toast({
      title: "Coming soon",
      description: `Full article for "${title}" will be available soon.`,
    });
  };

  const handleSubscribe = () => {
    toast({
      title: "Subscribed successfully",
      description: "You'll receive weekly POD tutorials and tips in your email.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Learning Hub</h1>
          <p className="text-muted-foreground">
            Resources and tutorials to help you grow your POD business
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Featured Resources</CardTitle>
                  <Badge variant="outline" className="text-pod-blue">New</Badge>
                </div>
                <CardDescription>
                  Essential resources for POD success
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featuredResources.map((resource, index) => (
                    <div 
                      key={index} 
                      className="flex flex-col gap-2 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => openResource(resource.title)}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium">{resource.title}</h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveResource(resource.title);
                          }}
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> 
                        <span>{resource.readTime} read</span>
                        {resource.isPremium && (
                          <Badge variant="secondary" className="text-xs">Premium</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Button variant="outline">Browse All Resources</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Learning Paths</CardTitle>
                <CardDescription>Structured tutorials for POD beginners and experts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningPaths.map((path, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 rounded-lg border">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pod-blue-light text-pod-blue">
                        {path.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{path.title}</h3>
                        <p className="text-sm text-muted-foreground">{path.description}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>{path.duration}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            Start Learning <ArrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Categories</CardTitle>
                <CardDescription>Browse by topic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-muted/50 cursor-pointer transition-colors">
                      <span>{category.name}</span>
                      <Badge variant="outline">{category.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Newsletter</CardTitle>
                <CardDescription>Get weekly tips and tutorials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <h4 className="font-medium">POD Weekly</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Join 5,000+ POD sellers getting weekly insights and tutorials.</p>
                </div>
                <Button onClick={handleSubscribe} className="w-full">Subscribe</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>POD Certification</CardTitle>
                <CardDescription>Upcoming courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="group flex flex-col gap-1 rounded-md border p-3 transition-colors hover:bg-muted/50">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">POD Business Fundamentals</h4>
                      <Badge>Coming soon</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Learn the essentials of running a successful POD store</p>
                  </div>
                  <div className="group flex flex-col gap-1 rounded-md border p-3 transition-colors hover:bg-muted/50">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Design Mastery for POD</h4>
                      <Badge>Coming soon</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Create professional designs that sell</p>
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

const featuredResources = [
  {
    title: "Ultimate Guide to Print-On-Demand in 2025",
    description: "A complete walkthrough of starting and scaling your POD business in the current market landscape.",
    readTime: "15 min",
    isPremium: false
  },
  {
    title: "Niche Selection Strategy for Maximum POD Profits",
    description: "Learn how to identify and capitalize on profitable POD niches with low competition.",
    readTime: "10 min",
    isPremium: false
  },
  {
    title: "Etsy vs. Shopify vs. Amazon for POD Sellers",
    description: "A comprehensive comparison of the major platforms for selling print-on-demand products.",
    readTime: "12 min",
    isPremium: true
  },
  {
    title: "Designing for Different POD Products: Best Practices",
    description: "Learn specific design requirements and tips for t-shirts, mugs, posters, and more.",
    readTime: "8 min",
    isPremium: false
  }
];

const learningPaths = [
  {
    title: "POD Business Fundamentals",
    description: "A 7-day course covering the basics of starting a print-on-demand business.",
    duration: "7 days",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    title: "Advanced Design Techniques",
    description: "Learn professional design skills specifically tailored for POD products.",
    duration: "14 days",
    icon: <PenTool className="h-5 w-5" />
  },
  {
    title: "Marketing Mastery",
    description: "Strategies to promote and sell your POD products across multiple channels.",
    duration: "10 days",
    icon: <TrendingUp className="h-5 w-5" />
  }
];

const categories = [
  { name: "Business Strategy", count: 18 },
  { name: "Design Tutorials", count: 24 },
  { name: "Platform Guides", count: 12 },
  { name: "Marketing", count: 15 },
  { name: "SEO & Keywords", count: 9 },
  { name: "Product Research", count: 7 },
  { name: "Customer Service", count: 5 },
  { name: "Legal & Copyright", count: 6 }
];

export default LearningHub;

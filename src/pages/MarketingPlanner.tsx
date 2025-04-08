import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  CalendarIcon, 
  Copy, 
  Plus, 
  SendHorizonal, 
  Template, 
  Upload,
  ArrowRight,
  BarChart3,
  ListChecks
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const MarketingPlanner = () => {
  const [activeTab, setActiveTab] = useState("calendar");
  const [selectedTemplate, setSelectedTemplate: any] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [postText, setPostText] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [templateName, setTemplateName] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const [savedTemplates, setSavedTemplates] = useState([
    {
      id: 1,
      name: "Engagement Boost",
      content: "Ask a question to your audience to boost engagement. What are your weekend plans?"
    },
    {
      id: 2,
      name: "Product Highlight",
      content: "Highlight a new product feature. Check out our latest innovation designed to solve [problem]."
    },
    {
      id: 3,
      name: "Behind the Scenes",
      content: "Share a behind-the-scenes look at your company. A sneak peek into our design process!"
    }
  ]);
  
  const { toast } = useToast();

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSchedulePost = () => {
    if (!campaignName.trim() || !selectedDate || !postText.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before scheduling.",
        variant: "destructive"
      });
      return;
    }

    const newPost = {
      id: Date.now(),
      campaignName,
      date: selectedDate,
      text: postText,
      image: uploadedImage
    };

    setScheduledPosts([...scheduledPosts, newPost]);
    setCampaignName("");
    setSelectedDate(new Date());
    setPostText("");
    setUploadedImage(null);

    toast({
      title: "Post Scheduled",
      description: "Your post has been scheduled successfully!"
    });
  };

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setPostText(template.content);
    toast({
      title: "Template Applied",
      description: `Template "${template.name}" has been applied to the post text.`,
    });
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim() || !templateContent.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both template name and content.",
        variant: "destructive"
      });
      return;
    }

    const newTemplate = {
      id: Date.now(),
      name: templateName,
      content: templateContent
    };

    setSavedTemplates([...savedTemplates, newTemplate]);
    setTemplateName("");
    setTemplateContent("");

    toast({
      title: "Template Saved",
      description: "Your template has been saved successfully!"
    });
  };

  const handleCopyTemplate = (template: any) => {
    navigator.clipboard.writeText(template.content)
      .then(() => {
        toast({
          title: "Template Copied",
          description: `Template "${template.name}" content copied to clipboard.`,
        });
      })
      .catch(() => {
        toast({
          title: "Copy Failed",
          description: "Could not copy template content.",
          variant: "destructive"
        });
      });
  };

  const formatDate = (date: Date) => {
    return format(date, "MMM d, yyyy 'at' h:mm a");
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Marketing Planner</h1>
          <p className="text-muted-foreground">
            Plan and schedule your social media campaigns across multiple platforms
          </p>
        </div>

        <Tabs defaultValue="calendar" className="space-y-4">
          <TabsList>
            <TabsTrigger value="calendar" onClick={() => setActiveTab("calendar")}>Calendar</TabsTrigger>
            <TabsTrigger value="templates" onClick={() => setActiveTab("templates")}>Templates</TabsTrigger>
            <TabsTrigger value="analytics" onClick={() => setActiveTab("analytics")}>Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-4">
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Schedule a Post</CardTitle>
                  <CardDescription>Plan your content calendar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaignName">Campaign Name</Label>
                    <Input
                      id="campaignName"
                      placeholder="e.g., Summer Sale Campaign"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? formatDate(selectedDate) : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={handleDateSelect}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postText">Post Text</Label>
                    <Textarea
                      id="postText"
                      placeholder="Write your social media post here..."
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imageUpload">Upload Image</Label>
                    <Input
                      type="file"
                      id="imageUpload"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Button variant="outline" asChild>
                      <label htmlFor="imageUpload" className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        <span>Upload</span>
                      </label>
                    </Button>
                    {uploadedImage && (
                      <div className="relative w-full rounded-md overflow-hidden mt-2">
                        <img
                          src={uploadedImage}
                          alt="Uploaded"
                          className="object-cover w-full aspect-video"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleSchedulePost}>
                    <SendHorizonal className="mr-2 h-4 w-4" />
                    Schedule Post
                  </Button>
                </CardFooter>
              </Card>

              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle>Scheduled Posts</CardTitle>
                  <CardDescription>Manage your upcoming posts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {scheduledPosts.length === 0 ? (
                    <div className="text-center p-4">
                      <p className="text-muted-foreground">No posts scheduled yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {scheduledPosts.map((post) => (
                        <div key={post.id} className="border rounded-md p-4">
                          <h3 className="font-semibold">{post.campaignName}</h3>
                          <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
                          <p className="mt-2">{post.text}</p>
                          {post.image && (
                            <div className="relative w-full rounded-md overflow-hidden mt-2">
                              <img
                                src={post.image}
                                alt="Scheduled"
                                className="object-cover w-full aspect-video"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create Template</CardTitle>
                  <CardDescription>
                    Save time by creating reusable post templates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="templateName">Template Name</Label>
                    <Input
                      id="templateName"
                      placeholder="e.g., Promotion Announcement"
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="templateContent">Template Content</Label>
                    <Textarea
                      id="templateContent"
                      placeholder="Write your template content here..."
                      value={templateContent}
                      onChange={(e) => setTemplateContent(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleSaveTemplate}>
                    <Plus className="mr-2 h-4 w-4" />
                    Save Template
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Saved Templates</CardTitle>
                  <CardDescription>
                    Use or copy from your saved templates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {savedTemplates.length === 0 ? (
                    <div className="text-center p-4">
                      <p className="text-muted-foreground">No templates saved yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {savedTemplates.map((template) => (
                        <div key={template.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{template.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{template.content}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="icon" onClick={() => handleCopyTemplate(template)}>
                                <Copy className="h-4 w-4" />
                                <span className="sr-only">Copy</span>
                              </Button>
                              <Button variant="secondary" size="icon" onClick={() => handleTemplateSelect(template)}>
                                <Template className="h-4 w-4" />
                                <span className="sr-only">Use Template</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-pod-blue" />
                  Analytics Overview
                </CardTitle>
                <CardDescription>
                  Track your marketing campaign performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-3">Campaign Performance</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Campaigns</span>
                          <span className="font-medium">12</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Active Campaigns</span>
                          <span className="font-medium">5</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Completed Campaigns</span>
                          <span className="font-medium">7</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-3">Engagement Metrics</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Likes</span>
                          <span className="font-medium">4,589</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Comments</span>
                          <span className="font-medium">1,245</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Shares</span>
                          <span className="font-medium">678</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="mt-4 w-full justify-start gap-2">
                  <ListChecks className="h-4 w-4" />
                  View Detailed Analytics
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MarketingPlanner;

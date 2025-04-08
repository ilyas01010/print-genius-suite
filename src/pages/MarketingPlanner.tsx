import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  Calendar, 
  Target, 
  TrendingUp, 
  X, 
  FileText, 
  Users, 
  Search, 
  MessageSquare, 
  Mail, 
  Star, 
  ChartBar 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

// Campaign type definition
interface Campaign {
  id: string;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  status: "planning" | "active" | "completed";
  audience?: string;
  channels?: string[];
  budget?: number;
  kpis?: string[];
}

// POD Template type definition
interface MarketingTemplate {
  id: string;
  name: string;
  description: string;
  category: "strategy" | "social" | "email" | "influencer" | "content" | "analytics" | "seasonal";
  content: string;
}

// Channel type for marketing channels
interface MarketingChannel {
  name: string;
  icon: React.ReactNode;
  description: string;
  tips: string[];
}

// Resource for POD marketing
interface MarketingResource {
  title: string;
  description: string;
  type: "guide" | "case-study" | "template";
  link?: string;
}

const MarketingPlanner = () => {
  // State for campaigns and new campaign form
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showNewCampaignForm, setShowNewCampaignForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState<Omit<Campaign, "id">>({
    name: "",
    goal: "",
    startDate: "",
    endDate: "",
    status: "planning",
    audience: "",
    channels: [],
    budget: undefined,
    kpis: []
  });

  // Template state with POD-specific templates
  const [templates, setTemplates] = useState<MarketingTemplate[]>([
    { 
      id: "1", 
      name: "Social Media Campaign", 
      category: "social",
      description: "Complete social media campaign plan for POD products",
      content: "# Social Media Campaign Template\n\n## Campaign Overview\n- Campaign Name: [Name]\n- Product Focus: [Product]\n- Target Platforms: [Instagram, Facebook, TikTok, Pinterest]\n\n## Content Plan\n- Product showcase posts\n- Behind-the-scenes content\n- Customer testimonials\n- Limited time offers\n\n## Hashtag Strategy\n- Brand hashtags: #YourBrand #PODProducts\n- Product hashtags: #CustomTshirts #UniqueDesigns\n- Trending hashtags: Research current trends\n\n## Posting Schedule\n- Instagram: 3-5 posts per week\n- Facebook: 2-3 posts per week\n- TikTok: 2-4 videos per week\n- Pinterest: 5-7 pins per week"
    },
    { 
      id: "2", 
      name: "Email Newsletter", 
      category: "email",
      description: "Email marketing campaign template for POD store",
      content: "# Email Marketing Template\n\n## Campaign Structure\n1. Welcome Email\n   - Welcome new subscribers\n   - Introduce your brand story\n   - Offer a first-purchase discount\n\n2. Product Showcase\n   - Feature new designs\n   - Show products in use\n   - Include customer reviews\n\n3. Limited Offers\n   - Create urgency with time-limited discounts\n   - Exclusive designs for subscribers\n   - Free shipping promotions\n\n4. Re-engagement\n   - Target customers who haven't purchased recently\n   - Show \"We miss you\" message\n   - Provide special comeback offer\n\n## Subject Line Examples\n- \"New Designs Just Dropped - See Them First!\"\n- \"Exclusive to You: 15% Off Your Next Order\"\n- \"See How Our Customers Style Their [Product]\""
    },
    { 
      id: "3", 
      name: "Product Launch", 
      category: "strategy",
      description: "Step-by-step plan for new POD product launches",
      content: "# Product Launch Strategy\n\n## Pre-Launch (2-4 Weeks Before)\n1. **Create Anticipation**\n   - Share design teasers\n   - Countdown posts\n   - Collector email list\n\n2. **Prepare Marketing Assets**\n   - Product photos\n   - Mockups with models\n   - Launch copy\n\n## Launch Day\n1. **Announcement Posts**\n   - Feature product benefits\n   - Show use cases\n   - Include launch offer\n\n2. **Email Campaign**\n   - Send to entire list\n   - Special offer for first 24 hours\n\n## Post-Launch (1-2 Weeks After)\n1. **Share Customer Stories**\n   - Repost customer photos\n   - Share testimonials\n\n2. **Gather Feedback**\n   - Customer surveys\n   - Product improvements"
    },
    { 
      id: "4", 
      name: "Holiday Promotion", 
      category: "seasonal",
      description: "Marketing plan for seasonal POD product promotions",
      content: "# Holiday Promotion Template\n\n## Planning Phase (6-8 Weeks Before)\n- Identify relevant holidays\n- Create season-specific designs\n- Plan promotion calendar\n\n## Promotional Strategy\n- Holiday gift guides\n- Bundle deals\n- Limited edition designs\n- Early bird offers\n\n## Marketing Channels\n- Email: Gift guides, special offers\n- Social: Holiday-themed content\n- Website: Festive landing page\n\n## Post-Holiday\n- Thank you campaign\n- New year promotions\n- Customer retention strategies"
    },
    { 
      id: "5", 
      name: "SEO Checklist", 
      category: "content",
      description: "SEO optimization guide for POD product listings",
      content: "# SEO Strategy for POD Products\n\n## Keyword Research\n- Research niche-specific keywords\n- Analyze competitor listings\n- Use tools: Google Keyword Planner, Ubersuggest\n\n## Product Titles\n- Include primary keyword\n- Add descriptive elements\n- Keep under 70 characters\n\n## Product Descriptions\n- Front-load keywords\n- Use bullet points for features\n- Include size, material, and care information\n- Answer common customer questions\n\n## Image Optimization\n- Use descriptive file names\n- Add alt text with keywords\n- Compress images for speed\n- Show multiple angles and use cases\n\n## Metadata\n- Optimize meta titles and descriptions\n- Create product schema markup"
    },
    { 
      id: "6", 
      name: "Analytics Dashboard", 
      category: "analytics",
      description: "KPI tracking template for POD marketing efforts",
      content: "# Marketing Analytics Dashboard\n\n## Sales Metrics\n- Daily/weekly/monthly sales\n- Revenue per product\n- Average order value\n- Conversion rate\n\n## Traffic Metrics\n- Website visitors\n- Traffic sources\n- Page views\n- Bounce rate\n\n## Social Media Metrics\n- Followers growth\n- Engagement rate\n- Top performing posts\n- Click-through rate\n\n## Email Metrics\n- Open rate\n- Click-through rate\n- Conversion rate\n- List growth\n\n## ROI Calculations\n- Marketing spend\n- Cost per acquisition\n- Return on ad spend\n- Lifetime customer value"
    },
    { 
      id: "7", 
      name: "Influencer Outreach", 
      category: "influencer",
      description: "Templates for connecting with POD influencers",
      content: "# Influencer Marketing Strategy\n\n## Influencer Research\n- Identify influencers in your niche\n- Analyze their audience demographics\n- Review their content style\n- Check engagement rates\n\n## Outreach Template\n\nSubject: Collaboration Opportunity with [Your Brand]\n\nHi [Influencer Name],\n\nI'm [Your Name] from [Your Brand]. I've been following your content and love your [specific quality about their content].\n\nWe create [brief description of your POD products] and think they would resonate with your audience. We'd love to discuss a potential collaboration where we could:\n\n- Send you custom products featuring your [art/style/brand]\n- Offer a special discount code for your followers\n- [Other collaboration ideas]\n\nIf you're interested, I'd love to discuss details. Could we set up a quick call this week?\n\nThanks for your time,\n[Your Name]\n\n## Collaboration Types\n- Product reviews\n- Giveaways\n- Custom designs\n- Affiliate partnerships\n\n## Tracking Success\n- Unique discount codes\n- Custom landing pages\n- UTM parameters"
    },
    { 
      id: "8", 
      name: "Content Calendar", 
      category: "content",
      description: "Monthly content planning template for POD marketing",
      content: "# Content Calendar Template\n\n## Monthly Theme: [Theme]\n\n## Week 1: Product Focus\n- Monday: Product feature post\n- Wednesday: Behind the scenes design process\n- Friday: Customer testimonial\n\n## Week 2: Educational Content\n- Monday: Design tips\n- Wednesday: Product care instructions\n- Friday: Industry trends\n\n## Week 3: Engagement\n- Monday: Question post\n- Wednesday: Poll/survey\n- Friday: User-generated content feature\n\n## Week 4: Promotion\n- Monday: Special offer announcement\n- Wednesday: Limited edition reveal\n- Friday: Last chance reminder\n\n## Ongoing Content Ideas\n- Design inspiration\n- Customer spotlights\n- How-to styling guides\n- Product combinations"
    }
  ]);
  
  // POD Marketing Channels
  const [marketingChannels] = useState<MarketingChannel[]>([
    {
      name: "Social Media",
      icon: <MessageSquare className="h-5 w-5" />,
      description: "Leverage visual platforms to showcase your POD products",
      tips: [
        "Focus on Instagram and Pinterest for visual marketing",
        "Use TikTok for behind-the-scenes and design process videos",
        "Create Facebook groups for community building",
        "Use product mockups to show designs in real-world settings"
      ]
    },
    {
      name: "Email Marketing",
      icon: <Mail className="h-5 w-5" />,
      description: "Build direct relationships with your audience",
      tips: [
        "Segment your list by customer interests",
        "Send new design announcements",
        "Create exclusive offers for subscribers",
        "Use automated welcome sequences for new customers"
      ]
    },
    {
      name: "SEO & Content",
      icon: <Search className="h-5 w-5" />,
      description: "Optimize product listings and create valuable content",
      tips: [
        "Research niche-specific keywords for product descriptions",
        "Create blog content around your niche",
        "Optimize product titles and descriptions",
        "Use internal linking between related products"
      ]
    },
    {
      name: "Influencer Marketing",
      icon: <Star className="h-5 w-5" />,
      description: "Partner with creators in your niche",
      tips: [
        "Find micro-influencers in your specific niche",
        "Offer custom designs featuring their brand",
        "Create affiliate programs with custom discount codes",
        "Track conversions with UTM parameters"
      ]
    },
    {
      name: "Analytics",
      icon: <ChartBar className="h-5 w-5" />,
      description: "Measure and optimize your marketing performance",
      tips: [
        "Track sales by marketing channel",
        "Monitor customer acquisition costs",
        "Test different design styles and price points",
        "Analyze seasonal trends for inventory planning"
      ]
    }
  ]);

  // POD Marketing Resources
  const [marketingResources] = useState<MarketingResource[]>([
    {
      title: "POD Niche Research Guide",
      description: "Find profitable niches for your Print on Demand business",
      type: "guide"
    },
    {
      title: "Product Photography Tips",
      description: "Create stunning product photos with just a smartphone",
      type: "guide"
    },
    {
      title: "POD Success Story: From $0 to $10K/month",
      description: "How one creator scaled their POD business through targeted marketing",
      type: "case-study"
    },
    {
      title: "Marketing Budget Calculator",
      description: "Allocate your marketing budget across different channels",
      type: "template"
    },
    {
      title: "Social Media Content Calendar",
      description: "30-day posting plan for POD businesses",
      type: "template"
    }
  ]);

  // Active tab state
  const [activeTab, setActiveTab] = useState("campaigns");

  // Audience targeting options
  const [audienceSegments] = useState([
    { name: "Art Enthusiasts", interests: ["Fine art", "Illustrations", "Creative design"], platforms: ["Instagram", "Pinterest"] },
    { name: "Pop Culture Fans", interests: ["Movies", "TV Shows", "Gaming", "Anime"], platforms: ["TikTok", "Instagram"] },
    { name: "Niche Hobbyists", interests: ["Outdoor activities", "Specific sports", "Crafting"], platforms: ["Facebook Groups", "Reddit"] },
    { name: "Pet Lovers", interests: ["Dogs", "Cats", "Pet accessories"], platforms: ["Instagram", "Facebook"] },
    { name: "Professionals", interests: ["Industry-specific humor", "Office life", "Professional pride"], platforms: ["LinkedIn", "Facebook"] }
  ]);
  
  const { toast } = useToast();

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCampaign(prev => ({ ...prev, [name]: value }));
  };

  // Create a new campaign
  const handleCreateCampaign = () => {
    // Validate form
    if (!newCampaign.name || !newCampaign.startDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Create campaign
    const campaign: Campaign = {
      id: `campaign-${Date.now()}`,
      ...newCampaign
    };
    
    setCampaigns([...campaigns, campaign]);
    toast({
      title: "Campaign Created",
      description: `${campaign.name} has been created successfully.`,
    });
    
    // Reset form
    setNewCampaign({
      name: "",
      goal: "",
      startDate: "",
      endDate: "",
      status: "planning",
      audience: "",
      channels: [],
      budget: undefined,
      kpis: []
    });
    setShowNewCampaignForm(false);
  };

  // Use template
  const handleUseTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      toast({
        title: "Template Selected",
        description: `${template.name} template has been applied.`,
      });
      // In a real app, this would pre-populate the campaign form or create a campaign
      setShowNewCampaignForm(true);
      setNewCampaign(prev => ({
        ...prev,
        name: `${template.name} Campaign`,
        goal: template.category === "social" ? "Increase social media engagement and reach" :
              template.category === "email" ? "Generate leads and drive sales through email" :
              template.category === "strategy" ? "Successfully launch new product line" :
              "Increase brand awareness and sales",
      }));
    }
  };

  // View template details
  const [selectedTemplate, setSelectedTemplate] = useState<MarketingTemplate | null>(null);
  const [showTemplateDetails, setShowTemplateDetails] = useState(false);

  const handleViewTemplate = (template: MarketingTemplate) => {
    setSelectedTemplate(template);
    setShowTemplateDetails(true);
  };

  return (
    <Layout>
      <div className="space-y-4 sm:space-y-5 animate-fade">
        <div className="flex flex-col gap-1 sm:gap-2">
          <h1 className="font-bold text-2xl sm:text-3xl">Marketing Planner</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Plan, execute, and track your Print on Demand marketing campaigns
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="campaigns" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <div className="rounded-xl border bg-card p-4 sm:p-5">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold">Upcoming Campaigns</h2>
                  <Button 
                    onClick={() => setShowNewCampaignForm(true)} 
                    size="sm" 
                    className="gap-1"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Create Campaign
                  </Button>
                </div>
                
                {campaigns.length === 0 && !showNewCampaignForm ? (
                  <p className="text-sm text-muted-foreground">
                    No campaigns scheduled yet. Create your first POD marketing campaign to start planning.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {campaigns.map(campaign => (
                      <div key={campaign.id} className="p-3 border rounded-md bg-background">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{campaign.name}</h3>
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            campaign.status === "active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                            campaign.status === "completed" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
                            "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                          )}>
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                          <Calendar className="h-3 w-3" /> {campaign.startDate} {campaign.endDate ? `to ${campaign.endDate}` : ""}
                        </div>
                        {campaign.goal && (
                          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                            <Target className="h-3 w-3" /> Goal: {campaign.goal}
                          </div>
                        )}
                        {campaign.audience && (
                          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                            <Users className="h-3 w-3" /> Audience: {campaign.audience}
                          </div>
                        )}
                        {campaign.budget && (
                          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                            <ChartBar className="h-3 w-3" /> Budget: ${campaign.budget}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* New Campaign Form */}
                    {showNewCampaignForm && (
                      <div className="p-3 border rounded-md bg-background">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium text-sm">New Campaign</h3>
                          <Button 
                            variant="ghost" 
                            size="icon-sm" 
                            onClick={() => setShowNewCampaignForm(false)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label htmlFor="name" className="block text-xs font-medium mb-1">Name *</label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={newCampaign.name}
                              onChange={handleInputChange}
                              className="w-full text-sm p-2 border rounded"
                              placeholder="Campaign name"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="goal" className="block text-xs font-medium mb-1">Goal</label>
                            <input
                              type="text"
                              id="goal"
                              name="goal"
                              value={newCampaign.goal}
                              onChange={handleInputChange}
                              className="w-full text-sm p-2 border rounded"
                              placeholder="Campaign objective"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="audience" className="block text-xs font-medium mb-1">Target Audience</label>
                            <select
                              id="audience"
                              name="audience"
                              value={newCampaign.audience || ""}
                              onChange={handleInputChange}
                              className="w-full text-sm p-2 border rounded"
                            >
                              <option value="">Select an audience segment</option>
                              {audienceSegments.map((segment, index) => (
                                <option key={index} value={segment.name}>{segment.name}</option>
                              ))}
                              <option value="Custom">Custom Audience</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="budget" className="block text-xs font-medium mb-1">Budget ($)</label>
                            <input
                              type="number"
                              id="budget"
                              name="budget"
                              value={newCampaign.budget || ""}
                              onChange={handleInputChange}
                              className="w-full text-sm p-2 border rounded"
                              placeholder="Marketing budget"
                              min="0"
                              step="1"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label htmlFor="startDate" className="block text-xs font-medium mb-1">Start Date *</label>
                              <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={newCampaign.startDate}
                                onChange={handleInputChange}
                                className="w-full text-sm p-2 border rounded"
                              />
                            </div>
                            <div>
                              <label htmlFor="endDate" className="block text-xs font-medium mb-1">End Date</label>
                              <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={newCampaign.endDate}
                                onChange={handleInputChange}
                                className="w-full text-sm p-2 border rounded"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="status" className="block text-xs font-medium mb-1">Status</label>
                            <select
                              id="status"
                              name="status"
                              value={newCampaign.status}
                              onChange={handleInputChange}
                              className="w-full text-sm p-2 border rounded"
                            >
                              <option value="planning">Planning</option>
                              <option value="active">Active</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                          
                          <div className="pt-2">
                            <Button 
                              onClick={handleCreateCampaign}
                              size="sm"
                              className="w-full"
                            >
                              Create Campaign
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="rounded-xl border bg-card p-4 sm:p-5">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">POD Audience Targeting</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  Define your target audience to create more effective Print on Demand marketing campaigns.
                </p>
                
                <div className="space-y-4">
                  {audienceSegments.map((segment, index) => (
                    <div key={index} className="border rounded-md p-3 hover:bg-muted/30 transition-colors">
                      <h3 className="font-medium text-sm">{segment.name}</h3>
                      <div className="flex flex-wrap gap-1 mt-1 mb-2">
                        {segment.interests.map((interest, i) => (
                          <span key={i} className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                            {interest}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <strong>Best Platforms:</strong> {segment.platforms.join(", ")}
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      toast({
                        title: "Audience Targeting Tool",
                        description: "Custom audience builder coming soon!",
                      });
                    }}
                    size="sm"
                    className="w-full mt-2"
                  >
                    Build Custom Audience
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl border bg-card p-4 sm:p-5 mt-4">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" /> POD Marketing Channels
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketingChannels.map((channel, index) => (
                  <div key={index} className="border rounded-md p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        {channel.icon}
                      </div>
                      <h3 className="font-medium">{channel.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{channel.description}</p>
                    <ul className="text-xs space-y-1 list-disc list-inside">
                      {channel.tips.map((tip, i) => (
                        <li key={i} className="text-muted-foreground">{tip}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Marketing Templates for Print on Demand</CardTitle>
                <CardDescription>
                  Ready-to-use templates to accelerate your POD marketing efforts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {templates.map((template) => (
                    <div key={template.id} className="border rounded-md p-3 hover:bg-muted/30 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{template.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                        </div>
                        <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                          {template.category}
                        </span>
                      </div>
                      <div className="mt-3 flex justify-between">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewTemplate(template)}
                        >
                          View Template
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleUseTemplate(template.id)}
                        >
                          Use Template
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget Planning Template</CardTitle>
                <CardDescription>
                  Allocate your marketing budget effectively across different channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Channel</TableHead>
                      <TableHead>Allocation %</TableHead>
                      <TableHead>Budget Amount</TableHead>
                      <TableHead>Expected ROI</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Social Media Advertising</TableCell>
                      <TableCell>40%</TableCell>
                      <TableCell>$400</TableCell>
                      <TableCell>3.5x</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Influencer Marketing</TableCell>
                      <TableCell>25%</TableCell>
                      <TableCell>$250</TableCell>
                      <TableCell>4.2x</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email Marketing</TableCell>
                      <TableCell>15%</TableCell>
                      <TableCell>$150</TableCell>
                      <TableCell>5.1x</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Content Creation</TableCell>
                      <TableCell>15%</TableCell>
                      <TableCell>$150</TableCell>
                      <TableCell>2.8x</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>SEO</TableCell>
                      <TableCell>5%</TableCell>
                      <TableCell>$50</TableCell>
                      <TableCell>3.0x</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <p className="text-xs text-muted-foreground mt-3">
                  This template assumes a monthly marketing budget of $1,000. Adjust percentages based on your specific POD business needs.
                </p>
                <Button className="mt-3" onClick={() => {
                  toast({
                    title: "Budget Template",
                    description: "Custom budget planner feature coming soon!",
                  });
                }}>
                  Customize Budget Template
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Calendar</CardTitle>
                <CardDescription>
                  30-day social media content plan for Print on Demand businesses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-3">Weekly Content Structure</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="border rounded p-2">
                      <h4 className="text-sm font-medium mb-1">Monday: Product Spotlight</h4>
                      <p className="text-xs text-muted-foreground">Showcase your best-selling or new POD products with lifestyle images</p>
                    </div>
                    <div className="border rounded p-2">
                      <h4 className="text-sm font-medium mb-1">Tuesday: Behind-the-Scenes</h4>
                      <p className="text-xs text-muted-foreground">Share your design process or packaging methods</p>
                    </div>
                    <div className="border rounded p-2">
                      <h4 className="text-sm font-medium mb-1">Wednesday: Customer Feature</h4>
                      <p className="text-xs text-muted-foreground">Highlight customer photos or testimonials</p>
                    </div>
                    <div className="border rounded p-2">
                      <h4 className="text-sm font-medium mb-1">Thursday: Educational Content</h4>
                      <p className="text-xs text-muted-foreground">Share tips related to your niche</p>
                    </div>
                    <div className="border rounded p-2">
                      <h4 className="text-sm font-medium mb-1">Friday: Promotion</h4>
                      <p className="text-xs text-muted-foreground">Share special offers or discounts</p>
                    </div>
                    <div className="border rounded p-2">
                      <h4 className="text-sm font-medium mb-1">Weekend: Engagement</h4>
                      <p className="text-xs text-muted-foreground">Ask questions, run polls, or share related content</p>
                    </div>
                  </div>

                  <h3 className="font-medium mt-4 mb-2">Monthly Theme Ideas</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>New Collection Launch</li>
                    <li>Seasonal Themes (Summer, Fall, Holidays)</li>
                    <li>Customer Appreciation</li>
                    <li>Design Inspiration</li>
                    <li>Niche-Specific Themes</li>
                  </ul>
                  
                  <Button className="mt-4" onClick={() => {
                    toast({
                      title: "Content Calendar",
                      description: "Interactive content calendar feature coming soon!",
                    });
                  }}>
                    Create Custom Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>POD Marketing Resources</CardTitle>
                <CardDescription>
                  Guides, case studies, and tools to enhance your Print on Demand marketing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {marketingResources.map((resource, index) => (
                    <div key={index} className="border rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{resource.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                        </div>
                        <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                          {resource.type}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => {
                          toast({
                            title: "Resource Preview",
                            description: `The ${resource.title} will be available soon!`,
                          });
                        }}
                      >
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        View Resource
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>POD Marketing Case Study</CardTitle>
                <CardDescription>
                  Success story: How a POD creator grew sales through targeted marketing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Case Study: "From $0 to $10K/month with Niche POD Products"</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-medium">Background:</h4>
                      <p className="text-muted-foreground">
                        Sarah started her POD business focusing on designs for dog owners, specifically rare and unique dog breeds that were underserved in the market.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Challenge:</h4>
                      <p className="text-muted-foreground">
                        Standing out in the crowded print-on-demand market and reaching the specific audience of dog breed enthusiasts.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Strategy:</h4>
                      <ul className="list-disc list-inside text-muted-foreground ml-2 space-y-1">
                        <li>Created highly detailed designs for 15 specific dog breeds</li>
                        <li>Identified and joined Facebook groups dedicated to these dog breeds</li>
                        <li>Partnered with micro-influencers (dog accounts) on Instagram</li>
                        <li>Used targeted Facebook ads with detailed audience segmentation</li>
                        <li>Created breed-specific landing pages with unique copy</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Results:</h4>
                      <ul className="list-disc list-inside text-muted-foreground ml-2 space-y-1">
                        <li>Reached $10K monthly revenue within 8 months</li>
                        <li>Built an email list of 15,000 dog enthusiasts</li>
                        <li>Achieved 4.2% conversion rate (double the industry average)</li>
                        <li>Created a loyal customer base with 35% repeat purchases</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Key Takeaways:</h4>
                      <ul className="list-disc list-inside text-muted-foreground ml-2 space-y-1">
                        <li>Niche specificity outperforms broad targeting</li>
                        <li>Community engagement drives organic sales</li>
                        <li>Micro-influencers provide better ROI than larger influencers</li>
                        <li>Customized landing pages significantly boost conversion rates</li>
                      </ul>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      toast({
                        title: "Case Study",
                        description: "Full case study with data will be available soon!",
                      });
                    }}
                  >
                    Read Full Case Study
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Checklist for POD Products</CardTitle>
                <CardDescription>
                  Optimize your product listings to increase visibility and sales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border rounded-md p-3">
                    <h3 className="font-medium mb-2">Product Title Optimization</h3>
                    <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                      <li>Include primary keyword at the beginning</li>
                      <li>Add product type, color, and unique feature</li>
                      <li>Keep titles under 70 characters for full display</li>
                      <li>Use relevant modifiers (e.g., "vintage style," "custom design")</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <h3 className="font-medium mb-2">Product Description Best Practices</h3>
                    <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                      <li>Include primary and secondary keywords naturally</li>
                      <li>Use bullet points to highlight key features</li>
                      <li>Address potential questions (size, material, care)</li>
                      <li>Include a call-to-action at the end</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <h3 className="font-medium mb-2">Image Optimization</h3>
                    <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                      <li>Use descriptive file names (e.g., "vintage-dog-tshirt-black.jpg")</li>
                      <li>Add alt text with relevant keywords</li>
                      <li>Show products from multiple angles</li>
                      <li>Include lifestyle images showing the product in use</li>
                    </ul>
                  </div>
                </div>
                
                <Button 
                  className="mt-4"
                  onClick={() => {
                    toast({
                      title: "SEO Tool",
                      description: "Product listing SEO analyzer coming soon!",
                    });
                  }}
                >
                  <Search className="h-4 w-4 mr-1" />
                  Analyze Your Listings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Template Details Dialog */}
        <Dialog open={showTemplateDetails} onOpenChange={setShowTemplateDetails}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedTemplate?.name}</DialogTitle>
              <DialogDescription>{selectedTemplate?.description}</DialogDescription>
            </DialogHeader>
            <div className="border rounded-md p-4 max-h-96 overflow-y-auto">
              <Textarea
                className="font-mono text-sm w-full h-64 bg-muted/30"
                readOnly
                value={selectedTemplate?.content || ""}
              />
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowTemplateDetails(false)}
              >
                Close
              </Button>
              <Button 
                onClick={() => {
                  setShowTemplateDetails(false);
                  handleUseTemplate(selectedTemplate?.id || "");
                }}
              >
                Use Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default MarketingPlanner;

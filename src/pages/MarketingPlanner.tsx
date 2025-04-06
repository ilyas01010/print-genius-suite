
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, Target, TrendingUp, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Campaign type definition
interface Campaign {
  id: string;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  status: "planning" | "active" | "completed";
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
  });

  // Template state
  const [templates, setTemplates] = useState([
    { id: "1", name: "Social Media Campaign", category: "social" },
    { id: "2", name: "Email Newsletter", category: "email" },
    { id: "3", name: "Product Launch", category: "product" },
    { id: "4", name: "Holiday Promotion", category: "seasonal" },
  ]);
  
  const { toast } = useToast();

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      }));
    }
  };

  return (
    <Layout>
      <div className="space-y-4 sm:space-y-5 animate-fade">
        <div className="flex flex-col gap-1 sm:gap-2">
          <h1 className="font-bold text-2xl sm:text-3xl">Marketing Planner</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Plan and schedule your marketing campaigns
          </p>
        </div>

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
                No campaigns scheduled yet. Create your first campaign to start planning.
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
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Marketing Templates</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Use our pre-designed templates to create professional marketing materials quickly.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {templates.map(template => (
                <div key={template.id} className="p-2 border rounded bg-background">
                  <h4 className="text-sm font-medium">{template.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{template.category}</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    Use Template
                  </Button>
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => {
                toast({
                  title: "Templates Library",
                  description: "Browsing all templates - this feature is coming soon!",
                });
              }}
              size="sm"
            >
              Browse All Templates
            </Button>
          </div>
        </div>
        
        <div className="rounded-xl border bg-card p-4 sm:p-5">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" /> Campaign Performance
          </h2>
          
          {campaigns.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No campaign data available yet. Performance metrics will appear here once campaigns are running.
            </p>
          ) : (
            <div className="text-sm">
              <p>Performance tracking dashboard coming soon.</p>
              <Button 
                variant="outline" 
                size="sm"
                className="mt-3"
                onClick={() => {
                  toast({
                    title: "Analytics Dashboard",
                    description: "Campaign analytics dashboard is under development.",
                  });
                }}
              >
                View Analytics
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MarketingPlanner;

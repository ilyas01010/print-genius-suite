
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export interface Template {
  id: number;
  name: string;
  content: string;
}

export interface Post {
  id: number;
  campaignName: string;
  date: Date;
  text: string;
  image: string | null;
}

export const useMarketingPlanner = () => {
  const [activeTab, setActiveTab] = useState("calendar");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [postText, setPostText] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);
  const [templateName, setTemplateName] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const [savedTemplates, setSavedTemplates] = useState<Template[]>([
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

  const handleTemplateSelect = (template: Template) => {
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

  const handleCopyTemplate = (template: Template) => {
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

  return {
    activeTab,
    setActiveTab,
    selectedTemplate,
    setSelectedTemplate,
    isLoading,
    campaignName,
    setCampaignName,
    selectedDate,
    setSelectedDate,
    postText,
    setPostText,
    uploadedImage,
    setUploadedImage,
    scheduledPosts,
    setScheduledPosts,
    templateName,
    setTemplateName,
    templateContent, 
    setTemplateContent,
    savedTemplates,
    handleDateSelect,
    handleImageUpload,
    handleSchedulePost,
    handleTemplateSelect,
    handleSaveTemplate,
    handleCopyTemplate,
    formatDate
  };
};

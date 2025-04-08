
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, SendHorizonal, Upload } from "lucide-react";
import { useMarketingPlanner } from "@/hooks/use-marketing-planner";

const CalendarTab = () => {
  const {
    campaignName,
    setCampaignName,
    selectedDate,
    postText,
    setPostText,
    uploadedImage,
    scheduledPosts,
    handleDateSelect,
    handleImageUpload,
    handleSchedulePost,
    formatDate
  } = useMarketingPlanner();

  return (
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
  );
};

export default CalendarTab;

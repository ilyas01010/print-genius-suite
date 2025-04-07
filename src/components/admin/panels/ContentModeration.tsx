
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, CheckCircle, XCircle, AlertCircle, Eye, MoreVertical } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock content data - in a real application, this would come from your backend
const mockContent = [
  {
    id: "1",
    title: "Summer Beach T-shirt Design",
    type: "design",
    status: "pending",
    creator: "alex@example.com",
    createdAt: "2023-04-05T14:22:34Z",
    flagged: false,
    previewUrl: "https://via.placeholder.com/300x200",
  },
  {
    id: "2",
    title: "Vintage Car Poster",
    type: "design",
    status: "approved",
    creator: "maria@example.com",
    createdAt: "2023-04-03T10:45:12Z",
    flagged: false,
    previewUrl: "https://via.placeholder.com/300x200",
  },
  {
    id: "3",
    title: "Political Slogan T-shirt",
    type: "design",
    status: "rejected",
    creator: "james@example.com",
    createdAt: "2023-04-01T19:33:04Z",
    flagged: true,
    previewUrl: "https://via.placeholder.com/300x200",
    rejectionReason: "Violates community guidelines on political content"
  },
  {
    id: "4",
    title: "Cute Cat Mug Design",
    type: "design",
    status: "pending",
    creator: "sarah@example.com",
    createdAt: "2023-04-04T08:17:45Z",
    flagged: false,
    previewUrl: "https://via.placeholder.com/300x200",
  },
  {
    id: "5",
    title: "Inspirational Quote Poster",
    type: "design",
    status: "approved",
    creator: "david@example.com",
    createdAt: "2023-04-02T16:49:32Z",
    flagged: false,
    previewUrl: "https://via.placeholder.com/300x200",
  },
];

const ContentModeration = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { toast } = useToast();

  // Filter content based on search query and active tab
  const filteredContent = mockContent.filter(
    (content) =>
      (content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.creator.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (activeTab === "all" || content.status === activeTab)
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle content actions
  const handlePreviewContent = (content: any) => {
    setSelectedContent(content);
    setPreviewOpen(true);
    logAction(`Previewed content: ${content.title}`);
  };

  const handleApproveContent = (content: any) => {
    toast({
      title: "Content approved",
      description: `"${content.title}" has been approved and is now publicly visible.`,
    });
    logAction(`Approved content: ${content.title}`);
    // In a real application, you would call your API to update the content status
  };

  const handleRejectContent = (content: any) => {
    toast({
      title: "Content rejected",
      description: `"${content.title}" has been rejected and is not publicly visible.`,
    });
    logAction(`Rejected content: ${content.title}`);
    // In a real application, you would call your API to update the content status
  };

  // Log admin actions
  const logAction = (action: string) => {
    console.log(`Admin action: ${action} at ${new Date().toISOString()}`);
    // In a real implementation, this would be sent to your backend
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold">Content Moderation</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-[200px] lg:w-[300px]"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All Content</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Creator</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContent.map((content) => (
              <TableRow key={content.id} className={content.flagged ? "bg-destructive/10" : ""}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {content.flagged && <AlertCircle className="h-4 w-4 text-destructive" />}
                    <span>{content.title}</span>
                  </div>
                </TableCell>
                <TableCell>{content.type}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      content.status === "approved"
                        ? "outline"
                        : content.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {content.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{content.creator}</TableCell>
                <TableCell className="hidden md:table-cell">{formatDate(content.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handlePreviewContent(content)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      {content.status !== "approved" && (
                        <DropdownMenuItem onClick={() => handleApproveContent(content)}>
                          <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                          Approve
                        </DropdownMenuItem>
                      )}
                      {content.status !== "rejected" && (
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleRejectContent(content)}>
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Content Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Content Preview</DialogTitle>
            <DialogDescription>
              Preview and moderate this content.
            </DialogDescription>
          </DialogHeader>
          {selectedContent && (
            <div className="space-y-4">
              <div className="bg-muted rounded-md p-2 flex justify-center">
                <img 
                  src={selectedContent.previewUrl} 
                  alt={selectedContent.title}
                  className="max-h-[300px] object-contain"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Title</p>
                  <p className="font-medium">{selectedContent.title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{selectedContent.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant={
                      selectedContent.status === "approved"
                        ? "outline"
                        : selectedContent.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {selectedContent.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Creator</p>
                  <p className="font-medium">{selectedContent.creator}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">{formatDate(selectedContent.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Flagged</p>
                  <p className="font-medium">{selectedContent.flagged ? "Yes" : "No"}</p>
                </div>
              </div>

              {selectedContent.rejectionReason && (
                <div className="bg-destructive/10 p-2 rounded-md">
                  <p className="text-sm text-muted-foreground">Rejection Reason</p>
                  <p className="font-medium">{selectedContent.rejectionReason}</p>
                </div>
              )}

              <DialogFooter>
                <div className="flex gap-2 justify-end">
                  {selectedContent.status !== "approved" && (
                    <Button variant="outline" className="bg-green-50" onClick={() => {
                      handleApproveContent(selectedContent);
                      setPreviewOpen(false);
                    }}>
                      <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                      Approve
                    </Button>
                  )}
                  {selectedContent.status !== "rejected" && (
                    <Button variant="destructive" onClick={() => {
                      handleRejectContent(selectedContent);
                      setPreviewOpen(false);
                    }}>
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentModeration;

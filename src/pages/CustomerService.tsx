import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Search, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Package, 
  HelpCircle, 
  Inbox,
  ArrowRight,
  RefreshCcw,
  SendHorizonal
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const inquiriesData = [
  {
    id: 1,
    customer: "John Miller",
    email: "john.miller@example.com",
    subject: "Order not received",
    message: "I placed an order on November 1st (Order #34982) and haven't received any shipping confirmation yet. Could you please check the status?",
    platform: "Etsy",
    status: "Open",
    priority: "High",
    date: "2 hours ago",
    orderId: "#34982"
  },
  {
    id: 2,
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    subject: "Wrong size received",
    message: "I ordered a large t-shirt but received a medium instead. Can I get it exchanged?",
    platform: "Printify",
    status: "In Progress",
    priority: "Medium",
    date: "1 day ago",
    orderId: "#35107"
  },
  {
    id: 3,
    customer: "Michael Chen",
    email: "mike.chen@example.com",
    subject: "Custom design request",
    message: "I love your designs! I was wondering if you could create a custom design with my company logo for our team shirts?",
    platform: "Email",
    status: "Open",
    priority: "Low",
    date: "2 days ago",
    orderId: "N/A"
  },
  {
    id: 4,
    customer: "Lisa Wong",
    email: "lisa.w@example.com",
    subject: "Refund status",
    message: "I returned my order last week but haven't received my refund yet. Could you please check the status?",
    platform: "Shopify",
    status: "Resolved",
    priority: "Medium",
    date: "3 days ago",
    orderId: "#34056"
  }
];

const cannedResponses = [
  {
    id: 1,
    title: "Shipping Delay",
    template: "Thank you for reaching out about your order. I apologize for the delay in shipping. Your order is currently being processed and we expect it to ship within [timeframe]. We'll send you a tracking number as soon as it's available."
  },
  {
    id: 2,
    title: "Return Instructions",
    template: "I'm sorry that you need to return your order. To process your return, please follow these steps:\n\n1. Package the item securely in its original packaging\n2. Include your order number on a note inside\n3. Ship to our returns address: [address]\n\nOnce we receive the return, we'll process your refund within 3-5 business days."
  },
  {
    id: 3,
    title: "Custom Order Request",
    template: "Thank you for your interest in a custom order! We'd be happy to work with you on this. To get started, please provide the following details:\n\n1. Description of your custom request\n2. Quantity needed\n3. Timeline for delivery\n4. Any specific design elements\n\nOnce we have this information, we can provide you with a quote and timeline."
  },
  {
    id: 4,
    title: "Order Status",
    template: "Thank you for your inquiry about order #[order_number]. Your order is currently [status] and is expected to be delivered by [date]. You can track your package using this link: [tracking_link]."
  }
];

const CustomerService = () => {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState(inquiriesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeInquiry, setActiveInquiry] = useState<null | number>(null);
  const [replyText, setReplyText] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Results",
      description: `Showing results for "${searchQuery}"`
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshing Inquiries",
      description: "Getting latest customer inquiries"
    });
    
    setTimeout(() => {
      toast({
        title: "Inquiries Updated",
        description: "Your inbox is now up to date"
      });
    }, 1500);
  };

  const handleSelectInquiry = (id: number) => {
    setActiveInquiry(id);
    const inquiry = inquiries.find(i => i.id === id);
    if (inquiry && inquiry.status === "Open") {
      const updatedInquiries = inquiries.map(i => 
        i.id === id ? {...i, status: "In Progress"} : i
      );
      setInquiries(updatedInquiries);
    }
  };

  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reply message",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Reply Sent",
      description: "Your response has been sent to the customer"
    });
    
    const updatedInquiries = inquiries.map(i => 
      i.id === activeInquiry ? {...i, status: "Resolved"} : i
    );
    setInquiries(updatedInquiries);
    setReplyText("");
  };

  const handleUseCannedResponse = (template: string) => {
    setReplyText(template);
  };
  
  const selectedInquiry = inquiries.find(i => i.id === activeInquiry);
  
  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Customer Service</h1>
          <p className="text-muted-foreground">
            Manage customer inquiries and support across all your POD platforms
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-4 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Inquiries</CardTitle>
                  <Button variant="ghost" size="icon" onClick={handleRefresh}>
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                  <Input 
                    placeholder="Search inquiries..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" variant="ghost" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
                
                <Tabs defaultValue="all">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="open">Open</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-2">
                    {inquiries.map(inquiry => (
                      <div 
                        key={inquiry.id} 
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${activeInquiry === inquiry.id ? 'bg-muted border-primary' : 'hover:bg-muted/50'}`}
                        onClick={() => handleSelectInquiry(inquiry.id)}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium truncate mr-2">{inquiry.subject}</h3>
                          <Badge 
                            variant={inquiry.status === "Open" ? "default" : 
                              inquiry.status === "In Progress" ? "secondary" : "outline"}
                            className="text-xs"
                          >
                            {inquiry.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          From: {inquiry.customer}
                        </p>
                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {inquiry.date}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {inquiry.platform}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="open" className="space-y-2">
                    {inquiries.filter(i => i.status === "Open" || i.status === "In Progress").map(inquiry => (
                      <div 
                        key={inquiry.id} 
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${activeInquiry === inquiry.id ? 'bg-muted border-primary' : 'hover:bg-muted/50'}`}
                        onClick={() => handleSelectInquiry(inquiry.id)}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium truncate mr-2">{inquiry.subject}</h3>
                          <Badge 
                            variant={inquiry.status === "Open" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {inquiry.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          From: {inquiry.customer}
                        </p>
                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {inquiry.date}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {inquiry.platform}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="resolved" className="space-y-2">
                    {inquiries.filter(i => i.status === "Resolved").map(inquiry => (
                      <div 
                        key={inquiry.id} 
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${activeInquiry === inquiry.id ? 'bg-muted border-primary' : 'hover:bg-muted/50'}`}
                        onClick={() => handleSelectInquiry(inquiry.id)}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium truncate mr-2">{inquiry.subject}</h3>
                          <Badge variant="outline" className="text-xs">
                            {inquiry.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          From: {inquiry.customer}
                        </p>
                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {inquiry.date}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {inquiry.platform}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span>Open Inquiries</span>
                    </div>
                    <span className="font-medium">{inquiries.filter(i => i.status === "Open").length}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <span>In Progress</span>
                    </div>
                    <span className="font-medium">{inquiries.filter(i => i.status === "In Progress").length}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Resolved Today</span>
                    </div>
                    <span className="font-medium">{inquiries.filter(i => i.status === "Resolved").length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {selectedInquiry ? (
            <div className="md:col-span-8">
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-3 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedInquiry.subject}</CardTitle>
                      <CardDescription className="mt-1">
                        From: {selectedInquiry.customer} ({selectedInquiry.email})
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge 
                        variant={selectedInquiry.status === "Open" ? "default" : 
                          selectedInquiry.status === "In Progress" ? "secondary" : "outline"}
                      >
                        {selectedInquiry.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{selectedInquiry.date}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <div className="flex-1 p-6 space-y-4 overflow-auto">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{selectedInquiry.customer}</p>
                        <p className="text-xs text-muted-foreground">{selectedInquiry.date}</p>
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted p-4 ml-10">
                      <p>{selectedInquiry.message}</p>
                      {selectedInquiry.orderId !== "N/A" && (
                        <div className="mt-3 p-2 bg-background rounded border flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          <span>Order ID: {selectedInquiry.orderId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Canned Responses</CardTitle>
                    </CardHeader>
                    <CardContent className="space-x-2 pb-2 flex overflow-x-auto">
                      {cannedResponses.map(response => (
                        <Button 
                          key={response.id} 
                          variant="outline" 
                          size="sm"
                          className="shrink-0"
                          onClick={() => handleUseCannedResponse(response.template)}
                        >
                          {response.title}
                        </Button>
                      ))}
                    </CardContent>
                    <CardFooter className="flex flex-col border-t pt-4">
                      <div className="flex items-center w-full mb-4">
                        <Input 
                          placeholder="Type your reply..." 
                          value={replyText} 
                          onChange={(e) => setReplyText(e.target.value)}
                          className="rounded-r-none"
                        />
                        <Button 
                          className="rounded-l-none" 
                          onClick={handleSendReply}
                          disabled={!replyText.trim()}
                        >
                          <SendHorizonal className="h-4 w-4 mr-2" />
                          Send
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </Card>
            </div>
          ) : (
            <div className="md:col-span-8">
              <Card className="h-full flex items-center justify-center p-6">
                <div className="text-center space-y-3">
                  <Inbox className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3 className="text-xl font-medium">No Inquiry Selected</h3>
                  <p className="text-muted-foreground">
                    Select an inquiry from the list to view and respond to it.
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CustomerService;

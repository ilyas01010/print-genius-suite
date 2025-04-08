
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Inquiry, CannedResponse, useCustomerService } from "@/hooks/use-customer-service";
import { User, Package, Inbox, SendHorizonal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InquiryDetailsProps {
  selectedInquiry: Inquiry | undefined;
}

const InquiryDetails: React.FC<InquiryDetailsProps> = ({ selectedInquiry }) => {
  const [replyText, setReplyText] = useState("");
  const { toast } = useToast();
  const { cannedResponses } = useCustomerService();

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
    
    setReplyText("");
  };

  const handleUseCannedResponse = (template: string) => {
    setReplyText(template);
  };

  if (!selectedInquiry) {
    return (
      <Card className="h-full flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <Inbox className="h-12 w-12 text-muted-foreground mx-auto" />
          <h3 className="text-xl font-medium">No Inquiry Selected</h3>
          <p className="text-muted-foreground">
            Select an inquiry from the list to view and respond to it.
          </p>
        </div>
      </Card>
    );
  }

  return (
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
  );
};

// Missing component imports
const Badge = ({ children, variant, className }: any) => (
  <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${className} ${
    variant === 'default' ? 'bg-primary text-primary-foreground' : 
    variant === 'secondary' ? 'bg-secondary text-secondary-foreground' : 
    'bg-background border text-foreground'
  }`}>
    {children}
  </div>
);

const Clock = ({ className }: any) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default InquiryDetails;

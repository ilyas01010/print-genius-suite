
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface Inquiry {
  id: number;
  customer: string;
  email: string;
  subject: string;
  message: string;
  platform: string;
  status: "Open" | "In Progress" | "Resolved";
  priority: "High" | "Medium" | "Low";
  date: string;
  orderId: string;
}

export interface CannedResponse {
  id: number;
  title: string;
  template: string;
}

// Sample data
const inquiriesData: Inquiry[] = [
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

const cannedResponses: CannedResponse[] = [
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

export function useCustomerService() {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>(inquiriesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeInquiry, setActiveInquiry] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  
  const selectedInquiry = inquiries.find(i => i.id === activeInquiry);
  
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
        i.id === id ? {...i, status: "In Progress" as const} : i
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
      i.id === activeInquiry ? {...i, status: "Resolved" as const} : i
    );
    setInquiries(updatedInquiries);
    setReplyText("");
  };

  const handleUseCannedResponse = (template: string) => {
    setReplyText(template);
  };

  return {
    inquiries,
    searchQuery,
    setSearchQuery,
    activeInquiry,
    selectedInquiry,
    replyText,
    setReplyText,
    cannedResponses,
    handleSearch,
    handleRefresh,
    handleSelectInquiry,
    handleSendReply,
    handleUseCannedResponse
  };
}


import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, RefreshCcw, Clock } from "lucide-react";
import { Inquiry } from "@/hooks/use-customer-service";
import { useToast } from "@/hooks/use-toast";

interface InquiriesListProps {
  inquiries: Inquiry[];
  activeInquiry: number | null;
  onRefresh: () => void;
  onSelectInquiry: (id: number) => void;
}

const InquiriesList: React.FC<InquiriesListProps> = ({ 
  inquiries, 
  activeInquiry, 
  onRefresh, 
  onSelectInquiry 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Results",
      description: `Showing results for "${searchQuery}"`
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Inquiries</CardTitle>
          <Button variant="ghost" size="icon" onClick={onRefresh}>
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
              <InquiryListItem 
                key={inquiry.id}
                inquiry={inquiry}
                isActive={activeInquiry === inquiry.id}
                onSelect={onSelectInquiry}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="open" className="space-y-2">
            {inquiries
              .filter(i => i.status === "Open" || i.status === "In Progress")
              .map(inquiry => (
                <InquiryListItem 
                  key={inquiry.id}
                  inquiry={inquiry}
                  isActive={activeInquiry === inquiry.id}
                  onSelect={onSelectInquiry}
                />
              ))}
          </TabsContent>
          
          <TabsContent value="resolved" className="space-y-2">
            {inquiries
              .filter(i => i.status === "Resolved")
              .map(inquiry => (
                <InquiryListItem 
                  key={inquiry.id}
                  inquiry={inquiry}
                  isActive={activeInquiry === inquiry.id}
                  onSelect={onSelectInquiry}
                />
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface InquiryListItemProps {
  inquiry: Inquiry;
  isActive: boolean;
  onSelect: (id: number) => void;
}

const InquiryListItem: React.FC<InquiryListItemProps> = ({ inquiry, isActive, onSelect }) => {
  return (
    <div 
      className={`p-3 rounded-lg border cursor-pointer transition-all ${isActive ? 'bg-muted border-primary' : 'hover:bg-muted/50'}`}
      onClick={() => onSelect(inquiry.id)}
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
  );
};

export default InquiriesList;


import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle, Clock, CheckCircle } from "lucide-react";
import { Inquiry } from "@/hooks/use-customer-service";

interface QuickStatsProps {
  inquiries: Inquiry[];
}

const QuickStats: React.FC<QuickStatsProps> = ({ inquiries }) => {
  const openCount = inquiries.filter(i => i.status === "Open").length;
  const inProgressCount = inquiries.filter(i => i.status === "In Progress").length;
  const resolvedCount = inquiries.filter(i => i.status === "Resolved").length;

  return (
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
            <span className="font-medium">{openCount}</span>
          </div>
          
          <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              <span>In Progress</span>
            </div>
            <span className="font-medium">{inProgressCount}</span>
          </div>
          
          <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Resolved Today</span>
            </div>
            <span className="font-medium">{resolvedCount}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStats;

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, RefreshCw, Calendar, User, ArrowRight } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

// Mock log data
const mockLogs = [
  {
    id: "1",
    action: "User login",
    user: "admin@example.com",
    ip: "192.168.1.1",
    timestamp: "2023-04-07T08:12:34Z",
    details: "Admin user logged in successfully",
    severity: "info",
  },
  {
    id: "2",
    action: "Content rejected",
    user: "admin@example.com",
    ip: "192.168.1.1",
    timestamp: "2023-04-07T10:45:12Z",
    details: "Design 'Political Slogan T-shirt' was rejected due to policy violation",
    severity: "warning",
  },
  {
    id: "3",
    action: "API key changed",
    user: "admin@example.com",
    ip: "192.168.1.1",
    timestamp: "2023-04-07T11:33:04Z",
    details: "API key for Printful integration was updated",
    severity: "info",
  },
  {
    id: "4",
    action: "Failed login attempt",
    user: "unknown",
    ip: "203.0.113.42",
    timestamp: "2023-04-07T12:17:45Z",
    details: "Multiple failed login attempts from unknown IP address",
    severity: "error",
  },
  {
    id: "5",
    action: "User account deleted",
    user: "admin@example.com",
    ip: "192.168.1.1",
    timestamp: "2023-04-07T14:49:32Z",
    details: "User account 'james@example.com' was permanently deleted",
    severity: "warning",
  },
  {
    id: "6",
    action: "System backup",
    user: "system",
    ip: "internal",
    timestamp: "2023-04-07T02:00:00Z",
    details: "Automated daily backup completed successfully",
    severity: "info",
  },
  {
    id: "7",
    action: "System settings changed",
    user: "admin@example.com",
    ip: "192.168.1.1",
    timestamp: "2023-04-06T16:28:11Z",
    details: "Security settings were updated",
    severity: "info",
  },
  {
    id: "8",
    action: "Database error",
    user: "system",
    ip: "internal",
    timestamp: "2023-04-06T23:14:52Z",
    details: "Temporary database connection error occurred - auto-recovered",
    severity: "error",
  },
];

const ActivityLogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  
  // Format date for display
  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy HH:mm:ss");
  };

  // Filter logs based on search query and filters
  const filteredLogs = mockLogs.filter((log) => {
    // Search filter
    const matchesSearch = 
      searchQuery === "" || 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Severity filter
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter;
    
    // Date filter
    const matchesDate = !dateFilter || 
      new Date(log.timestamp).toDateString() === dateFilter.toDateString();
    
    return matchesSearch && matchesSeverity && matchesDate;
  });

  // Get severity badge variant
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "error":
        return "destructive";
      case "warning":
        return "secondary";
      case "info":
      default:
        return "secondary";
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setDateFilter(undefined);
    setSeverityFilter("all");
  };
  
  // Download logs (mock functionality)
  const downloadLogs = () => {
    console.log("Downloading logs...");
    // This would trigger a download of the logs in a real application
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold">Activity Logs</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={resetFilters}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
          <Button variant="outline" size="sm" onClick={downloadLogs}>
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={`w-[150px] justify-start text-left font-normal ${dateFilter ? 'text-foreground' : 'text-muted-foreground'}`}>
              <Calendar className="mr-2 h-4 w-4" />
              {dateFilter ? format(dateFilter, "MMM d, yyyy") : "Filter by date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarComponent
              mode="single"
              selected={dateFilter}
              onSelect={setDateFilter}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Timestamp</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="hidden md:table-cell">IP Address</TableHead>
              <TableHead className="hidden md:table-cell">Severity</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">
                    {formatDateTime(log.timestamp)}
                  </TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <User className="h-3 w-3 text-muted-foreground" />
                    {log.user}
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-xs">{log.ip}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={getSeverityBadge(log.severity)}>
                      {log.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">{log.details}</div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-muted-foreground">No logs found matching your filters</p>
                    <Button variant="link" onClick={resetFilters} className="mt-2">
                      Reset filters
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {filteredLogs.length} of {mockLogs.length} logs
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;

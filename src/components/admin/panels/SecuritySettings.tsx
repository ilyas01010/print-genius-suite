
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Trash2, Plus, Shield, AlertTriangle } from "lucide-react";

const SecuritySettings = () => {
  const { toast } = useToast();
  
  // IP Whitelist state
  const [ipWhitelist, setIpWhitelist] = useState([
    { id: "1", ip: "192.168.1.1", description: "Admin office", addedBy: "admin@example.com", dateAdded: "2023-03-15T10:30:00Z" },
    { id: "2", ip: "10.0.0.25", description: "Home office", addedBy: "admin@example.com", dateAdded: "2023-03-20T14:15:00Z" },
  ]);
  const [newIp, setNewIp] = useState("");
  const [newIpDescription, setNewIpDescription] = useState("");
  
  // Security log state
  const [securityLogs] = useState([
    { id: "1", event: "Failed login attempt", ip: "203.0.113.42", timestamp: "2023-04-07T12:17:45Z", details: "Multiple failed login attempts" },
    { id: "2", event: "IP blocked", ip: "203.0.113.42", timestamp: "2023-04-07T12:18:00Z", details: "Automatic block after 5 failed attempts" },
    { id: "3", event: "Added IP to whitelist", ip: "10.0.0.25", timestamp: "2023-03-20T14:15:00Z", details: "Home office" },
    { id: "4", event: "Password reset", ip: "192.168.1.1", timestamp: "2023-03-15T09:42:12Z", details: "Password reset for user 'sarah@example.com'" },
  ]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Add new IP to whitelist
  const addToWhitelist = () => {
    if (!newIp.trim()) {
      toast({
        title: "Error",
        description: "Please enter an IP address",
        variant: "destructive",
      });
      return;
    }

    // Validate IP format (simple validation, could be more robust)
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(newIp)) {
      toast({
        title: "Invalid IP format",
        description: "Please enter a valid IPv4 address",
        variant: "destructive",
      });
      return;
    }

    const newEntry = {
      id: `ip-${Date.now()}`,
      ip: newIp,
      description: newIpDescription || "No description",
      addedBy: "admin@example.com",
      dateAdded: new Date().toISOString(),
    };

    setIpWhitelist([...ipWhitelist, newEntry]);
    
    toast({
      title: "IP added to whitelist",
      description: `${newIp} has been added to the whitelist`,
    });

    // Reset form
    setNewIp("");
    setNewIpDescription("");
  };

  // Remove IP from whitelist
  const removeFromWhitelist = (id: string) => {
    const ipToRemove = ipWhitelist.find(item => item.id === id);
    
    setIpWhitelist(ipWhitelist.filter(item => item.id !== id));
    
    toast({
      title: "IP removed from whitelist",
      description: `${ipToRemove?.ip} has been removed from the whitelist`,
    });
  };

  // Run security audit
  const runSecurityAudit = () => {
    toast({
      title: "Security audit started",
      description: "A comprehensive security audit has been initiated. Results will be available shortly.",
    });

    // In a real application, this would trigger an actual audit
    setTimeout(() => {
      toast({
        title: "Security audit completed",
        description: "No critical issues found. See detailed report in security logs.",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Security Settings</h2>
      <p className="text-muted-foreground">
        Manage security settings and access controls for your application.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <Shield className="h-5 w-5 text-primary mb-2" />
            <CardTitle>Security Status</CardTitle>
            <CardDescription>Overall system security</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2">
              Good
              <Badge variant="outline" className="ml-2 text-xs">
                4.5/5
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Last audit: {formatDate(new Date().toISOString())}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={runSecurityAudit}>
              Run Security Audit
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription>Currently logged in users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
            <p className="text-sm text-muted-foreground mt-2">
              Your current session (192.168.1.1)
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Sessions
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <AlertTriangle className="h-5 w-5 text-destructive mb-2" />
            <CardTitle>Security Alerts</CardTitle>
            <CardDescription>Recent security warnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
            <p className="text-sm text-muted-foreground mt-2">
              Failed login attempts detected
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Alerts
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="ip-whitelist">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="ip-whitelist">IP Whitelist</TabsTrigger>
          <TabsTrigger value="security-logs">Security Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ip-whitelist" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>IP Whitelist</CardTitle>
              <CardDescription>
                Manage allowed IP addresses for admin access.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="space-y-2 flex-1">
                  <label htmlFor="ip-address" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">IP Address</label>
                  <Input
                    id="ip-address"
                    placeholder="e.g. 192.168.1.1"
                    value={newIp}
                    onChange={(e) => setNewIp(e.target.value)}
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <label htmlFor="ip-description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Description</label>
                  <Input
                    id="ip-description"
                    placeholder="e.g. Office Network"
                    value={newIpDescription}
                    onChange={(e) => setNewIpDescription(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addToWhitelist} className="gap-1">
                    <Plus className="h-4 w-4" />
                    Add IP
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="hidden md:table-cell">Added By</TableHead>
                      <TableHead className="hidden md:table-cell">Date Added</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ipWhitelist.length > 0 ? (
                      ipWhitelist.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-mono">{item.ip}</TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="hidden md:table-cell">{item.addedBy}</TableCell>
                          <TableCell className="hidden md:table-cell">{formatDate(item.dateAdded)}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromWhitelist(item.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center h-24">
                          No IPs in whitelist
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <p className="text-sm text-muted-foreground">
                IP whitelisting restricts admin access to pre-approved IP addresses only.
                Your current IP is automatically whitelisted.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security-logs" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Logs</CardTitle>
              <CardDescription>
                Recent security-related events and alerts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead className="hidden md:table-cell">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {securityLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          {log.event === "Failed login attempt" || log.event === "IP blocked" ? (
                            <span className="flex items-center gap-1">
                              <AlertTriangle className="h-4 w-4 text-destructive" />
                              {log.event}
                            </span>
                          ) : (
                            log.event
                          )}
                        </TableCell>
                        <TableCell className="font-mono">{log.ip}</TableCell>
                        <TableCell>{formatDate(log.timestamp)}</TableCell>
                        <TableCell className="hidden md:table-cell">{log.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Security Logs
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecuritySettings;


import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/UserContext";
import { format } from "date-fns";

const Profile = () => {
  const { user } = useUser();
  
  // Format date or provide default
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (e) {
      return "N/A";
    }
  };

  // Created date (for demo purposes)
  const createdAt = user?.user_metadata?.created_at || "2023-06-15T10:30:00Z";
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Profile</h1>
      
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.user_metadata?.avatar_url || ''} alt={user?.user_metadata?.display_name || 'User'} />
            <AvatarFallback>
              {user?.user_metadata?.display_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <CardTitle className="text-xl">
              {user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'User'}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Member since {formatDate(createdAt)}</span>
              <Badge variant="outline">{user?.id === 'demo-user' ? 'Free Plan' : 'Pro Plan'}</Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="designs">Designs</TabsTrigger>
              <TabsTrigger value="purchases">Purchases</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">{user?.email || 'demo@example.com'}</p>
                </div>
                
                <div className="grid gap-2">
                  <h3 className="font-medium">Account Type</h3>
                  <p className="text-sm text-muted-foreground">{user?.id === 'demo-user' ? 'Free Account' : 'Pro Account'}</p>
                </div>
                
                <div className="grid gap-2">
                  <h3 className="font-medium">Joined</h3>
                  <p className="text-sm text-muted-foreground">{formatDate(createdAt)}</p>
                </div>
                
                {user?.id !== 'demo-user' && (
                  <div className="grid gap-2">
                    <h3 className="font-medium">Subscription</h3>
                    <div className="flex gap-2">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      <span className="text-sm text-muted-foreground">Renews on {format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "MMM d, yyyy")}</span>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="designs">
              <div className="text-center py-6">
                <p className="text-muted-foreground">No designs available yet</p>
              </div>
            </TabsContent>
            
            <TabsContent value="purchases">
              <div className="text-center py-6">
                <p className="text-muted-foreground">No purchase history available</p>
              </div>
            </TabsContent>
            
            <TabsContent value="integrations">
              <div className="text-center py-6">
                <p className="text-muted-foreground">No integrations configured</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

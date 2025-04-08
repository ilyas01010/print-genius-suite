
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, User, Mail, Calendar, Clock, Edit2 } from "lucide-react";
import { supabase } from "@/lib/supabase-client";

const Profile = () => {
  const { user, setUser, isLoading } = useUser();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  
  // Initialize profile data from user
  useEffect(() => {
    if (user) {
      setDisplayName(user.user_metadata?.display_name || "");
      setBio(user.user_metadata?.bio || "");
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-pulse">Loading profile...</div>
      </div>
    );
  }

  const userInitials = displayName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase() || 'U';

  const joinedDate = user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Unknown";

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { 
          display_name: displayName,
          bio: bio 
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        setUser(data.user);
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated."
        });
        setIsEditing(false);
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={() => setIsEditing(false)} variant="ghost">
              Cancel
            </Button>
            <Button onClick={handleUpdateProfile} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.user_metadata?.avatar_url || ''} />
              <AvatarFallback className="text-xl bg-primary/10">{userInitials}</AvatarFallback>
            </Avatar>
            
            <CardTitle className="mt-4">{displayName || "No Name Set"}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
            
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <Badge variant="outline" className="bg-primary/5">Print Designer</Badge>
              <Badge variant="outline" className="bg-primary/5">Pro User</Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{user?.email}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined {joinedDate}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Last login {new Date().toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Manage your profile information
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <label htmlFor="displayName" className="text-sm font-medium">
                    Display Name
                  </label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your display name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="bio" className="text-sm font-medium">
                    Bio
                  </label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us a bit about yourself"
                    rows={4}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Display Name</h3>
                  <p className="mt-1">{displayName || "No display name set"}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
                  <p className="mt-1">{bio || "No bio added yet"}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Account Activity</CardTitle>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="designs">
              <TabsList className="mb-4">
                <TabsTrigger value="designs">My Designs</TabsTrigger>
                <TabsTrigger value="platforms">Connected Platforms</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="designs" className="h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <User className="mx-auto h-8 w-8 mb-2" />
                  <p>You haven't created any designs yet.</p>
                  <Button variant="outline" className="mt-4" onClick={() => navigate('/design')}>
                    Create Your First Design
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="platforms" className="h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <User className="mx-auto h-8 w-8 mb-2" />
                  <p>You haven't connected any platforms yet.</p>
                  <Button variant="outline" className="mt-4" onClick={() => navigate('/platform')}>
                    Connect a Platform
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="activity" className="h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <User className="mx-auto h-8 w-8 mb-2" />
                  <p>No recent activity to display.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;

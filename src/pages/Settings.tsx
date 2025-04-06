
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";
import {
  Globe,
  Mail,
  Bell,
  Moon,
  Settings2,
  Languages,
  Users,
  Link,
  Copy,
  ChevronRight,
  Check
} from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Create a language context to manage language settings
const languages = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  zh: "Chinese",
  ja: "Japanese"
};

const Settings = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const [savedSettings, setSavedSettings] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [affiliateLink, setAffiliateLink] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setDisplayBio] = useState("");
  const [publicProfile, setPublicProfile] = useState(false);
  const [timezone, setTimezone] = useState("utc");

  // Initialize user settings
  useEffect(() => {
    // Load settings from localStorage or set defaults
    const loadSettings = () => {
      const storedSettings = localStorage.getItem('userSettings');
      if (storedSettings) {
        const settings = JSON.parse(storedSettings);
        setDarkMode(settings.darkMode || false);
        setEmailNotifications(settings.emailNotifications || true);
        setPushNotifications(settings.pushNotifications || true);
        setLanguage(settings.language || "en");
        setTimezone(settings.timezone || "utc");
        setPublicProfile(settings.publicProfile || false);
      }

      // Load user profile data if available
      if (user) {
        setDisplayName(user.user_metadata?.display_name || "");
        setDisplayBio(user.user_metadata?.bio || "");
        
        // Generate referral code based on user id if not already set
        const storedReferralCode = localStorage.getItem('referralCode');
        if (storedReferralCode) {
          setReferralCode(storedReferralCode);
        } else {
          const newReferralCode = generateReferralCode();
          setReferralCode(newReferralCode);
          localStorage.setItem('referralCode', newReferralCode);
        }
      }
    };

    loadSettings();
  }, [user]);

  // Update affiliate link when referral code changes
  useEffect(() => {
    if (referralCode) {
      setAffiliateLink(`https://printgenius.com/ref/${referralCode}`);
    }
  }, [referralCode]);

  // Apply dark mode when it changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Store setting
    updateLocalStorage();
  }, [darkMode]);

  // Generate a unique referral code
  const generateReferralCode = () => {
    const prefix = "PRINT";
    const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `${prefix}${randomPart}`;
  };

  // Regenerate referral code
  const handleRegenerateReferralCode = () => {
    const newReferralCode = generateReferralCode();
    setReferralCode(newReferralCode);
    localStorage.setItem('referralCode', newReferralCode);
    
    toast({
      title: "Referral Code Updated",
      description: "Your referral code has been regenerated successfully.",
    });
  };

  // Update localStorage with current settings
  const updateLocalStorage = () => {
    const settings = {
      darkMode,
      emailNotifications,
      pushNotifications,
      language,
      timezone,
      publicProfile
    };
    localStorage.setItem('userSettings', JSON.stringify(settings));
  };

  // Save settings
  const handleSaveSettings = () => {
    // Save all settings
    updateLocalStorage();
    
    // Apply language change
    document.documentElement.setAttribute('lang', language);
    
    // Apply notification settings
    if (Notification && Notification.permission !== "denied") {
      if (pushNotifications) {
        Notification.requestPermission();
      }
    }
    
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
    setSavedSettings(true);
    
    setTimeout(() => {
      setSavedSettings(false);
    }, 3000);
  };

  // Handle language change
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    // In a real app, this would update the app's translations
    toast({
      title: `Language Changed to ${languages[newLanguage as keyof typeof languages]}`,
      description: "Please note that full language support is still under development.",
    });
  };

  // Copy referral code to clipboard
  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied to Clipboard",
      description: "Referral code copied successfully!",
    });
  };

  // Copy affiliate link to clipboard
  const handleCopyAffiliate = () => {
    navigator.clipboard.writeText(affiliateLink);
    toast({
      title: "Copied to Clipboard",
      description: "Affiliate link copied successfully!",
    });
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Settings</h1>
          <p className="text-muted-foreground">
            Configure your account and application preferences
          </p>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and account settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      placeholder="Email address" 
                      type="email" 
                      value={user?.email || ""}
                      readOnly
                    />
                    <p className="text-sm text-muted-foreground">Your account email address</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input 
                      id="displayName" 
                      placeholder="Your display name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">The name displayed to others</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input 
                    id="bio" 
                    placeholder="A short bio about yourself"
                    value={bio}
                    onChange={(e) => setDisplayBio(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">A brief description visible on your profile</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="account-status" 
                    checked={publicProfile}
                    onCheckedChange={setPublicProfile}
                  />
                  <Label htmlFor="account-status">Make my profile public</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings} disabled={savedSettings}>
                  {savedSettings ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Saved
                    </>
                  ) : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Language & Region</CardTitle>
                <CardDescription>
                  Customize your language and regional settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={handleLanguageChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Time Zone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                        <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                        <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                        <SelectItem value="mst">MST (Mountain Standard Time)</SelectItem>
                        <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings} disabled={savedSettings}>
                  {savedSettings ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Saved
                    </>
                  ) : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Referrals & Affiliates</CardTitle>
                <CardDescription>
                  Manage your referral program and affiliate settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="referral-code">Your Referral Code</Label>
                  <div className="flex">
                    <Input 
                      id="referral-code" 
                      value={referralCode} 
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button variant="outline" onClick={handleCopyReferral} className="rounded-l-none border-l-0">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex justify-end mt-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleRegenerateReferralCode}
                    >
                      Generate New Code
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Share this code to earn rewards when new users sign up</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="affiliate-link">Affiliate Link</Label>
                  <div className="flex">
                    <Input 
                      id="affiliate-link" 
                      value={affiliateLink} 
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button variant="outline" onClick={handleCopyAffiliate} className="rounded-l-none border-l-0">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Share this link to earn commission on sales</p>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Referral Stats</p>
                    <Button variant="ghost" size="sm">View Details <ChevronRight className="h-4 w-4 ml-1" /></Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Referred Users</p>
                      <p className="text-2xl font-bold mt-1">0</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Earnings</p>
                      <p className="text-2xl font-bold mt-1">$0.00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Application Preferences</CardTitle>
                <CardDescription>
                  Customize your Print Genius experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Moon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Switch to dark theme</p>
                    </div>
                  </div>
                  <Switch 
                    checked={darkMode} 
                    onCheckedChange={(checked) => {
                      setDarkMode(checked);
                      // Dark mode is applied in useEffect
                    }} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                    </div>
                  </div>
                  <Switch 
                    checked={pushNotifications} 
                    onCheckedChange={(checked) => {
                      setPushNotifications(checked);
                      if (checked && Notification && Notification.permission !== 'granted') {
                        toast({
                          title: "Permission Required",
                          description: "Please allow notifications in your browser settings.",
                        });
                      }
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive email updates</p>
                    </div>
                  </div>
                  <Switch 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications} 
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings} disabled={savedSettings}>
                  {savedSettings ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Saved
                    </>
                  ) : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Design Preferences</CardTitle>
                <CardDescription>
                  Configure design generator settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="default-resolution">Default Resolution</Label>
                  <Select defaultValue="1080">
                    <SelectTrigger id="default-resolution" className="w-full">
                      <SelectValue placeholder="Select resolution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="720">720p</SelectItem>
                      <SelectItem value="1080">1080p</SelectItem>
                      <SelectItem value="2k">2K</SelectItem>
                      <SelectItem value="4k">4K</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="default-format">Default Format</Label>
                  <Select defaultValue="png">
                    <SelectTrigger id="default-format" className="w-full">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="jpg">JPG</SelectItem>
                      <SelectItem value="webp">WebP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-save designs</p>
                    <p className="text-sm text-muted-foreground">Automatically save design progress</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings} disabled={savedSettings}>
                  {savedSettings ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Saved
                    </>
                  ) : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Integrations</CardTitle>
                <CardDescription>
                  Connect external services and APIs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {/* Etsy Integration */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded bg-orange-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="24" width="24">
                          <path fill="#F06292" d="M29.5,24.3c0-0.2,0.1-0.3,0.1-0.3s0,0,0,0c0-0.4,0-0.6,0-0.8c0-0.8-0.1-1.4-0.3-2c-0.5-1.5-1.5-1.9-1.9-2 c-0.2-0.1-0.4-0.1-0.6-0.1c-0.1,0-0.3,0-0.4,0l0,0c-0.4,0-0.9-0.1-1.7-0.1c-0.3,0-0.5,0-0.8,0c-1.5,0-2.5,0.1-3.3,0.7 c-0.4,0.3-0.8,0.6-1,1.3c0,0.1-0.1,0.1-0.1,0.2c0,0,0,0.1,0,0.1l0,0c0,0,0,0,0,0c-0.2,0.7-0.4,1.8-0.4,3.5c0,1.8,0.2,3.8,0.6,6 c0.1,0.8,0.3,1.5,0.4,2.1c0.1,0.6,0.3,1.2,0.4,1.5c0.5,1.5,1.8,1.5,2.5,1.5c0.3,0,0.6,0,0.9-0.1c0.2-0.1,0.4-0.1,0.6-0.1 c0.2,0,0.4,0,0.6,0.1h0.1c0.3,0.1,0.6,0.4,1,2c0.4,1.6,0.7,3.7,0.7,4.7c0,0.3,0,0.5,0,0.7c0,0.2,0,0.3,0,0.5c0,0.2,0,0.3,0,0.5 c0,0.3-0.1,0.5-0.1,0.7c-0.1,0.7-0.6,2.4-2.2,2.4c-0.1,0-0.3,0-0.4,0c-0.2,0-0.4-0.1-0.6-0.1c-0.4-0.1-0.7-0.2-1.1-0.2 c-0.6,0-1,0.2-1.3,0.8c-0.2,0.4-0.2,0.9,0,1.6c0.1,0.3,0.3,0.7,0.5,1c0.9,1.2,2.4,1.8,4.7,1.8c0.6,0,1.2,0,1.9-0.1l0,0 c0.4,0,0.7-0.1,1.1-0.2c2.3-0.5,3.6-1.8,3.9-4c0.1-0.6,0.2-1.3,0.2-2.3c0-0.8-0.1-1.8-0.2-2.9c-0.1-0.9-0.3-1.9-0.5-3 c-0.1-0.5-0.2-0.9-0.2-1.3c-0.1-0.4-0.2-0.8-0.3-1.2c-0.3-1-0.6-1.6-0.8-2c0.3-0.1,0.5-0.3,0.7-0.4c1.2-0.9,1.9-2.4,1.9-4.1 C31,27.4,30.5,25.6,29.5,24.3L29.5,24.3z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Etsy</p>
                        <p className="text-sm text-muted-foreground">Upload designs directly to Etsy listings</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        toast({
                          title: "Integration Coming Soon",
                          description: "Etsy integration will be available soon.",
                        });
                      }}
                    >
                      Connect
                    </Button>
                  </div>
                  
                  {/* Shopify Integration */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded bg-green-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="24" width="24">
                          <path fill="#7CB342" d="M37.216,16.844c-0.064-0.139-0.254-0.207-0.517-0.207c-0.269,0-0.588,0.081-0.928,0.227 c-0.519-1.528-1.438-2.927-3.055-2.927c-0.145,0-0.298,0.003-0.446,0.02c-0.672-0.882-1.513-1.271-2.238-1.271 c-5.523,0-8.169,6.908-8.986,10.421c-2.153,0.664-3.653,1.125-3.731,1.148c-1.103,0.346-1.139,0.382-1.283,1.428 c-0.109,0.778-2.933,22.725-2.933,22.725L32.797,42L37.216,16.844z M28.935,15.788c-0.271,0.087-0.58,0.179-0.916,0.281v-0.596 c0-1.21-0.807-1.757-1.518-1.757C25.25,13.717,24,14.55,24,16.432c0,1.071,0.573,2.033,1.325,2.502 c-0.614,1.957-1.52,4.748-2.491,7.295c-1.297,3.074-1.945,4.254-2.38,4.058c-0.548-0.248-0.304-2.723,0.227-5.167 c0.469-1.861,1.106-3.547,1.106-3.547s-0.867-0.655-2.419-0.655c-2.03,0-2.136,1.277-2.136,1.587c0,0.697,0.867,3.44-0.199,9.32 C16.58,35.578,15.3,37.37,14.428,37.37c-1.63,0-1.162-7.686-0.076-12.653c0.448-2.044,1.489-5.195,1.488-5.257 c0-0.591-1.194-0.902-1.887-0.902c-1.258,0-1.566,0.589-1.718,0.589c-0.149,0-0.708-0.115-0.708-0.583 c0-0.518,0.93-1.256,2.391-1.256c1.828,0,3.031,0.639,3.864,1.461c1.616-0.981,4.127-1.4,4.194-1.4c0.25,0,0.79,0.019,0.79,0.513 c0,0.906-4.958,1.897-4.958,5.149c0,0.24,0,0.495,0.019,0.756c0.026-0.047,0.053-0.089,0.08-0.134 c1.939-3.764,5.316-6.788,7.222-6.788c0.241,0,0.5,0.045,0.723,0.151c0.437,0.245,0.696,0.708,0.745,1.339 c0.47,0.06,0.908,0.151,1.294,0.262c0.466-0.576,1.328-1.066,2.339-0.877c1.17,0.22,1.776,1.362,1.776,2.723 C31.795,20.735,30.174,18.62,28.935,15.788z M29.044,18.88c0.188-0.386,0.243-0.528,0.307-0.542 c0.263-0.055,0.429,0.405,0.62,1.31c0.121,0.579,0.277,1.245,0.665,2.014c0.046,0.092,0.104,0.203,0.164,0.323 c0.19-1.168,0.395-2.548,0.524-3.956C31.738,17.894,30.306,18.343,29.044,18.88z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Shopify</p>
                        <p className="text-sm text-muted-foreground">Sync product listings with Shopify store</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        toast({
                          title: "Integration Coming Soon",
                          description: "Shopify integration will be available soon.",
                        });
                      }}
                    >
                      Connect
                    </Button>
                  </div>
                  
                  {/* Printful Integration */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="24" width="24">
                          <path fill="#1E88E5" d="M24,6C14.061,6,6,14.061,6,24s8.061,18,18,18s18-8.061,18-18S33.939,6,24,6z M24,13 c5.514,0,10,4.486,10,10c0,5.514-4.486,10-10,10c-5.514,0-10-4.486-10-10C14,17.486,18.486,13,24,13z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Printful</p>
                        <p className="text-sm text-muted-foreground">Connect with Printful for print-on-demand</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        toast({
                          title: "Integration Coming Soon",
                          description: "Printful integration will be available soon.",
                        });
                      }}
                    >
                      Connect
                    </Button>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Link className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Your API Key</p>
                        <p className="text-sm text-muted-foreground">Use this key to access Print Genius API</p>
                      </div>
                    </div>
                    <Button 
                      variant="secondary"
                      onClick={() => {
                        const apiKey = `pg_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
                        navigator.clipboard.writeText(apiKey);
                        toast({
                          title: "API Key Generated",
                          description: "Your new API key has been copied to clipboard.",
                        });
                      }}
                    >
                      Generate Key
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>
                  Manage your social logins and connected accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="24" width="24">
                        <path fill="#039BE5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"/>
                        <path fill="#FFF" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Facebook</p>
                      <p className="text-sm text-muted-foreground">Not Connected</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Integration Coming Soon",
                        description: "Facebook integration will be available soon.",
                      });
                    }}
                  >
                    Connect
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="24" width="24">
                        <path fill="#212121" d="M24.5,2C12.9,2,3.5,11.4,3.5,23c0,9.4,6.2,17.3,14.8,20.1c1.1,0.2,1.5-0.5,1.5-1c0-0.5,0-2.1,0-4c-6,1.3-7.2-2.9-7.2-2.9c-1-2.5-2.4-3.1-2.4-3.1c-2-1.3,0.1-1.3,0.1-1.3c2.2,0.2,3.3,2.2,3.3,2.2c1.9,3.3,5.1,2.4,6.3,1.8c0.2-1.4,0.8-2.4,1.4-2.9c-4.8-0.5-9.8-2.4-9.8-10.7c0-2.4,0.8-4.3,2.2-5.8c-0.2-0.6-1-2.8,0.2-5.8c0,0,1.8-0.6,5.9,2.2c1.7-0.5,3.6-0.7,5.4-0.7c1.8,0,3.7,0.2,5.4,0.7c4.1-2.8,5.8-2.2,5.8-2.2c1.2,3,0.4,5.3,0.2,5.8c1.4,1.5,2.2,3.4,2.2,5.8c0,8.3-5,10.2-9.8,10.7c0.8,0.7,1.5,2,1.5,4.1c0,2.9,0,5.3,0,6c0,0.6,0.4,1.3,1.5,1C41.8,40.3,48,32.4,48,23C48,11.4,38.6,2,27,2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">GitHub</p>
                      <p className="text-sm text-muted-foreground">Not Connected</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Integration Coming Soon",
                        description: "GitHub integration will be available soon.",
                      });
                    }}
                  >
                    Connect
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="24" width="24">
                        <path fill="#0288D1" d="M8.421,14h0.052l0,0C11.263,14,13,12,13,9.5C12.948,6.945,11.263,5,8.526,5S4,6.945,4,9.5C4,12,5.736,14,8.421,14z"/>
                        <polygon fill="#0288D1" points="4,17 13,17 13,39 4,39"/>
                        <path fill="#0288D1" d="M44,26.5c0-5.247-4.253-9.5-9.5-9.5c-3.053,0-5.762,1.446-7.5,3.684V17h-9v22h9V28l0,0c0-2.209,1.791-4,4-4s4,1.791,4,4v11h9C44,39,44,27.955,44,26.5z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-sm text-muted-foreground">Not Connected</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Integration Coming Soon",
                        description: "LinkedIn integration will be available soon.",
                      });
                    }}
                  >
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;

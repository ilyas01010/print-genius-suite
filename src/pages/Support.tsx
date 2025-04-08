import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageLayout from "@/components/layout/PageLayout";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  HelpCircle, 
  FileQuestion, 
  MessageCircle, 
  Phone, 
  Send, 
  Mail, 
  CheckCircle 
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Support = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState("general");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setContactForm(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call with delay
    setTimeout(() => {
      toast({
        title: "Support request submitted",
        description: "We'll get back to you as soon as possible.",
      });
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Layout>
      <PageLayout>
        <div className="space-y-6 animate-fade-in">
          <Card className="p-4 md:p-6 bg-card/50 backdrop-blur border border-border/50">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl md:text-3xl">Support Center</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Get help and support for your Print Genius account
              </p>
            </div>
          </Card>

          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <FileQuestion className="h-4 w-4" /> FAQs
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" /> Contact
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" /> Resources
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="faq" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Find answers to common questions about using Print Genius</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How do I create my first design?</AccordionTrigger>
                      <AccordionContent>
                        To create your first design, navigate to the Design Generator page and either
                        choose a template, upload your own image, or use text-to-image generation to create
                        a completely new design from a text description.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How does the copyright checker work?</AccordionTrigger>
                      <AccordionContent>
                        Our copyright checker tool scans designs for potential trademark and copyright
                        issues. Upload your design and our system will check it against a database of
                        registered trademarks and copyrighted material to help you avoid infringement issues.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>How do I connect my store platforms?</AccordionTrigger>
                      <AccordionContent>
                        Go to the Platform Manager page and click on "Add Platform". Select the platform
                        you want to connect (e.g., Etsy, Shopify) and follow the authentication steps.
                        Once connected, you'll be able to manage products and view analytics directly.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Can I switch between light and dark mode?</AccordionTrigger>
                      <AccordionContent>
                        Yes! You can change your theme preference in the Settings page under the "Preferences"
                        tab. Toggle the Dark Mode switch to enable or disable dark mode according to your preference.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>How do I refer friends to Print Genius?</AccordionTrigger>
                      <AccordionContent>
                        You can find your unique referral code in the Settings page under the "Referrals" tab.
                        Share your referral code or affiliate link with friends. When they sign up using your
                        code, both of you will receive rewards.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Get in touch with our support team for assistance</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="Enter your name" 
                          required 
                          value={contactForm.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          placeholder="your@email.com" 
                          required 
                          value={contactForm.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input 
                          id="subject" 
                          name="subject" 
                          placeholder="Brief subject of your inquiry" 
                          required 
                          value={contactForm.subject}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={contactForm.category} onValueChange={handleCategoryChange}>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Question</SelectItem>
                            <SelectItem value="technical">Technical Issue</SelectItem>
                            <SelectItem value="billing">Billing & Subscription</SelectItem>
                            <SelectItem value="feature">Feature Request</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        placeholder="Describe your issue or question in detail..." 
                        rows={5} 
                        required 
                        value={contactForm.message}
                        onChange={handleInputChange}
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    We typically respond within 24 hours
                  </div>
                  <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>Submitting...</>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Submit Request
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" /> Email Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">For general inquiries and non-urgent questions</p>
                    <p className="font-medium mt-2">support@printgenius.com</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-primary" /> Phone Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">For urgent issues (available Mon-Fri, 9am-5pm EST)</p>
                    <p className="font-medium mt-2">+1 (555) 123-4567</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Support Resources</CardTitle>
                  <CardDescription>Helpful resources to get the most out of Print Genius</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-muted">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Documentation</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-4">
                          Comprehensive guides and documentation for all features
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">View Docs</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="bg-muted">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Video Tutorials</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-4">
                          Step-by-step video guides for using Print Genius
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">Watch Videos</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="bg-muted">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Community Forum</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-4">
                          Connect with other users and share tips and tricks
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">Join Community</Button>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Getting Started Guide</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="list-decimal list-inside space-y-2 pl-2">
                        <li className="text-sm">Set up your account and profile</li>
                        <li className="text-sm">Connect your e-commerce platforms</li>
                        <li className="text-sm">Create your first design with the Design Generator</li>
                        <li className="text-sm">Perform copyright checks on your designs</li>
                        <li className="text-sm">List your first product on connected platforms</li>
                      </ol>
                    </CardContent>
                    <CardFooter>
                      <Button variant="secondary" className="w-full">
                        <CheckCircle className="mr-2 h-4 w-4" /> Start Tutorial
                      </Button>
                    </CardFooter>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </PageLayout>
    </Layout>
  );
};

export default Support;

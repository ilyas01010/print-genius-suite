
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FaqTab = () => {
  return (
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
  );
};

export default FaqTab;

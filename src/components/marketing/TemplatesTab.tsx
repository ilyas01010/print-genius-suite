
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, FileText, Plus } from "lucide-react";
import { useMarketingPlanner } from "@/hooks/use-marketing-planner";

const TemplatesTab = () => {
  const {
    templateName,
    setTemplateName,
    templateContent,
    setTemplateContent,
    savedTemplates,
    handleSaveTemplate,
    handleCopyTemplate,
    handleTemplateSelect
  } = useMarketingPlanner();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Template</CardTitle>
          <CardDescription>
            Save time by creating reusable post templates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="templateName">Template Name</Label>
            <Input
              id="templateName"
              placeholder="e.g., Promotion Announcement"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="templateContent">Template Content</Label>
            <Textarea
              id="templateContent"
              placeholder="Write your template content here..."
              value={templateContent}
              onChange={(e) => setTemplateContent(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSaveTemplate}>
            <Plus className="mr-2 h-4 w-4" />
            Save Template
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Saved Templates</CardTitle>
          <CardDescription>
            Use or copy from your saved templates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {savedTemplates.length === 0 ? (
            <div className="text-center p-4">
              <p className="text-muted-foreground">No templates saved yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedTemplates.map((template) => (
                <div key={template.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{template.content}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleCopyTemplate(template)}>
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy</span>
                      </Button>
                      <Button variant="secondary" size="icon" onClick={() => handleTemplateSelect(template)}>
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">Use Template</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplatesTab;

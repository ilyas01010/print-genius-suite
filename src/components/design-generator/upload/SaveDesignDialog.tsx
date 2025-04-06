
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SaveDesignDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  designName: string;
  setDesignName: (name: string) => void;
  designCategory: string;
  setDesignCategory: (category: string) => void;
  designDescription: string;
  setDesignDescription: (description: string) => void;
  handleSaveDesign: () => void;
  isLoading: boolean;
}

const SaveDesignDialog = ({
  isOpen,
  setIsOpen,
  designName,
  setDesignName,
  designCategory,
  setDesignCategory,
  designDescription,
  setDesignDescription,
  handleSaveDesign,
  isLoading
}: SaveDesignDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Design</DialogTitle>
          <DialogDescription>
            Enter details about your design to save it to your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              placeholder="My awesome design"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select value={designCategory} onValueChange={setDesignCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="t-shirt">T-Shirt Design</SelectItem>
                <SelectItem value="poster">Poster</SelectItem>
                <SelectItem value="logo">Logo</SelectItem>
                <SelectItem value="illustration">Illustration</SelectItem>
                <SelectItem value="ai-generated">AI Generated</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={designDescription}
              onChange={(e) => setDesignDescription(e.target.value)}
              placeholder="A brief description of your design"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveDesign} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Design"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveDesignDialog;

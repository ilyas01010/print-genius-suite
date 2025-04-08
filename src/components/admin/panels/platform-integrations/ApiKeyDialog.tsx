
import React from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedIntegration: any;
  newApiKey: string;
  setNewApiKey: (value: string) => void;
  onSave: () => void;
}

const ApiKeyDialog = ({
  open,
  onOpenChange,
  selectedIntegration,
  newApiKey,
  setNewApiKey,
  onSave
}: ApiKeyDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {selectedIntegration?.apiKey ? "Update" : "Add"} API Key
          </DialogTitle>
          <DialogDescription>
            {selectedIntegration?.apiKey
              ? `Change the API key for ${selectedIntegration?.name}.`
              : `Add an API key to connect to ${selectedIntegration?.name}.`}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input
              id="api-key"
              value={newApiKey}
              onChange={(e) => setNewApiKey(e.target.value)}
              placeholder="Enter API key"
              className="font-mono"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            API keys are encrypted and stored securely. Never share your API keys.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave} disabled={!newApiKey.trim()}>
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;

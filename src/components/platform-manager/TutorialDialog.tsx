
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Store, ShoppingCart, BarChart3, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TutorialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TutorialDialog: React.FC<TutorialDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Platform Dashboard Tutorial</DialogTitle>
          <DialogDescription>
            Learn how to navigate and use the platform dashboard effectively.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex gap-3">
            <div className="bg-primary/20 p-2 rounded-full">
              <Info className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Overview Tab</h3>
              <p className="text-sm text-muted-foreground">See performance metrics, revenue statistics, and product distribution across all platforms.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="bg-primary/20 p-2 rounded-full">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Platforms Tab</h3>
              <p className="text-sm text-muted-foreground">Connect, manage, and view details of all your POD platforms in one place.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="bg-primary/20 p-2 rounded-full">
              <ShoppingCart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Products Tab</h3>
              <p className="text-sm text-muted-foreground">Manage all your product listings across platforms, add new products, and track performance.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="bg-primary/20 p-2 rounded-full">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Analytics Tab</h3>
              <p className="text-sm text-muted-foreground">View detailed analytics, charts, and trends for your POD business.</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button onClick={() => {
            onOpenChange(false);
            toast({
              title: "Tutorial Complete",
              description: "You can open this tutorial anytime from the help icon.",
            });
          }}>Got it!</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialDialog;

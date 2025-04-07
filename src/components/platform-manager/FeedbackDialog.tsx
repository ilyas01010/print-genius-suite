
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmitFeedback = () => {
    if (feedbackText.trim()) {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! We appreciate your input.",
      });
      setFeedbackText('');
      onOpenChange(false);
    } else {
      toast({
        title: "Error",
        description: "Please enter some feedback before submitting.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hidden sm:flex">
          <MessageSquare className="mr-2 h-4 w-4" /> Feedback
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Feedback</DialogTitle>
          <DialogDescription>
            Share your thoughts, report issues, or suggest improvements for the Platform Dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="feedback" className="text-sm font-medium">Your feedback</label>
            <textarea 
              id="feedback" 
              className="w-full min-h-[100px] border rounded-md p-2"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Please share your experience, suggestions, or report any issues you've encountered..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;

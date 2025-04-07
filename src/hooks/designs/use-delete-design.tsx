
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteDesign = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ designId, storagePath }: { designId: string, storagePath: string }) => {
      if (!user) {
        throw new Error("Authentication required");
      }
      
      setIsLoading(true);
      
      try {
        // Delete from database
        const { error: dbError } = await supabase
          .from('designs')
          .delete()
          .eq('id', designId);
          
        if (dbError) {
          throw dbError;
        }
        
        // Delete from storage
        const { error: storageError } = await supabase.storage
          .from('designs')
          .remove([storagePath]);
          
        if (storageError) {
          console.warn("Could not delete the file from storage:", storageError);
        }
        
        toast({
          title: "Design deleted",
          description: "The design has been removed successfully",
        });
        
        return true;
      } catch (error: any) {
        console.error("Error deleting design:", error);
        toast({
          title: "Delete failed",
          description: error.message || "Could not delete the design. Please try again.",
          variant: "destructive",
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designs'] });
    },
  });
};

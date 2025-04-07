
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import type { Design } from "./use-upload-design";

export const useFetchDesigns = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();

  return useQuery({
    queryKey: ['designs'],
    queryFn: async () => {
      if (!user) {
        return [];
      }
      
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('designs')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        // Add public URLs to the designs
        const designsWithUrls = data.map((design: Design) => {
          const { data: urlData } = supabase.storage
            .from('designs')
            .getPublicUrl(design.storage_path);
            
          return {
            ...design,
            publicUrl: urlData.publicUrl,
          } as Design;
        });
        
        return designsWithUrls;
      } catch (error: any) {
        console.error("Error fetching designs:", error);
        toast({
          title: "Failed to load designs",
          description: error.message || "Could not load your designs. Please try again.",
          variant: "destructive",
        });
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    enabled: !!user,
  });
};

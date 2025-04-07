
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { useQueryClient } from "@tanstack/react-query";
import type { Database } from "@/integrations/supabase/types";

export type Design = Database['public']['Tables']['designs']['Row'] & {
  publicUrl?: string;
};

export const useUploadDesign = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadDesign = async (file: File, name: string, category?: string, description?: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload designs",
        variant: "destructive",
      });
      return null;
    }

    try {
      setIsLoading(true);
      
      // Create unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('designs')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get public URL for the file
      const { data: publicUrlData } = supabase.storage
        .from('designs')
        .getPublicUrl(filePath);
        
      if (!publicUrlData?.publicUrl) {
        throw new Error("Failed to get public URL for uploaded design");
      }
      
      // Insert metadata into designs table
      const designData = {
        user_id: user.id,
        name: name || file.name,
        description: description || null,
        category: category || null,
        storage_path: filePath,
      };
      
      const { data, error } = await supabase
        .from('designs')
        .insert(designData)
        .select();
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Design uploaded",
        description: "Your design has been saved successfully",
      });
      
      // Invalidate the designs query
      queryClient.invalidateQueries({ queryKey: ['designs'] });
      
      if (data && data.length > 0) {
        return {
          ...data[0],
          publicUrl: publicUrlData.publicUrl,
        } as Design;
      }
      return null;
    } catch (error: any) {
      console.error("Error uploading design:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Could not upload design. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    uploadDesign
  };
};

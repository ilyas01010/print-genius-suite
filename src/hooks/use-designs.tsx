
import { useState, useCallback } from "react";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Database } from "@/integrations/supabase/types";

export type Design = Database['public']['Tables']['designs']['Row'] & {
  publicUrl?: string;
};

export const useDesigns = () => {
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
  
  const useUserDesigns = () => {
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

  const useDeleteDesign = () => {
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

  return {
    isLoading,
    uploadDesign,
    useUserDesigns,
    useDeleteDesign,
  };
};

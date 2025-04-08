
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { useQueryClient } from "@tanstack/react-query";

export type Design = {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  category?: string;
  storage_path: string;
  created_at: string;
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

  // Fetch user designs
  const useUserDesigns = () => {
    return useQuery({
      queryKey: ['designs', user?.id],
      queryFn: async () => {
        if (!user) return [];
        
        const { data, error } = await supabase
          .from('designs')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        // Add public URLs to designs
        return data.map(design => {
          const { data: urlData } = supabase.storage
            .from('designs')
            .getPublicUrl(design.storage_path);
            
          return {
            ...design,
            publicUrl: urlData.publicUrl
          };
        }) as Design[];
      },
      enabled: !!user
    });
  };

  // Delete a design
  const useDeleteDesign = () => {
    const queryClient = useQueryClient();
    
    const deleteDesign = async ({ designId, storagePath }: { designId: string, storagePath: string }) => {
      if (!user) return;
      
      try {
        // First delete from storage
        const { error: storageError } = await supabase.storage
          .from('designs')
          .remove([storagePath]);
          
        if (storageError) throw storageError;
        
        // Then delete from database
        const { error: dbError } = await supabase
          .from('designs')
          .delete()
          .eq('id', designId);
          
        if (dbError) throw dbError;
        
        // Invalidate query cache
        queryClient.invalidateQueries({ queryKey: ['designs'] });
        
        return true;
      } catch (error) {
        console.error("Error deleting design:", error);
        throw error;
      }
    };
    
    return {
      mutate: deleteDesign,
      isPending: false // Simplified for this implementation
    };
  };

  return {
    isLoading,
    uploadDesign,
    useUserDesigns,
    useDeleteDesign,
  };
};

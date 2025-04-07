
import { useState } from "react";
import { useUploadDesign } from "./use-upload-design";
import { useFetchDesigns } from "./use-fetch-designs";
import { useDeleteDesign } from "./use-delete-design";
export { type Design } from "./use-upload-design";

export const useDesigns = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { uploadDesign } = useUploadDesign();
  const deleteDesignMutation = useDeleteDesign();

  // Composite hook that combines functionality from individual hooks
  return {
    isLoading,
    uploadDesign,
    useUserDesigns: useFetchDesigns,
    useDeleteDesign: () => deleteDesignMutation,
  };
};

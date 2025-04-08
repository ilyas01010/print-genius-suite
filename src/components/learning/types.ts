
// Learning resource types
export interface LearningResource {
  id: string;
  title: string;
  description: string;
  type: "guide" | "video" | "tutorial";
  duration: string;
  completed: boolean;
}

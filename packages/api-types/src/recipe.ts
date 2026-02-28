export interface Ingredient {
  name: string;
  quantity: string;
  unit?: string;
}

export interface RecipeStep {
  order: number;
  instruction: string;
  durationSeconds?: number;
}

export interface Recipe {
  id: string;
  videoId: string;
  userId: string;
  title: string;
  description?: string;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  servings?: number;
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  createdAt: string;
  updatedAt: string;
}

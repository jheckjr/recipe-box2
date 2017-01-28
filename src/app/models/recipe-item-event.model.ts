import { Recipe } from './recipe.model';

export interface RecipeItemEvent {
  eventType: RecipeItemEventType,
  recipe: Recipe
}

export enum RecipeItemEventType {
  Delete,
  Edit,
  Save,
  Cancel
}

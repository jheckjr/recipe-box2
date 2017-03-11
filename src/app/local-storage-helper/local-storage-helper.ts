import { Recipe } from '../models';
import { RecipeEntities } from '../reducers/recipe-reducer';

export const storeRecipe = (recipe: Recipe) => {
  localStorage.setItem(recipe.name, JSON.stringify(recipe));
};

export const deleteStoredRecipe = (recipeName: string) => {
  localStorage.removeItem(recipeName);
};

export const getAllStoredRecipes = (): RecipeEntities => {
  let recipes: RecipeEntities = {};

  for (let i = 0; i < localStorage.length; i++) {
    let recipeName = localStorage.key(i);
    let recipe: Recipe = JSON.parse(localStorage.getItem(recipeName));
    recipes = Object.assign(recipes, {
      [recipeName]: recipe
    });
  }

  return recipes;
};

export const getAllStoredRecipeNames = (): string[] => {
  let recipeNames: string[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    recipeNames.push(localStorage.key(i));
  }

  return recipeNames;
};

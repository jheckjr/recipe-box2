import { Recipe, sampleRecipe } from '../models';
import { RecipeEntities } from '../reducers/recipe-reducer';

export const storeRecipe = (recipe: Recipe) => {
  localStorage.setItem(recipe.name, JSON.stringify(recipe));
};

export const deleteStoredRecipe = (recipeName: string) => {
  localStorage.removeItem(recipeName);
};

export const getAllStoredRecipes = (): RecipeEntities => {
  let recipes: RecipeEntities = {};

  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      let recipeName = localStorage.key(i);
      let recipe: Recipe = JSON.parse(localStorage.getItem(recipeName));
      recipes = Object.assign(recipes, {
        [recipeName]: recipe
      });
    }
  } else {
    storeRecipe(sampleRecipe);
    recipes = Object.assign(recipes, {
      [sampleRecipe.name]: sampleRecipe
    });
  }

  return recipes;
};

export const getAllStoredRecipeNames = (): string[] => {
  let recipeNames: string[] = [];

  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      recipeNames.push(localStorage.key(i));
    }
  } else {
    storeRecipe(sampleRecipe);
    recipeNames = [sampleRecipe.name];
  }

  return recipeNames;
};

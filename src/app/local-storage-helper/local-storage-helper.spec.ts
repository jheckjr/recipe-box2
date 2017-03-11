import { testRecipes } from '../recipe-list/test/test-recipes';
import { Recipe } from '../models';
import { RecipeEntities } from '../reducers/recipe-reducer';
import { getAllStoredRecipes, getAllStoredRecipeNames } from './local-storage-helper';

describe('Local Storage:', () => {
  beforeEach(() => {
    localStorage.clear();
    testRecipes.forEach((recipe: Recipe) => {
      localStorage.setItem(recipe.name, JSON.stringify(recipe));
    });
  });

  it('should get all stored recipes', () => {
    let recipes: RecipeEntities = getAllStoredRecipes();

    testRecipes.forEach((recipe: Recipe) => {
      expect(recipes[recipe.name]).toEqual(recipe);
    });
  });

  it('should get no recipes when none stored', () => {
    localStorage.clear();
    let recipes: RecipeEntities = getAllStoredRecipes();

    expect(recipes).toEqual({});
  });

  it('should get all stored recipe names', () => {
    let recipeNames: string[] = getAllStoredRecipeNames();

    expect(recipeNames.length).toEqual(testRecipes.length);
    testRecipes.forEach((recipe: Recipe) => {
      expect(recipeNames).toContain(recipe.name);
    });
  });

  it('should get no recipe name when none stored', () => {
    localStorage.clear();
    let recipeNames: string[] = getAllStoredRecipeNames();

    expect(recipeNames.length).toEqual(0);
  });
});

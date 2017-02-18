import { Action } from 'redux';
import { Recipe } from '../models';
import { UserControl, ADD_RECIPE, AddRecipeAction,
  SELECT_RECIPE, SelectRecipeAction,
  EDIT_RECIPE, EditRecipeAction,
  DELETE_RECIPE, DeleteRecipeAction,
  UPDATE_USER_CONTROL, UpdateUserControlAction } from '../actions';
import * as LSHelper from '../local-storage-helper/local-storage-helper';

/********** Application state interfaces **********/
export interface RecipeEntities {
  [name: string]: Recipe;
};

export interface RecipeState {
  names: string[];
  recipes: RecipeEntities;
  currentRecipe?: string;
  userControl: UserControl;
};

const initialState: RecipeState = {
  names: LSHelper.getAllStoredRecipeNames(),
  currentRecipe: null,
  recipes: LSHelper.getAllStoredRecipes(),
  userControl: UserControl.View
};

/********** Reducer functions **********/
export const RecipeReducer =
  function(state: RecipeState = initialState, action: Action): RecipeState {
    switch (action.type) {
      case ADD_RECIPE: {
        const recipe = (<AddRecipeAction>action).recipe;

        // Don't add a recipe with a non-unique name
        if (!recipe || state.names.indexOf(recipe.name) !== -1) {
          return state;
        }

        // Add to Local Storage
        LSHelper.storeRecipe(recipe);

        return {
          names: [...state.names, recipe.name],
          currentRecipe: null,
          recipes: Object.assign({}, state.recipes, {
            [recipe.name]: recipe
          }),
          userControl: UserControl.View
        };
      }

      case SELECT_RECIPE: {
        let recipeName = (<SelectRecipeAction>action).recipeName;

        if (state.names.indexOf(recipeName) === -1) {
          return state;
        }
        if (state.currentRecipe === recipeName) {
          recipeName = null;
        }

        return {
          names: state.names,
          currentRecipe: recipeName,
          recipes: state.recipes,
          userControl: UserControl.View
        };
      }

      case EDIT_RECIPE: {
        const recipe = (<EditRecipeAction>action).recipe;
        let names = state.names;
        let otherRecipes = Object.assign({}, state.recipes);

        // Delete recipe if name has changed
        if (recipe.name !== state.currentRecipe) {
          let idx = names.indexOf(state.currentRecipe);
          names = [...names.slice(0, idx), ...names.slice(idx + 1), recipe.name];
          delete otherRecipes[state.currentRecipe];
          LSHelper.deleteStoredRecipe(state.currentRecipe);
        }

        LSHelper.storeRecipe(recipe);

        return {
          names: names,
          currentRecipe: null,
          recipes: Object.assign(otherRecipes, {
            [recipe.name]: recipe
          }),
          userControl: UserControl.View
        };
      }

      case DELETE_RECIPE: {
        const recipe = (<DeleteRecipeAction>action).recipe;
        let recipeIdx = state.names.indexOf(recipe.name);

        if (recipeIdx === -1) {
          return state;
        }

        let otherRecipes = Object.assign({}, state.recipes);
        delete otherRecipes[recipe.name];
        LSHelper.deleteStoredRecipe(recipe.name);

        return {
          names: [...state.names.slice(0, recipeIdx),
            ...state.names.slice(recipeIdx + 1)],
          currentRecipe: null,
          recipes: otherRecipes,
          userControl: state.userControl
        };
      }

      case UPDATE_USER_CONTROL: {
        const userControl = (<UpdateUserControlAction>action).userControl;
        let currentRecipe = state.currentRecipe;

        if (userControl === UserControl.Add) {
          currentRecipe = null;
        }

        return {
          names: state.names,
          currentRecipe: currentRecipe,
          recipes: state.recipes,
          userControl: userControl
        };
      }

      default:
        return state;
    }
  };

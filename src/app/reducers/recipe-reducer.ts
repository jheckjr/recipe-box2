import { Action } from 'redux';
import { Recipe } from '../models';
import { UserControl, ADD_RECIPE, AddRecipeAction,
  SELECT_RECIPE, SelectRecipeAction } from '../actions';

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
  names: [],
  currentRecipe: null,
  recipes: null,
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

      default:
        return state;
    }
  };

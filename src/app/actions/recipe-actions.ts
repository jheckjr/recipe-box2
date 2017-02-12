import { Action, ActionCreator } from 'redux';
import { Recipe } from '../models';

/********** Add Recipe Action **********/
export const ADD_RECIPE = '[Recipe] Add';
export interface AddRecipeAction extends Action {
  recipe: Recipe;
};
export const addRecipe: ActionCreator<AddRecipeAction> = (recipe) => ({
  type: ADD_RECIPE,
  recipe: recipe
});

/********** Select Recipe Action **********/
export const SELECT_RECIPE = '[Recipe] Select';
export interface SelectRecipeAction extends Action {
  recipeName: string;
};
export const selectRecipe: ActionCreator<SelectRecipeAction> = (recipeName) => ({
  type: SELECT_RECIPE,
  recipeName: recipeName
});

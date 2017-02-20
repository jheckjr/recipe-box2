import { Action, ActionCreator } from 'redux';
import { Recipe } from '../models';
import { UserControl } from './user-control';

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

/********** Edit Recipe Action **********/
export const EDIT_RECIPE = '[Recipe] Edit';
export interface EditRecipeAction extends Action {
  recipe: Recipe;
};
export const editRecipe: ActionCreator<EditRecipeAction> = (recipe) => ({
  type: EDIT_RECIPE,
  recipe: recipe
});

/********** Delete Recipe Action **********/
export const DELETE_RECIPE = '[Recipe] Delete';
export interface DeleteRecipeAction extends Action {
  recipe: Recipe;
};
export const deleteRecipe: ActionCreator<DeleteRecipeAction> = (recipe) => ({
  type: DELETE_RECIPE,
  recipe: recipe
});

/********** Update User Control Action **********/
export const UPDATE_USER_CONTROL = 'Update User Control';
export interface UpdateUserControlAction extends Action {
  userControl: UserControl;
};
export const updateUserControl: ActionCreator<UpdateUserControlAction> =
  (userControl) => ({
    type: UPDATE_USER_CONTROL,
    userControl: userControl
  });

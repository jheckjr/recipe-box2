import { UserControl,
  addRecipe,
  selectRecipe,
  editRecipe,
  deleteRecipe,
  updateUserControl } from '../actions';
import { Recipe } from '../models';
import { RecipeReducer, RecipeState } from './recipe-reducer';

describe('Recipe Reducers:', () => {
  const initialState: RecipeState = {
    names: [],
    currentRecipe: null,
    recipes: {},
    userControl: UserControl.View
  };
  let recipe: Recipe = {
    name: 'Oatmeal',
    ingredients: [
      '1 pkt. oatmeal',
      '2/3 cup milk'
    ]
  };

  it('should handle initial state', () => {
    expect(RecipeReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_RECIPE', () => {
    let state = RecipeReducer(initialState, addRecipe(recipe));
    expect(state.names).toContain(recipe.name);
    expect(state.currentRecipe).toBeNull();
    expect(state.recipes[recipe.name]).toEqual(recipe);
    expect(state.userControl).toEqual(UserControl.View);
  });

  it('should handle ADD_RECIPE with null recipe', () => {
    let nullRecipe = null;
    let state = RecipeReducer(initialState, addRecipe(nullRecipe));
    expect(state).toEqual(initialState);
  });

  it('should handle ADD_RECIPE with non-unique recipe name', () => {
    let state = RecipeReducer(initialState, addRecipe(recipe));
    let newState = RecipeReducer(state, addRecipe(recipe));
    expect(newState).toEqual(state);
  });

  it('should handle SELECT_RECIPE', () => {
    let state = RecipeReducer(initialState, addRecipe(recipe));
    expect(state.currentRecipe).toBeNull();

    state = RecipeReducer(state, selectRecipe(recipe.name));
    expect(state.currentRecipe).toEqual(recipe.name);
  });

  it('should handle SELECT_RECIPE when recipe doesn\'t exist', () => {
    let state = RecipeReducer(initialState, selectRecipe(recipe.name));
    expect(state.currentRecipe).toBeNull();
  });

  it('should handle SELECT_RECIPE when recipe already selected', () => {
    let state = RecipeReducer(initialState, addRecipe(recipe));
    state = RecipeReducer(state, selectRecipe(recipe.name));
    expect(state.currentRecipe).toEqual(recipe.name);
    state = RecipeReducer(state, selectRecipe(recipe.name));
    expect(state.currentRecipe).toBeNull();
  });

  it('should handle EDIT_RECIPE', () => {
    let editedRecipe: Recipe = {
      name: recipe.name,
      ingredients: [
        '1 pkt. oatmeal',
        '2/3 cup water'
      ]
    };
    let state = RecipeReducer(initialState, addRecipe(recipe));
    state = RecipeReducer(state, editRecipe(editedRecipe));

    expect(state.names).toContain(recipe.name);
    expect(state.currentRecipe).toBeNull();
    expect(state.recipes[editedRecipe.name]).toEqual(editedRecipe);
    expect(state.userControl).toEqual(UserControl.View);
  });

  it('should handle EDIT_RECIPE when the name changes', () => {
    let editedRecipe: Recipe = {
      name: 'Cereal',
      ingredients: [
        '1 bowl cereal',
        '1 cup milk'
      ]
    };
    let state = RecipeReducer(initialState, addRecipe(recipe));
    state = RecipeReducer(state, selectRecipe(recipe.name));
    state = RecipeReducer(state, editRecipe(editedRecipe));

    expect(state.names).toContain(editedRecipe.name);
    expect(state.names).not.toContain(recipe.name);
    expect(state.currentRecipe).toBeNull();
    expect(state.recipes[editedRecipe.name]).toEqual(editedRecipe);
    expect(state.recipes[recipe.name]).not.toBeDefined();
    expect(state.userControl).toEqual(UserControl.View);
  });

  it('should handle DELETE_RECIPE', () => {
    let state = RecipeReducer(initialState, addRecipe(recipe));
    state = RecipeReducer(state, deleteRecipe(recipe));

    expect(state).toEqual(initialState);
  });

  it('should handle DELETE_RECIPE when recipe doesn\'t exist', () => {
    let secondRecipe: Recipe = {
      name: 'Cereal',
      ingredients: [
        '1 bowl cereal',
        '1 cup milk'
      ]
    };
    let state = RecipeReducer(initialState, addRecipe(recipe));
    let secondState = RecipeReducer(state, deleteRecipe(secondRecipe));

    expect(secondState).toEqual(state);
  });

  it('should handle UPDATE_USER_CONTROL for Add', () => {
    let state = RecipeReducer(initialState, addRecipe(recipe));
    state = RecipeReducer(state, selectRecipe(recipe.name));
    state = RecipeReducer(state, updateUserControl(UserControl.Add));

    expect(state.userControl).toEqual(UserControl.Add);
    expect(state.currentRecipe).toBeNull();
  });

  it('should handle UPDATE_USER_CONTROL for View', () => {
    let state = RecipeReducer(initialState, addRecipe(recipe));
    state = RecipeReducer(state, selectRecipe(recipe.name));
    state = RecipeReducer(state, updateUserControl(UserControl.View));

    expect(state.userControl).toEqual(UserControl.View);
    expect(state.currentRecipe).toEqual(recipe.name);
  });

  it('should handle UPDATE_USER_CONTROL for Edit', () => {
    let state = RecipeReducer(initialState, addRecipe(recipe));
    state = RecipeReducer(state, selectRecipe(recipe.name));
    state = RecipeReducer(state, updateUserControl(UserControl.Edit));

    expect(state.userControl).toEqual(UserControl.Edit);
    expect(state.currentRecipe).toEqual(recipe.name);
  });
});

import { UserControl, addRecipe, selectRecipe } from '../actions';
import { Recipe } from '../models';
import { RecipeReducer, RecipeState } from './recipe-reducer';

fdescribe('Recipe Reducers:', () => {
  const initialState: RecipeState = {
    names: [],
    currentRecipe: null,
    recipes: null,
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
});

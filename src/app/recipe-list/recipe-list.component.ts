import { Component, Inject, OnInit } from '@angular/core';

import { AppStore } from '../app-store';
import { UserControl,
  addRecipe,
  deleteRecipe,
  selectRecipe,
  editRecipe,
  updateUserControl } from '../actions';
import { RecipeState, getAllRecipes } from '../reducers/recipe-reducer';

import { RecipeItemComponent } from '../recipe-item/recipe-item.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { Recipe, RecipeItemEventType, RecipeItemEvent } from '../models';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  currentRecipe: string;
  userEditing: boolean;
  addRecipe: boolean;

  constructor( @Inject(AppStore) private store) {
    store.subscribe(() => this.updateState());
    this.updateState();
  }

  ngOnInit() {

  }

  updateState() {
    let state = this.store.getState();
    this.recipes = getAllRecipes(state);
    this.currentRecipe = state.currentRecipe;
    this.userEditing = (state.userControl === UserControl.Edit);
    this.addRecipe = (state.userControl === UserControl.Add);
  }

  handleRecipeEvent(event: RecipeItemEvent) {
    switch (event.eventType) {
      case RecipeItemEventType.Edit:
        this.store.dispatch(updateUserControl(UserControl.Edit));
        break;
      case RecipeItemEventType.Cancel:
        this.store.dispatch(updateUserControl(UserControl.View));
        break;
      case RecipeItemEventType.Delete:
        this.store.dispatch(deleteRecipe(event.recipe));
        break;
      case RecipeItemEventType.Save:
        if (this.userEditing) {
          this.store.dispatch(editRecipe(event.recipe));
        } else if (this.addRecipe) {
          this.store.dispatch(addRecipe(event.recipe));
        }
        break;
      default:
        break;
    }
  }

  // Show/hide a recipe
  handleRecipeToggle(recipeName: string) {
    if (this.currentRecipe === recipeName) {
      this.store.dispatch(selectRecipe(null));
    } else {
      this.store.dispatch(selectRecipe(recipeName));
    }
    this.addRecipe = false;
  }

  // Add button clicked
  handleAddRecipe() {
    this.store.dispatch(updateUserControl(UserControl.Add));
  }
}

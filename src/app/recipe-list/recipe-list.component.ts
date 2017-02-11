import { Component, OnInit } from '@angular/core';

import { RecipeItemComponent } from '../recipe-item/recipe-item.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { Recipe, RecipeItemEventType } from '../models';
import { testRecipes } from './test/test-recipes';

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

  constructor() {
    this.recipes = testRecipes;
    this.currentRecipe = this.recipes[0].name;
    this.userEditing = false;
    this.addRecipe = false;
  }

  ngOnInit() {
  }

  handleRecipeEvent(event: any) {
    switch (event.eventType) {
      case RecipeItemEventType.Edit:
        this.userEditing = true;
        break;
      case RecipeItemEventType.Cancel:
        this.userEditing = false;
        break;
      case RecipeItemEventType.Delete:
        if (this.currentRecipe === event.recipe.name) {
          let recipeIdx = this.recipes.indexOf(event.recipe);
          this.recipes = [...this.recipes.slice(0, recipeIdx),
            ...this.recipes.slice(recipeIdx + 1)];
          this.currentRecipe = null;
        }
        break;
      case RecipeItemEventType.Save:
        this.recipes.push(event.recipe);
        this.currentRecipe = event.recipe.name;
        break;
      default:
        break;
    }
  }

  handleRecipeToggle(recipeName: string) {
    if (this.currentRecipe === recipeName) {
      this.currentRecipe = null;
    } else {
      this.currentRecipe = recipeName;
    }
    this.addRecipe = false;
  }

  handleAddRecipe() {
    this.addRecipe = true;
    this.currentRecipe = null;
    this.userEditing = false;
  }
}

import { Component, OnInit } from '@angular/core';

import { RecipeItemComponent } from '../recipe-item/recipe-item.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { Recipe } from '../models';
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

  constructor() {
    this.recipes = testRecipes;
    this.currentRecipe = this.recipes[0].name;
    this.userEditing = false;
  }

  ngOnInit() {
  }

  handleRecipeEvent(event: any) {

  }

  handleRecipeToggle(recipeName: string) {
    if (this.currentRecipe === recipeName) {
      this.currentRecipe = null;
    } else {
      this.currentRecipe = recipeName;
    }
  }
}

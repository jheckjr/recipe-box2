import { Component, OnInit } from '@angular/core';

import { RecipeItemComponent } from '../recipe-item/recipe-item.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { Recipe } from '../models';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor() {
  }

  ngOnInit() {
  }

  handleRecipeEvent(event: any) {

  }

  handleRecipeToggle(event: any) {

  }
}

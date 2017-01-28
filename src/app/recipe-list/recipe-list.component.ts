import { Component, OnInit } from '@angular/core';
import { RecipeItemComponent } from '../recipe-item/recipe-item.component';

import { Recipe } from '../models';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipe: Recipe;

  constructor() {
    this.recipe = {
      name: 'Oatmeal',
      ingredients: [
        '1 pkt. oatmeal',
        '2/3 cup milk'
      ]
    };
  }

  ngOnInit() {
  }

  handleRecipeItemEvent(event: any) {

  }
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Recipe, RecipeItemEvent, RecipeItemEventType } from '../models';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() selected: boolean;
  @Input() userEdit: boolean;
  @Output() buttonClicked: EventEmitter<RecipeItemEvent>;

  constructor() {
    this.buttonClicked = new EventEmitter<RecipeItemEvent>();
  }

  ngOnInit() { }

  editClicked(event: any) {
    let recipeItemEvent: RecipeItemEvent = {
      eventType: RecipeItemEventType.Edit,
      recipe: null
    };
    this.buttonClicked.emit(recipeItemEvent);
    event.preventDefault();
  }

  deleteClicked(event: any) {
    let recipeItemEvent: RecipeItemEvent = {
      eventType: RecipeItemEventType.Delete,
      recipe: this.recipe
    };
    this.buttonClicked.emit(recipeItemEvent);
    event.preventDefault();
  }
}

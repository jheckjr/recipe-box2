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
  @Output() toggleSelected: EventEmitter<string>;

  constructor() {
    this.buttonClicked = new EventEmitter<RecipeItemEvent>();
    this.toggleSelected = new EventEmitter<string>();
  }

  ngOnInit() { }

  editClicked(event: any) {
    let editEvent: RecipeItemEvent = {
      eventType: RecipeItemEventType.Edit,
      recipe: null
    };
    this.buttonClicked.emit(editEvent);
    event.preventDefault();
  }

  deleteClicked(event: any) {
    let deleteEvent: RecipeItemEvent = {
      eventType: RecipeItemEventType.Delete,
      recipe: this.recipe
    };
    this.buttonClicked.emit(deleteEvent);
    event.preventDefault();
  }

  toggleClicked(event: any) {
    this.toggleSelected.emit(this.recipe.name);
    event.preventDefault();
  }
}

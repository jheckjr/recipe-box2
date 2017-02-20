import { Component, Inject } from '@angular/core';

import { AppStore } from './app-store';
import { addRecipe } from './actions';
import { RecipeState } from './reducers/recipe-reducer';
import { Recipe } from './models';

import { RecipeListComponent } from './recipe-list/recipe-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Recipe Box';
  subtitle = 'A place to store all your favorite recipes!';

  constructor( @Inject(AppStore) private store) {
    // Initialize state
    store.dispatch(addRecipe(null));
  }
}

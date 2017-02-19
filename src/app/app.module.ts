import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  createStore,
  Store,
  compose,
  StoreEnhancer
} from 'redux';

import { AppStore } from './app-store';
import { RecipeState, RecipeReducer } from './reducers/recipe-reducer';

import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

// Add DevTools Integration
let devtools: StoreEnhancer<RecipeState> =
  window['devToolsExtension'] ? window['devToolsExtension']() : f => f;

let store: Store<RecipeState> = createStore<RecipeState>(RecipeReducer,
  compose(devtools));

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [{ provide: AppStore, useFactory: () => store }],
  bootstrap: [AppComponent]
})
export class AppModule { }

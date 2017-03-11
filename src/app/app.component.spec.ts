/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { createStore } from 'redux';

import { AppStore } from './app-store';
import { RecipeState, RecipeReducer } from './reducers/recipe-reducer';

import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  let store = createStore<RecipeState>(RecipeReducer);
  function storeFactory() {
    return store;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeEditComponent
      ],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder,
        { provide: AppStore, useFactory: storeFactory }
      ]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

    fixture.detectChanges();
  });

  it(`should create the app with title 'RecipeBox'`, () => {
    expect(app).toBeDefined();
    expect(app.title).toEqual('Recipe Box');
    expect(app.subtitle).toEqual('A place to store all your favorite recipes!');
  });

  it('should render title in a h1 tag', () => {
    let titleEl = fixture.debugElement.query(By.css('h1')).nativeElement;
    let subtitleEl = fixture.debugElement.query(By.css('div.box-subheader')).nativeElement;
    expect(titleEl.textContent).toContain('Recipe Box');
    expect(subtitleEl.textContent).toContain('A place to store all your favorite recipes!');
  });
});

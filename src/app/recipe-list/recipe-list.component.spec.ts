/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { RecipeListComponent } from './recipe-list.component';
import { RecipeItemComponent } from '../recipe-item/recipe-item.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';

import { testRecipes } from './test/test-recipes';

fdescribe('RecipeListComponent:', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipeListComponent,
        RecipeItemComponent,
        RecipeEditComponent
      ],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    component.recipes = testRecipes;
    fixture.detectChanges();
  });

  it('should contain a RecipeItemComponent', () => {
    expect(component).toBeTruthy();
    expect(component.recipes).toEqual(testRecipes);
  });

  it('should display a list of recipes', () => {
    let recipeList = fixture.debugElement.queryAll(By.css('app-recipe-item'));
    expect(recipeList.length).toEqual(testRecipes.length);
  });
});

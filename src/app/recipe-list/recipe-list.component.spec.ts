/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { createStore } from 'redux';

import { AppStore } from '../app-store';
import { RecipeState, RecipeReducer, getAllRecipes } from '../reducers/recipe-reducer';
import { addRecipe } from '../actions';

import { RecipeListComponent } from './recipe-list.component';
import { RecipeItemComponent } from '../recipe-item/recipe-item.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';

import { testRecipes } from './test/test-recipes';
import { Recipe, RecipeItemEvent, RecipeItemEventType } from '../models';

describe('RecipeListComponent:', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  let store = createStore<RecipeState>(RecipeReducer);
  function storeFactory() {
    return store;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipeListComponent,
        RecipeItemComponent,
        RecipeEditComponent
      ],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder,
        { provide: AppStore, useFactory: storeFactory }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    testRecipes.forEach((recipe: Recipe) => {
      store.dispatch(addRecipe(recipe));
    });
    component = fixture.componentInstance;
    component.recipes = getAllRecipes(store.getState());
    component.currentRecipe = component.recipes[0].name;
    component.userEditing = false;
    component.addRecipe = false;

    spyOn(component, 'handleRecipeToggle').and.callThrough();
    spyOn(component, 'handleRecipeEvent').and.callThrough();

    fixture.detectChanges();
  });

  it('should initialize the component', () => {
    expect(component).toBeTruthy();
    expect(component.recipes).toEqual(getAllRecipes(store.getState()));
    expect(component.currentRecipe).toEqual(component.recipes[0].name);
    expect(component.userEditing).toBeFalsy();
  });

  it('should display a list of RecipeItemComponents', () => {
    let recipeList = fixture.debugElement.queryAll(By.css('app-recipe-item'));
    expect(recipeList.length).toEqual(component.recipes.length);
    expect(fixture.debugElement.query(By.css('app-recipe-edit.add-recipe'))).toBeNull();
  });

  it('should have an add recipe button', () => {
    let addButton = fixture.debugElement.query(By.css('button.add-button'))
      .nativeElement;
    expect(addButton).toBeDefined();
  });

  it('should display an edit recipe component when the add button is clicked', () => {
    let addButton = fixture.debugElement.query(By.css('button.add-button'))
      .nativeElement;
    addButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    let editComponent = fixture.debugElement.query(By.css('app-recipe-edit.add-recipe'))
      .nativeElement;
    expect(component.currentRecipe).toBeNull();
    expect(component.userEditing).toBeFalsy();
    expect(editComponent).toBeDefined();
  });

  it('should toggle the selected recipe', () => {
    let itemComponent = fixture.debugElement.queryAll(By.css('app-recipe-item'))[0]
      .nativeElement;
    itemComponent.dispatchEvent(new Event('toggleSelected'));
    fixture.detectChanges();

    expect(component.handleRecipeToggle).toHaveBeenCalled();

    component.handleRecipeToggle(component.currentRecipe);
    fixture.detectChanges();

    expect(component.currentRecipe).toBeNull();

    component.handleRecipeToggle(component.recipes[0].name);
    fixture.detectChanges();

    expect(component.currentRecipe).toEqual(component.recipes[0].name);
  });

  it('should handle recipe events', () => {
    let itemComponent = fixture.debugElement.queryAll(By.css('app-recipe-item'))[0]
      .nativeElement;
    itemComponent.dispatchEvent(new Event('buttonClicked'));
    fixture.detectChanges();

    expect(component.handleRecipeEvent).toHaveBeenCalled();
  });

  it('should handle edit events', () => {
    let editEvent: RecipeItemEvent = {
      eventType: RecipeItemEventType.Edit,
      recipe: null
    };
    component.handleRecipeEvent(editEvent);
    fixture.detectChanges();

    expect(component.userEditing).toBeTruthy();
  });

  it('should handle cancel events', () => {
    let cancelEvent: RecipeItemEvent = {
      eventType: RecipeItemEventType.Cancel,
      recipe: null
    };
    component.handleRecipeEvent(cancelEvent);
    fixture.detectChanges();

    expect(component.userEditing).toBeFalsy();
  });

  it('should handle delete events', () => {
    let deleteEvent: RecipeItemEvent = {
      eventType: RecipeItemEventType.Delete,
      recipe: testRecipes[0]
    };
    let numRecipes = component.recipes.length;
    component.handleRecipeEvent(deleteEvent);
    fixture.detectChanges();

    expect(component.recipes.length).toEqual(numRecipes - 1);
    expect(component.recipes.indexOf(testRecipes[0])).toEqual(-1);
    expect(component.currentRecipe).toBeNull();
  });

  it('should handle save events', () => {
    component.addRecipe = true;
    fixture.detectChanges();
    let saveEvent: RecipeItemEvent = {
      eventType: RecipeItemEventType.Save,
      recipe: {
        name: 'Coffee',
        ingredients: ['1 cup water', '3 Tbs. ground coffee bean']
      }
    };
    let numRecipes = component.recipes.length;
    component.handleRecipeEvent(saveEvent);
    fixture.detectChanges();

    expect(component.recipes.length).toEqual(numRecipes + 1);
    expect(component.recipes[numRecipes].name).toEqual(saveEvent.recipe.name);
    expect(component.currentRecipe).toBeNull();
  });
});

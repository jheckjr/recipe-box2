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
    component.currentRecipe = testRecipes[0].name;
    component.userEditing = false;

    spyOn(component, 'handleRecipeToggle').and.callThrough();
    spyOn(component, 'handleRecipeEvent').and.callThrough();

    fixture.detectChanges();
  });

  it('should initialize the component', () => {
    expect(component).toBeTruthy();
    expect(component.recipes).toEqual(testRecipes);
    expect(component.currentRecipe).toEqual(testRecipes[0].name);
    expect(component.userEditing).toBeFalsy();
  });

  it('should display a list of RecipeItemComponents', () => {
    let recipeList = fixture.debugElement.queryAll(By.css('app-recipe-item'));
    expect(recipeList.length).toEqual(testRecipes.length);
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
    expect(component.currentRecipe).toEqual(saveEvent.recipe.name);
  });
  
  // Add editcomponent
});

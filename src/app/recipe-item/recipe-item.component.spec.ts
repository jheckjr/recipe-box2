/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { RecipeItemComponent } from './recipe-item.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { Recipe, RecipeItemEvent, RecipeItemEventType } from '../models';

describe('RecipeItemComponent:', () => {
  let component: RecipeItemComponent;
  let fixture: ComponentFixture<RecipeItemComponent>;
  let recipe: Recipe = {
    name: 'Oatmeal',
    ingredients: [
      '1 pkt. oatmeal',
      '2/3 cup milk'
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeItemComponent, RecipeEditComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeItemComponent);
    component = fixture.componentInstance;
    component.recipe = recipe;
    component.selected = false;
    component.userEdit = false;

    spyOn(component.buttonClicked, 'emit');
    spyOn(component.toggleSelected, 'emit');

    fixture.detectChanges();
  });

  it('should initialize the component', () => {
    expect(component).toBeTruthy();
    expect(component.recipe).toEqual(recipe);
    expect(component.selected).toBeFalsy();
    expect(component.userEdit).toBeFalsy();
  });

  it('should initialize the text', () => {
    let titleEl = fixture.debugElement.query(By.css('.title')).nativeElement;
    expect(titleEl.innerHTML).toContain(recipe.name);

    let ingredientEls = fixture.debugElement.queryAll(By.css('.item'));
    expect(ingredientEls.length).toEqual(2);
    expect(ingredientEls[0].nativeElement.innerHTML)
      .toContain(recipe.ingredients[0]);
    expect(ingredientEls[1].nativeElement.innerHTML)
      .toContain(recipe.ingredients[1]);
  });

  it('should show non-editable content if userEdit false', () => {
    let contentEl = fixture.debugElement.query(By.css('.content')).nativeElement;
    expect(contentEl).not.toBeNull();
    expect(fixture.debugElement.query(By.css('app-recipe-edit'))).toBeNull();
  });

  it('should show editable content if userEdit true', () => {
    component.userEdit = true;
    fixture.detectChanges();
    let contentEl = fixture.debugElement.query(By.css('.content'));
    expect(contentEl).toBeNull();
    expect(fixture.debugElement.query(By.css('app-recipe-edit'))).not.toBeNull();
  });

  it('should emit a delete event when the delete button is clicked', () => {
    let deleteEvent: RecipeItemEvent = {
      eventType: RecipeItemEventType.Delete,
      recipe: recipe
    };
    let deleteButton = fixture.debugElement.query(By.css('button.delete')).nativeElement;
    deleteButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.buttonClicked.emit).toHaveBeenCalledWith(deleteEvent);
  });

  it('should emit an edit event when the edit button is clicked', () => {
    let editEvent: RecipeItemEvent = {
      eventType: RecipeItemEventType.Edit,
      recipe: null
    };
    let editButton = fixture.debugElement.query(By.css('button.edit')).nativeElement;
    editButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.buttonClicked.emit).toHaveBeenCalledWith(editEvent);
  });

  it('should emit a toggle event when the title is clicked', () => {
    let titleEl = fixture.debugElement.query(By.css('.title')).nativeElement;
    titleEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.toggleSelected.emit).toHaveBeenCalledWith(recipe.name);
  });

  it('should emit a save event after receiving a save event from edit', () => {
    component.userEdit = true;
    fixture.detectChanges();
    let editComponent = fixture.debugElement.query(By.css('app-recipe-edit'))
      .nativeElement;
    editComponent.dispatchEvent(new Event('buttonClicked'));
    fixture.detectChanges();

    expect(component.buttonClicked.emit).toHaveBeenCalled();
  });

  it('should save an edited recipe', () => {
    let saveEvent: RecipeItemEvent = {
      eventType: RecipeItemEventType.Save,
      recipe: {
        name: 'Cereal',
        ingredients: ['cereal', 'milk']
      }
    };
    component.handleRecipeEdit(saveEvent);
    fixture.detectChanges();

    expect(component.buttonClicked.emit).toHaveBeenCalledWith(saveEvent);
    expect(component.recipe).toEqual(saveEvent.recipe);
  });

  it('should not save an edited recipe if the edit was cancelled', () => {
    let initialRecipe = component.recipe;
    let cancelEvent: RecipeItemEvent = {
      eventType: RecipeItemEventType.Cancel,
      recipe: null
    };
    component.handleRecipeEdit(cancelEvent);
    fixture.detectChanges();

    expect(component.buttonClicked.emit).toHaveBeenCalledWith(cancelEvent);
    expect(component.recipe).toEqual(initialRecipe);
  });
});

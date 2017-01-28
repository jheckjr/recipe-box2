/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecipeItemComponent } from './recipe-item.component';
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
      declarations: [RecipeItemComponent]
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
    expect(contentEl).toBeDefined();
  });

  it('should show editable content if userEdit true', () => {
    component.userEdit = true;
    fixture.detectChanges();
    let contentEl = fixture.debugElement.query(By.css('.content'));
    expect(contentEl).toBeNull();
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
});

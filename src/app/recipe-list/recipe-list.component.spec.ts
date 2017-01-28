/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecipeListComponent } from './recipe-list.component';
import { RecipeItemComponent } from '../recipe-item/recipe-item.component';

describe('RecipeListComponent:', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeListComponent, RecipeItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should contain a RecipeItemComponent', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-recipe-item')).toBeDefined();
  });
});

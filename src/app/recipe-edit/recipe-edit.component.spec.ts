/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule } from '@angular/forms';

import { RecipeEditComponent } from './recipe-edit.component';
import { Recipe } from '../models';

fdescribe('RecipeEditComponent:', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;
  let recipe: Recipe = {
    name: 'Oatmeal',
    ingredients: [
      '1 pkt. oatmeal',
      '2/3 cup milk'
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeEditComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    component.recipe = recipe;
    fixture.detectChanges();
  });

  it('should initialize the component', () => {
    expect(component).toBeTruthy();
    expect(component.recipe).toEqual(recipe);

    let formGroup = component.formGroup;
    expect(formGroup).toBeDefined();
    expect(formGroup.controls['name']).toBeDefined();
    expect(formGroup.controls['ingredients']).toBeDefined();
  });

  it('should initialize and validate the form with the recipe contents', () => {
    let formGroup = component.formGroup;
    expect(formGroup.controls['name'].value).toContain(recipe.name);
    expect((<FormArray>formGroup.controls['ingredients']).controls[0].value)
      .toContain(recipe.ingredients[0]);
    expect((<FormArray>formGroup.controls['ingredients']).controls[1].value)
      .toContain(recipe.ingredients[1]);

    expect(formGroup.controls['name'].valid).toBeTruthy();
    expect((<FormArray>formGroup.controls['ingredients']).controls[0].valid)
      .toBeTruthy();
    expect((<FormArray>formGroup.controls['ingredients']).controls[1].valid)
      .toBeTruthy();
  });

});

fdescribe('RecipeEditComponent: null recipe input', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeEditComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    component.recipe = null;
    fixture.detectChanges();
  });

  it('should initialize the form with empty values if no recipe given', () => {
    let formGroup = component.formGroup;
    expect(formGroup.controls['name'].value).toEqual('');
    expect((<FormArray>formGroup.controls['ingredients']).controls[0].value)
      .toEqual('');

    expect(formGroup.controls['name'].invalid).toBeTruthy();
    expect((<FormArray>formGroup.controls['ingredients']).controls[0].invalid)
      .toBeTruthy();
  });
});

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
import { Recipe, RecipeItemEvent, RecipeItemEventType } from '../models';

describe('RecipeEditComponent:', () => {
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

    spyOn(component.buttonClicked, 'emit');

    fixture.detectChanges();
  });

  it('should initialize the component', () => {
    expect(component).toBeTruthy();
    expect(component.recipe).toEqual(recipe);

    let formGroup = component.formGroup;
    expect(formGroup).toBeDefined();
    expect(formGroup.controls['name']).toBeDefined();
    expect(formGroup.controls['ingredients']).toBeDefined();

    let numInputs = fixture.debugElement.queryAll(By.css('input')).length;
    expect(numInputs).toEqual(3);
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

  it('should emit a save event when the save button is clicked', () => {
    let saveEvent: RecipeItemEvent = {
      eventType: RecipeItemEventType.Save,
      recipe: recipe
    };
    let saveButton = fixture.debugElement.query(By.css('button.save')).nativeElement;
    saveButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.buttonClicked.emit).toHaveBeenCalledWith(saveEvent);
  });

  it('should emit a cancel event when the cancel button is clicked', () => {
    let cancelEvent: RecipeItemEvent = {
      eventType: RecipeItemEventType.Cancel,
      recipe: null
    };
    let cancelButton = fixture.debugElement.query(By.css('button.cancel')).nativeElement;
    cancelButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.buttonClicked.emit).toHaveBeenCalledWith(cancelEvent);
  });

  it('should add an ingredient', () => {
    let ingredientArray = <FormArray>component.formGroup.controls['ingredients'];
    let numIngredients = ingredientArray.length;
    let addIngredient = fixture.debugElement.query(By.css('a.add')).nativeElement;
    addIngredient.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(ingredientArray.length).toEqual(numIngredients + 1);
    expect(ingredientArray.controls[ingredientArray.length - 1].value)
      .toEqual('');
  });

  it('should remove an ingredient', () => {
    let ingredientArray = <FormArray>component.formGroup.controls['ingredients'];
    let numIngredients = ingredientArray.length;
    let removeIngredient = fixture.debugElement.queryAll(By.css('i.remove'))[0]
      .nativeElement;
    removeIngredient.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(ingredientArray.length).toEqual(numIngredients - 1);
    expect(ingredientArray.controls[0].value)
      .toContain(recipe.ingredients[1]);
  });

  it('should not remove an ingredient if only one left', () => {
    let ingredientArray = <FormArray>component.formGroup.controls['ingredients'];
    let removeIngredient = fixture.debugElement.queryAll(By.css('i.remove'))[0]
      .nativeElement;
    removeIngredient.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    component.removeIngredient(0);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('i.remove')).length).toEqual(0);
    expect(ingredientArray.length).toEqual(1);
    expect(ingredientArray.controls[0].value)
      .toContain(recipe.ingredients[1]);
  });

  it('should not display error messages', () => {
    expect(fixture.debugElement.queryAll(By.css('small')).length).toEqual(0);
  });
});

describe('RecipeEditComponent null recipe input:', () => {
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

    spyOn(component.buttonClicked, 'emit');

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

  it('should disable the save button', () => {
    let saveButton = fixture.debugElement.query(By.css('button.save')).nativeElement;

    expect(saveButton.disabled).toBeTruthy();
  });

  it('should emit a cancel event when the cancel button is clicked', () => {
    let cancelEvent: RecipeItemEvent = {
      eventType: RecipeItemEventType.Cancel,
      recipe: null
    };
    let cancelButton = fixture.debugElement.query(By.css('button.cancel')).nativeElement;
    cancelButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.buttonClicked.emit).toHaveBeenCalledWith(cancelEvent);
  });

  it('should add an ingredient', () => {
    let ingredientArray = <FormArray>component.formGroup.controls['ingredients'];
    let numIngredients = ingredientArray.length;
    let addIngredient = fixture.debugElement.query(By.css('a.add')).nativeElement;
    addIngredient.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(ingredientArray.length).toEqual(numIngredients + 1);
    expect(ingredientArray.controls[ingredientArray.length - 1].value)
      .toEqual('');
  });

  it('should remove an ingredient', () => {
    component.addIngredient();
    fixture.detectChanges();

    let ingredientArray = <FormArray>component.formGroup.controls['ingredients'];
    let numIngredients = ingredientArray.length;
    let removeIngredient = fixture.debugElement.queryAll(By.css('i.remove'))[0]
      .nativeElement;
    removeIngredient.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(ingredientArray.length).toEqual(numIngredients - 1);
    expect(ingredientArray.controls[0].value)
      .toEqual('');
  });

  it('should not remove an ingredient if only one left', () => {
    let ingredientArray = <FormArray>component.formGroup.controls['ingredients'];

    expect(fixture.debugElement.queryAll(By.css('i.remove')).length).toEqual(0);
    expect(ingredientArray.length).toEqual(1);
    expect(ingredientArray.controls[0].value)
      .toEqual('');
  });

  it('should not display error messages before form has been touched', () => {
    expect(fixture.debugElement.queryAll(By.css('small')).length).toEqual(0);
  });

  it('should display error messages if form invalid and touched', () => {
    component.formGroup.controls['name'].markAsTouched();
    (<FormArray>component.formGroup.controls['ingredients']).controls[0]
      .markAsTouched();
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('small')).length).toEqual(2);
  });
});

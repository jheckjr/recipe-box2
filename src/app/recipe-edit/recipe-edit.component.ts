import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators } from '@angular/forms';

import { Recipe, RecipeItemEvent, RecipeItemEventType } from '../models';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() buttonClicked: EventEmitter<RecipeItemEvent>;
  formGroup: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.buttonClicked = new EventEmitter<RecipeItemEvent>();
  }

  ngOnInit() {
    let recipeName = '';
    if (this.recipe) {
      recipeName = this.recipe.name;
    }

    this.formGroup = this._fb.group({
      name: [recipeName, [Validators.required]],
      ingredients: this._fb.array(this.initIngredients())
    });
  }

  /* Add FormControl array of ingredients if recipe exists or an array with an
   * empty FormControl otherwise
   */
  initIngredients(): any[] {
    if (this.recipe) {
      return this.recipe.ingredients.map((ingredient) => {
        return this._fb.control(ingredient, Validators.required);
      });
    } else {
      return [this._fb.control('', Validators.required)];
    }
  }

  addIngredient() {
    const controlArray = <FormArray>this.formGroup.controls['ingredients'];
    controlArray.push(this._fb.control('', Validators.required));
  }

  removeIngredient(idx: number) {
    const controlArray = <FormArray>this.formGroup.controls['ingredients'];

    if (controlArray.length > 1) {
      controlArray.removeAt(idx);
    }
  }

  saveRecipe(form: any) {
    let newRecipe: Recipe = {
      name: form.controls['name'].value,
      ingredients: (<FormArray>form.controls['ingredients']).controls
        .map((formControl) => {
          return formControl.value;
        })
    };
    let saveEvent: RecipeItemEvent = {
      eventType: RecipeItemEventType.Save,
      recipe: newRecipe
    };

    this.recipe = null;
    this.ngOnInit();
    this.buttonClicked.emit(saveEvent);
  }

  cancelClicked(event: any) {
    let cancelEvent: RecipeItemEvent = {
      eventType: RecipeItemEventType.Cancel,
      recipe: null
    };
    this.recipe = null;
    this.ngOnInit();
    this.buttonClicked.emit(cancelEvent);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators } from '@angular/forms';

import { Recipe } from '../models';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  @Input() recipe: Recipe;

  formGroup: FormGroup;

  constructor(private _fb: FormBuilder) { }

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

}

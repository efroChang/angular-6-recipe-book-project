import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '../../../../node_modules/@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor( private route: ActivatedRoute,
               private recipeService: RecipeService,
               private router: Router ) {}

  ngOnInit() 
  {
    this.route.params
      .subscribe
      (
        ( params: Params ) => 
        {
          this.id = +params[ 'id' ];
          this.editMode = !Number.isNaN(this.id);   // If "Not a Number", it is a New Mode.

          // Init the Form
          this.initForm();
        }
      )
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);              // [KEY]: use FormAarry

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe( this.id );
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if ( recipe['ingredients'] ) {
        for ( let ingredient of recipe.ingredients ) {
          recipeIngredients.push( new FormGroup({           // [KEY]: Push FormGroup into FormArray
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)          // [KEY]: Use pattern to validate
            ])
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl( recipeName, Validators.required ),
      'imagePath': new FormControl( recipeImagePath, Validators.required ),
      'description': new FormControl( recipeDescription, Validators.required ),
      'ingredients': recipeIngredients
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(       // [KEY]: The way to access a FormArray
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient( index: number ) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt( index );
  }

  onCancelEdit() {
    this.naviateBackUpALevel();
  }

  onSubmit() {
    console.log(this.recipeForm);

    // const recipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );

    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, recipe);
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);    // [KEY]: Pass in the Form.value as Recipe object when the fields matches.
    } else {
      // this.recipeService.addRecipe(recipe);
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.naviateBackUpALevel();
  }

  public getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private naviateBackUpALevel() {
    this.router.navigate(
      ['../'],
      { relativeTo: this.route }
    );
  }
}

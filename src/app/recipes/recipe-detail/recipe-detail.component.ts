import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as ShoppingListActions from '../../shopping-list/ngrx/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  selectedRecipeDetail: Recipe;

  id: number;

  recipeName: string;
  recipeDesc: string;
  recipeImgPath: string;

  constructor( private recipeService: RecipeService,
               private router: Router, 
               private route: ActivatedRoute,
               private store: Store<{shoppingList: {ingredients: Array<Ingredient>}}> ) { }

  ngOnInit() 
  {
    this.route.params
      .subscribe
      (
        ( params: Params ) => 
        {
          this.id = +params['id'];      // [KEY]: "+" is to convert string to number.
          this.selectedRecipeDetail = this.recipeService.getRecipe( this.id );
        }
      );
  }

  onAddToShoppingList()
  {
    const ingredients: Ingredient[] = this.selectedRecipeDetail.ingredients;

    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  onEditRecipe()
  {
    this.router.navigate
    (
      [ 'edit' ],                     // No need "id" because we already have it on the path.
      { relativeTo: this.route }
    );
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe( this.id );

    this.router.navigate(
      ['/recipes']
    );
  }
}

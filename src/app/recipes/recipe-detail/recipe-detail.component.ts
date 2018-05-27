import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
               private route: ActivatedRoute ) { }

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

    this.recipeService.addIngredientsToShoppingList( ingredients );
  }

  onEditRecipe()
  {
    this.router.navigate
    (
      [ 'edit' ],                     // No need "id" because we already have it on the path.
      { relativeTo: this.route }
    );
  }
}

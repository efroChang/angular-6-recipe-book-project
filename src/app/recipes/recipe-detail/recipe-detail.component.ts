import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() selectedRecipeDetail: Recipe;

  recipeName: string;
  recipeDesc: string;
  recipeImgPath: string;

  constructor( private recipeService: RecipeService ) { }

  ngOnInit() {
  }

  onAddToShoppingList()
  {
    const ingredients: Ingredient[] = this.selectedRecipeDetail.ingredients;

    this.recipeService.addIngredientsToShoppingList( ingredients );
  }
}

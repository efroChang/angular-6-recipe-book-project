
import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "../../../node_modules/rxjs";

@Injectable()
export class RecipeService 
{
    recipeChanged = new Subject<Recipe[]>();    // [KEY]: To broadcast the newly changed Recipe array

    // Create Recipe Array
    private recipes: Recipe[] =
    [
        new Recipe(
            'Spaghetti with Meatballs', 
            'This is a test recipe 1', 
            'https://images-gmi-pmc.edge-generalmills.com/80fd8638-9b0d-4cba-ba99-9c4b75b4a20c.jpg',
            [
                new Ingredient( 'Noodles', 2 ),
                new Ingredient( 'Meatballs', 5 )
            ]
        ),
        new Recipe(
            'The Heart Pizza', 
            'This is a test recipe 2', 
            'https://img.sndimg.com/food/image/upload/w_706,h_398,c_fill,fl_progressive,q_80/v1/img/recipes/70/16/5/VpYCAyQQw2c3LFvutQsZ_Final%201%20-%20Heart%20Shaped%20Pizza.jpg',
            [
                new Ingredient( 'Bread', 5 ),
                new Ingredient( 'Cheese', 10 ),
                new Ingredient( 'Hame', 3 )
            ]
        )
    ];

    constructor( private shoppingListService: ShoppingListService ) {}

    // To get a COPY of the Recipe array
    getRecipes() 
    {
        return this.recipes.slice(); // [KEY]: Get a copy, not the refernce.
    }

    getRecipe( index: number )
    {
        return this.recipes[ index ];
    }

    addIngredientsToShoppingList( ingredients: Ingredient[] )
    {
        this.shoppingListService.addIngredients( ingredients );
    }

    addRecipe( recipe: Recipe ) {
        this.recipes.push( recipe );
        this.recipeChanged.next(this.recipes.slice());  // [KEY]: To broadcast the new version of the Recipe array.
    }

    updateRecipe( index: number, updatedRecipe: Recipe) {
        this.recipes[index] = updatedRecipe;
        this.recipeChanged.next(this.recipes.slice());  // [KEY]: To broadcast the new version of the Recipe array.
    }
}
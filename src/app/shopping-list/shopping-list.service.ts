import { Ingredient } from "../shared/ingredient.model";
import { Output, EventEmitter } from "@angular/core";

export class ShoppingListService
{
    @Output() ingredientChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = 
    [
      new Ingredient('Apple', 5),
      new Ingredient('Beef', 10)
    ];    

    getIngredients()
    {
        return this.ingredients.slice();
    }

    addIngredient( ingredient: Ingredient )
    {
        this.ingredients.push( ingredient );
        this.ingredientChanged.emit( this.ingredients.slice() );
    }

    addIngredients( ingredients: Ingredient[] )
    {
        // Awesome new way in ES6 to convert an array to a list of objects:
        this.ingredients.push( ...ingredients );    // [KEY]: "..." converts an array to a list
        this.ingredientChanged.emit( this.ingredients.slice() ); 

        // Too many Event broacasting...
        // for( let ingredient of ingredients )
        // {
        //     this.addIngredient( ingredient );
        // }
    }
}
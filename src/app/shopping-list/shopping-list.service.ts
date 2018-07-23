import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService
{
    ingredientChanged = new Subject<Ingredient[]>();

    startEditing = new Subject<number>();

    private ingredients: Ingredient[] = 
    [
      new Ingredient('Apple', 5),
      new Ingredient('Beef', 10)
    ];    

    getIngredients()
    {
        return this.ingredients.slice();
    }

    getIngredient( index: number ) {
        return this.ingredients[index];
    }

    addIngredient( ingredient: Ingredient )
    {
        this.ingredients.push( ingredient );
        this.ingredientChanged.next( this.ingredients.slice() );
    }

    updateIngredient( index: number, updatedIngredient: Ingredient ) {
        this.ingredients[index] = updatedIngredient;
        this.ingredientChanged.next( this.ingredients.slice() );
    }

    addIngredients( ingredients: Ingredient[] )
    {
        // Awesome new way in ES6 to convert an array to a list of objects:
        this.ingredients.push( ...ingredients );    // [KEY]: "..." converts an array to a list
        this.ingredientChanged.next( this.ingredients.slice() ); 

        // Too many Event broacasting...
        // for( let ingredient of ingredients )
        // {
        //     this.addIngredient( ingredient );
        // }
    }

    deleteIngredient( index: number ) {
        this.ingredients.splice( index, 1 );
        this.ingredientChanged.next( this.ingredients.slice() );
    }
}
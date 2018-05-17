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
}
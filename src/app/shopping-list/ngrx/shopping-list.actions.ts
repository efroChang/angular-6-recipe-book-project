import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

// --------------------------------------------------
// 1. Define Action Name
// --------------------------------------------------
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

// --------------------------------------------------
// 2. Define Action Class with Payload (data)
// --------------------------------------------------
export class AddIngredient implements Action {
    public type = ADD_INGREDIENT;

    constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
    public type = ADD_INGREDIENTS;

    constructor(public payload: Array<Ingredient>) {}
}

// --------------------------------------------------
// 3. Export Type
// --------------------------------------------------
// [KEY] Use the UNION "|" to append to the TYPE
export type ShoppingListActions = AddIngredient | AddIngredients;

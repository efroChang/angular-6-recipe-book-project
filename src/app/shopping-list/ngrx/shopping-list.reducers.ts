import * as ShoppingListActions from './shopping-list.actions';     // [KEY]: Import everything from the Actions file as an Object

import { Ingredient } from "../../shared/ingredient.model";

const initialState = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Beef', 10)
    ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {

    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,                       // [KEY]: "...state" is to copy all the props in "state" object
                ingredients: [                  // [KEY]: "ingredients" will overwrite "state.ingreidnets" prop values
                    ...state.ingredients,       // [KEY]: "...state.ingredients" is to copy all the "ingredients" array elements from "state"
                    (<ShoppingListActions.AddIngredient>action).payload         // [KEY]: To append the new Ingredient from the "payload" property
                ]
            };
        
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    ...(<ShoppingListActions.AddIngredients>action).payload     // [KEY]: Use "..." here because the Payload is an array.
                ]
            };
        
        case ShoppingListActions.UPDATE_INGREDIENT:
            const index: number = (<ShoppingListActions.UpdateIngredient>action).payload.index;
            const currentIngredient: Ingredient = state.ingredients[index];
            // [KEY]: The immutable way to copy all propertis from Action to create a new Ingredient:
            const updatedIngredient: Ingredient = {
                ...currentIngredient,
                ...(<ShoppingListActions.UpdateIngredient>action).payload.ingredient
            };
            const ingredients: Array<Ingredient> = [...state.ingredients];
            ingredients[index] = updatedIngredient;
            return {
                ...state,
                ingredients: ingredients
            };

        default:
            return state;
    }
}
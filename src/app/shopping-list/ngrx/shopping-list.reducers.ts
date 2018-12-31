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
                    action.payload              // [KEY]: To append the new Ingredient from the "payload" property
                ]
            }

        default:
            return state;
    }
}
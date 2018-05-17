import { Recipe } from "../recipe.model";
import { Output, EventEmitter } from "@angular/core";


export class RecipeService 
{
    @Output() recipeSelected = new EventEmitter<Recipe>();  // [KEY] Let the components to emit the event

    // Create Recipe Array
    recipes: Recipe[] =
    [
        new Recipe('Spegatte with Meatballs', 'This is a test recipe 1', 'https://images-gmi-pmc.edge-generalmills.com/80fd8638-9b0d-4cba-ba99-9c4b75b4a20c.jpg'),
        new Recipe('The Heart Pizza', 'This is a test recipe 2', 'https://img.sndimg.com/food/image/upload/w_706,h_398,c_fill,fl_progressive,q_80/v1/img/recipes/70/16/5/VpYCAyQQw2c3LFvutQsZ_Final%201%20-%20Heart%20Shaped%20Pizza.jpg')
    ];

    // To get a COPY of the Recipe array
    getRecipes() 
    {
        return this.recipes.slice(); // [KEY]: Get a copy, not the refernce.
    }
}
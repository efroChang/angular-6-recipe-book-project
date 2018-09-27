import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Observable } from "rxjs";
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class DataStorageService {

    constructor( private http: Http,
                 private recipeService: RecipeService) {
    }

    storeRecipes(): Observable<Response> {
        return this.http.put(
            'https://efro-ng-recipe-book.firebaseio.com/recipes.json',
            this.recipeService.getRecipes()
        );
    }

    fetchRecipes() {
        return this.http.get('https://efro-ng-recipe-book.firebaseio.com/recipes.json')
            .map((response: Response) => {
                let recipes: Array<Recipe> = response.json();
                recipes.forEach( recipe => {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                });
                return recipes;
            })
            .subscribe((recipes: Array<Recipe>) => {
                this.recipeService.setRecipes( recipes );
            });
    }
}
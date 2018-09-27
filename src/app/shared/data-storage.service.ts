import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Observable } from "rxjs";

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
            .subscribe((response: Response) => {
                let recipes = response.json();
                this.recipeService.setRecipes( recipes );
            });
    }
}
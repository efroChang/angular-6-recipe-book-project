import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {

    constructor( private http: Http,
                 private recipeService: RecipeService,
                 private authService: AuthService) {
    }

    storeRecipes(): Observable<Response> {
        const token: string = this.authService.getToken();

        return this.http.put(
            'https://efro-ng-recipe-book.firebaseio.com/recipes.json?auth=' + token,
            this.recipeService.getRecipes()
        );
    }

    fetchRecipes() {
        const token: string = this.authService.getToken();

        return this.http.get('https://efro-ng-recipe-book.firebaseio.com/recipes.json?auth=' + token)
            .subscribe((response: Response) => {
                let recipes = response.json();
                this.recipeService.setRecipes( recipes );
            });
    }
}
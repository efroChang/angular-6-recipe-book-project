import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  // Create Recipe Array
  recipes: Recipe[];

  constructor( private recipeService: RecipeService,
               private router: Router,                      // [KEY]: to navigate
               private route: ActivatedRoute ) {}           // [KEY]: to identify current route

  ngOnInit() 
  { 
    // [KEY]: To subscribe to the RecipeChanged event from RecipeService and update the local copy
    this.recipeService.recipeChanged.subscribe(
      (updatedRecipes: Recipe[]) => {
        this.recipes = updatedRecipes;
      }
    );

    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe()
  {
    this.router.navigate
    ( 
      ['new'], 
      { relativeTo: this.route } 
    );
  }
}

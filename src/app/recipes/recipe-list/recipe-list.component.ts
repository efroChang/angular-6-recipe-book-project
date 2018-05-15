import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  // Create Recipe Array
  recipes: Recipe[] = 
  [
    new Recipe( 'Test Recipe 1', 'This is a test recipe 1', 'https://images-gmi-pmc.edge-generalmills.com/80fd8638-9b0d-4cba-ba99-9c4b75b4a20c.jpg' ),
    new Recipe( 'Test Recipe 2', 'This is a test recipe 2', 'https://img.sndimg.com/food/image/upload/w_706,h_398,c_fill,fl_progressive,q_80/v1/img/recipes/70/16/5/VpYCAyQQw2c3LFvutQsZ_Final%201%20-%20Heart%20Shaped%20Pizza.jpg' )
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected( recipe: Recipe )
  {
    this.recipeWasSelected.emit(recipe); // To Broadcast to Recipes Component
  }

}

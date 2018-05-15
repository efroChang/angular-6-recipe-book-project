import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  displayRecipes: boolean = true;
  displayShoppingList: boolean = false;

  onFeatureSelected(selectedFeature: string)
  {
    if ( 'recipes' === selectedFeature )
    {
      this.displayRecipes = true;
      this.displayShoppingList = false;
    }
    else if ( 'shopping-list' === selectedFeature )
    {
      this.displayRecipes = false;
      this.displayShoppingList = true;
    }    
  }
}

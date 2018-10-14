import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  displayRecipes: boolean = true;
  displayShoppingList: boolean = false;

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCfTbbcS-jyuPlmOBxfabj450c6tbjOVtc",
      authDomain: "efro-ng-recipe-book.firebaseapp.com"
    });
  }

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

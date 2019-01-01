import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  shoppingListState: Observable<{ingredients: Array<Ingredient>}>;    // [KEY] The Observable returned from the Store

  constructor( private shoppingListService: ShoppingListService,
               private store: Store<{shoppingList: {ingredients: Array<Ingredient>}}>)  // [KEY] The Store<> data structure maps to AppModule and ShoppingListReducer
  {}

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');   // [KEY] Use "select()" to find the desired State
  }

  onEditItem( index: number ) {
    this.shoppingListService.startEditing.next( index );  // Broadcast
  }
}

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') shoppingListForm: NgForm;             // [KEY]: To access the Form 'f' from component

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor( private shoppingListService: ShoppingListService ) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startEditing.subscribe(
      ( index: number ) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);

        // Populate the Form with ingredient info
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onAddIngredient(form: NgForm)     // [KEY]: Receive the NgForm object
  {
    const formValue = form.value;   // [KEY]: Get the Form Value
    const ingredient = new Ingredient( formValue.name, formValue.amount );

    this.shoppingListService.addIngredient( ingredient );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

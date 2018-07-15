import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor( private shoppingListService: ShoppingListService ) { }

  ngOnInit() {
  }

  onAddIngredient(form: NgForm)     // [KEY]: Receive the NgForm object
  {
    const formValue = form.value;   // [KEY]: Get the Form Value
    const ingredient = new Ingredient( formValue.name, formValue.amount );

    this.shoppingListService.addIngredient( ingredient );
  }
}

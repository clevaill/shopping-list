import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  item = {
    name: '',
    quantity: ''
  };

  constructor(
    private shoppingService: ShoppingService,
    private _location: Location) { }

  ngOnInit(): void {
  }

  backClicked() {
    this._location.back();
  }

  saveItem(): void {
    const data = {
      name: this.item.name,
      quantity: this.item.quantity
    };

    this.shoppingService.createItem(data)
      .subscribe(
        error => {
          console.log(error);
        });
  }

  newItem(): void {
    this.item = {
      name: '',
      quantity: ''
    };
  }

}

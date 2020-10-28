import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ShoppingService } from '../../services/shopping.service';
import { Router } from '@angular/router';

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

  nameRequired = false;
  quantityRequired = false;

  constructor(
    private shoppingService: ShoppingService,
    private _location: Location,
    private router: Router) { }

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
    if (data.name === ''){
      this.nameRequired = true;
    } else {
      this.nameRequired = false;
    }
    if (data.quantity === '') {
      this.quantityRequired = true;
    } else {
      this.quantityRequired = false;
    }
    if(data.name !== '' && data.quantity !== '') {
      this.shoppingService.createItem(data)
      .subscribe(
        response => {
          this.router.navigate(['/item']);
        },
        error => {
          console.log(error);
        });
    }
  }
}

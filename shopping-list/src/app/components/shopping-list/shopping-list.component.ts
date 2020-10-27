import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  items: any;
  currentItem = null;
  currentIndex = -1;
  name = '';

  constructor(
    private shoppingService: ShoppingService,
    private router: Router,
    private _location: Location) { }

  ngOnInit(): void {
    this.retrieveItems();
  }

  backClicked() {
    this._location.back();
  }

  retrieveItems(): void {
    this.shoppingService.getAllItems()
      .subscribe(
        data => {
          this.items = data;
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveItems();
    this.currentItem = null;
    this.currentIndex = -1;
  }

  setActiveItem(item, index): void {
    this.currentItem = item;
    this.currentIndex = index;
    this.router.navigate([`/item/${this.currentItem._id}`]);
  }

  removeAllItems(): void {
    this.shoppingService.deleteAllItems()
      .subscribe(
        response => {
          this.refreshList();
          this.router.navigate(['/add']);
        },
        error => {
          console.log(error);
        });
  }

}

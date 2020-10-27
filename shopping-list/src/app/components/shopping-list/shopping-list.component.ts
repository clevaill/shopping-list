import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';
import { Router } from '@angular/router';

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
    private router: Router) { }

  ngOnInit(): void {
    this.retrieveItems();
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

import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shopping-details',
  templateUrl: './shopping-details.component.html',
  styleUrls: ['./shopping-details.component.scss']
})
export class ShoppingDetailsComponent implements OnInit {

  currentItem = null;
  message = '';

  constructor(
    private shoppingService: ShoppingService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getItem(this.route.snapshot.paramMap.get('id'));
  }

  getItem(id): void {
    this.shoppingService.getItem(id)
      .subscribe(
        data => {
          this.currentItem = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateItem(): void {
    this.shoppingService.updateItem(this.currentItem._id, this.currentItem)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The item was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteItem(): void {
    this.shoppingService.deleteItem(this.currentItem._id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/item']);
        },
        error => {
          console.log(error);
        });
  }

}

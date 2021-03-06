import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shopping-details',
  templateUrl: './shopping-details.component.html',
  styleUrls: ['./shopping-details.component.scss'],
})
export class ShoppingDetailsComponent implements OnInit {
  currentItem = null;
  message = '';
  nameRequired = false;
  quantityRequired = false;

  constructor(
    private shoppingService: ShoppingService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.getItem(this.route.snapshot.paramMap.get('id'));
  }

  backClicked() {
    this._location.back();
  }

  getItem(id): void {
    this.shoppingService.getItem(id).subscribe(
      (data) => {
        this.currentItem = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateItem(): void {
    const data = {
      name: this.currentItem.name,
      quantity: this.currentItem.quantity,
      note: this.currentItem.note,
      taked: this.currentItem.taked,
    };
    if (data.name === '') {
      this.nameRequired = true;
    } else {
      this.nameRequired = false;
    }
    if (data.quantity === null) {
      this.quantityRequired = true;
    } else {
      this.quantityRequired = false;
    }
    if (data.name !== '' && data.quantity !== null) {
      this.shoppingService.updateItem(this.currentItem._id, data).subscribe(
        (response) => {
          this.router.navigate(['/item']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteItem(): void {
    this.shoppingService.deleteItem(this.currentItem._id).subscribe(
      (response) => {
        this.router.navigate(['/item']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

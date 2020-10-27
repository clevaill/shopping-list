import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingDetailsComponent } from './components/shopping-details/shopping-details.component';
import { AddItemComponent } from './components/add-item/add-item.component';


const routes: Routes = [
  { path: '', redirectTo: 'item', pathMatch: 'full'},
  { path: 'item', component: ShoppingListComponent },
  { path: 'item/:id', component: ShoppingDetailsComponent },
  { path: 'add', component: AddItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

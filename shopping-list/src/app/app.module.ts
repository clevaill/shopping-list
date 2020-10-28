import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingDetailsComponent } from './components/shopping-details/shopping-details.component';
import { AddItemComponent } from './components/add-item/add-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingDetailsComponent,
    AddItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

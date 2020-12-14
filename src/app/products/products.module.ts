import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule } from '@angular/forms';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';



@NgModule({
  declarations: [AddProductComponent, ShoppingCardComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ProductsModule { }

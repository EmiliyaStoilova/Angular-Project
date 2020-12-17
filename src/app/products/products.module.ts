import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule } from '@angular/forms';
import { ShoppingCardComponent } from '../user/shopping-card/shopping-card.component';
import { ProductRoutingModule } from './product-routing.module';



@NgModule({
  declarations: [AddProductComponent, ShoppingCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule
  ]
})
export class ProductsModule { }

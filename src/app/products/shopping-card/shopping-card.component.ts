import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {

  orders = [];

  constructor(
    private productServise: ProductService,
    private user: AuthService
  ) { }

  ngOnInit(): void {
    this.loadOrders();
    console.log(this.orders)
  }

  loadOrders() {
    this.productServise.loadData().subscribe(productData => {
      this.user.getUser().then(res => res.subscribe(userData => {
        
        productData.forEach(product => {
          if(userData.orders.includes(product.id)) {
            this.orders.push(product)
          }
        })

      }))
    });
  }

}

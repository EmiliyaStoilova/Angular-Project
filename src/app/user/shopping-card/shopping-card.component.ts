import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/user/auth.service';
import { ProductService } from '../../products/product.service';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {

  orders = [];
  userData: IUser;
  totalSum = 0;

  constructor(
    private productServise: ProductService,
    private user: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user.getUser().subscribe(data => {
      this.userData = data;
    })
    this.loadOrders();
  }

  loadOrders() {
    this.productServise.loadData().subscribe(productData => {
      productData.forEach(product => {
        if (this.userData.orders.includes(product.id)) {
          this.orders.push(product)
          this.totalSum += product.price as number;
        }
      })
    });
  }

  handleDelete(id) {
    this.user.getUser().subscribe(userData => {
      let index = userData.orders.indexOf(id);
      userData.orders.splice(index, 1)
      this.user.updateUser(userData)
    })
  }

  handleBuy() {
    this.user.updateUser({...this.userData, orders: []}).then(res => this.router.navigate(['/']))
  }

}

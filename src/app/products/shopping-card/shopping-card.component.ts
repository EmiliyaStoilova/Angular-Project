import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/user/auth.service';
import { ProductService } from '../product.service';

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
    this.loadOrders();
    this.user.getUser().then(data => data.subscribe(data => {
      this.userData = data;
    }))
  }

  loadOrders() {
    this.productServise.loadData().subscribe(productData => {
      this.user.getUser().then(res => res.subscribe(userData => {
        productData.forEach(product => {
          if(userData.orders.includes(product.id)) {
            this.orders.push(product)
            this.totalSum += product.price as number;
          }
        })

      }))
    });
  }

  handleDelete(id) {
    this.user.getUser().then(res => res.subscribe(userData => {
      let index = userData.orders.indexOf(id);
      userData.orders.splice(index, 1)
      this.user.updateUserOrders(userData.orders).then(res => this.router.navigate(['']))
    }))
  }

  handleByu() {
    this.user.updateUserOrders([]).then(res => this.router.navigate(['']));
  }

}

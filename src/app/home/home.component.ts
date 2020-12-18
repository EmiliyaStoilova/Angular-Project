import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ProductService } from '../products/product.service';
import { IProduct } from '../shared/interfaces/product';
import { IUser } from '../shared/interfaces/user';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data;

  constructor(
    private afDb: AngularFirestore,
    private user: AuthService,
    private products: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.products.loadData().subscribe(products => {
      this.data = products;
    })
  }

  isLoggedIn() {
    return this.user.isLoggedIn()
  }

  handleClick(id) {
    this.user.getUser().subscribe(user => {
      if (!user.orders.includes(id)) {
        user.orders.push(id)
      }
      this.user.updateUser(user)
      this.router.navigate(['/user/shoppingcard'])
    })
  }

}

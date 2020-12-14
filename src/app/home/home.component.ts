import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
    private userService: AuthService,
    private products: ProductService,
  ) { }

  ngOnInit(): void {
    this.products.loadData().subscribe(products => {
      this.data = products;
    })
  }

  isLoggedIn() {
    return this.userService.isLoggedIn()
  }

  async handleClick(id) {
    const uid = (await this.userService.getUserId()).toString()

    this.afDb.collection<IUser>('users').doc(uid).valueChanges().subscribe(data => {
      if (!data.products.includes(id)) {
        data.products.push(id)
      }
      this.userService.updateUser(data.products)
    })

    this.afDb.collection<IUser>('users').doc(uid).valueChanges().subscribe(data => {
      if (!data.orders.includes(uid)) {
        data.orders.push(uid)
      }

      this.updateUser(data)
    })
  }

  async updateUser(user) {
    const id = (await this.userService.getUserId()).toString()
    this.afDb.collection<IUser>('users').doc(id).update({ orders: user })
  }

}

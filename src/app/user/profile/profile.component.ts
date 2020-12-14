import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ProductService } from 'src/app/products/product.service';
import { IProduct } from 'src/app/shared/interfaces/product';
import { IUser } from 'src/app/shared/interfaces/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: IUser;
  products;

  constructor(
    private userService: AuthService,
    private productServise: ProductService
    ) { }

  ngOnInit(): void {
    this.loadUserData()
    this.loadProducts()
  }

  loadUserData(){
    this.userService.getUser().then(user => {
      user.subscribe(data => {
        this.currentUser = data;
      })
    })
  }

  async loadProducts() {
    const uid = (await this.userService.getUserId()).toString()
    this.productServise.loadData().subscribe(data => {
     this.products = data.filter(res => res.creator === uid)
    })
  }

  handleClick(id) {
    this.productServise.delete(id)
  }

}

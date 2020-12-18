import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { AuthService } from 'src/app/user/auth.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(
    private service: ProductService,
    private user: AuthService
  ) { }

  ngOnInit(): void {
  }

  handleSubmit(data) {
    let creator = this.user.getUserId().toString()
    data.id = '';
    data.creator = creator;
    this.service.create(data)
  }

}

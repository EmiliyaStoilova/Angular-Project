import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ShoppingCardComponent } from './products/shopping-card/shopping-card.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'user/profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/register',
    component: RegisterComponent
  },
  {
    path: 'user/profile/addProduct',
    component: AddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/shoppinCard',
    component: ShoppingCardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

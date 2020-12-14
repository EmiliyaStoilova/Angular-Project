import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/user/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private user: AuthService) {}
  canActivate() {
    const isAuth = this.user.isLoggedIn();
    if(isAuth) {
      return true;
    }
    this.router.navigate(['/user/register']);
    return false;
  }
}
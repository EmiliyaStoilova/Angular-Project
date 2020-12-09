import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: AuthService) { }

  isLoggedIn() {
    return this.userService.isLoggedIn()
  }

  ngOnInit(): void {
  }

  logoutHandler() {
    this.userService.logout()
  }

}

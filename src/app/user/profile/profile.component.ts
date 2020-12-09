import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: AuthService) { }

  ngOnInit(): void {
  }

  loadData(){
    console.log(this.userService.getUser)
  }

}

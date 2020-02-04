import { Component, OnInit, Injectable } from '@angular/core';
import { UserService } from './../../services/user.service';
import { User } from './../../models/Users.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

@Injectable()
export class ProfileComponent implements OnInit {
  user: User[];
  nickname: string;
  email: string;
  profilePicture: string;


  // tslint:disable-next-line: no-shadowed-variable
  constructor(private UserService: UserService) { // injected
    this.nickname = 'Carlos Alfredo';
    this.email = 'carlos98@gmail.com';
    this.profilePicture = 'https://material.angular.io/assets/img/examples/shiba1.jpg';

  }

  getUser() {
    this.UserService.getUsers()
      .subscribe(user => (this.user = user));
  }


  ngOnInit() {
    // this.getUser();
  }


}

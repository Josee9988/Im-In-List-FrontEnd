import { Component, OnInit, Injectable } from '@angular/core';
import { UserService } from './../../shared/services/user.service';
import { User } from '../../shared/models/Users.model';

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

  getUser(id: number): void {
    // this.UserService.getUsers().subscribe(Response => console.log(Response));
    // this.UserService.getUser(id).subscribe(Response => console.log(Response));
    // this.UserService.postUser(myuser).subscribe(Response => console.log(Response));

  }



  ngOnInit() {
    // this.getUser();
  }


}

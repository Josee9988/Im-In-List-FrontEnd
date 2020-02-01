import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  nickname: string;
  email: string;
  profilePicture: string;
  constructor() {
    this.nickname = 'Carlos Alfredo'; 0
    this.email = 'carlos98@gmail.com';
    this.profilePicture = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  }

  ngOnInit() {
  }


}

import { Component, OnInit } from '@angular/core';
import { LoginRegisterComponent } from '../auth/login-register/login-register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent extends LoginRegisterComponent implements OnInit {


  constructor(router: Router) {
    super(router);
  }

  ngOnInit() {
  }

}

import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { IUser } from '../../../shared/models/IUsers.interface';
import { RefreshNavbarCommunication } from 'src/app/shared/services/communications/refresh-navbar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

@Injectable()
/**
 * @author Borja Pérez Mullor <multibalcoy@gmail.com>
 */
export class ProfileComponent implements OnInit, OnDestroy {
  user: IUser[];
  nickname: string;
  email: string;
  profilePicture: string;
  private observableFill: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private refreshNavbarCommunication: RefreshNavbarCommunication) {
  }


  ngOnInit() {
    this.fillData();
  }

  /**
   * Summary: Get the data passed by param and assign it to the consts in case of the users be 1 or 2 for use the carts
   * @param Response Is the response from the API (database)
   */
  fillData(): void {
    this.observableFill = this.userService.getDataUser().subscribe(Response => {
      this.nickname = Response.user.name;
      this.email = Response.user.email;
    });
  }

  /**
   * Summary: This function will close session and redirect home
   */
  onClose(): void {
    this.refreshNavbarCommunication.next(1);
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    if (this.observableFill) {
      this.observableFill.unsubscribe();
    }
  }
}

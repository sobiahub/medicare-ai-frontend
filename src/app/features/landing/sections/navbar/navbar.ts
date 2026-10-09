import {
  Component,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core';

import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import {
  CommonModule
} from '@angular/common';

import {
  Subject,
  takeUntil
} from 'rxjs';

import {
  AuthService,
  AuthUser
} from '../../../../core/services/auth';


@Component({
  selector: 'app-navbar',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],

  templateUrl: './navbar.html'
})
export class Navbar
  implements OnInit, OnDestroy {


  

  private readonly authService =
    inject(AuthService);

  private readonly router =
    inject(Router);




  private readonly destroy$ =
    new Subject<void>();




  isMenuOpen =
    false;

  isAccountMenuOpen =
    false;


 

  currentUser:
    AuthUser | null =
    null;


  isLoggedIn =
    false;


  

  ngOnInit(): void {

    this.authService.currentUser$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        user => {

          this.currentUser =
            user;

          this.isLoggedIn =
            user !== null;

        }
      );

  }



  get fullName(): string {

    if (!this.currentUser) {
      return 'My Account';
    }


    return `${this.currentUser.firstName} ${this.currentUser.lastName}`;

  }




  get userInitials(): string {

    if (!this.currentUser) {
      return 'U';
    }


    const first =
      this.currentUser.firstName
        ?.charAt(0)
        .toUpperCase() ?? '';


    const last =
      this.currentUser.lastName
        ?.charAt(0)
        .toUpperCase() ?? '';


    return `${first}${last}`;

  }


 

  toggleAccountMenu(): void {

    this.isAccountMenuOpen =
      !this.isAccountMenuOpen;

  }


  openAccountMenu(): void {

    this.isAccountMenuOpen =
      true;

  }


  closeAccountMenu(): void {

    this.isAccountMenuOpen =
      false;

  }


  // MOBILE MENU

  toggleMenu(): void {

    this.isMenuOpen =
      !this.isMenuOpen;


    if (this.isMenuOpen) {

      this.isAccountMenuOpen =
        false;

    }

  }


  closeMenu(): void {

    this.isMenuOpen =
      false;

  }



  logout(): void {

    this.authService.logout();


    this.isAccountMenuOpen =
      false;

    this.isMenuOpen =
      false;


    this.router.navigate([
      '/'
    ]);

  }



  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();

  }

}
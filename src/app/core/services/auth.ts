import {
  Injectable,
  inject,
  PLATFORM_ID
} from '@angular/core';

import {
  isPlatformBrowser
} from '@angular/common';

import {
  Observable,
  of,
  throwError,
  BehaviorSubject
} from 'rxjs';

import {
  delay
} from 'rxjs/operators';



export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}




export interface LoginRequest {
  email: string;
  password: string;
}




export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'patient';
}


export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  phone: string;
}



interface StoredUser extends AuthUser {
  password: string;
}




export interface ForgotPasswordRequest {
  email: string;
}




export interface VerifyCodeRequest {
  email: string;
  code: string;
}




export interface ResetPasswordRequest {
  email: string;
  resetToken: string;
  password: string;
}




interface ResetSession {
  email: string;
  code: string;
  resetToken: string;
  expiresAt: number;
  verified: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly platformId =
    inject(PLATFORM_ID);


 

  private readonly USERS_KEY =
    'dhm_users';

  private readonly CURRENT_USER_KEY =
    'dhm_current_user';

  private readonly RESET_SESSION_KEY =
    'dhm_password_reset';


 

  private readonly currentUserSubject =
    new BehaviorSubject<AuthUser | null>(
      this.loadCurrentUser()
    );


  readonly currentUser$ =
    this.currentUserSubject.asObservable();


 

  getCurrentUser(): AuthUser | null {

    return this.currentUserSubject.value;

  }



  isLoggedIn(): boolean {

    return this.currentUserSubject.value !== null;

  }


  

  register(
    data: RegisterRequest
  ): Observable<AuthUser> {

    if (!isPlatformBrowser(this.platformId)) {

      return throwError(
        () =>
          new Error(
            'Registration is only available in the browser.'
          )
      );

    }


    const users =
      this.getUsers();


    

    const existingUser =
      users.find(
        user =>
          user.email.toLowerCase() ===
          data.email.trim().toLowerCase()
      );


    if (existingUser) {

      return throwError(
        () =>
          new Error(
            'An account with this email already exists.'
          )
      );

    }


    

    const newUser: AuthUser = {

      id: crypto.randomUUID(),

      firstName:
        data.firstName.trim(),

      lastName:
        data.lastName.trim(),

      email:
        data.email.trim().toLowerCase(),

      phone:
        data.phone.trim(),

      role:
        'patient'

    };


    const storedUser: StoredUser = {

      ...newUser,

      password:
        data.password

    };


    users.push(storedUser);


    localStorage.setItem(
      this.USERS_KEY,
      JSON.stringify(users)
    );


    return of(newUser).pipe(
      delay(900)
    );

  }


  
  login(
    data: LoginRequest
  ): Observable<AuthUser> {

    if (!isPlatformBrowser(this.platformId)) {

      return throwError(
        () =>
          new Error(
            'Login is only available in the browser.'
          )
      );

    }


    const email =
      data.email.trim().toLowerCase();


    const users =
      this.getUsers();


    const user =
      users.find(
        storedUser =>
          storedUser.email.toLowerCase() ===
            email &&
          storedUser.password ===
            data.password
      );


    if (!user) {

      return throwError(
        () =>
          new Error(
            'Invalid email or password.'
          )
      );

    }


 

    const authUser: AuthUser = {

      id:
        user.id,

      firstName:
        user.firstName,

      lastName:
        user.lastName,

      email:
        user.email,

      phone:
        user.phone,

      role:
        user.role

    };


   

    localStorage.setItem(
      this.CURRENT_USER_KEY,
      JSON.stringify(authUser)
    );




    this.currentUserSubject.next(
      authUser
    );


    return of(authUser).pipe(
      delay(700)
    );

  }


 

  logout(): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }


    localStorage.removeItem(
      this.CURRENT_USER_KEY
    );


 

    this.currentUserSubject.next(
      null
    );

  }


  

  isEmailRegistered(
    email: string
  ): boolean {

    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }


    return this.getUsers().some(
      user =>
        user.email.toLowerCase() ===
        email.trim().toLowerCase()
    );

  }


 

  forgotPassword(
    data: ForgotPasswordRequest
  ): Observable<{ message: string }> {

    if (!isPlatformBrowser(this.platformId)) {

      return throwError(
        () =>
          new Error(
            'Password recovery is only available in the browser.'
          )
      );

    }


    const email =
      data.email.trim().toLowerCase();


    const users =
      this.getUsers();


    const user =
      users.find(
        storedUser =>
          storedUser.email.toLowerCase() ===
          email
      );


    if (!user) {

      return throwError(
        () =>
          new Error(
            'No account was found with this email address.'
          )
      );

    }


    

    const code =
      '123456';


    

    const resetToken =
      crypto.randomUUID();


  

    const expiresAt =
      Date.now() +
      10 * 60 * 1000;


    const resetSession: ResetSession = {

      email,

      code,

      resetToken,

      expiresAt,

      verified: false

    };


    localStorage.setItem(
      this.RESET_SESSION_KEY,
      JSON.stringify(resetSession)
    );


    return of({

      message:
        'A verification code has been sent to your email.'

    }).pipe(
      delay(800)
    );

  }


  

  verifyResetCode(
    data: VerifyCodeRequest
  ): Observable<{
    resetToken: string;
  }> {

    if (!isPlatformBrowser(this.platformId)) {

      return throwError(
        () =>
          new Error(
            'Code verification is only available in the browser.'
          )
      );

    }


    const session =
      this.getResetSession();


    if (!session) {

      return throwError(
        () =>
          new Error(
            'Your password reset session has expired. Please request a new code.'
          )
      );

    }


  

    if (
      session.email !==
      data.email.trim().toLowerCase()
    ) {

      return throwError(
        () =>
          new Error(
            'Invalid password reset session.'
          )
      );

    }


   

    if (
      Date.now() >
      session.expiresAt
    ) {

      this.clearPasswordResetSession();

      return throwError(
        () =>
          new Error(
            'This verification code has expired. Please request a new code.'
          )
      );

    }


  

    if (
      session.code !==
      data.code.trim()
    ) {

      return throwError(
        () =>
          new Error(
            'The verification code is incorrect.'
          )
      );

    }



    session.verified =
      true;


    localStorage.setItem(
      this.RESET_SESSION_KEY,
      JSON.stringify(session)
    );


    return of({

      resetToken:
        session.resetToken

    }).pipe(
      delay(700)
    );

  }


  

  resetPassword(
    data: ResetPasswordRequest
  ): Observable<{ message: string }> {

    if (!isPlatformBrowser(this.platformId)) {

      return throwError(
        () =>
          new Error(
            'Password reset is only available in the browser.'
          )
      );

    }


    const session =
      this.getResetSession();


    if (!session) {

      return throwError(
        () =>
          new Error(
            'Your password reset session has expired.'
          )
      );

    }


    

    if (
      Date.now() >
      session.expiresAt
    ) {

      this.clearPasswordResetSession();

      return throwError(
        () =>
          new Error(
            'Your password reset session has expired. Please start again.'
          )
      );

    }


    

    if (
      session.email !==
      data.email.trim().toLowerCase()
    ) {

      return throwError(
        () =>
          new Error(
            'Invalid password reset request.'
          )
      );

    }


    

    if (
      session.resetToken !==
      data.resetToken
    ) {

      return throwError(
        () =>
          new Error(
            'Invalid or expired reset token.'
          )
      );

    }


  

    if (!session.verified) {

      return throwError(
        () =>
          new Error(
            'Please verify your code before resetting your password.'
          )
      );

    }


  

    const users =
      this.getUsers();


    const userIndex =
      users.findIndex(
        user =>
          user.email.toLowerCase() ===
          session.email
      );


    if (userIndex === -1) {

      return throwError(
        () =>
          new Error(
            'Account could not be found.'
          )
      );

    }


    

    users[userIndex].password =
      data.password;


    localStorage.setItem(
      this.USERS_KEY,
      JSON.stringify(users)
    );


   
    this.clearPasswordResetSession();


    return of({

      message:
        'Your password has been reset successfully.'

    }).pipe(
      delay(900)
    );

  }




  resendResetCode(
    email: string
  ): Observable<{ message: string }> {

    return this.forgotPassword({
      email
    });

  }


 

  getPasswordResetSession():
    ResetSession | null {

    return this.getResetSession();

  }




  clearPasswordResetSession(): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }


    localStorage.removeItem(
      this.RESET_SESSION_KEY
    );

  }


  

  private loadCurrentUser():
    AuthUser | null {

    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }


    const storedUser =
      localStorage.getItem(
        this.CURRENT_USER_KEY
      );


    if (!storedUser) {
      return null;
    }


    try {

      return JSON.parse(
        storedUser
      ) as AuthUser;

    } catch {

      localStorage.removeItem(
        this.CURRENT_USER_KEY
      );

      return null;

    }

  }


  

  private getUsers():
    StoredUser[] {

    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }


    const storedUsers =
      localStorage.getItem(
        this.USERS_KEY
      );


    if (!storedUsers) {
      return [];
    }


    try {

      const parsed =
        JSON.parse(storedUsers);


      if (!Array.isArray(parsed)) {
        return [];
      }


      return parsed as StoredUser[];

    } catch {

      return [];

    }

  }


  



updateProfile(
  data: UpdateProfileRequest
): Observable<AuthUser> {

  if (!isPlatformBrowser(this.platformId)) {

    return throwError(
      () =>
        new Error(
          'Profile update is only available in the browser.'
        )
    );

  }

  const currentUser = this.getCurrentUser();

  if (!currentUser) {

    return throwError(
      () =>
        new Error(
          'You must be logged in to update your profile.'
        )
    );

  }

  const firstName = data.firstName.trim();
  const lastName = data.lastName.trim();
  const phone = data.phone.trim();

  if (!firstName || !lastName || !phone) {

    return throwError(
      () =>
        new Error(
          'Please complete all required profile fields.'
        )
    );

  }

  const users = this.getUsers();

  const userIndex = users.findIndex(
    user => user.id === currentUser.id
  );

  if (userIndex === -1) {

    return throwError(
      () =>
        new Error(
          'User account could not be found.'
        )
    );

  }

  // Update stored user
  users[userIndex].firstName = firstName;
  users[userIndex].lastName = lastName;
  users[userIndex].phone = phone;

  localStorage.setItem(
    this.USERS_KEY,
    JSON.stringify(users)
  );

  // Create updated auth user
  const updatedUser: AuthUser = {

    id: users[userIndex].id,

    firstName:
      users[userIndex].firstName,

    lastName:
      users[userIndex].lastName,

    email:
      users[userIndex].email,

    phone:
      users[userIndex].phone,

    role:
      users[userIndex].role

  };

  // Update current logged-in user
  localStorage.setItem(
    this.CURRENT_USER_KEY,
    JSON.stringify(updatedUser)
  );

  return of(updatedUser).pipe(
    delay(600)
  );
}


  

  private getResetSession():
    ResetSession | null {

    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }


    const storedSession =
      localStorage.getItem(
        this.RESET_SESSION_KEY
      );


    if (!storedSession) {
      return null;
    }


    try {

      return JSON.parse(
        storedSession
      ) as ResetSession;

    } catch {

      return null;

    }

  }

}
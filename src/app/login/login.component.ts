import { Component, OnInit } from '@angular/core';

// importing services
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email: string;
  password: string;
  error_message: string;
  show_error = false;
  email_error = false;
  password_error = false;
  loggedIn = false;

  /**
   * constructor defination
   * @param authService service to perform http requests
   */
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  /**
   * Logs in a user by calling backend api through authService
   * @param  {} email
   * @param  {} password
   */
  loginUser(email: string, password: string) {
    this.email_error = false;
    this.password_error = false;
    if (!(this.checkEmailAndPasswordValidation(email, password))) {
      return false;
    }
    const login_success_promise = this.authService.login_user(email, password);
    login_success_promise.subscribe((res) => {
      console.log("success response", res);
      this.loggedIn = true;
    }, (responseError) => {
      console.log("http response error", responseError.error.error);
      this.show_error = true;
      this.error_message = responseError.error.error;
    });
  }

  /**
   * validates email and password on form submit.
   * @param email
   * @param password
   */
  checkEmailAndPasswordValidation(email: string, password: string) {
    // let's check email's proper length and does it also inclues @ sign or not
    if (!(email) || email.length < 4 || email.indexOf('@') <= -1 ) {
      this.error_message = 'Enter valid Email address.';
      this.email_error = true;
      return false;
    }
    // checks password length and validates it.
    if (!(password) || password.length < 4) {
      this.error_message = 'Enter valid Password.';
      this.password_error = true;
      return false;
    }
    return true;
  }
}

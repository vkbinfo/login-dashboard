import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../constants';
@Injectable()

export class AuthService {

  constructor(private httpClient: HttpClient) { }
  /**
   * sends api request for given email and password.
   * @param email user email as username
   * @param password user password
   * @returns a Observable object that contains the response of the api
  * */
  login_user(email: string, password: string) {
       const req = this.httpClient.post(BASE_URL, {
        username: email,
        password: password
      });
      return req;
    }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { Observable } from 'rxjs';
import { LoginDetails } from '../interfaces/logindetails';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://3.70.177.167:81';


  constructor(private http: HttpClient) { }

  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/easyrent-api/v1/register_owner`, userDetails);
  }
  
  loginUser(loginDetails: LoginDetails) {
    return this.http.post(`${this.baseUrl}/easyrent-api/v1/login`, loginDetails);
  }

}

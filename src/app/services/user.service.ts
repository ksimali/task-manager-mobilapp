import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://monkfish-app-9x56s.ondigitalocean.app/v1/users';

  constructor(private http: HttpClient, private authService: AuthService) { }

  public login(email: string, password: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`, {email, password});
  }

  public signup(email: string, password: string, name: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/signup`, {email, password, name});
  }

  public getAllUsers(): Observable<any>{
    const headers = new HttpHeaders({
      'x-access-token': this.authService.getToken() || "",
    });

    return this.http.get(`${this.apiUrl}/all`, {headers})
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../model/User.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = 'http://localhost:8083/users';
  token!: string;
  private helper = new JwtHelperService();

  public loggedUser!: string;
  public isloggedIn: boolean = false;
  public roles: string[] = [];

  constructor(private router: Router, private http: HttpClient) { }

  login(user: user): Observable<any> {
    return this.http.post<any>(this.apiURL + '/login', user, { observe: 'response' }).pipe(
      map(response => {
        const token = response.headers.get('Authorization');
        if (token) {
          this.saveToken(token);
        }
        return response;
      }),
      catchError(error => {
        console.error('Login error', error);
        return of(null);
      })
    );
  }

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  getToken(): string {
    return this.token;
  }

  decodeJWT() {
    if (this.token == undefined)
      return;
     const decodedToken = this.helper.decodeToken(this.token);
     this.roles = decodedToken.roles;
     console.log("role"+this.roles)
     this.loggedUser = decodedToken.sub;
  }

  isAdmin(): boolean {
    if (!this.roles)
      return false;
     return this.roles.indexOf('ADMIN') >=0;  }

  logout() {
    this.loggedUser = undefined!;
    this.roles = [];
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    this.loadToken();
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }

  isTokenExpired(): boolean {
    return this.helper.isTokenExpired(this.token);
  }
}

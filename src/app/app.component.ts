import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MesVoyages';
  isloggedIn: string = '';
  loggedUser: string = '';
  users: any[] = []; // Replace 'any' with the actual type if possible
  roles: string[] = [];
  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
    this.authService.loadToken();
    if (this.authService.getToken()==null || this.authService.isTokenExpired())
    this.router.navigate(['/login']);
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = 'true';
    this.getUserRoles(login);
  }

  getUserRoles(username: string) {
    if (this.users) {
      this.users.forEach((curUser) => {
        if (curUser.username == username) {
          this.roles = curUser.roles;
        }
      });
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	currentUser: User;
  categories: any;
  subCategories: any;

  constructor( private router: Router, private authService: AuthenticationService, private http: HttpClient) {
  	this.authService.currentUser.subscribe( x => this.currentUser = x );
  }

  ngOnInit() {
    this.http.get('assets/categories.json').subscribe( result => {
        this.categories = result;
      });

    this.http.get('assets/sub-categories.json').subscribe( result => {
      this.subCategories = result;
    });
  }

  logout(): void{
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}

import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	currentUser: User;

  constructor( private router: Router, private authService: AuthenticationService) {
  	this.authService.currentUser.subscribe( x => this.currentUser = x );
  }

  ngOnInit() {
  }

  logout(): void{
  	this.router.navigate(['/logout']);
  }

}

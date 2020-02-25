import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';


import { MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

  constructor(
  		private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private loginDialog: MatDialog
        ) {
  			if (this.authenticationService.currentUserValue) { 
	            this.router.navigate(['/']);
	        }
         }

  ngOnInit() {
  		this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // openDialog() : any{
  //   this.loginDialog.open(LoginDialogRef);
  // }  


  get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}

// @Component({
//   selector: 'login-dialog-ref',
//   template: '<p>Login form loading...</p>'
// })
// export class LoginDialogRef {

//   constructor(private loginDialogRef: MatDialogRef<LoginDialogRef>) {

//   }

//   close(): any {
//     this.loginDialogRef.dismiss();
//   }
// }

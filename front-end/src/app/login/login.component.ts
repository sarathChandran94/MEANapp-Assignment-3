import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    email: string;
    password: string;
    user = {
        email: this.email,
        password: this.password
    }
    err: any;
    submitted = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


    loginUser() {
        this.authService.loginUser(this.user)
            .subscribe(
                response => {
                    // console.log(response);
                    localStorage.setItem('token', response["token"])
                    this.router.navigate(['']);
                    this.submitted = true;
                },
                err => {
                    this.err = err.error;
                    console.log(err.error);
                }
        );
    }
}

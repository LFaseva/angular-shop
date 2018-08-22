import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import { tap, catchError } from 'rxjs/operators';
// import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginData = { username: '', password: '' };
  message = '';
  data: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  login() {
    const url = '/api/signin';
    this.http.post(url, this.loginData).subscribe(resp => {
      this.data = resp;
      localStorage.setItem('jwtToken', this.data.token);
      this.router.navigate(['user']);
    }, err => {
      this.message = err.error.msg;
    });
  }
}

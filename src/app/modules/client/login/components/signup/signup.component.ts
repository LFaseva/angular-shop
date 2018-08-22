import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserInfoService } from '@shared/user/services';
// import { Observable } from 'rxjs/Observable';
// import { tap, catchError } from 'rxjs/operators';
// import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  signupData = { username: '', password: '' };
  message = '';

  constructor(private http: HttpClient, private router: Router, private userInfoService: UserInfoService) { }

  ngOnInit() {
  }

  signup() {
     this.http.post('/api/signup', this.signupData).subscribe(resp => {
      this.saveUser(this.signupData.username);
      this.router.navigate(['user']);
    }, err => {
      this.message = err.error.msg;
    });
  }

  saveUser(name) {
    this.userInfoService.setUser(name);
  }

}

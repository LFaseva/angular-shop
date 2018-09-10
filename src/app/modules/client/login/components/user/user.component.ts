import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '@shared/user/services';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: any;

  constructor(private userInfoService: UserInfoService,
    private http: HttpClient) { }

  ngOnInit() {
    // this.user = this.userInfoService.getUser().name;
    const token = { token: localStorage.getItem('jwtToken')};
    this.http.post('/apiUser/user', token).subscribe((resp: {username: string}) => {
      this.user = resp.username;
      }, err =>{
      return err.status(403).send({ success: false, msg: 'Unauthorized.' });
    })
  }

}

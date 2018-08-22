import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '@shared/user/services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: string;

  constructor(private userInfoService: UserInfoService) { }

  ngOnInit() {
    this.user = this.userInfoService.getUser();
  }

}

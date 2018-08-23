import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfoService } from '@shared/user/services';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any;
  condition: boolean = false;

  constructor(private http: HttpClient,
    private userInfoService: UserInfoService,
    ) {}

  ngOnInit() {
    this.userInfoService.getMessage().subscribe((message) => {
      console.log('message', message);
      this.condition = true;
    });
  }
}

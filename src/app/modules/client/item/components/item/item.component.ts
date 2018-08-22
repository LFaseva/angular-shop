import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import { tap, catchError } from 'rxjs/operators';
// import { of } from 'rxjs/observable/of';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  items: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const url = '/api/item';
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    this.http.get(url, httpOptions).subscribe(data => {
      this.items = data;
    }, err => {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    });
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }

}

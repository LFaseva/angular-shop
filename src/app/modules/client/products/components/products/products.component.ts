import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfoService } from '@shared/user/services';
import { Product } from './product.interface/product.interface';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any;
  condition: boolean = false;
  admin: boolean = false;
  pictureUrl: string = 'http://placeimg.com/300/200/nature';
  newProductForm: FormGroup;
  message: string;

  constructor(private http: HttpClient,
    private userInfoService: UserInfoService,
    private form: FormBuilder
    ) {}

  ngOnInit() {
    this.checkAdmin();
  }

  initForm() {
    this.newProductForm = this.form.group({
      title: [null, [
        Validators.required,
      ]],
      description: [null, [
        Validators.required,
      ]],
      price: [null,
        [
          Validators.required,
        ]]
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.newProductForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  onSubmit() {
    const controls = this.newProductForm.controls;
    const inputData = this.newProductForm.value;
    const url = './api/product';

    if (this.newProductForm.invalid) {
      Object.keys(controls)
      .forEach(
        controName => controls[controName].markAsTouched());
    }
    console.log('info on db', inputData);
    inputData.pictureUrl = this.pictureUrl;

    this.saveNewProduct(url, inputData);
  }

  saveNewProduct(url, product) {
    this.http.post(url, product).subscribe(resp => {},
       err => {
      this.message = err.error.msg;
    });
  }

  checkAdmin() {
    this.userInfoService.getMessage().subscribe((message) => {
      this.condition = true;
      if (message.text === 'admin') {
        this.admin = true;
        this.initForm();
      } else {
        this.showProducts('./api/product');
      }
    });
  }

  showProducts(url) {
    this.http.get(url).subscribe((res) => {
      if (res) {
         this.products = res;
      }
    }, err => {
      console.log('There is no products');
    });
  }
}

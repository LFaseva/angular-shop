import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfoService } from '@shared/user/services';
import { Product } from '../../interfaces';
import { NgForm, FormBuilder, FormGroup, Validators,} from '@angular/forms';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any;
  file: any;
  condition: boolean = false;
  admin: boolean = true;
  newProductForm: FormGroup;
  message: string;

  constructor(private http: HttpClient,
    private userInfoService: UserInfoService,
    private form: FormBuilder
    ) {}

  ngOnInit() {
    // this.checkAdmin();
    this.showProducts('./apiGridFs/products');
    this.initForm();
  }

  initForm() {
    this.newProductForm = this.form.group({
      title: ['null', [
        Validators.required,
      ]],
      image: [null, Validators.required],
      description: ['null', [
        Validators.required,
      ]],
      price: ['null',
        [
          Validators.required,
        ]],
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
    const url = './apiGridFs/upload';
    if (this.newProductForm.invalid) {
      Object.keys(controls)
      .forEach(
        controName => controls[controName].markAsTouched());
    }
    const formData: FormData = new FormData();
    formData.append('file', this.file[0], this.file[0].name);
    Object.keys(inputData).forEach((key) => {
      formData.append(key, inputData[key]);
    });
    return this.http
      .post(url, formData).subscribe(resp => { },
        err => {
          this.message = err.error.msg;
        });
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
        this.showProducts('./apiGridFs/products');
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

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.newProductForm.patchValue({
          file: reader.result
        });
        this.file = [file];
      };
    }
  }
}

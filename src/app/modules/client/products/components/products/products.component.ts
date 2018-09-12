import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { UserInfoService } from '@shared/user/services';
import { Product } from '../../interfaces';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';



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
    this.showProducts('./apiProducts/products');
    this.initForm();
  }

  initForm() {
    this.newProductForm = this.form.group({
      title: ['new product title', [
        Validators.required,
      ]],
      description: ['new product description', [
        Validators.required,
      ]],
      price: ['new product price',
        [
          Validators.required,
        ]],
      id: [null]
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
    const url = './apiProducts/upload';
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
      .post(url, formData).subscribe((resp:any) => {
        if(resp && resp.success){
          this.products.push(resp.data);
          }
          console.log('file is too big try another');
        },
        err => {
          this.message = err.error.msg;
        });
  }

  saveNewProduct(url, product) {
    this.http.post(url, product).subscribe(resp => {
      },
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
        this.showProducts('./apiProducts/products');
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
    const file = event.target.files;
     if (file && file.length) {
      //limitation for loading files more then 1000000 bytes
      if (file[0].size <= 1000000) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.newProductForm.patchValue({
            file: reader.result
          });
          this.file = [file];
        };
      } else {
        throw console.error("File is too large.");
      }
    }
  }

  deleteProduct(id) {
    const url = './apiProducts/files/' + id;
    this.http.delete(url).subscribe(resp => {
        if(resp){
          this.products.forEach((product) => {
            if (product.id === id) {
              this.products.splice(this.products.indexOf(product), 1);
            }
        }   
      )}
     },
      err => {
        this.message = err.error.msg;
      });
    }
}

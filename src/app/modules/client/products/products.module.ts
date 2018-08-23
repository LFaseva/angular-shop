import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '@client/products/components/products';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProductsComponent
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }

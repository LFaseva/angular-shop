import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavigationComponent,
  SliderComponent,
  SidebarComponent,
  MainComponent,
  HeaderComponent
} from './components';
import {  LoginModule } from '@client/login';
import { ProductsModule } from '@client/products';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    ProductsModule,
  ],
  declarations: [
    HeaderComponent,
    NavigationComponent,
    SliderComponent,
    SidebarComponent,
    MainComponent,
  ],
  exports: [
    HeaderComponent,
    NavigationComponent,
    SliderComponent,
    SidebarComponent,
    MainComponent,
  ],
})
export class BaseLayoutModule { }

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
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from '@shared/loader/component/loader/loader.component';

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
    FooterComponent,
  ],
  exports: [
    HeaderComponent,
    NavigationComponent,
    SliderComponent,
    SidebarComponent,
    MainComponent,
  ],
  entryComponents: [
    LoaderComponent
  ]
})
export class BaseLayoutModule { }
